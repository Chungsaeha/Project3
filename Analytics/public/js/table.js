var createTable = function(object){
	$('.pager').remove();
	for(var i=0; i < $('#dataTable > tbody > tr').length; ){
    	$('#dataTable > tbody:last > tr:last').remove();
    }

    for(var i in object){
      var referrer = object[i].referrer;
      if(referrer === "") {referrer = "Direct"}
      $('#dataTable > tbody:last').append(  '<tr><td>'+object[i].date+'</td>'
		                                       +'<td>'+object[i].time+'</td>'
		                                       +'<td>'+object[i]._id +'</td>'
		                                       +'<td>'+object[i].ip  +'</td>'
		                                       +'<td>'+object[i].path+'</td>'
		                                       +'<td>'+referrer    	 +'</td></tr>')
    }

	$('#dataTable').each(function() {
		var currentPage = 0;
		var numPerPage = 10;
		var $table = $(this);
		$table.bind('repaginate', function() {
			$table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
		});
		$table.trigger('repaginate');
		var numRows = $table.find('tbody tr').length;
		var numPages = Math.ceil(numRows / numPerPage);
		var $pager = $('<div class="pager"></div>');
		for (var page = 0; page < numPages; page+=1) {
			// 해당 태그를 동적으로 만들고 동적(bind)으로 click event부여.
			$('<span class="page-number"></span>').text(page + 1).bind('click', {
		    	newPage: page
		  }, 
		  function(event) {
		        currentPage = event.data['newPage'];
		        $table.trigger('repaginate');
		        $(this).addClass('active').siblings().removeClass('active');
		  }).appendTo($pager).addClass('clickable');
		}
		$pager.insertBefore($table).find('span.page-number:first').addClass('active');
	});
}