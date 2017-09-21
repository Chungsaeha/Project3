/*
	3. 보고 Controller
*/
var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req,res,next){
	// D/B에 쌓인 data모두 가져옴.
	User.find({ }, function(err,users){
		if(err){
    		console.log("Error");
			return res.status(500).send(err);
		}
		if(!users.length){
			console.log("User not found");
			return res.status(404).send({err:"User not found"});
		}
		res.render('showData', {users:JSON.stringify(users)});
	});
});

//날짜 범위내에 있는 users검색
router.post('/', function(req,res,next){
	var start = req.body.start;
	var end = req.body.end;
	//mongoose :  $gte(이상) $lte(이하)
	User.find( {"date": {"$gte":start, "$lte":end} } , function(err,users){
		if(err){
			console.log("Error");
			return res.status(500).send(err); //Error
		}
		if(!users.length){
			console.log("User not found");
		}
1		res.send(users);
	});
})

module.exports = router;
