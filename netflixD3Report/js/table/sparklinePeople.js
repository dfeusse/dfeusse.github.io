function peoplesparkline() {
var graph = d3.select("#sparklinePeople").append("svg")
	.attr({
		width: 120,
		height: 20
		});

//var data = [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9]
var data = [1856910,1229061,1407620,863633,1190686,1095949,1085489,1142500,1391338,1475124,1105809,1528032,961936,1287304,1512412,1311492,1275874,871195,1232117,998478,1293511]

var x = d3.scale.linear().domain([0, data.length]).range([0, 120])
var y = d3.scale.linear().domain([0, d3.max(data)]).range([20, 0])

var line = d3.svg.line()
	.x(function(d,i) {
		//console.log('plotting x value for data pt: ' + d + ' using index: ' + i + ' at ' + x(i) + ' using xscale');
		return x(i);
	})
	.y(function(d) {
      //console.log('plotting y value for data pt: ' + d + ' to be at: ' + y(d) + ' using yscale ');
      return y(d);
	});

graph.append("path").attr("d", line(data));
}

peoplesparkline()