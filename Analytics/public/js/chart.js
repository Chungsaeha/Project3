//Time을 업데이트 해주는 함수
var updateClock = function() {
    var now = new Date(), // current date
        months = ['January', 'February', 'March' , 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Desember']; // you get the idea
        time = now.getHours() + ':' + now.getMinutes(), // again, you get the idea

        // a cleaner way than string concatenation
        date = [now.getDate(), 
                months[now.getMonth()],
                now.getFullYear()].join(' ');

    // set the content of the element with the ID time to the formatted string
    $('#time_change, #time_location').html("Updated yesterday at "+ [date, time].join(' / '));

    // call this function again in 1000ms
    setTimeout(updateClock, 1000);
}

//Chart를 그려주는 함수
var updateChart = function(Array, myLineChart, best) {
    //중복 제거.
	var arrUnique = Array.reduce(function(a,b){if(a.indexOf(b)<0){a.push(b);}return a;},[]);

	// 시간순으로 배치.
	if(myLineChart.canvas.id ==="myAreaChart_time"){
		arrUnique = arrUnique.sort(function(a,b){
			a = parseInt(a.substr(0,2))*60 + parseInt(a.substr(3,2))
			b = parseInt(b.substr(0,2))*60 + parseInt(b.substr(3,2))
			return a-b;
		})
	}
	// labels , data 값 삽입. 
	var maxCount = 0;
	var maxLabel = "";
	var totalcount = Array.length;
	for(var i=0, max=arrUnique.length; i<max; i+=1)
	{
		target = arrUnique[i];
		count = 0;
		for(var j=0; j<totalcount; j+=1)
		{
			if(target == Array[j]){
				count++;
			}
		}
		myLineChart.data.labels.push(target); //labels에 값 넣기 
		myLineChart.data.datasets.forEach((dataset) => {
			dataset.data.push(count);
		});
		if(maxCount < count) { maxCount = count;  maxLabel = target; } //BEST choose
	}
	myLineChart.update();
	if(best){
		var rate = Math.round((maxCount/totalcount)*100);
		best.text(maxLabel+"("+ rate +"%)"); // BEST Choose
	}
}

//Chart를 삭제해주는 함수
var deleteChart = function(myLineChart){
	for(var i=0; i < myLineChart.data.labels.length;){
		myLineChart.data.labels.pop();
	}
	for(var i=0; i < myLineChart.data.datasets[0].data.length;){
		myLineChart.data.datasets.forEach((dataset) => {
			dataset.data.pop();
		})
	}
	myLineChart.update();
}

//Line Chart를 초기화해주는 함수
var initChart_Line = function(ctx){
	var myLineChart = new Chart(ctx, {
	  type: 'line',
	  data: {
	  		labels:"",
	    datasets: [{
	      label: "count",
	      lineTension: 0.3,
	      backgroundColor: "rgba(2,117,216,0.2)",
	      borderColor: "rgba(2,117,216,1)",
	      pointRadius: 5,
	      pointBackgroundColor: "rgba(2,117,216,1)",
	      pointBorderColor: "rgba(255,255,255,0.8)",
	      pointHoverRadius: 5,
	      pointHoverBackgroundColor: "rgba(2,117,216,1)",
	      pointHitRadius: 20,
	      pointBorderWidth: 2,
	      data: "",
	    }],
	  },
	  options: {
	    scales: {
	      xAxes: [{
	        scaleLabel:{
	        	display:true,
	        	labelString : "",
	        }
	      }],
	      yAxes: [{
	        ticks: {
	          min: 0,
	          maxTicksLimit: 5,
	        },
	        scaleLabel:{
	        	display:true,
	        	labelString : "User count"
	        },
	        gridLines: {
	          color: "rgba(0, 0, 0, .125)",
	        }
	      }],
	    },
	    legend: {
	      display: false
	    }
	  }
	});
	return myLineChart;
}

//pie Chart를 초기화해주는 함수
var initChart_Pie = function(ctx){
	var myPieChart = new Chart(ctx, {
	  type: 'doughnut',
	  data: {
	    labels: "",
	    datasets: [{
	      data: "",
	      backgroundColor: ['#53C14B', '#FAED7D', '#FF6C6C', '#489CFF', '#FFA648'],
	    }],
	    legend: {
	    	display:true,
	    	position:'bottom',
	    }
	  },
	});
	return myPieChart;
}

//radar Chart를 초기화해주는 함수
var initChart_Radar = function(ctx){
	var myRadarChart = new Chart(ctx,{
		type:"radar",
		data:{
			//Page 개수에 따라서 하드코딩 해주는게 최선인가?
			labels:"",
			datasets:[{
				label:"",
				data:"",
				backgroundColor:'rgba(183, 240, 177, 0.2)',
				borderColor:'#04B431',
				pointBackgroundColor:'#04B431',
				pointBorderColor:"#fff",
				pointHoverBackgroundColor:"#04B431",
				pointHoverBorderColor:'#fff'
			},
			{
				label:"",
				data:"",
				backgroundColor:'rgba(255, 167, 167, 0.2)',
				borderColor:'#FF0000',
				pointBackgroundColor:'#FF0000',
				pointBorderColor:"#fff",
				pointHoverBackgroundColor:"#FF0000",
				pointHoverBorderColor:'#fff'
			},
			{
				label:"",
				data:"",
				backgroundColor:'rgba(250, 237, 125, 0.2)',
				borderColor:'#FFFF00',
				pointBackgroundColor:'#FFFF00',
				pointBorderColor:"#fff",
				pointHoverBackgroundColor:"#FFFF00",
				pointHoverBorderColor:'#fff'
			},
			{
				label:"",
				data:"",
				backgroundColor:'rgba(178, 204, 255, 0.2)',
				borderColor:'#0040FF',
				pointBackgroundColor:'#0040FF',
				pointBorderColor:"#fff",
				pointHoverBackgroundColor:"#0040FF",
				pointHoverBorderColor:'#fff'	
			}]
		}
	});	
	return myRadarChart;
}

var updateChart_Radar = function(Array1, Array2, myRadarChart){
    //pathArr / referrerArr(중복제거)  ||  Array1 / Array2 (전체개수) 
    var pathArr = Array1.reduce(function(a,b){if(a.indexOf(b)<0){a.push(b);}return a;},[]);
    var referrerArr = Array2.reduce(function(a,b){if(a.indexOf(b)<0){a.push(b);}return a;},[]);
    var indexArr = new Array();		//path와 비교해서 동일한 data의 index를 담는 배열.
	var length = pathArr.length;	//path 중복을 제거한 배열의 길이
	var totalLength = Array1.length;//path 전체 배열의 길이

	for(var i=0; i<length; i+=1)
	{
		var path = pathArr[i]; // 1 page / 2 page / 3 page / 4 page
		indexArr = [];
		Array1.forEach(function(v,i){
			if(path === v){
				indexArr.push(i); // Ex> /main인 path의 index값을 배열에 넣음.
			}
		});
		var dataset = myRadarChart.data.datasets[i];
		dataset.label = path; //labels에 값 넣기 
		referrerArr.forEach(function(v,i){
			var referrer = v;
			var count = 0;
			indexArr.forEach(function(v,i){
				if(referrer === Array2[v]){
					count++;
				}
			});
			console.log(count);
			myRadarChart.data.labels[i] = referrer;
			dataset.data[i] = count;
		})
	}
	myRadarChart.update();
}

