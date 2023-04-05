const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const routes = require("./routes/routes");

app.use(routes);

app.set("json limit", "50mb");
app.set("urlencoded limit", "50mb");

console.log(
  `Current limit: ${app.get("json limit")} (JSON) / ${app.get(
    "urlencoded limit"
  )}`
);

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
