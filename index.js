// const express = require("express");
// import express from "express";
// const app = express();
// const port = 3223;

// app.get("/api", (req, res) => {
//   res.send("Hola a todos ");
// });
// app.post("/api", (req, res) => {
//   res.send("Petición POST");
// });

// app.put("/api/:id", (req, res) => {
//   res.send("Petición PUT");
// });

// app.delete("/api/:id", (req, res) => {
//   res.send("Petición DELETE");
// });

// app.use(express.static("public"))

// app.listen(port, () => {
//   console.log("server online, port: ", port);
// });

import  Server  from "./models/server.js";

const server = new Server ()

// console.log(process.env);

//accedo al metodo listen de la clase para levantar el servidor
server.listen();