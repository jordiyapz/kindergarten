const BASE_URL = "http://localhost:3000";

const createSimCard = ({ simId, ...props }) =>
  $("<div></div>")
    .attr({ id: `sim-${simId}`, class: "sim-card-outer" })
    .append(
      $("<div></div>")
        .attr({ class: "sim-card-inner" })
        .append($(`<h2></h2>`).text("Sim " + simId))
        .append(
          $(`<img>`).attr({
            id: `sim-${simId}-img`,
            width: 600,
            height: 400,
          })
        )
    );

const removeSim = (id, socket) => {
  $(`#sim-${id}`).remove();
  socket.disconnect();
};

$(document).ready(function () {
  const state = new Proxy(
    { sims: [] },
    {
      set: (state, actionType, payload) => {
        if (actionType === "sims") {
          state[actionType] = payload;
          console.log(payload);
          $("#empty").css({ display: !payload.length ? "block" : "none" });
        }
      },
    }
  );

  const createSimSocket = (simId) => {
    const simSocket = io(`/sim-${simId}`);
    simSocket.on("message", console.log);
    simSocket.on("sim_render", (dataUri) => {
      $(`#sim-${simId}-img`).attr({ src: dataUri });
    });
    simSocket.on("connect", () => {
      const simCard = createSimCard({ simId });
      $("#galery").append(simCard);
      simSocket.emit("sim:render");
    });
    simSocket.on("sim:remove", () => {
      removeSim(simId, simSocket);
      sim = state.sims.find(sim => sim.id === simId)
      state.sims = state.sims.filter(sim => sim.id !== simId);
      delete sim;
    });
    return simSocket;
  };

  const viewSocket = io("/viewer");
  viewSocket.on("sim:new", (id) => {
    const socket = createSimSocket(id);
    state.sims = [...state.sims, { id, socket }];
  });
  viewSocket.on("sim:remove:all", () => {
    state.sims.forEach(({ id, socket }) => {
      removeSim(id, socket);
    });
    state.sims = [];
  });

  $.getJSON(BASE_URL + "/sims", (simIds) => {
    const newSims = simIds.map((id) => ({ id, socket: createSimSocket(id) }));
    state.sims = [...state.sims, ...newSims];
  });
});
