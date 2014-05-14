var format = d3.time.format("%m/%d/%y");

var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 1150 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([200, 0]);

var z = d3.scale.ordinal()
    .domain(["Positive", "Neutral", "Negative"])
    .range(["green", "white", "red"]);

var xAxisArea = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(10);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var stack = d3.layout.stack()
    .offset("zero")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value; });

var nest = d3.nest()
    .key(function(d) { return d.key; });

var area = d3.svg.area()
    .interpolate("cardinal")
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

var svg = d3.select("#sentiment").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

var chartcanvas = svg.append("g")
    .attr("transform", "translate(" + [margin.left + "," + margin.top] + ")");

chartcanvas.append("rect")
  .attr("id", "background")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("x", -40)
  .attr("y", -20)
  .style("fill", "A700AE");
 chartcanvas.append("g")
  .attr("id", "points") 

d3.csv("sentDiffArea.csv", function(data) {
  data.forEach(function(d) {
    d.date = format.parse(d.date);
    d.value = +d.value;
  });

  var layers = stack(nest.entries(data));

  x.domain(d3.extent(data, function(d) { return d.date; }));
  x.range([0, width - 75]);
  y.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);
  //y.range([0, 200])

  chartcanvas.selectAll(".layer")
      .data(layers)
    .enter().append("path")
      .attr("class", "layer")
      .attr("d", function(d) { return area(d.values); })
      .attr("transform", "translate(" + [60,10] + ")")
      .style("fill", function(d, i) { return z(i); });

  chartcanvas.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(60," + 210 + ")")
      .call(xAxisArea);

  chartcanvas.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(60," + 10 + ")")
      .call(yAxis);
  chartcanvas.append("text")
    .text("Sentiment, All Social Media")
    .attr("x", -10)
    .attr("y", 260)

});
