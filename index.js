var app=require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);

var winston =require('winston');

  var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'somefile.log' })
    ]
  });

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html')
});

io.on('connection',function(socket){
	console.log("a user connected");
	
	
	socket.on('disconnect',function(){
		console.log("user disconnected");
		//winston.log('info','user disconnected');
		//winston.info('user disconnected');
		//winston.log('error','user disconnected');
		logger.log('info', 'Hello distributed log files!');
		logger.info('Hello again distributed logs');

	});	
	
	socket.on('chat message',function(msg){
		console.log('message : '+msg );
		io.emit('chat message', msg);
	});
});

http.listen(3000,function(){
	console.log("Listing on port 3000" )
});