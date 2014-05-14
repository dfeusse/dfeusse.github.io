var graph = d3.select("#sparklineTwo").append("svg")
	.attr({
		width: 120,
		height: 40
		});

var data = [6, 3, 8, 9, 4, 8, 3, 3, 7, 5, 4, 6, 7, 6, 7, 5, 4, 8, 6, 5, 4, 1, 9, 4, 7, 2, 5, 2]
console.log(data)

var x = d3.scale.linear()
	.domain([0,10])
	.range([0,50]);

var y = d3.scale.linear()
	.domain([0,10])
	.range([0,30]);

var line = d3.svg.line()
	.x(function(d,i) {
		console.log('plotting x value for data pt: ' + d + ' using index: ' + i + ' at ' + x(i) + ' using xscale');
		return x(i);
	})
	.y(function(d) {
      console.log('plotting y value for data pt: ' + d + ' to be at: ' + y(d) + ' using yscale ');
      return y(d);
	});

graph.append("path").attr("d", line(data));