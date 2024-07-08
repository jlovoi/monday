const update = (app, pool) => {
  app.put("/fragrances", (req, res) => {
    let { name, description, category, image_url } = req.body;

    pool.query(
      "UPDATE fragrances SET description = $1, category = $2, updated_at = STATEMENT_TIMESTAMP(), image_url = $3 WHERE name = $4",
      [description, category, image_url, name.toLowerCase()],
      (error, _results) => {
        if (error) {
          console.log(error);
          return res.status(400).send("ERROR UPDATING");
        } else return res.status(201).send();
      }
    );
  });
};

module.exports = update;
