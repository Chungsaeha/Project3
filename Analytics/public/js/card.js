var showCard = function(Array, bestVal){
    //중복 제거.
	var arrUnique = Array.reduce(function(a,b){if(a.indexOf(b)<0){a.push(b);}return a;},[]);

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
		if(maxCount < count) { maxCount = count;  maxLabel = target; } //BEST choose
	}
	if(bestVal){
		var rate = Math.round((maxCount/totalcount)*100);
		bestVal.text(maxLabel+"("+ rate +"%)"); // BEST Choose
	}
}
