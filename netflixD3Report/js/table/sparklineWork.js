function sparkWork() {
var graph = d3.select("#sparklineWork").append("svg")
	.attr({
		width: 120,
		height: 20
		});

//var data = [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9]
var data = [1777689,1228768,1402715,864172,1187381,1092548,1078493,1141325,1390952,1470932,1102911,1526105,960569,1282829,1518197,1311425,1274137,870105,1227859,998511,1295050]
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

sparkWork()