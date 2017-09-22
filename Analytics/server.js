/* 서버의 설정, 미들웨어 정의, 라우트 정의, 등 여러가지 설정 / 서버운영을 위한 각종 로직이 작성 */


//////////////////////////////////////////////////////////////////////////////////////////
// 1. 모든 dependency되는 모듈 선언부.
var express = require('express');			//MVC 패턴을 쉽게 구현해주는 express모듈
var path = require('path');					//경로 설정 시 유용하게 해주는 path모듈
var favicon = require('serve-favicon');
var logger = require('morgan');				//log를 보여주는 morgan모듈
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');	//POST방식에서 body를 사용할 수 있도록 해주는 body-parser모듈
var cors = require('cors'); 				//Cross - Domain 을 가능하도록 하는 모듈
const db = require('./models/db');			//<db> models 모듈을 사용.
var getdata = require('./routes/getData');	//<getData> routes 모듈을 사용.
var showdata = require('./routes/showData');

//////////////////////////////////////////////////////////////////////////////////////////
// 2. express 설정부
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//////////////////////////////////////////////////////////////////////////////////////////
// 3. 미들웨어 설정부

app.use(cors()); // Cross Domain
// app.use(logger('dev')); // Log 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //public폴더를 통해서 바로 접근.
app.use('/showdata', showdata); 						//DB로부터 DATA가져와서 가공 후에 보고서 보여주는 Route
app.use('/getdata', getdata);							//Browser에서 가져온 DATA를 DB에 넣어주는 Route

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

db(); //mongoDB Connect.

module.exports = app;
