var svg = d3.select("#topSites").append("svg")
    .attr("height", 410)
    .attr("width", 570)
    
var data = [
  {"sentiment": "a", "value": 11714},
  {"sentiment": "b", "value": 4877},
  {"sentiment": "c", "value": 4608},
  {"sentiment": "d", "value": 3282},
  {"sentiment": "e", "value": 2969},
  {"sentiment": "f", "value": 1722},
  {"sentiment": "g", "value": 1584},
  {"sentiment": "h", "value": 1367},
  {"sentiment": "i", "value": 1168}
  ];
  
var cx = 0;
var cy = 0;
var cw = 570;
var ch = 410;

var heightScale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.value; })])
	.range([0, 450]);
    
var chartsites = svg.append("g")
    .attr("transform", "translate(" + [cx,cy] + ")");

chartsites.append("rect")
  .attr("id", "bg")
  .attr("width", cw)
  .attr("height", ch)
  .style("fill", "00A600")

chartsites.append("g")
  .attr("id", "sites")
  
var hbars = chartsites.select("#sites").selectAll("rect.bars")
    .data(data)
hbars.enter()
  .append("rect")
  .classed("bars", true)
  .attr("height", 28)
  .attr("width", function(d, i) {
    return heightScale(d.value) })
  .attr("x", function(d, i) { 
    return 57 })
  .attr("y", function(d, i) {
    return (i * 33) + 34; })
  .style("fill", "white")
  .on('mouseover', function(d, i) {
    d3.select(this).style('fill','lightgrey');
    	hoverTextSitesName
          .text(d.value)
          .attr("fill", "white")
              .attr("text-anchor", "start")
              .attr("x", 19)
              .attr("y", i * 33 + 52)
              .style("font-size", 11);
            })
			.on('mouseout', function(d, i) {
              hoverTextSitesName
                .text("");
				d3.select(this).style('fill', 'white');
				});
 chartsites.append("text")
   .text("facebook.com")
   .style("fill", "#001E4E")
   .attr("x", 60)
   .attr("y", 50)
   .style("font-size", 11)
chartsites.append("text")
  .text("southkoreannews.com")
  .style("fill", "#001E4E")
     .attr("x", 60)
   .attr("y", 85)
   .style("font-size", 11)
chartsites.append("text")
  .text("chicagonews.com")
  .style("fill", "#001E4E")
     .attr("x", 60)
   .attr("y", 118)
   .style("font-size", 11)
chartsites.append("text")
  .text("istockanalyst.com")
  .style("fill", "#001E4E")
     .attr("x", 60)
   .attr("y", 152)
   .style("font-size", 11)
chartsites.append("text")
  .text("blogspot.com")
  .style("fill", "#001E4E")
     .attr("x", 60)
   .attr("y", 183)
   .style("font-size", 11)
chartsites.append("text")
  .text("lunaicoutpost.com")
  .style("fill", "#001E4E")
     .attr("x", 60)
   .attr("y", 215)
   .style("font-size", 11)
chartsites.append("text")
  .text("hardwarezone.com.sg")
  .style("fill", "#001E4E")
     .attr("x", 60)
   .attr("y", 247)
   .style("font-size", 11)
chartsites.append("text")
  .text("pcmag.com")
  .style("fill", "#001E4E")
     .attr("x", 60)
   .attr("y", 280)
   .style("font-size", 11)
chartsites.append("text")
  .text("streetinsider.com")
  .style("fill", "#001E4E")
     .attr("x", 60)
   .attr("y", 314)
   .style("font-size", 11)
chartsites.append("text")
  .text("Top Sites")
  .attr("x", 10)
  .attr("y", ch - 10)
  chartsites.append("text")
  .text("*outlier ommited: Twitter, 986,084 mentions")
  .attr("x", 300)
  .attr("y", ch - 10)
  
  //Axis
var xAxis = d3.svg.axis()
    .scale(heightScale)
    .orient("top")
    .ticks(5)
chartsites.append("g")
  .attr("class", "axis")
  //.style("stroke", "black")
  .style("fill", "white")
  .style("font-size", 11)
  .attr("transform", "translate(" + [57, 360] + ")")
  .call(xAxis)
 
var hoverTextSitesName = chartsites.append("text");

