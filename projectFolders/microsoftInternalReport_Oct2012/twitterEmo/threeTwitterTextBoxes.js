var svg = d3.select("#threeTwitterBoxes").append("svg")
	.attr("width", 840)
	.attr("height", 660);

var cx = 0;
var cy = 20;
var cw = 770;
var ch = 660;

var canvasone = svg.append("g")
	.attr("transform", "translate(" + [cx, cy] + ")");

canvasone.append("rect")
	.attr("id", "background")
	.attr("width", cw)
	.attr("height", ch)
	.attr("fill", "lightgrey")
		
		
canvasone.append("g")
	.attr("id", "points")
  
canvasone.append("rect")
  	.attr("id", "vizOne")
    .attr("width", 770)
    .attr("height", 200) 
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", "#DC572E");

canvasone.append("rect")
  	.attr("id", "vizTwo")
    .attr("width", 770)
    .attr("height", 200) 
    .attr("x", 0)
    .attr("y", 220)
    .attr("fill", "#094AB2");

canvasone.append("rect")
  	.attr("id", "vizThree")
    .attr("width", 770)
    .attr("height", 200) 
    .attr("x", 0)
    .attr("y", 440)
    .attr("fill", "#008A00");

    