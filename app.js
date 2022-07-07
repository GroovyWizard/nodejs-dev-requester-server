const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requrested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, DELETE, GET"
    );
    return res.status(200).send({});
  }
  next();
});

const routes = require("./routes/routes");
app.use(routes);

module.exports = app;
