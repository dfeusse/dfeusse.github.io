function sparkartist() {
var graph = d3.select("#sparklineArtist").append("svg")
	.attr({
		width: 120,
		height: 20
		});

//var data = [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9]
var data = [405123,1119860,1580308,1146884,1009885,831869,1197313,1128512,2033522,1687455,2084829,2266055,1388093,1383359,1025174,1023213,1095106,998824,1161752,1008705,1094710,1124899,970551,1019222,1019477,1117173,1159966,1247151,400291,498748,403123,286783,305989]
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

sparkartist()