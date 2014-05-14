var app = angular.module('myApp', []);

app.directive('donutChart', function() {
	return {
		scope: {'data': '=', 'onClick': '&'},
		restrict: 'E',
		link: function(scope, element) {
			var pie = new PieChart(element, scope.data);
			pie.onClick = function() {
				scope.$apply(function() {
					if(scope.onClick) scope.onClick();
				});
			}
			scope.$watchCollection('data', pie.updateData);
		}
	}
});

app.controller('MainController', function($scope) {
	//keep in mind controller knows nothing about donut charts
	$scope.shared = {data: [10, 20, 30, 40, 50, 60]};
	$scope.chartClicked = function() {
		_.each($scope.shared.data, function(d,index) {
			$scope.shared.data[index] = Math.floor(Math.random()*50)+1;
		});
	}
	$scope.addValue = function() {
		$scope.shared.data.push(Math.floor(Math.random()*30))+1;
	}
});