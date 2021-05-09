var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const AWS=require('aws-sdk');
const fs=require('fs');



var connection = 
mysql.createConnection({
  host : endpoint,
  user : user,
  password : 비번,
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



router.get('/posting', function(req, res,next) {

var C_id =req.param('id');
var t_id=req.param('type_id');
  if(t_id==1){
 connection.query(
// 'select User.*, Contents.*, Image.* from Contents INNER JOIN User on User.User_id=Contents.User_id INNER JOIN Image ON Image.Contents_id = Contents.Contents_id where Contents.Contents_id= '+C_id+' and Contents.type_id = ' +t_id,
'Select Image.Image_blur,User.Nickname,Contents.comment_count,Contents.Contents,Contents.Date,User.image,Contents.Likes,Contents.Contents_id,Contents.Views,Contents.Category,Contents.Title,User.User_name,User.Blue from User INNER JOIN Contents ON User.User_id=Contents.User_id INNER JOIN Image ON Contents.Contents_id=Image.Contents_id where Contents.Contents_id='+C_id+' and Contents.type_id='+t_id,
//'Select Image.Image_blur,GROUP_CONCAT(Image.Image SEPARATOR ','),Contents.Date,User.image,Contents.Likes,Contents.Contents_id,Contents.Views,Contents.Category,Contents.Title,User.User_name,User.blue from User INNER JOIN Contents ON User.User_id=Contents.User_id INNER JOIN Image ON Contents.Contents_id=Image.Contents_id where Contents.Contents_id=1 and Contents.type_id=1',

  (err, rows, fields) => {
  res.send(rows);

  })

}else if(t_id==2){
connection.query(
  'select User.*, Contents.*, Audio.* from Contents INNER JOIN User on User.User_id=Contents.User_id INNER JOIN Audio ON Audio.Contents_id = Contents.Contents_id where Contents.Contents_id= '+C_id+' and Contents.type_id = ' +t_id,

  (err, rows, fields) => {
  res.send(rows);

  })
}else if(t_id==3){
 connection.query(
 'select User.*, Contents.*, Video.* from Contents INNER JOIN User on User.User_id=Contents.User_id INNER JOIN Video ON Video.Contents_id = Contents.Contents_id where Contents.Contents_id= '+C_id+' and Contents.type_id = ' +t_id,
  (err, rows, fields) => {
  res.send(rows);

  })

}else if(t_id==4){
 connection.query(
  'select User.*, Contents.*, blog.* from Contents INNER JOIN User on User.User_id=Contents.User_id INNER JOIN blog ON blog.Contents_id = Contents.Contents_id where Contents.Contents_id= '+C_id+' and Contents.type_id = ' +t_id,
  (err, rows, fields) => {
  res.send(rows);

  })

}
 
else  res.send('잘못된 type_id');

});

router.get('/trending', (req, res) => {
  connection.query(
  'Select Contents.Contents_id,Contents.Views,Contents.type_id,Contents.Thumbnail,Contents.Category,Contents.Title,User.User_name,User.Blue from User INNER JOIN Contents ON User.User_id=Contents.User_id ORDER BY Contents.popularity_today DESC limit 0,12',
  (err, rows, fields) => {
  res.send(rows);
  })
});

 router.get('/today_views', function(req, res,next) {

var C_id =req.param('id');
  connection.query(
  'update Contents set today_views=today_views+1 where Contents_id='+C_id,

  (err, rows, fields) => {
  res.send(rows);

  })

});



module.exports = router;

