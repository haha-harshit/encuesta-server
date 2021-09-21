// import React from "react";
const express = require("express");
const app = express();
const port = 8000;

const db = require("./config/mongoose");

app.use("/api/auth", require("./routes/api/auth"));

// app.get("/", (req, res) => {
//     return res.send("Home page");
// });

app.listen(port, () => {
    console.log("Server is up and running");
});
