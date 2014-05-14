var margin = {top:20, right:40, bottom:0, left:85},
	width = 720 - margin.left - margin.right,
	height = 330 - margin.top - margin.bottom;

var tip = d3.tip()
    .attr('class', 'd3-main-tip')
    //.html(function(d) { return '<span>' + numberFormat(d.value) + '</span>' })
    .html(function(d) {
        if (d.metric == "page_fans") {return '<span>' + numberFormat(d.value) + '</span>'}
        else if (d.metric == "page_fan_adds") {return '<span>' + numberFormat(d.value) + '</span>'}
        else if (d.metric == "unlikes_likes") {return '<span>' + granularDecimalFormat(d.value) + '</span>'}
        else if (d.metric == "post_engagement") {return '<span>' + percentFormat(d.value) + '</span>'}
        else if (d.metric == "post_virality") {return '<span>' + percentFormat(d.value) + '</span>'}
        else if (d.metric == "page_storytellers") {return '<span>' + numberFormat(d.value) + '</span>'}
    })
    .direction('n')
    .offset([-12, 0]);

var formatPercent = d3.format(".0%");

var hypdata = [
{"metric":"total_likes","date":"2013-May-5","value":11012},
{"metric":"total_likes","date":"2013-May-12","value":9942},
{"metric":"total_likes","date":"2013-May-19","value":13740},
{"metric":"total_likes","date":"2013-May-26","value":40926},
{"metric":"total_likes","date":"2013-June-2","value":15291},
{"metric":"total_likes","date":"2013-June-9","value":21544},
{"metric":"total_likes","date":"2013-June-16","value":39036},
{"metric":"total_likes","date":"2013-June-23","value":32967},
{"metric":"total_likes","date":"2013-June-30","value":29861},
{"metric":"total_likes","date":"2013-July-7","value":34658},
{"metric":"total_likes","date":"2013-July-14","value":23103}
];

var parseDate = d3.time.format("%Y-%m-%d")

var x = d3.scale.ordinal()
	.rangeRoundBands([0, width], .1);
/*
var x = d3.time.scale()
	.rangeRoundBands([0, width], .1);
*/
var y = d3.scale.linear()
	.range([height- margin.top - margin.bottom, 0]);

