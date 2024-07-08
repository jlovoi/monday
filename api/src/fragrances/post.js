const post = (app, pool) => {
  app.post("/fragrances", (req, res) => {
    const { name, description, category, image_url } = req.body;

    pool.query(
      "INSERT INTO fragrances (name, description, category, created_at, image_url) VALUES ($1, $2, $3, STATEMENT_TIMESTAMP(), $4)",
      [name.toLowerCase(), description, category, image_url],
      (error, _results) => {
        if (error) {
          console.log(error);
          return res.status(400).send("NAME EXISTS ALREADY");
        } else return res.status(201).send();
      }
    );
  });
};

module.exports = post;
