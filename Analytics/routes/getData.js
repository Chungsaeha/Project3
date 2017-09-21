/*
	1. 수집 Controller
*/

//routes 폴더에 있는 파일 : URL을 받았을 때 --> 그에 맞는 로직을 수행 / 설정해 놓은 화면을 보여주는 역할.
var express = require('express');
var router = express.Router();
var User = require('../models/user');

//browser data --> D/B
router.post('/', function(req, res, next) {
	//server에서 JSON Parsing하는 것. ---> DB에 넣는것까지 
	var jsonData = JSON.parse(req.body.jsonData);
	console.log(jsonData);

	// DB 삽입
	User.create(jsonData, function(err, users){
		if(err){
			console.error(err.message);
			return res.status(500).send(err);
		}
		res.send("User Create successfully:\n" + users);
	});



	// User.find({ }, function(err, users){
	// 	if(err){
	// 		console.log("Error");
	// 		return res.status(500).send(err);
	// 	}
	// 	if(!users.length){
	// 		console.log("User not found");
	// 		return res.status(404).send({err:"User not found"});
	// 	}
	// 	console.log(users);
	// 	res.end();
	// });
	// //DB 전체 삭제
	// User.remove({ }, function(err,users){
	// 	console.log(users);
	// })
});

module.exports = router;