var heightScale = d3.scale.linear()
	.range([0,height - margin.top - margin.bottom]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient('bottom');

var yAxis = d3.svg.axis()
	.scale(y)
	.orient('left')
	.tickSize(10,10,0);

var svg = d3.select('#chartContainer').append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
  .append('g')
  	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

d3.json("./json/netbasedata2.json", function(error, data) {
	{if (error) return console.log("there was an error loading the data: " + error);
	console.log("there are " + data.length + " elements in my dataset");
	console.log(data)
	
	}
/*
	data.forEach(function(d) {
		d.date = parseDate(d.date);
	});

	x.domain(d3.extent(data, function(d) {return d.date;}));

*/

	filteredData = data.filter(function(d) { return d.metric == "posts"; });
	
	x.domain(filteredData.map(function(d) { return d.date; }));
	y.domain([0, d3.max(filteredData, function(d) {return d.value;})])
	heightScale.domain([0, d3.max(filteredData, function(d) {return d.value;}) ])

	d3.select(".title_eachbar").selectAll(".title_eachbar_text")
		.data(data)
		.text(function(d) {return d.metric; });

	//var odds = postData.filter(function(d, i) { return i & 1; });
///////////////////////
//TEXT

var numberFormat = d3.format(',')
var decimalFormat = d3.format(".1f")
var percentFormat = d3.format(".1%")

//posts
postData = data.filter(function(d) { return d.metric == "posts"; });

var postLast = postData[postData.length-1]
var postLastValue = postLast.value
d3.selectAll(".posts_week_data")
	//.data(postData)
	.text(numberFormat(postLastValue));

var postSum = d3.sum(postData, function(d) { return d.value; })
d3.selectAll(".posts_total_data")
	//.data(postData)
	.text(numberFormat(postSum));
//% post
var postMean = d3.mean(postData, function(d) { return d.value; })
//console.log(postMean)
//console.log(postLastValue)
var postDiff = (postLastValue - postMean) / postMean
//console.log(postDiff)
d3.selectAll(".posts_percent_change")
	.text(percentFormat(postDiff))
	.style("color", function(d) {
		if (postDiff > 0) {return "green"}
			else { return "red"}
	});

//impressions
impressionData = data.filter(function(d) { return d.metric == "impressions";});

var impressionLast = impressionData[impressionData.length-1]
var impressionLastValue = impressionLast.value
d3.selectAll(".impressions_week_data")
	.text(numberFormat(impressionLastValue));

var impressionSum = d3.sum(impressionData, function(d) {return d.value; })
d3.selectAll(".impressions_total_data")
	.text(numberFormat(impressionSum));
//% impr
var imprMean = d3.mean(impressionData, function(d) {return d.value; })
var imprDiff = (impressionLastValue - imprMean) / imprMean
d3.selectAll(".impressions_percent_change")
	.text(percentFormat(imprDiff))
	.style("color", function(d) {
		if (imprDiff > 0) {return "green"}
			else { return "red"}
	});

//passion
passionData = data.filter(function(d) { return d.metric== "passion"; })

var passionLast = passionData[passionData.length-1]
var passionLastValue = passionLast.value
d3.selectAll(".passion_week_data")
	.text(decimalFormat(passionLastValue));

var passionMean = d3.mean(passionData, function(d) {return d.value; })
d3.selectAll(".passion_total_data")
	.text(decimalFormat(passionMean));
//% passion
var passionDiff = (passionLastValue - passionMean) / passionMean
d3.selectAll(".passion_percent_change")
	.text(percentFormat(passionDiff))
	.style("color", function(d) {
		if (passionDiff >= 0) {return "green"}
			else { return "red"}
	});

//positive sentiment
positiveData = data.filter(function(d) { return d.metric == "positive sentiment"; })

var positiveLast = positiveData[positiveData.length-1]
var positiveLastValue = positiveLast.value
d3.selectAll(".positive_week_data")
	.text(numberFormat(positiveLastValue));

var positiveSum = d3.sum(positiveData, function(d) {return d.value; })
d3.selectAll(".positive_total_data")
	.text(numberFormat(positiveSum));
//%pos
var positiveMean = d3.mean(positiveData, function(d) {return d.value; })
var positiveDiff = (positiveLastValue - positiveMean) / positiveMean
d3.selectAll(".positive_percent_change")
	.text(percentFormat(positiveDiff))
	.style("color", function(d) {
		if (positiveDiff > 0) {return "green"}
			else { return "red"}
	});

//negative sentiment
negativeData = data.filter(function(d) {return d.metric == "negative sentiment"; })

var negativeLast = negativeData[negativeData.length-1]
var negativeLastValue = negativeLast.value
d3.selectAll(".negative_week_data")
	.text(numberFormat(negativeLastValue));

var negativeSum = d3.sum(negativeData, function(d) {return d.value; })
d3.selectAll(".negative_total_data")
	.text(numberFormat(negativeSum));
//%neg
var negativeMean = d3.mean(negativeData, function(d) {return d.value; })
var negativeDiff = (negativeLastValue - negativeMean) / negativeMean
d3.selectAll(".negative_percent_change")
	.text(percentFormat(negativeDiff))
	.style("color", function(d) {
		if (negativeDiff > 0) {return "green"}
			else { return "red"}
	});

//net sentiment
netsentimentData = data.filter(function(d) { return d.metric == "net sentiment"; })

var netsentimentLast = netsentimentData[netsentimentData.length-1]
netsentimentLastValue = netsentimentLast.value
d3.selectAll(".netsentiment_week_data")
	.text(decimalFormat(netsentimentLastValue));

var netsentimentMean = d3.mean(netsentimentData, function(d) {return d.value; })
d3.selectAll(".netsentiment_total_data")
	.text(decimalFormat(netsentimentMean));
//%net
var netsentimentDiff = (netsentimentLastValue - netsentimentMean) / netsentimentMean
d3.selectAll(".netsentiment_percent_change")
	.text(percentFormat(netsentimentDiff))
	.style("color", function(d) {
		if (netsentimentDiff > 0) {return "green"}
			else { return "red"}
	});

//posts
//need the weekly average, and then it's just a formula


//END OF TEXT
///////////////////////////

	var bar = svg.selectAll('rect')
		.data(filteredData);
	bar.enter()
		.append('rect')
		.attr('width', x.rangeBand())
		.attr('height', 0)
		.attr('x', function(d,i) {
  			return x(d.date)
		})
		.style("fill", "#b9090b")
		/*
		.attr('y', function(d) {return height - margin.top - margin.bottom - y(d.value)})
		*/
		.attr('y', height - margin.top - margin.bottom)

		.transition()
		.duration(1000)

		.attr('y', function(d,i) {
  			return height - margin.top - margin.bottom - heightScale(d.value)
		})
		.attr('height', function(d,i) {
  			return heightScale(d.value)
		})

	bar.exit()
		.transition()
		.duration(1000)
		.attr('height', 0)
		.attr('y', heightScale())
		.remove();

	svg.append("g")
      	.attr("class", "x axis")
      	.attr("transform", "translate(0," + (height - margin.top -margin.bottom) + ")")
      	.style("font-size", "8px")
      	.call(xAxis);

    svg.append("g")
    	.attr("class", "y axis")
    	.transition()
    	.style("font-size", "8px")
		.duration(1000)
    	.call(yAxis);

function redraw(newData, barColor) {

	x.domain(newData.map(function(d) { return d.date; }));
	y.domain([0, d3.max(newData, function(d) {return d.value;})])
	heightScale.domain([0, d3.max(newData, function(d) {return d.value;}) ])

	d3.select(".title_eachbar").selectAll(".title_eachbar_text")
		.data(newData)
		.transition()
		.duration(1000)
		.text(function(d) {return d.metric; });


	var newXAxis = d3.svg.axis()
		.scale(x)
		.orient('bottom');

    var newYAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickSize(10,10,0);

	var rect = svg.selectAll('rect')
		.data(newData, function(d) {return d.date; });
   	rect.enter()//.insert("g", ".axis")
   		.append('rect')
   		.attr('class', 'bar')
   		.attr('width', x.rangeBand())
		//.attr('height', 0)
		.attr('x', function(d,i) {
  			return x(d.date)
		})
		//.attr('y', height - margin.top - margin.bottom)

		.transition()
		.duration(1000)

		.attr('y', function(d,i) {
  			return height - margin.top - margin.bottom - heightScale(d.value)
		})
		.attr('height', function(d,i) {
  			return heightScale(d.value)
		})

		rect.transition()
			.duration(1000)
			.style("fill", barColor)
			.attr('width', x.rangeBand())
		.attr('height', function(d,i) {
  			return heightScale(d.value)
		})
		.attr('x', function(d,i) {
  			return x(d.date)
		})
		.attr('y', function(d,i) {
  			return height - margin.top - margin.bottom - heightScale(d.value)
		})

		rect.exit()
			.transition()
			.duration(1000)
			.attr('y', height - margin.top - margin.bottom)
			.attr('height', 0)
			.remove();

		svg.selectAll(".x.axis")
        	.transition()
        	.duration(1000)
        	.attr("transform", "translate(0," + (height - margin.top -margin.bottom) + ")")
        	.call(newXAxis);
    
    	svg.selectAll(".y.axis")
        	.transition()
        	.duration(1000)
        	.call(newYAxis);

}; // end of function redraw 

d3.selectAll("input[value=posts]").on("change", togglePosts);
d3.selectAll("input[value=impressions]").on("change", toggleImpressions);
d3.selectAll("input[value=passion]").on("change", togglePassion);
d3.selectAll("input[value=positive]").on("change", togglePositive);
d3.selectAll("input[value=negative]").on("change", toggleNegative);
d3.selectAll("input[value=net]").on("change", toggleNet);

function togglePosts() {
	postData = data.filter(function(d) { return d.metric == "posts"; });
	redraw(postData, "#b9090b");
};

function toggleImpressions() {
	impressionData = data.filter(function(d) {return d.metric == "impressions"; });
	redraw(impressionData, "#f29e38");
};

function togglePassion() {
	passionData = data.filter(function(d) {return d.metric == "passion"; });
	redraw(passionData, "#1c578c");
};

function togglePositive() {
	positiveData = data.filter(function(d) {return d.metric == "positive sentiment"; });
	redraw(positiveData, "#5787a5");
};

function toggleNegative() {
	negativeData = data.filter(function(d) {return d.metric == "negative sentiment"; });
	redraw(negativeData, "#f2e0c9");
};

function toggleNet() {
	netsentimentData = data.filter(function(d) {return d.metric == "net sentiment"; });
	redraw(netsentimentData, "#f2d750");
};

});
