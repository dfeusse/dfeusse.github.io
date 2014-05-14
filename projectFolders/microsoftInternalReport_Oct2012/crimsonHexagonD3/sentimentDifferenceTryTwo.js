var svg = d3.select("#sentDiffBars").append("svg")
	.attr("width", 570)
	.attr("height", 200);
  
var fh = [
  {'feeling': 'positive', 'perc': 13},
  {'feeling': 'neutral', 'perc': 83},
  {'feeling': 'negative', 'perc': 4}
  ];

var width = 570;
var height = 200;

var xscale = d3.scale.linear()
    .domain([0, d3.max(fh, function(d) { return d.perc; }) ])
    .range([0, 450]);

var watercolor = svg.append("g")
    .attr("transform", "translate(" + [0,0] + ")");

watercolor.append("rect")
  .attr("id", "hellcat")
  .attr("width", width)
  .attr("height", height)
  .attr("fill", '#FF981D');

watercolor.append("g")
  .attr("id", "bosworth")
  
var pone = watercolor.select("#bosworth").selectAll("rect.kate")
    .data(fh)

pone.enter()
  .append("rect")
  .classed("kate", true)
  .attr("height", 20)
  .attr("width", function(d, i) {
    return xscale(d.perc) })
  .attr("x", function(d, i) {
  	return 57 })
  .attr("y", function(d, i) {
  	return (i * 22) + 40})
  .style("fill", "white")