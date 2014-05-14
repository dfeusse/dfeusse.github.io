var svg = d3.select("#sentDiffBars").append("svg")
  .attr("width", 570)
  .attr("height", 200);

var data = [
  {"sentiment": "positive", "value": 15},
  {"sentiment": "neutral", "value": 80},
  {"sentiment": "negative", "value": 5}
  ];
  
var cx = 0;
var cy = 0;
var cw = 570;
var ch = 200;

var heightScale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.value; })])
	.range([0, 450]);
    
var chartsentiment = svg.append("g")
    .attr("transform", "translate(" + [cx,cy] + ")");

chartsentiment.append("rect")
  .attr("id", "back")
  .attr("width", cw)
  .attr("height", ch)
  .style("fill", "#FF981D")

chartsentiment.append("g")
  .attr("id", "sentimentdiff")
  
var horizbars = chartsentiment.select("#sentimentdiff").selectAll("rect.sentimentBars")
    .data(data)
horizbars.enter()
  .append("rect")
  .classed("sentimentBars", true)
  .attr("height", 20)
  .attr("width", function(d, i) {
    return heightScale(d.value) })
  .attr("x", function(d, i) { 
    return 57 })
  .attr("y", function(d, i) {
    return (i * 22) + 40; })
  .style("fill", "white")
  .on('mouseover', function(d, i) {
    d3.select(this).style('fill','#e2e2e2');
    	hoverTextSentName
          .text(d.value + "%")
          .attr("fill", "white")
              .attr("text-anchor", "start")
              .attr("x", 30)
              .attr("y", i * 22 + 54)
              .style("font-size", 11);
            })
			.on('mouseout', function(d, i) {
              hoverTextSentName
                .text("");
				d3.select(this).style('fill', 'white');
				});
 chartsentiment.append("text")
   .text("positive")
   .attr("fill", "#1F0068")
   .attr("x", 60)
   .attr("y", 53)
   .style("font-size", 11)
chartsentiment.append("text")
  .text("neutral")
  .attr("fill", "#1F0068")
    .attr("x", 60)
   .attr("y", 75)
   .style("font-size", 11)
chartsentiment.append("text")
  .text("negative")
  .attr("fill", "#1F0068")
   .attr("x", 60)
   .attr("y", 98)
   .style("font-size", 11)
chartsentiment.append("text")
  .text("Sentiment")
  .attr("x", 10)
  .attr("y", ch - 10)
  
  //Axis
var xAxis = d3.svg.axis()
    .scale(heightScale)
    .orient("top")
    .ticks(7)
chartsentiment.append("g")
  .attr("class", "axis")
  //.style("stroke", "black")
  .style("fill", "white")
  .style("font-size", 11)
  .attr("transform", "translate(" + [57, 143] + ")")
  .call(xAxis)
 
var hoverTextSentName = chartsentiment.append("text");