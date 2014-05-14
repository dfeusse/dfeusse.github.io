var width = 960;
var height = 500;

var color = d3.scale.threshold()
  .domain([0, 750, 1250, 2250, 2750, 5000, 15000, 30000, 70000])
  .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)", "rgb(33,113,181)", "rgb(8,81,156)", "rgb(8,48,107)"]);

var svg = d3.select("#map").append("svg")
  .attr("width", width)
  .attr("height", height);

d3.json("CHstatedata11.6.json", function(data) {
  d3.json("us-states.json", function(collection) {
    svg.selectAll("path")
      .data(collection.features)
      .enter()
      .append("path")
      .attr("d", d3.geo.path())
      .style("fill", function(d) { return color(data[d.id]); })
      .append("title")
        .text(function(d) { return d.properties.name + ": " + data[d.id] + " posts"; });
  });

});
