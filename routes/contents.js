var express = require('express');
var router = express.Router();
const mysql = require('mysql');

var connection =
mysql.createConnection({
  host : 'swichee.cj1j4colbxjn.us-east-1.rds.amazonaws.com',
  user : 'swichee',
  password : 'zxcvbnm12#',
  database : 'swichee'
});
connection.connect()

 router.get('/', (req, res) => {
  connection.query(
  'Select * from Contents',
  (err, rows, fields) => {
  res.send(rows);
  })
});

module.exports = router;

