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
 router.get('/api/customers', (req, res) => {
  connection.query(
  'Select Contents.Contents_id,Contents.Likes,Contents.Views,Contents.type_id,Contents.Thumbnail,Contents.Category,Contents.Title,User.User_name,User.blue from User INNER JOIN Contents ON User.User_id=Contents.User_id ORDER BY Contents_id DESC',
  (err, rows, fields) => {
  res.send(rows);
  })
});

/* GET home page. */ router.get('/', function(req, res, next) {
/*  res.render('index', { title: 'Express' });*/
  connection.query(
  'Select Contents.Contents_id,Contents.Likes,Contents.Views,Contents.type_id,Contents.Thumbnail,Contents.Category,Contents.Title,User.User_name,User.blue from User INNER JOIN Contents ON User.User_id=Contents.User_id ORDER BY Contents_id DESC',
  (err, rows, fields) => {
  res.send(rows);

  })

});
module.exports = router;
