function absparkline() {
var graph = d3.select("#sparklineAB").append("svg")
	.attr({
		width: 120,
		height: 20
		});

//var data = [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9]
var ABdata = [409243,1155348,1600457,1148951,1011448,833911,1198422,1130326,1980643,1689172,2088779,2267548,1389997,1385035,1030220,1026686,1099470,998628,1160731,1010816,1098645,1125599,975255,1027727,1031714,1124763,1160747,1245460,387999,488422,395910,281007,311762]
//console.log(data)

var x = d3.scale.linear().domain([0, ABdata.length]).range([0, 120])
var y = d3.scale.linear().domain([0, d3.max(ABdata)]).range([20, 0])

var line = d3.svg.line()
	.x(function(d,i) {
		//console.log('plotting x value for data pt: ' + d + ' using index: ' + i + ' at ' + x(i) + ' using xscale');
		return x(i);
	})
	.y(function(d) {
      //console.log('plotting y value for data pt: ' + d + ' to be at: ' + y(d) + ' using yscale ');
      return y(d);
	});

graph.append("path").attr("d", line(ABdata));
}

absparkline()