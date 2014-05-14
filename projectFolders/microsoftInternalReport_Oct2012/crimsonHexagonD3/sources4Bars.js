var svg = d3.select("#sources4Bars").append("svg")
  .attr("height", 200)
  .attr("width", 570);
    
    
var data = [
  {"sentiment": "blogs", "value": 4},
  {"sentiment": "news", "value": 4},
  {"sentiment": "facebook", "value": 1},
  {"sentiment": "twitter", "value": 91}
  ];
  
var cx = 0;
var cy = 0;
var cw = 570;
var ch = 200;

var heightScaleTwo = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.value; })])
	.range([0, 450]);
    
var chartbars = svg.append("g")
    .attr("transform", "translate(" + [cx,cy] + ")");

chartbars.append("rect")
  .attr("id", "bg")
  .attr("width", cw)
  .attr("height", ch)
  .style("fill", "FF76BC")

chartbars.append("g")
  .attr("id", "sources")
  
var hbars = chartbars.select("#sources").selectAll("rect.bars")
    .data(data)
hbars.enter()
  .append("rect")
  .classed("bars", true)
  .attr("height", 20)
  .attr("width", function(d, i) {
    return heightScaleTwo(d.value) })
  .attr("x", function(d, i) { 
    return 57 })
  .attr("y", function(d, i) {
    return (i * 22) + 34; })
  .style("fill", "white")
  .on('mouseover', function(d, i) {
    d3.select(this).style('fill','#e2e2e2');
    	hoverTextSourcesName
          .text(d.value + "%")
          .attr("fill", "white")
              .attr("text-anchor", "start")
              .attr("x", 30)
              .attr("y", i * 22 + 48)
              .style("font-size", 11);
            })
			.on('mouseout', function(d, i) {
              hoverTextSourcesName
                .text("");
				d3.select(this).style('fill', 'white');
				});
 chartbars.append("text")
   .text("blogs")
   .attr("fill", "#004A00")
   .attr("x", 60)
   .attr("y", 48)
   .style("font-size", 11)
chartbars.append("text")
  .text("news")
  .attr("fill", "#004A00")
     .attr("x", 60)
   .attr("y", 70)
   .style("font-size", 11)
chartbars.append("text")
  .text("facebook")
  .attr("fill", "#004A00")
     .attr("x", 60)
   .attr("y", 94)
   .style("font-size", 11)
chartbars.append("text")
  .text("twitter")
  .attr("fill", "#004A00")
     .attr("x", 60)
   .attr("y", 114)
   .style("font-size", 11)
chartbars.append("text")
  .text("Sources")
  .attr("x", 10)
  .attr("y", ch - 10)
  
  //Axis
var xAxis = d3.svg.axis()
    .scale(heightScaleTwo)
    .orient("top")
    .ticks(5)
chartbars.append("g")
  .attr("class", "axis")
  //.style("stroke", "black")
  .style("fill", "white")
  .style("font-size", 11)
  .attr("transform", "translate(" + [57, 151] + ")")
  .call(xAxis)
 
var hoverTextSourcesName = chartbars.append("text");