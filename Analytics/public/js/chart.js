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
	  type: 'pie',
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