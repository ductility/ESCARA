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


//Delay 설정
function timeDelay(timeout) {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout);
	});
}

//파일읽기
var fs = require('fs');

fs.readFile('file1.gcode', 'utf8', function(err, data){
    if ( err ) throw err;
    var arr1 = data.toString().split("\n");
    app.get('/image/file1',function(req,res){
        setTimeout(function() {
            console.log("ok");
            //ArdoinoPort.write(arr1[i]+"\n");
          }, 1000);
        
        var count=0;
        var call_timer = function(idx) {
            
            if (idx < arr1.length) {
                console.log('call_timer', idx);

                setTimeout(() => {
                    call_timer(idx+1);
                }, 10);
            }
        };

        call_timer(0);
        
    })
});
fs.readFile('file2.gcode', 'utf8', function(err, data){
    if ( err ) throw err;
    var arr2 = data.toString().split("\n");
    app.get('/image/file2',function(req,res){
        for ( i in arr2 ){
            console.log(arr2[i]);
            ArdoinoPort.write(arr2[i]+"\n");
            timeDelay(10000);
        }        
    })
});
fs.readFile('file3.gcode', 'utf8', function(err, data){
    if ( err ) throw err;
    var arr3 = data.toString().split("\n");
    app.get('/image/file3',function(req,res){
        for ( i in arr3 ){
            console.log(arr3[i]);
            ArdoinoPort.write(arr3[i]+"\n");
            timeDelay(1000);
        }
    })
});
fs.readFile('file4.gcode', 'utf8', function(err, data){
    if ( err ) throw err;
    var arr4 = data.toString().split("\n");
    app.get('/image/file4',function(req,res){
        for ( i in arr4 ){
            console.log(arr4[i]);
            ArdoinoPort.write(arr4[i]+"\n");
            timeDelay(1000);
        }
    })
});