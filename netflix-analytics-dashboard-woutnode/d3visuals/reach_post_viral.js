function reach_post_viral() {

var numberFormat = d3.format(',')
var tip = d3.tip()
    .attr('class', 'd3-main-tip')
    //.html(function(d) { return '<span>' + numberFormat(d.paid) + '</span>' + ' entries' })
    .html(function(d) { return '<span>' + numberFormat(d.viral) + '</span>' })
    .direction('n')
    .offset([-12, 0])
    //.offset([0,10])

var original_data = [
{"date":"6/2","paid":0,"organic":4825870,"viral":469622},
{"date":"6/9","paid":0,"organic":2617957,"viral":84573},
{"date":"6/16","paid":0,"organic":4851488,"viral":138221},
{"date":"6/23","paid":0,"organic":2671410,"viral":2013866},
{"date":"6/30","paid":0,"organic":2074517,"viral":161437},
{"date":"7/7","paid":0,"organic":3658045,"viral":171833},
{"date":"7/14","paid":0,"organic":1463608,"viral":19616},
{"date":"7/21","paid":0,"organic":2296653,"viral":66564}
];

var data = original_data.splice(-8)

var margin = {top:0, right:40, bottom:30, left:0},
	width = 222 - margin.left - margin.right,
	height = 195 - margin.top - margin.bottom;

var svg = d3.select("#reach_post_viral").append('svg')
	.attr({
		height: 195,
		width: 222
	});

var x = d3.scale.linear()
	.range([width- margin.top - margin.bottom, 0]);

var y = d3.scale.ordinal()
	.rangeRoundBands([0, height], .1);

//var heightScale = d3.scale.linear()
//	.range([0,width - margin.top - margin.bottom]);

var widthScale = d3.scale.linear()
	.range([0,width]);

x.domain([0, d3.max(data, function(d) {return d.viral;}) ])
y.domain(data.map(function(d) { return d.date; }));
widthScale.domain([0, d3.max(data, function(d) {return d.viral;}) ])

var bar = svg.selectAll('rect.horiz_bars')
	.data(data);
  bar.enter()
	.append("g")
    //.attr("class", "bar")
    .attr("transform", function(d, i) { return "translate(0,0)"; });
	bar.append('rect')
		.classed("horiz_bars", true)
		.attr('y', function(d,i) {
  			return y(d.date)
		})
		.attr('x', function(d,i) {
  			return margin.left
		})
    	.attr('height', y.rangeBand())
		.attr('width', function(d,i) {
  			return widthScale(d.viral)
		})
		.on('mouseover', tip.show)
      	.on('mouseout', tip.hide)

console.log(widthScale(200))
max_value = d3.max(data, function(d) {return d.viral;})
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(" + margin.left + "," + height + ")")
    .call(d3.svg.axis()
    .tickValues([max_value])
    .scale(widthScale)
    .orient("bottom"));
/*
bar.append("text")
    //.attr("text-anchor", "end")
    .attr("x", function(d) { return 5 })
   .attr("y", function(d,i) {return  y(d.date) +11} )
    .attr("dy", ".15em")
   .attr('font-size', 10)
    .text(function(d, i) { return d.date; });
*/
bar.call(tip)

};

reach_post_viral();
