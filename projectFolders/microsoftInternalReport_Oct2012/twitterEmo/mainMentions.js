var svg = d3.select("#viz").append("svg")
	.attr("width", 1150)
	.attr("height", 250);

var data = [
  	{'date': 'Oct 5', 'tweets': 12304},
  	{'date': 'Oct 6', 'tweets': 9242},
  	{'date': 'Oct 7', 'tweets': 4684},
  	{'date': 'Oct 8', 'tweets': 11808},
  	{'date': 'Oct 9', 'tweets': 15726},
  	{'date': 'Oct 10', 'tweets': 21380},
  	{'date': 'Oct 11', 'tweets': 15095},
  	{'date': 'Oct 12', 'tweets': 27302},
  	{'date': 'Oct 13', 'tweets': 11893},
  	{'date': 'Oct 14', 'tweets': 9289},
  	{'date': 'Oct 15', 'tweets': 26630},
  	{'date': 'Oct 16', 'tweets': 23796},
  	{'date': 'Oct 17', 'tweets': 16015},
  	{'date': 'Oct 18', 'tweets': 18377},
    {'date': 'Oct 19', 'tweets': 19600},
    {'date': 'Oct 20', 'tweets': 12349},
    {'date': 'Oct 21', 'tweets': 17350},
    {'date': 'Oct 22', 'tweets': 47256},
    {'date': 'Oct 23', 'tweets': 38099},
    {'date': 'Oct 24', 'tweets': 29495},
    {'date': 'Oct 25', 'tweets': 134877},
    {'date': 'Oct 26', 'tweets': 20000},
    {'date': 'Oct 27', 'tweets': 20000},
    {'date': 'Oct 28', 'tweets': 20000},
    {'date': 'Oct 29', 'tweets': 20000},
    {'date': 'Oct 30', 'tweets': 20000},
    {'date': 'Oct 31', 'tweets': 20000},
    {'date': 'Nov 1', 'tweets': 20000},
    {'date': 'Nov 2', 'tweets': 20000},
]

var cx = 0;
var cy = 0;
var cw = 1150;
var ch = 250;
var barHeight = 136;
var barWidth = 31;
var barSpacing = 33;
var barX = 110;
var barY = 170;
var fontSize = 12;
  
var heightScale = d3.scale.linear()
	.domain([0, d3.max(data, function(d) {return d.tweets;}) ])
	.range([0, barHeight]);

var y = d3.scale.linear()
    .domain([0, d3.max(data, function(d) {return d.tweets;}) ])
    .range([barHeight, 0]);

var chartcanvas = svg.append("g")
	.attr("transform", "translate(" + [cx, cy] + ")");

chartcanvas.append("rect")
	.attr("id", "background")
	.attr("width", cw)
	.attr("height", ch)
	.attr("fill", "#A700AE");
		
chartcanvas.append("g")
	.attr("id", "points")

var bars = chartcanvas.select("#points").selectAll("rect.mainBars")
	.data(data)
bars.enter()
	.append("rect")
	.classed("mainBars", true)
		.attr("width", barWidth)
		.attr("height", function(d, i) { return heightScale(d.tweets); })
		.attr("x", function(d, i) { return (i * barSpacing) + barX; })
		.attr("y", function(d, i) { return barY - heightScale(d.tweets); })
		.style("fill", "white")
			.on('mouseover', function(d, i) {
				d3.select(this).style('fill', 'lightgrey');
            hoverText 
              .text(d.tweets + " tweets")
              .attr("fill", "white")
              .attr("text-anchor", "start")
              .attr("x", (i * 33) + barX + 4)
              .attr("y", barY + 30)
              .style("font-size", fontSize);
             // .attr("transform", "rotate(-90," + (88 + (i * 22)) + ",400)");
			hoverTextX
              .text(d.date)
              .attr("fill", "white")
              .attr("text-anchor", "start")
              .attr("x", (i * 33) + barX + 4)
              .attr("y", barY + 15)
              .style("font-size", fontSize);
            })
			.on('mouseout', function(d, i) {
              hoverText
                .text("");
              hoverTextX
                .text('');
				d3.select(this).style('fill', 'white');
				});

var yAxis = d3.svg.axis()		
	.scale(y)	
    .orient("left")
    .ticks(3);

svg.append("g")
  .attr("class", "axis")
  //.style("stroke", "white")
  .style("fill", "white")
  .style("font-size", 11)
  .attr("transform", "translate(" + [barX - 5,30] + ")")
  .call(yAxis)
svg.append("text")
  .text("'Windows 8' Mentions on Twitter, Total (10.5 to 11.2.12)")
  .attr("x", 15)
  .attr("y", ch - 15)
  .style("fill", "white")
  .style("font-size", 18)

var hoverText = chartcanvas.append("text");
var hoverTextX = chartcanvas.append("text");