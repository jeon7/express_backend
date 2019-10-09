const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('chicken.db');
const table_name = 'note';

router.get(`/${table_name}`, (req, res) => {
  let sql = `SELECT * FROM ${table_name};`;
  let elements = [];
  db.all(sql, function (err, rows) {
    rows.forEach(function (row) {
      elements.push(row);
    });
    res.send(JSON.stringify(elements));
  });
});

router.post(`/${table_name}/create`, (req, res) => {
  // get request data
  const title = "apple";
  const portion = 2;
  const incredients = "lalalalmn,dfs;dsf,sfa;"
  const description = "is red";
  const author_id = 33;

  const time = Date.now();
  const sql = `INSERT INTO ${table_name} 
  (title, portion, ingredients, description, created, updated, author_id) 
  VALUES ('${title}', ${portion}, '${incredients}', '${description}',${time}, ${time}, ${author_id});`;
  db.run(sql);
  res.send("create done");
});

router.get(`/${table_name}/read/:id`, (req, res) => {
  const sql = `SELECT * FROM ${table_name} WHERE id = ${req.params.id}`;
  let elements = [];
  db.all(sql, function (err, rows) {
    rows.forEach(function (row) {
      elements.push(row);
    });
    res.send(JSON.stringify(elements));
  });
});

router.put(`/${table_name}/update/:id`, (req, res) => {
  // get request data
  const attribute = "description";
  const description = "is red and green";

  const time_updated = Date.now();
  const sql = `UPDATE ${table_name} SET ${attribute} = '${description}', updated = ${time_updated} 
  WHERE id = ${req.params.id}`;
  db.run(sql);
  res.send("update done");
})

router.delete(`/${table_name}/delete/:id`, (req, res) => {
  const sql = `DELETE FROM ${table_name} WHERE id = ${req.params.id}`;
  db.run(sql);
  res.send("delete done");
});

module.exports = router;