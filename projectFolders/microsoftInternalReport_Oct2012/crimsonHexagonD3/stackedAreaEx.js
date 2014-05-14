var margin = {
  top: 20,
  right: 50,
  bottom: 30,
  left: 20
}
var width = 960 - margin.right-margin.left;
var height = 500 - margin.top - margin.bottom;

var x = d3.time.scale()
 	.range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var z = d3.scale.ordinal()
    .range("red", "grey", "green");

var parse = d3.time.format("%m/%Y").parse;
var format = d3.time.format("%b");

var svg = d3.select("#stackedarea").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("crimea.csv", function(crimea) {
  var causes = d3.layout.stack() (["wounds", "other", "disease"].map(function(cause) {
    return crimea.map(function(d) {
      return { x: parse(d.date), y: +d[cause]};
    });
  }));
  
  x.domain([causes[0][0].x, causes[0][causes[0].length-1].x]);
  y.domain([0, d3.max(causes[causes.length - 1], function(d) { return d.y0 + d.y; })]);
  
  // Add an area for each cause.
  svg.selectAll("path.area")
      .data(causes)
    .enter().append("path")
      .attr("class", "area")
      .style("fill", function(d, i) { return z(i); })
      .attr("d", d3.svg.area()
      .x(function(d) { return x(d.x); })
      .y0(function(d) { return y(d.y0); })
      .y1(function(d) { return y(d.y0 + d.y); }));
  
    
  
});