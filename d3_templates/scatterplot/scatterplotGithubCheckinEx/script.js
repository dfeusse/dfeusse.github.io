var w = 940,
	h = 300,
	pad = 20,
	left_pad = 100,
	Data_url = '/data.json';

var svg = d3.select("#punchcard")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

var data = ['Saturday', 22, 5];

var x = d3.scale.linear()
	.domain([0, 23])
	.range([left_pad, w - pad]);

var y = d3.scale.linear()
	.domain([0, 6])
	//range([pad, h - pad*2]);
	.range([h - pad*2, pad]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.ticks(7)
	.tickFormat(function(d,i) {
		return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d];
	});

svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(0, " + (h - pad) + ")")
	.call(xAxis);

svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(" + (left_pad - pad) + ", 0)")
	.call(yAxis);

d3.json("data2.json", function(data) {
	console.log(data)
	var x0 = Math.max(-d3.min(data, function(d) { return d.hour; }), d3.max(data, function(d) { return d.hour; }));

	
	svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("class", "circle")
		.attr("cx", function(d) { return x(d.hour); })
		.attr("cy", function(d) { return y(d.day); })
		.attr("r", function(d) { return d.commits });
});