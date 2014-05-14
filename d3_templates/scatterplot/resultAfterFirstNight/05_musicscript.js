var w = 940,
	h = 350,
	pad = 40,
	left_pad = 100;

var svg = d3.select("#punchcard")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

//var data = ['Saturday', 22, 5];

var x = d3.scale.linear()
	.domain([2007, 2013])
	.range([left_pad, w - pad]);

var y = d3.scale.linear()
	.domain([2, 11])
	//range([pad, h - pad*2]);
	.range([h - pad*2, pad]);

var node_fill = d3.scale.linear()
	.domain([0, 100])
	.range(["#9C99FF", "#030066"]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom")
	.ticks(5)
	.tickFormat(d3.format("0000"));

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");
	//.ticks(7)
	//.tickFormat(function(d,i) {
	//	return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d];
	//});

svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(0, " + (h - pad) + ")")
	.call(xAxis);

svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(" + (left_pad - pad) + ", 0)")
	.call(yAxis);

d3.json("musicTestData2.json", function(data) {
	console.log(data)
	var x0 = Math.max(-d3.min(data, function(d) { return d.year; }), d3.max(data, function(d) { return d.year; }));

	var node_size = d3.scale.linear()
			.domain([0, d3.max(data, function(d) { return d.POSTS; }) ])
			.range([10, 25]);

	svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		
		.attr("class", "circle")
		.attr("cx", function(d) { return x(d.YEAR); })
		.attr("cy", function(d) { return y(d.TIME); })
		.attr("r", 2)
		.style("opacity", .9)
		//transition
		.transition()
		.duration(1000)
		.attr("r", function(d) { return node_size(d.POSTS); })
		//.attr("r", function(d) { return 10; });
		.style("fill", function(d) { return node_fill(d.SENTIMENT)});


	function toggleElectronic() {
		svg.selectAll("circle")
			.filter(function(d) { return d.GENRE == "Electronic"; })
			.transition()
			.duration(1000)
			.style("opacity", this.checked ? .9 : 0);
	}

	d3.selectAll("input[value=electronic]").on("change", toggleElectronic);

	function toggleHiphop() {
		svg.selectAll("circle")
			.filter(function(d) { return d.GENRE == "Hip Hop"; })
			.transition()
			.duration(1000)
			.style("opacity", this.checked ? .9 : 0);
	}

	d3.selectAll("input[value=hiphop]").on("change", toggleHiphop);

	function toggleAltrock() {
		svg.selectAll("circle")
			.filter(function(d) { return d.GENRE == "Alt Rock"; })
			.transition()
			.duration(1000)
			.style("opacity", this.checked ? .9 : 0);
	}

	d3.selectAll("input[value=altrock]").on("change", toggleAltrock);

	//*******************
	//Radio button change
	function repeatbandYes() {
		var repeat = this.value;
		svg.selectAll("circle")
			.style("display", function(d) { return d.REPEAT == "Y" ? null: "none"; });
	}
	d3.selectAll("input[value=yes]").on("change", repeatbandYes);

	function repeatbandNo() {
		//var repeat = this.value;
		svg.selectAll("circle")
			.style("display", function(d) { return d.REPEAT == "N" ? null: "none"; });
	}
	d3.selectAll("input[value=no]").on("change", repeatbandNo);

	function repeatbandAll() {
		var repeat = this.value;
		svg.selectAll("circle")
			.style("display", function(d) { return d.REPEAT == "N" || "Y" ? null: "none"; });
	}
	d3.selectAll("input[value=all]").on("change", repeatbandAll);
			
});