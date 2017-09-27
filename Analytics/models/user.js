/*
	Mongoose의 Schema>>
	MongoDB에 저장되는 document의 Data구조(필드 타입에 관한 정보) JSON형태로 정의.
	= RDBMS의 Schema D/B를 구성하는 요소를 정의.
	레코드의 크키
	키의 정의
	레코드와 레코드의 관계
	검색 방법
*/

var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  ip : String,
  host : String,
  path : String,
  referrer : String,
  OS : String,
  date: String,
  time : String,
  lat : String,
  lon : String
});

//Create Model & Export : model() 메소드에 문자열 + schema를 전달하여 model생성.
//	문자열 : 해당 Collection의 단수적 표현을 나타냄 --> 실제 : Users로 자동변환되어 사용.
module.exports = mongoose.model('User', userSchema);