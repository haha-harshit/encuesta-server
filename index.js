// import React from "react";
const express = require("express");
const app = express();
const port = 8000;

// connect to db
const db = require("./config/mongoose");

// middleware-> json-body-parser
app.use(express.json());

// routing to API
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/poll", require("./routes/api/poll"));

// app.get("/", (req, res) => {
//     return res.send("Home page");
// });

app.listen(port, () => {
    console.log("Server is up and running");
});
