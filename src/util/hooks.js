const useObserver = (initialValue) => {
  const onStateChange = {};
  const state = new Proxy(initialValue, {
    set: (obs, key, newState) => {
      obs[key] = newState;
      if (onStateChange[key]) {
        onStateChange[key](newState);
        return true;
      } else {
        return false;
      }
    },
  });

  return [state, onStateChange];
};

module.exports = { useObserver };
