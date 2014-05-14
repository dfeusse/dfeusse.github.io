var app = angular.module('myApp', ['ngRoute']);

// this should be in a factory and global, but oh well
// do it this way for simplicitys sake
var data = [
	{ label: 'Sarah', value: 10 },
	{ label: 'Victor', value: 20 }
];

app.controller('MainCtrl', function($scope, $location) {
	$scope.data = data;
	//so our controller knows how to access values from data
	$scope.accessor = function(d) { return d.value };
	$scope.done = function() { $location.path('/'); };
	$scope.add = function() {
		$scope.data.push({ label: 'Victor', value: 100 })
	};
	$scope.remove = function(datum) {
		$scope.data.splice(this.$index, 1);
	};
	$scope.edit = function() { $location.path('/edit'); };
	$scope.live = function() { $location.path('/live'); };
});

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'MainCtrl',
			templateUrl: 'graph.html'
		})
		.when('/edit', {
			controller: 'MainCtrl',
			templateUrl: 'edit.html'
		})
		.when('/live', {
			controller: 'MainCtrl',
			templateUrl: 'live.html'
		})
		.otherwise({ redirectTo: '/' })
});