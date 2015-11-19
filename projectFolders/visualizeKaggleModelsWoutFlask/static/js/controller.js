console.log('controller.js called');

app.controller('MainController', function($scope, ModelOutput) {
	// static data
	$scope.data = [
		{'whatup': 'alexa'}
	]

	// get the data out of the resource
	console.log('outside ModelOutput()')

	ModelOutput.query(function(data) {
		console.log('INSIDE ModelOutput()')
		console.log('*******************************')
		console.log(data)
		console.log('*******************************')
		$scope.shared = data;
	}, function(error) {
		console.log('ERROR: ')
		console.log(error)
	})


/*
$scope.shared = ModelOutput.query(function(data) {
		console.log('INSIDE ModelOutput()')
		console.log('*******************************')
		console.log(data)
		console.log('*******************************')
		return data;
	})
*/

	//$scope.shared = {data : emmaWatson}
	
	// for d3.js visual
	//$scope.shared = {data: [10, 20, 5, 40, 30]};
/*
	$scope.shared = {data:
		[{"show":"breakingBad","theme":"mostLoved","mentions":1031892,"sentiment":48,"passion":35,"correct": true},
		{"show":"breakingBad","theme":"mostAnticipated","mentions":339743,"sentiment":41,"passion":41,"correct": true},
		{"show":"breakingBad","theme":"mostWatched","mentions":1937758,"sentiment":53,"passion":42,"correct": true},
		{"show":"breakingBad","theme":"notAirtime","mentions":272087,"sentiment":49,"passion":41,"correct": true},
		{"show":"breakingBad","theme":"remaining","mentions":9578200,"sentiment":42,"passion":33,"correct": true},
		{"show":"theKilling","theme":"mostLoved","mentions":32801,"sentiment":75,"passion":82,"correct": true},
		{"show":"theKilling","theme":"mostAnticipated","mentions":7315,"sentiment":79,"passion":83,"correct": true},
		{"show":"theKilling","theme":"mostWatched","mentions":52113,"sentiment":72,"passion":89,"correct": true},
		{"show":"theKilling","theme":"notAirtime","mentions":5044,"sentiment":70,"passion":79,"correct": true},
		{"show":"theKilling","theme":"remaining","mentions":133713,"sentiment":72,"passion":81,"correct": true},
		{"show":"lowWinterSun","theme":"mostLoved","mentions":9150,"sentiment":39,"passion":31,"correct": true},
		{"show":"lowWinterSun","theme":"mostAnticipated","mentions":5209,"sentiment":31,"passion":25,"correct": true},
		{"show":"lowWinterSun","theme":"mostWatched","mentions":21565,"sentiment":44,"passion":31,"correct": true},
		{"show":"lowWinterSun","theme":"notAirtime","mentions":1612,"sentiment":48,"passion":26,"correct": true},
		{"show":"lowWinterSun","theme":"remaining","mentions":72326,"sentiment":31,"passion":28,"correct": true},
		{"show":"comedyBangBang","theme":"mostLoved","mentions":4336,"sentiment":76,"passion":91,"correct": true},
		{"show":"comedyBangBang","theme":"mostAnticipated","mentions":1061,"sentiment":69,"passion":85,"correct": true},
		{"show":"comedyBangBang","theme":"mostWatched","mentions":3730,"sentiment":67,"passion":86,"correct": true},
		{"show":"comedyBangBang","theme":"notAirtime","mentions":402,"sentiment":66,"passion":89,"correct": true},
		{"show":"comedyBangBang","theme":"remaining","mentions":34525,"sentiment":79,"passion":91,"correct": false},
		{"show":"walkingDead","theme":"mostLoved","mentions":625452,"sentiment":11,"passion":51,"correct": false},
		{"show":"walkingDead","theme":"mostAnticipated","mentions":444267,"sentiment":12,"passion":51,"correct": false},
		{"show":"walkingDead","theme":"mostWatched","mentions":1089329,"sentiment":8,"passion":55,"correct": false},
		{"show":"walkingDead","theme":"notAirtime","mentions":87073,"sentiment":19,"passion":51,"correct": false},
		{"show":"walkingDead","theme":"remaining","mentions":6557665,"sentiment":8,"passion":54,"correct": false}]
	}; 
	*/
})