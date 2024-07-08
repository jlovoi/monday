const fragrancesAPI = require("./fragrances");

module.exports = (app, pool) => {
  fragrancesAPI(app, pool);

  // APIs for other tables would go here
};
