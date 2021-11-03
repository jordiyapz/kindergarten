require("dotenv").config();

const express = require("express");

const { app, server } = require("./src/server");
const router = require("./src/router");

// Initialize socket
const { io } = require("./src/socket");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(express.static(__dirname + "/public"));
app.use("/client", express.static(__dirname + "/client"));

app.use((req, res) => {
  res.sendStatus(404);
});
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send(error.message || error);
});

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
