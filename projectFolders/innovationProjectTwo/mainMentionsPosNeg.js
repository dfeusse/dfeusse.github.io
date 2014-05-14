var svg = d3.select("#viz").append("svg")
	.attr("width", 853)
	.attr("height", 225);

var data = [
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
    {'date': 'Oct 26', 'tweets': 151604},
    {'date': 'Oct 27', 'tweets': 67959},
    {'date': 'Oct 28', 'tweets': 44004},
    {'date': 'Oct 29', 'tweets': 53237},
    {'date': 'Oct 30', 'tweets': 60473},
    {'date': 'Oct 31', 'tweets': 39773},
    {'date': 'Nov 1', 'tweets': 35663},
    {'date': 'Nov 2', 'tweets': 30615},
    {'date': 'Nov 3', 'tweets': 18634},
    {'date': 'Nov 4', 'tweets': 18075}
];

var pos_data = [
    {'date': 'Oct 15', 'tweets': 13512},
    {'date': 'Oct 16', 'tweets': 13189},
    {'date': 'Oct 17', 'tweets': 12258},
    {'date': 'Oct 18', 'tweets': 12780},
    {'date': 'Oct 19', 'tweets': 12462},
    {'date': 'Oct 20', 'tweets': 11631},
    {'date': 'Oct 21', 'tweets': 15644},
    {'date': 'Oct 22', 'tweets': 16743},
    {'date': 'Oct 23', 'tweets': 14724},
    {'date': 'Oct 24', 'tweets': 14395},
    {'date': 'Oct 25', 'tweets': 64129},
    {'date': 'Oct 26', 'tweets': 67531},
    {'date': 'Oct 27', 'tweets': 42946},
    {'date': 'Oct 28', 'tweets': 38053},
    {'date': 'Oct 29', 'tweets': 19194},
    {'date': 'Oct 30', 'tweets': 10855},
    {'date': 'Oct 31', 'tweets': 16674},
    {'date': 'Nov 1', 'tweets': 16619},
    {'date': 'Nov 2', 'tweets': 11529},
    {'date': 'Nov 3', 'tweets': 9548},
    {'date': 'Nov 4', 'tweets': 8282}
];

var neg_data = [
    {'date': 'Oct 15', 'tweets': 5110},
    {'date': 'Oct 16', 'tweets': 5304},
    {'date': 'Oct 17', 'tweets': 4826},
    {'date': 'Oct 18', 'tweets': 4752},
    {'date': 'Oct 19', 'tweets': 4829},
    {'date': 'Oct 20', 'tweets': 4615},
    {'date': 'Oct 21', 'tweets': 4696},
    {'date': 'Oct 22', 'tweets': 6415},
    {'date': 'Oct 23', 'tweets': 6587},
    {'date': 'Oct 24', 'tweets': 5495},
    {'date': 'Oct 25', 'tweets': 9503},
    {'date': 'Oct 26', 'tweets': 13914},
    {'date': 'Oct 27', 'tweets': 9294},
    {'date': 'Oct 28', 'tweets': 7102},
    {'date': 'Oct 29', 'tweets': 7482},
    {'date': 'Oct 30', 'tweets': 7767},
    {'date': 'Oct 31', 'tweets': 6553},
    {'date': 'Nov 1', 'tweets': 6065},
    {'date': 'Nov 2', 'tweets': 5935},
    {'date': 'Nov 3', 'tweets': 5582},
    {'date': 'Nov 4', 'tweets': 5390}
];

var resetdata = [
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
    {'date': 'Oct 26', 'tweets': 151604},
    {'date': 'Oct 27', 'tweets': 67959},
    {'date': 'Oct 28', 'tweets': 44004},
    {'date': 'Oct 29', 'tweets': 53237},
    {'date': 'Oct 30', 'tweets': 60473},
    {'date': 'Oct 31', 'tweets': 39773},
    {'date': 'Nov 1', 'tweets': 35663},
    {'date': 'Nov 2', 'tweets': 30615},
    {'date': 'Nov 3', 'tweets': 18634},
    {'date': 'Nov 4', 'tweets': 18075}
];

var cx = 0;
var cy = 0;
var cw = 853;
var ch = 225;
var barHeight = 125;
var barWidth = 23;
var barSpacing = 25;
var barX = 65;
var barY = 160;
var fontSize = 12;
var axisY = 35;
  
var heightScale = d3.scale.linear()
  .domain([0, d3.max(data, function(d) {return d.tweets;}) ])
  .range([0, barHeight]);

var heightScalePos = d3.scale.linear()
  .domain([0, d3.max(pos_data, function(d) {return d.tweets;}) ])
  .range([0, barHeight]);

var y = d3.scale.linear()
    .domain([0, d3.max(data, function(d) {return d.tweets;}) ])
    .range([barHeight, 0]);

var ySent = d3.scale.linear()
    .domain([0, d3.max(pos_data, function(d) {return d.tweets;}) ])
    .range([barHeight, 0]);

var chartcanvas = svg.append("g")
  .attr("transform", "translate(" + [cx, cy] + ")");

chartcanvas.append("rect")
  .attr("id", "background")
  .attr("width", cw)
  .attr("height", ch)
  .attr("fill", "black"); 
