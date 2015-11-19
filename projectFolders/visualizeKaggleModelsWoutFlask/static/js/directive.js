console.log('directive called');

app.directive('barChart', function($q) {
	return {
		scope: {'data': '='},
		restrict: 'E',
		link: function(scope, element) {
			console.log('++++++++++++++++++++')
			console.log(scope)
			console.log(scope["$id"])
			console.log(scope["data"])

			// once this loads, then call bar chart

			console.log('aaaaaaaaaaaaaaaaaa')
			console.log(scope.data) 
			
			// trying to call barChart before data is ready

			//var bar = new barChart(element, scope.data);
			/*
			setTimeout(function(){ 
				console.log('nowwwwwwwww call visual')
				var bar = new barChart(element, scope.data);
			}, 1000);
			*/
/*
			$q.when(scope.data).then(function(pone) {
				//scope.pone = pone;
				var bar = new barChart(element, scope.pone);
			})
*/
			 scope.$watch('data', function(newVal) {
	        	if(newVal) { 
	        		//console.log('data loaded')
	        		var bar = new barChart(element, scope.data);
	        	}
		    }, true);
		  	

		}
	}
});