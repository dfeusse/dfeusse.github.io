//function totalVisitsBrush() {
var formatDate = d3.time.format("%Y-%m-%d");

var tip = d3.tip()
	.attr('class', 'd3-tip')
  	.html(function(d) { 
  		return 'date: ' + '<span>' + formatDate(d.date) + '</span>' +
  		'<br> <span>' + d.visits + '</span>' + ' visits' 
  	})
  	.offset([-12, 0]);
/*
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    xx = w.innerWidth || e.clientWidth || g.clientWidth,
    yy = w.innerHeight|| e.clientHeight|| g.clientHeight;
*/

/* resizable vars */
var prevChartWidth = 0, prevChartHeight = 0;
var updateTransistionMS = 750; // milliseconds
var sourceData;


var margin = {top: 10, right: 30, bottom: 100, left: 70},
	margin2 = {top: 430, right: 30, bottom: 30, left: 70},
	margin3 = {top: 10, right: 30, bottom: 50, left: 70},
	width = 1140 - margin.left - margin.right,
	//width = "100%",
	height = 500 - margin.top - margin.bottom,
	height2 = 500 - margin2.top - margin2.bottom,
	height3 = 350 - margin3.top - margin3.bottom;

var parseDate = d3.time.format("%Y-%m-%d").parse;

var x = d3.time.scale()
	.range([0, width]);

var x2 = d3.time.scale()
	.range([0, width]);

//for timeline visual
var x3 = d3.time.scale()
	.range([0, width]);

var y = d3.scale.linear()
	.range([height, 0]);

var y2 = d3.scale.linear()
	.range([height2, 0]);

var rectWidth = d3.scale.linear()
	.range([3, 35]);

var rectHeight = 20;

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom")
	//!!!! Not scalable
	.ticks(8);

var xAxis2 = d3.svg.axis()
	.scale(x2)
	.orient("bottom")
	.ticks(8);

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");

var brush = d3.svg.brush()
	.x(x2)
	.on("brush", brushed);

var area = d3.svg.area()
	.interpolate("monotone")
	.x(function(d) { return x(d.date); })
	.y0(height)
	.y1(function(d) { return y(d.visits); });

var area2 = d3.svg.area()
	.interpolate("monotone")
	.x(function(d) { return x2(d.date); })
	.y0(height2)
	.y1(function(d) { return y2(d.visits); });


var svg = d3.select("#totalVisitsBrushChart")
//<div id="totalVisitsBrushChart">
	.append("svg")
	.attr({
		width: width + margin.left + margin.right,
		height: height + margin.top + margin.bottom
	});

/*
var svg = d3.select("body").append("svg")
        .attr("width", xx)
        .attr("height", yy)
        .append("g");

function updateWindow(){
    xx = w.innerWidth || e.clientWidth || g.clientWidth;
    yy = w.innerHeight|| e.clientHeight|| g.clientHeight;
    
    svg.attr("width", xx).attr("height", yy);
}
window.onresize = updateWindow;
*/
svg.append("defs").append("clipPath")
	.attr("id", "clip")
  .append("rect")
  	.attr("width", width)
  	.attr("height", height);

var focus = svg.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var context = svg.append("g")
	.attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

svg.call(tip)

//new div + chart
// ask Brandcast how to separate this into two files
var timelineSvg = d3.select("#timelineChart")
	.append('svg')
	.attr({
		width: width + margin3.left + margin3.right,
		height: height3 + margin3.top + margin3.bottom
	});

var timelineContainer = timelineSvg.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var y3 = d3.scale.ordinal()
	//.rangeRoundBands([height - pad*2, pad], 0.05);
	.rangeBands([height3, 0]);

var xAxis3 = d3.svg.axis()
	.scale(x)
	.orient("bottom")
	.ticks(8);

var yAxis2 = d3.svg.axis()
	.scale(y3)
	.orient("left");

