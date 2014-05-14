var svg = d3.select("#tweetList").append("svg")
	.attr("width", 260)
	.attr("height", 470);

var cx = 0;
var cy = 0;
var cw = 260;
var ch = 470;

var canvastwo = svg.append("g")
	.attr("transform", "translate(" + [cx, cy] + ")");

canvastwo.append("rect")
	.attr("id", "background")
	.attr("width", cw)
	.attr("height", ch)
	.attr("fill", "#BF1E4B");
		
canvastwo.append("g")
	.attr("id", "points");