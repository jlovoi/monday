const getAll = (app, pool) => {
  app.get("/fragrances", (_req, res) => {
    pool.query(
      "SELECT * FROM fragrances ORDER BY name ASC",
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
      }
    );
  });
};

module.exports = getAll;
