var margin = {top:20, right:20, bottom:30, left:40},
	width = 900 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
	.rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
	.range([height, 0]);

var heightScale = d3.scale.linear()
	.range([0,50]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient('top');

var yAxis = d3.svg.axis()
	.scale(y)
	.orient('left')
	.tickSize(10,10,0);

var svg = d3.select('#chartContainer').append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
  .append('g')
  	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

d3.json("testdata.json", function(error, data) {
	{if (error) return console.log("there was an error loading the data: " + error);
	console.log("there are " + data.length + " elements in my dataset");
	console.log(data)
	
	}

	heightScale.domain([0, d3.max(data, function(d) {return d.value;}) ])

	var bar = svg.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr('width', 20)
		.attr('height', function(d,i) {
  			return heightScale(d.value)
		})
		.attr('x', function(d,i) {
  			return (i*22) + 100
		})
		.attr('y', function(d,i) {
  			return 175 - heightScale(d.value)
		})
})