chartcanvas.append("g")
  .attr("id", "points")

  //viz 1 background
chartcanvas.append("rect")
  .attr("id", "squaretwo")
  .attr("fill", "#1BA1E2")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 620)
  .attr("height", 225)
chartcanvas.append("g")
  .attr("id", "first")
  //viz 1 main
var bars = chartcanvas.select("#first").selectAll("rect.mainBars")
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
              .attr("x", (i * 25) + barX + 2)
              .attr("y", barY + 30)
              .style("font-size", fontSize);
             // .attr("transform", "rotate(-90," + (88 + (i * 22)) + ",400)");
      hoverTextX
              .text(d.date)
              .attr("fill", "white")
              .attr("text-anchor", "start")
              .attr("x", (i * 25) + barX + 2)
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
//viz 1 axis
var yAxis = d3.svg.axis()   
  .scale(y) 
    .orient("left")
    .ticks(4);

var yAxisSent = d3.svg.axis()
.scale(ySent)
  .orient("left")
  .ticks(4)

svg.append("g")
  .attr("class", "axis")
  //.style("stroke", "white")
  .style("fill", "white")
  .style("font-size", 11)
  .attr("transform", "translate(" + [barX - 5,axisY] + ")")
  .call(yAxis)
svg.append("text")
  .text("'Windows 8' Mentions on Twitter, Total (10.15 to 11.4.12)")
  .attr("x", 15)
  .attr("y", ch - 15)
  .style("fill", "white")
  .style("font-size", 16)

var hoverText = chartcanvas.append("text");
var hoverTextX = chartcanvas.append("text");

//viz 2 background
chartcanvas.append("rect")
  .attr("id", "scnd")
  .attr("fill", "#AA00FF")
  .attr("x", 620)
  .attr("y", 0)
  .attr("width", 233)
  .attr("height", 225)
chartcanvas.append("g")
  .attr("id", "posneg")
  
//buttons/pos neg rectangle
var sentbars = svg.append("g")
    .attr("transform", "translate(" + [605,10] + ")")
    .attr("pointer-events", "null")
    
var posbar = sentbars.append("rect")
  .attr("width", 18 * 6)
  .attr("height", 20)
  .attr("x", 100)
  .attr("y", 77.5)
  .attr("fill", "white")
  .attr("stroke", "white")

posbar.on("click", function() {
     bars
     .data(pos_data)
      .transition()
      .duration(1000)
    .attr("width", barWidth)
    .attr("height", function(d, i) { return heightScale(d.tweets); })
    .attr("x", function(d, i) { return (i * 25) + barX; })
    .attr("y", function(d, i) { return barY - heightScale(d.tweets); })
})
   
var negbar = sentbars.append("rect")
  .attr("width", 8 * 6)
  .attr("height", 20)
  .attr("x", 100)
  .attr("y", 100)
  .attr("fill", "white")
  .attr("stroke", "white")

negbar.on("click", function() {
     bars
     .data(neg_data)
      .transition()
      .duration(1000)
    .attr("width", barWidth)
    .attr("height", function(d, i) { return heightScale(d.tweets); })
    .attr("x", function(d, i) { return (i * 25) + barX; })
    .attr("y", function(d, i) { return barY - heightScale(d.tweets); })
})

var goforthbutton = sentbars.append("rect")
  .attr("width", 60)
  .attr("height", 20)
  .attr("x", -66)
  .attr("y", 20)
  .attr("rx", 7)
  .attr("ry", 7)
  .attr("fill", "white")
  //.attr("stroke", "black")

goforthbutton.on("click", function() {
     bars
     .data(resetdata)
      .transition()
      .duration(1000)
    .attr("width", barWidth)
    .attr("height", function(d, i) { return heightScale(d.tweets); })
    .attr("x", function(d, i) { return (i * 25) + barX; })
    .attr("y", function(d, i) { return barY - heightScale(d.tweets); })
})

sentbars.append("text")
      .text("reset")
      .attr("x", -50)
      .attr("y", 25)
      .style("font-size", 11)
      .style("fill", "black")
      .attr("alignment-baseline", "hanging")

sentbars.append("text")
      .text("positive")
      .attr("x", 47)
      .attr("y", 80)
      .style("font-size", 12)
      .style("fill", "white")
      .attr("alignment-baseline", "hanging")

sentbars.append("text")
      .text("negative")
      .attr("x", 47)
      .attr("y", 105)
      .style("font-size", 12)
      .style("fill", "white")
      .attr("alignment-baseline", "hanging")
 
sentbars.append("text")
      .text("18%")
      .attr("x", 175)
      .attr("y", 81)
      .style("font-size", 12)
      .style("fill", "#00A600")
      .attr("alignment-baseline", "hanging")
sentbars.append("text")
      .text("8%")
      .attr("x", 127)
      .attr("y", 105)
      .style("font-size", 12)
      .style("fill", "red")
      .attr("alignment-baseline", "hanging")

svg.append("text")
    .text("Sentiment")
  .attr("x", 648)
  .attr("y", ch - 15)
  .style("fill", "white")
  .style("font-size", 16)