var margin = {top:30, right:20, bottom:20, left:70},
	width = 700 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
	.range([0, width]);

var y = d3.scale.linear()
	//.range([height - 60, 0]);
	.range([0, height - 80]);

var x2 = d3.scale.linear()
	.range([0, width]);



var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");

var svg = d3.select("#visual").append("svg")
	.attr({
		height: height + margin.top + margin.bottom,
		width: width + margin.left + margin.right
	});

var groups = svg.append("g")
	.attr("transform", "translate(" + margin.left + ',' + margin.top + ")");

d3.json("data.json", function(data) {
	console.log(data)
	var x0 = Math.max(-d3.min(data, function(d) {return d.SearchIndex}), d3.max(data, function(d) {return d.SearchIndex; }));
	x.domain([0, d3.max(data, function(d) {return d.SearchIndex})])
	y.domain([d3.max(data, function(d) {return d.Sales}), 0])

	var circles = groups.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr('class', 'circles')
		.attr({
			cx: function(d) {return x(+d.SearchIndex); },
			cy: function(d) {return y(+d.Sales); },
			r: 10
		})
		.style('fill', '#767676');

	groups.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (height - margin.top - margin.bottom) + ")")
		.call(xAxis);

	groups.append("g")
		.attr("class", "y axis")
		.call(yAxis);
});

var m = 314.21;
var b = 27134.8;
//var x = changes, set it
var Y = m * x + b;

var lineData = [
 	//{"x": 100, "y": 30000}, {"x": 385, "y": 58000}
 	//{"x_value": 100, "y_value": 50}, {"x_value": 385, "y_value": 100}
 	//{"x_value": 0, "y_value": 27135}, 
 	{"x_value": 0, "y_value": 27135}, 
 	{"x_value": 90, "y_value": 55100}
];

x2.domain([0, d3.max(lineData, function(d) {return d.x_value})])
//y2.domain([d3.max(lineData, function(d) {return d.y_value}), 0])

var y2 = d3.scale.linear()
	//.range([height - 60, 0]);
	//.domain([0, d3.max(lineData, function(d) {return d.y_value}) ])
	.domain([0, 161672 ])
	.range([height, 0]);

var lineFunction = d3.svg.line()
	.x(function(d) {return x2(d.x_value); })
	//.y(function(d) {return 500 - y2(d.y_value); })
	.y(function(d) {return y2(d.y_value) - 70; })
	.interpolate("linear");

var lineGraph = groups.append("path")
	.datum(lineData)
	//.attr("d", lineFunction(lineData))
	.attr("d", lineFunction)
	.attr("stroke", "#cfcfcf")
	.attr("stroke-width", 12)
/*
var myLine = groups.append("line")
    .attr("x1", 40)
    .attr("y1", 50)
    .attr("x2", 450)
    .attr("y2", 150)
    .attr("stroke-width", 12)
    .style("stroke", "#cfcfcf");
*/