d3.json("./totalVisits/data.json", function(error, data) {

	data.forEach(function(d) { 
		d.date = parseDate(d.date);
		d.visits = +d.visits;
	});

	x.domain(d3.extent(data.map(function(d) {
		return d.date;
	})));
	y.domain([0, d3.max(data.map(function(d) {
		return d.visits;
	})) ]);

	x2.domain(x.domain());
	y2.domain(y.domain());

	focus.append("path")
		.datum(data)
		.attr("clip-path", "url(#clip)")
		.attr("d", area);

	focus.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	focus.append("g")
		.attr("class", "y axis")
		.call(yAxis);

	context.append("path")
		.datum(data)
		.attr("d", area2);

	context.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height2 + ")")
		.call(xAxis2);

	context.append("g")
		.attr("class", "x brush")
		.call(brush)
	  .selectAll("rect")
	  	.attr("y", -6)
	  	.attr("height", height2 + 7);

	  	//hover over dots on scatterplot
	focus.append("g")
		.attr("class", "dots")
		.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("r", 3.5)
		.attr("cx", function(d) { return x(d.date); })
		.attr("cy", function(d) { return y(d.visits); })
		.on('mouseover', tip.show)
      	.on('mouseout', tip.hide);

    
    //$$$$$ NEW CHART
    d3.json("./totalVisits/data_timeline.json", function(data) {
    	//console.log(data)
		data.forEach(function(d) {
			d.date = parseDate(d.date);
		});
		console.log(data)

		var tip = d3.tip()
			.attr('class', 'd3-tip')
		  	.html(function(d) { 
		  		return 'date: ' + '<span>' + formatDate(d.date) + '</span>' +
		  		'<br> page: ' + '<span>' + d.page + '</span>' + 
		  		'<br> additions: ' + '<span>' + d.additions + '</span>' + 
		  		'<br> change added: ' + '<span>' + d.added_pages + '</span>'
		  	})
		  	.offset([-12, 0]);

		timelineSvg.call(tip)
		/*
		var nodeColor = d3.scale.linear()
			.domain([0, d3.max(data, function(d,i) {return d.additions}) ])
			.range(["#e8f4f8", "#0000b3"]);
		*/

		//var nodeColor = d3.scale.category20c();
		//var nodeColor = d3.scale.category10();
		var nodeColor = d3.scale.ordinal()
			.domain(["picture", "store item", "location", "profile change", "video"])
    		.range(colorbrewer.Greys[5]);

		var nodeOpacity = d3.scale.linear()
			.domain([0, d3.max(data, function(d) {return d.additions}) ])
			.range([0.5, 0.9]);

		rectWidth.domain([0, d3.max(data, function(d) {return d.additions}) ])

		//need to specify todays date, or same date as above chart
		x3.domain(d3.extent(data, function(d) { return d.date; }));
		y3.domain(data.map(function(d) { return d.page; }));

		var x0 = Math.max(-d3.min(data, function(d) { return d.date; }), 
			d3.max(data, function(d) { return d.date; }));

		var nodeSize = d3.scale.linear()
				.domain([0, d3.max(data, function(d) { return d.additions; }) ])
				.range([5, 15]);

		var g = timelineContainer.append("g").attr("class", "value")

		console.log('height3=' + height3)
		timelineContainer.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height3 + ")")
			.call(xAxis3);

		timelineContainer.append("g")
			.attr("id", "timelineYAxis")
			.attr("class", "y axis")
			//.attr("transform", "translate(" + "70" + ", -4)")
			.call(yAxis2);

		//var height = 20;
		var nodes = g.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("class", "myrects")
			.attr({
				rx: 2,
				x: function(d,i) { return x3(d.date) - (rectWidth(d.additions)/2)},
				y: function(d,i) {return y3(d.page)+(height3/10) - rectHeight/2},
				width: function(d,i) { return rectWidth(d.additions) },
				height: rectHeight
			})
			//.attr("cx", function(d) { return x(d.date); })
			//.attr("cx", function(d,i) { return x3(d.date)})
			//.attr("cy", function(d,i) { return (i*20) + 25; })
			//.attr("cy", function(d,i) {return y3(d.page)+(height3/10) })//+ 10 })
			//.attr("cy", 100)
			//.attr("r", function(d,i) { return nodeSize(d.additions) })
			//.attr("r", 12)
			.style("fill", function(d, i) {return nodeColor(d.page)})
			.style("stroke", "grey")
			.style("stroke-width", 3)
			.style("stroke-opacity", 0.4)
			//.style("fill-opacity", function(d,i) {return nodeOpacity(d.additions)})
			.style("fill-opacity", 0.8)
			.on('mouseover', tip.show)
      		.on('mouseout', tip.hide);
	    }); //end of second visual function


    //do not need to format it, but doesn't match the dataset
    var current_date = moment().format('YYYY-MM-DD');
    //console.log(current_date)

    var now = new Date(2013, 8, 20);
    var weekago = new Date(2013, 7, 27);
    console.log('$$$')
    console.log(now)
    console.log('#######')
    var emma = moment().subtract('days', 20)
    console.log(emma)

    var twoweeksago = new Date(2013, 7, 24);

    //BUTTONS
    d3.select('#button_1m').on('click', function() { 
    	focus.selectAll("circle")
    		.attr("fill", "steelblue");

    	svg.select(".brush").call(brush.extent([weekago, emma]));
    	brushed();
    });

    d3.select('#button_3m').on('click', function() { 
    	focus.selectAll("circle")
    		.attr("fill", "red");

    	svg.select(".brush").call(brush.extent([twoweeksago, emma]));
    	brushed();
    });

    d3.select('#button_max').on('click', function() { 
    	focus.selectAll("circle")
    		.attr("fill", "yellow");

    	//svg.select(".brush").call(brush)//.extent([weekago, emma]));
    	//brushed();
    	//context.call(brush)
    	svg.select(".brush").call(brush.clear());
    	brushed();
    });
});

function brushed() {
	x.domain(brush.empty() ? x2.domain() : brush.extent());
	focus.select("path")
		.attr("d", area);
	focus.select(".x.axis")
		.call(xAxis);
	//scatterplot changing
	focus.selectAll("circle")
		.attr("cx", function(d) { return x(d.date); })
		.attr("cy", function(d) { return y(d.visits); });

	//timeline vis
	x3.domain(brush.empty() ? x2.domain() : brush.extent());
	timelineContainer.selectAll('rect')
		.attr({
			//x: function(d,i) { return x3(d.date) },
			//y: function(d,i) {return y3(d.page)+(height3/10) },
			//y: function(d,i) {return y3(d.page)+(height3/10) - height/2},
				x: function(d,i) { return x3(d.date) - (rectWidth(d.additions)/2)},
				y: function(d,i) {return y3(d.page)+(height3/10) - rectHeight/2},
				width: function(d,i) { return rectWidth(d.additions) },
				height: rectHeight
		
		})
	timelineContainer.select(".x.axis")
		.call(xAxis);
		
};

//}; //end of main function
//totalVisitsBrush();