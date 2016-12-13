var func = function(callback){
  callback('aaa');
};

func(function(arg){
  console.log(arg);
});


////////////////////////////////////////////////////////////////////////////

var app = {
  req : 'req',
  res : {send : function(str){console.log(str);}},
  get : function(url, callback){
    console.log(url + ' mapping...');
    callback(this.req, this.res);
  }
  };

app.get('/', function(req, res){
    res.send('res.send...');
  });
