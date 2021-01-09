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

 router.get('/api/likes', (req, res) => {
  connection.query(
  'Select  Contents.comment_count,Contents.Date,User.image,Contents.Likes,Contents.Contents_id,Contents.Views,Contents.type_id,Contents.Thumbnail,Contents.Category,Contents.Title,User.User_name,User.blue from User INNER JOIN Contents ON User.User_id=Contents.User_id INNER JOIN Comment ON Contents.Contents_id=Comment.Contents_id group by Contents.Contents_id ORDER BY Contents.Likes DESC',
  (err, rows, fields) => {
  res.send(rows);
  })
});
router.get('/api/posting', function(req, res,next) {

var C_id =req.param('id');
var t_id=req.param('type_id');
  if(t_id==1){
 connection.query(
 'select User.image,User.User_id, User.User_name, User.Blue, Contents.*, Image.* from Contents INNER JOIN User on User.User_id=Contents.User_id INNER JOIN Image ON Image.Contents_id = Contents.Contents_id where Contents.Contents_id= '+C_id+' and Contents.type_id = ' +t_id,

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

 router.get('/api/add', function(req, res,next) {

var C_id =req.param('id');
  connection.query(
  'update Contents set Views=Views+1 where Contents_id='+C_id,

  (err, rows, fields) => {
  res.send(rows); 

  })

});



/* 추천  */ 
router.get('/api/recommend', function(req, res, next) {
 /*  & >  %26  */
  var ca = req.param('category');
 
  connection.query(
    'Select Contents.Contents_id, Contents.Contents,Contents.Price,Contents.Category,Contents.Date,Contents.Views,Contents.type_id,Contents.Thumbnail,Contents.Likes,Contents.Category,Contents.Title,User.User_name from Contents  INNER JOIN User ON User.User_id=Contents.User_id where Category like "%'+ca+'%"ORDER BY Contents.Contents_id DESC limit 10' ,
    (err, rows, fields) => {
    res.send(rows);})

}); 


/*댓글*/
  router.get('/api/comment', function(req, res, next) {
  var c_id = req.param('id');

  connection.query(
  ' select User.User_name,User.image,User.Blue, Contents.Contents_id, Comment.* from Comment INNER JOIN User on User.User_id = Comment.User_id INNER JOIN Contents ON Contents.Contents_id = Comment.Contents_id where Contents.Contents_id = '+c_id ,
    (err, rows, fields) => {
    res.send(rows);})
});


/*대댓글*/
  router.get('/api/recomment', function(req, res, next) {
   var c_id = req.param('id');
   var contents_id = req.param('co_id'); 
  connection.query(
 ' select Recomment.*,User.image, User.User_name,User.Blue  from Recomment INNER JOIN User on User.User_id = Recomment.User_id  where Recomment.Comment_Contents_id= '+c_id+' and Comment_Comment_id= '+contents_id,
 (err, rows, fields) => {
    res.send(rows);})
});


inf_a=0;
/* GET home page. */ 
  router.get('/', function(req, res, next) {
/*  res.render('index', { title: 'Express' });*/
 
 inf_a = 0;
  connection.query(
//  'Select count(Contents.Contents_id),Contents.Date,User.image,Contents.Likes,Contents.Contents_id,Contents.Views,Contents.type_id,Contents.Thumbnail,Contents.Category,Contents.Title,User.User_name,User.blue from User INNER JOIN Contents ON User.User_id=Contents.User_id group by Contents.Contents_id ORDER BY Contents.Contents_id DESC limit 0,5',
'Select Contents.comment_count,Contents.Date,User.image,Contents.Likes,Contents.Contents_id,Contents.Views,Contents.type_id,Contents.Thumbnail,Contents.Category,Contents.Title,User.User_name,User.blue from User INNER JOIN Contents ON User.User_id=Contents.User_id ORDER BY Contents.Contents_id DESC limit 0,5',


  (err, rows, fields) => {
  res.send(rows);
  })

});

router.get('/api/inf', function(req, res, next) {
 inf_a+=5;
connection.query(
  'Select Contents.comment_count,Contents.Date,User.image,Contents.Likes,Contents.Contents_id,Contents.Views,Contents.type_id,Contents.Thumbnail,Contents.Category,Contents.Title,User.User_name,User.blue from User INNER JOIN Contents ON User.User_id=Contents.User_id ORDER BY Contents.Contents_id DESC limit '+inf_a+','+5,
  (err, rows, fields) => {
  res.send(rows);

  })

});

router.get('/api/trending', function(req, res, next) {

connection.query(
  'Select Contents.Date,User.image,Contents.Likes,Contents.Contents_id,Contents.Views,Contents.type_id,Contents.Thumbnail,Contents.Category,Contents.Title,User.User_name,User.blue from User INNER JOIN Contents ON User.User_id=Contents.User_id ORDER BY Contents.Likes DESC limit 12',
(err, rows, fields) => {
  res.send(rows);

  })

});

router.get('/api/sidebar', function(req, res, next) {
 inf_a = 0;
var ca = req.param('category');

connection.query(
'Select Contents.comment_count,Contents.Date,User.image,Contents.Likes,Contents.Contents_id,Contents.Views,Contents.type_id,Contents.Thumbnail,Contents.Category,Contents.Title,User.User_name,User.blue from User INNER JOIN Contents ON User.User_id=Contents.User_id where Contents.Category like "%'+ca+'%" group by Contents.Contents_id ORDER BY Contents.Contents_id DESC limit '+inf_a+','+5,
(err, rows, fields) => {
  res.send(rows);

  })

});





router.get('/test', function(req, res, next) {

connection.query(
  'Select  Contents.comment_count  from Contents INNER JOIN Comment ON Comment.Contents_id = Contents.Contents_id where Contents.Contents_id=1',
//'select count(Comment.Comment_id) from Comment' ,
(err, rows, fields) => {
  res.send(rows);

  })

});

module.exports = router;


