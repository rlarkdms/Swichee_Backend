var express = require('express'); 
var router = express.Router(); 
const mysql = require('mysql'); 
var AWS = require('aws-sdk');
var Jimp = require('jimp'); 
ffmpeg = require('ffmpeg');
AWS.config.region = 'us-east-1';
var ec2 = new AWS.EC2();
var s3 = new AWS.S3();


router.get('/ec2', function(req, res,next) {
  ec2.describeInstances({},function(err,data){
res.json(data);
});
});


var connection = 
mysql.createConnection({
  host : endpoint,
  user : user,
  password : 비번,
  database : 'swichee'
});
connection.connect()

 router.get('/api/likes', (req, res) => {
  connection.query(
  'Select  Contents.comment_count,Contents.Date,User.image,Contents.Likes,Contents.Contents_id,Contents.Views,Contents.type_id,Contents.Thumbnail,Contents.Category,Contents.Title,User.User_name,User.blue from User INNER JOIN Contents ON User.User_id=Contents.User_id INNER JOIN Comment ON Contents.Contents_id=Comment.Contents_id group by Contents.Contents_id ORDER BY Contents.Likes DESC limit 12',
  (err, rows, fields) => {
  res.send(rows);
  })
});

router.get('/api/blur', function(req, res,next) {

var C_id =req.param('id');
var t_id=req.param('type_id');
  if(t_id==1){
 connection.query(
 'select Contents.Contents_id, Image.Image, Image.Image_blur from Contents INNER JOIN Image ON Image.Contents_id = Contents.Contents_id where Contents.Contents_id= '+C_id+' and Contents.type_id = ' +t_id,

  (err, rows, fields) => {
console.log(rows);
  for (var i in rows){
  var path = rows[i].Image.substring(0,33);
console.log(path);

    if(rows[i].Image_blur==1){
     rows[i].Image = path + rows[i].Contents_id + "_blur.jpg"; 
}
}
  res.send(rows);
  })

}/* else if(t_id==2){  // 오디오
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
*/
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
  var c_id =req.param('id'); 
  connection.query(
    'Select Contents.Contents_id, Contents.Contents,Contents.Price,Contents.Category,Contents.Date,Contents.Views,Contents.type_id,Contents.Thumbnail,Contents.Likes,Contents.Category,Contents.Title,User.image,User.User_name,User.Blue from Contents  INNER JOIN User ON User.User_id=Contents.User_id where not Contents.Contents_id ='+c_id+' and Category like "%'+ca+'%"ORDER BY Contents.Contents_id DESC limit 10' ,
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
 
 inf_a = 0;
  connection.query(
'Select Contents.comment_count,Contents.Date,User.image,Contents.Likes,Contents.Contents_id,Contents.Views,Contents.type_id,Contents.Thumbnail,Contents.Category,Contents.Title,User.User_name,User.Nickname,User.blue from User INNER JOIN Contents ON User.User_id=Contents.User_id ORDER BY Contents.Contents_id DESC limit 0,5',
  (err, rows, fields) => {
  res.send(rows);
  })
});

router.get('/api/inf', function(req, res, next) {
 inf_a+=5;
connection.query(
  'Select Contents.comment_count,Contents.Date,User.image,Contents.Likes,Contents.Contents_id,Contents.Views,Contents.type_id,Contents.Thumbnail,Contents.Category,Contents.Title,User.User_name,User.Nickname,User.blue from User INNER JOIN Contents ON User.User_id=Contents.User_id ORDER BY Contents.Contents_id DESC limit '+inf_a+','+5,
  (err, rows, fields) => {
  res.send(rows);
  })
});


router.get('/api/sidebar', function(req, res, next) {
 inf_a = 0;
var ca = req.param('category');

connection.query(
'Select Contents.comment_count,Contents.Date,User.image,User.Nickname,Contents.Likes,Contents.Contents_id,Contents.Views,Contents.type_id,Contents.Thumbnail,Contents.Category,Contents.Title,User.User_name,User.blue from User INNER JOIN Contents ON User.User_id=Contents.User_id where Contents.Category like "%'+ca+'%" group by Contents.Contents_id ORDER BY Contents.Contents_id DESC limit '+inf_a+','+5,
(err, rows, fields) => {
  res.send(rows);
  })
});

//people 검색
router.get('/api/search_people', function(req, res, next) {
 var search = req.param('search');

connection.query(
'select User.image,User.User_name, User.Blue,User.Nickname from User INNER JOIN Contents on User.User_id = Contents.Contents_id where User.User_name like "%'+search+'%" or User.Nickname like "%'+search+'%"',
(err, rows, fields) => {
  res.send(rows);

  })

});
//people외 
router.get('/api/search', function(req,res,next){
var search = req.param('search');
var t_id = req.param('type_id');
connection.query(
'select Contents.Thumbnail,Contents.Category,Contents.type_id,Contents.Title,Contents.Views,Contents.Contents_id,Contents.Likes,User.Blue,Contents.Date,User.image,User.User_name from Contents INNER JOIN User on Contents.User_id = User.User_id where Contents.Contents like "%'+search+'%" or Contents.Title like "%'+search+'%" and Contents.type_id = '+t_id+' order by Contents.date desc', 
(err, rows, fields) => {
  res.send(rows);
  })
});


router.get('/api/search_all', function(req,res,next){
var search = req.param('search');

connection.query(
'select Contents.Thumbnail,Contents.Category,Contents.type_id,Contents.Title,Contents.Views,Contents.Contents_id,Contents.Likes,User.Blue,Contents.Date,User.image,User.User_name from Contents INNER JOIN User on Contents.User_id = User.User_id where Contents.Contents like "%'+search+'%" or Contents.Title like "%'+search+'%" order by Contents.date desc',
(err, rows, fields) => {
res.send(rows);
  })
});


router.get('/test_blur', function(req, res, next) { //url 변경하기 /api/blur
blur_list=[];

var c_id=req.param('id');
var t_id=req.param('type_id');

if(t_id = 1){  // image
  connection.query(
 'select Image.* from Image INNER JOIN Contents ON Image.Contents_id = Contents.Contents_id where Image.Image_blur = 1 and Contents.type_id = ' +t_id +' and Contents.Contents_id = '+c_id,
  (err, rows, fields) => {
if (err){
console.log(err);
}
 console.log(rows.length);
for (var i=0; i<rows.length; i++){

async function main() { // 이미지 링크로 다운 후 블러처리 
 var image = await Jimp.read(rows[i].Image); 
  image.blur(25)
  .write(rows[i-1].Contents_id+'_blur.jpg'); 
} 
main(); 

  console.log('Image Processing Completed'); 

var fs = require('fs');    
var param = {
    'Bucket':'swichee',
    'Key':rows[i].Contents_id+'_blur.jpg', // s3에 생성할 파일 이름
    'ACL':'public-read',
    'Body':fs.createReadStream(rows[i].Contents_id+'.jpg'), //읽을  파일 이름
    'ContentType':'image/png'
}
s3.upload(param, function(err, data){ //s3에 이미지 업로드
    
})


blur_list[i] = 'https://swichee.s3.amazonaws.com/'+rows[i].Contents_id+'_blur.jpg';
} //for
res.send(blur_list);
  }) // connection
} // if image

else if(t_id=2){
res.send(c_id+t_id);
}

else if(t_id = 3){ //동영상 길이 자르기 - 미구현 상태
connection.query(
'select Video.* from Video INNER JOIN Contents ON Video.Contents_id = Contents.Contents_id where Video.Listening_time > 0 and Contents.Contents_id = '+c_id,
(err,rows,fields)=>{
res.send(rows);
console.log(rows[0].Video.substring(33,rows[0].Video.length));

var file = require('fs').createWriteStream('1.mp4');
var params = {Bucket: 'swichee', Key:rows[0].Video.substring(33,rows[0].Video.length)};
s3.getObject(params).createReadStream().pipe(file);

var ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
var ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath('/bin/ffmpeq/ffmpeq-4.3.1-amd64-static/ffmpeg')

ffmpeg('1.mp4')
  .setStartTime('00:00:00')
  .setEndTime('00:00:05')
  .setDuration('10')
  .output('1_slice.mp4')
  .on('end', function(err) {
    if(!err) { console.log('conversion Done') }
  })
  .on('error', function(err){
    console.log('error: ', err)
  }).run()
}) //connection
} // if video
}); // router


router.get('/s3_delete',function(req,res,next){
var params = {
Bucket: "swichee",
Key : "18_blur.jpg"  // s3에 있는 삭제할 파일명
};
s3.deleteObject(params,function(err,data){
if (err) console.log(err, err.stack);
else console.log(data);
})
});


router.get('/s3_put', function(req,res,next){  // s3에 업로드
var fs = require('fs');
var param = {
    'Bucket':'swichee',
    'Key':'18_blur.jpg',
    'ACL':'public-read',
    'Body':fs.createReadStream('18_blur.jpg'),
    'ContentType':'image/jpg'
}
s3.upload(param, function(err, data){
    console.log(err);
    console.log(data);
})
});

router.get('/test_list', function(req, res, next) {   //s3에 있는파일 리스트 출력
s3.listObjects({Bucket: 'swichee'}).on('success', function handlePage(response) {
    for(var name in response.data.Contents){
        console.log(response.data.Contents[name].Key);
    }
    if (response.hasNextPage()) {
        response.nextPage().on('success', handlePage).send();
    }
}).send();
});

module.exports = router;


