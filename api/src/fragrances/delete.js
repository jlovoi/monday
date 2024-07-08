const deleteFragrance = (app, pool) => {
  app.delete("/fragrances/:name", (req, res) => {
    const name = req.params.name;

    pool.query(
      "DELETE FROM fragrances WHERE name = $1",
      [name],
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(400).send("ERROR DELETING ROW");
        } else return res.status(201).send();
      }
    );
  });
};

module.exports = deleteFragrance;
