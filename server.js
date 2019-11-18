var express = require('express');
var http = require('http');

var app = express();
var path = require('path');

var server = http.createServer(app);

var port = 3000;
app.listen(port, function(){
	console.log("Express server has started on port",port);
});


// 시리얼 포트 설정

// COM6 : 아두이노가 연결된 포트

var serialPort  = require('serialport');

//시리얼포트 연결되어있는지 확인하고 자동으로 설정해주는 예제,,, 잘안되는듯
// serialPort.list(function(err, ports) {
// 	ports.forEach(function(port) {
// 		console.log("comName : ", port.comName);
//     });
//     err.message("Port not found");
// });

var ArdoinoPort = new serialPort('/dev/ttyS4',{
    baudRate : 115200,
    // defaults for Arduino serial communication
    dataBits : 8,
    parity : 'none',
    stopBits: 1,
    flowControl: false,
})

ArdoinoPort.on('open', function () {
    console.log('open serial communication');
})



// view디렉터리 설정, ejs엔진사용설정.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// public디렉터리 설정
app.use(express.static(path.join(__dirname, 'public')));


//랜더링
app.get('/index',function(req,res) {
    res.status(200).render('index.ejs');
})
app.get('/',function(req,res) {
    res.status(200).render('joystick.ejs');
})
app.get('/joystick',function(req,res) {
    res.status(200).render('joystick.ejs');
})
app.get('/image',function(req,res) {
    res.status(200).render('image.ejs');
})


//시리얼 송신
app.get('/index/:id',function(req,res){
    console.log(req.params.id);
    ArdoinoPort.write(req.params.id+'\n') ;
    res.status(200).send('Controlled, OK!!');
})
app.get('/joystick/:id',function(req,res){
    console.log(req.params.id);
    ArdoinoPort.write(req.params.id+'\n') ;
    res.status(200).send('Controlled, OK!!');
})


//파일읽기
var fs = require('fs');
fs.readFile('file1.gcode', 'utf8', function(err, data){
    app.get('/image/file1',function(req,res){
        console.log(data);
        ArdoinoPort.write(data) ;
        res.status(200).send('Controlled, OK!!');
    })
});
fs.readFile('file2.gcode', 'utf8', function(err, data){
    app.get('/image/file2',function(req,res){
        console.log(data);
        ArdoinoPort.write(data) ;
        res.status(200).send('Controlled, OK!!');
    })
});
fs.readFile('file3.gcode', 'utf8', function(err, data){
    app.get('/image/file3',function(req,res){
        console.log(data);
        ArdoinoPort.write(data) ;
        res.status(200).send('Controlled, OK!!');
    })
});
fs.readFile('file4.gcode', 'utf8', function(err, data){
    app.get('/image/file4',function(req,res){
        console.log(data);
        ArdoinoPort.write(data) ;
        res.status(200).send('Controlled, OK!!');
    })
});