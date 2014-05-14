function reach_page_viral() {

var numberFormat = d3.format(',')
var tip = d3.tip()
    .attr('class', 'd3-main-tip')
    //.html(function(d) { return '<span>' + numberFormat(d.paid) + '</span>' + ' entries' })
    .html(function(d) { return '<span>' + numberFormat(d.viral) + '</span>' })
    .direction('n')
    .offset([-12, 0])
    //.offset([0,10])

var original_data = [
{"metric":"impression_page","date":41420,"paid":89706046,"organic":4338187,"viral":6311721},
{"metric":"impression_page","date":41427,"paid":41149458,"organic":5150313,"viral":2094518},
{"metric":"impression_page","date":41434,"paid":83428580,"organic":3094689,"viral":1239041},
{"metric":"impression_page","date":41441,"paid":40780955,"organic":5033984,"viral":2085667},
{"metric":"impression_page","date":41448,"paid":92213605,"organic":3261511,"viral":2643668},
{"metric":"impression_page","date":41455,"paid":124348089,"organic":2855988,"viral":2207623},
{"metric":"impression_page","date":41462,"paid":41240839,"organic":4307889,"viral":1968819},
{"metric":"impression_page","date":41469,"paid":48000599,"organic":2193768,"viral":1874068},
{"metric":"impression_page","date":41560,"paid":41240839,"organic":4307889,"viral":1968819},
{"metric":"impression_page","date":67148,"paid":41240839,"organic":5307889,"viral":1968819},
{'metric':"impression_page", "date":70125, "paid": 50550555,"organic":3307889,"viral":1239041},
{'metric':"impression_page", "date":115439, "paid": 79736545,"organic":1338187,"viral":2843668}
];

var data = original_data.splice(-8)

var margin = {top:0, right:40, bottom:30, left:0},
	width = 222 - margin.left - margin.right,
	height = 195 - margin.top - margin.bottom;

var svg = d3.select("#reach_page_viral").append('svg')
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

reach_page_viral();
