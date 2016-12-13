var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.listen(3000, function(){
  console.log('Connected 3000 port~!!');
});


//정적파일 제공 메소드
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'jade');
app.set('views', './views');
app.locals.pretty = true;

app.get('/', function(req, res){
  res.send('Hello Express~!!');
});
app.get('/route', function(req, res){
  res.send('Router, <img src="/image.jpg">');
});
app.get('/dynamic', function(req, res){
  var lis = '';
  for(var i=0; i<5; i++){
    lis = lis +  '<li>coding</li>';
  }
  var time = new Date(); //새로고침하면 시간이 바뀌는데, 다른 변수들을 변경했을 경우(텍스트변경 등)에는 새로고침시 변경내용이 반영되지 않는 이유???????
  var output = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      hello~  static~~!!
      <ul>
        ${lis}
      </ul>
      ${time}
      whaaaaaaaaaaaaat?!!!!
    </body>
  </html>`;
  res.send(output);
});
app.get('/templete', function(req, res){
  res.render('temp', {time:Date(), tt:'Jade'});
});
app.get('/topic', function(req, res){
  var topics = [
    'javascript is ...',
    'NodeJS is ...',
    'Express is ...'
  ];
  var op = `
    <a href="topic?id=0">javascript</a><br>
    <a href="topic?id=1">NodeJS</a><br>
    <a href="topic?id=2">Express</a><br>
    ${topics[req.query.id]}
  `;
  res.send(op);
});
//쿼리스트링 대신 시멘틱url을 이용하는 방법
app.get('/topic/:id', function(req, res){
  var topics = [
    'javascript is ...',
    'NodeJS is ...',
    'Express is ...'
  ];
  var op = `
    <a href="topic/0">javascript</a><br>
    <a href="topic/1">NodeJS</a><br>
    <a href="topic/2">Express</a><br>
    ${topics[req.params.id]}
  `;
  res.send(op);
});
app.get('/topic/:id/:mode', function(req, res){
  res.send(req.params.id + ', ' + req.params.mode);
});
app.get('/form', function(req, res){
  res.render('form');
});
app.post('/form_receiver', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  res.send(title + ', ' + description);
});
