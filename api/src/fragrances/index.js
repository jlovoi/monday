const getAll = require("./getAll");
const post = require("./post");
const update = require("./update");
const deleteFragrance = require("./delete");

module.exports = (app, pool) => {
  getAll(app, pool);
  post(app, pool);
  update(app, pool);
  deleteFragrance(app, pool);
};
