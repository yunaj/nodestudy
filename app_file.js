var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');

var app = express();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({storage:storage});
app.listen(3000, function(){
  console.log('3000포트에 연결됐습니다~');
});

app.set('views', './views_file');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('static_file'));
app.use('/user', express.static('uploads')); // url에 /user/filename을 입력 시 uploads폴더의 파일을 띄움
app.locals.pretty = true;

app.get('/topic/new', function(req, res){
  res.render('new');
});
app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/' + title, description, function(err){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.redirect('/topic/' + title);
  });
});

// app.get('/topic', function(req, res){
//   fs.readdir('data', function(err, files){
//     if(err){
//       console.log(err);
//       res.status(500).send('Internal Server Error');
//     }
//     res.render('view', {topics: files});
//   });
// });
// app.get('/topic/:id', function(req, res){
//   var id = req.params.id;
//   fs.readdir('data', function(err, files){
//     if(err){
//       console.log(err);
//       res.status(500).send('Internal Server Error');
//     }
//     fs.readFile('data/'+id, 'utf8', function(err, data){
//       if(err){
//         console.log(err);
//         res.status(500).send('Internal Server Error');
//       }
//       res.render('view', {topics:files, title:id, description:data});
//     });
//   });
// });

//위 주석처리한 코드의 중복을 제거
app.get(['/topic', '/topic/:id'], function(req, res){
  var id = req.params.id;
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    if(id){
      fs.readFile('data/'+id, 'utf8', function(err, data){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics:files, title:id, description:data});
      });
    }else{
      res.render('view', {topics: files});
    }
  });
});
app.get('/upload', function(req, res){
  res.render('upload');
});
app.post('/upload', upload.single('userfile'), function(req, res){
  res.send('Uploaded: ' + req.file.filename);
});
