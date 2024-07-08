const express = require("express");
const bodyParser = require("body-parser");
const Pool = require("pg").Pool;
const cors = require("cors");

const api = require("./src");

const app = express();
const pool = new Pool({
  user: "jlovoi",
  host: "localhost",
  database: "monday",
  password: "",
  port: 5432,
});

const port = 3000;

app.use(
  bodyParser({
    json: { limit: "50mb", extended: true },
  })
);

app.use(cors());

api(app, pool);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
