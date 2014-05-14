var display = d3.select(".keywordpost_textdiv")
var data = [
  {"name": "windows8", "tweets": 10},
  {"name": "tablet", "tweets": 40},
  {"name": "apps", "tweets": 30},
  {"name": "dev", "tweets": 30},
  {"name": "surface", "tweets": 35},
  {"name": "developer", "tweets": 20},
  {"name": "suck", "tweets": 10},
  {"name": "xbox", "tweets": 7},
  {"name": "laptop", "tweets": 15},
  {"name": "desktop", "tweets": 20},
  {"name": "awesome", "tweets": 12},
  {"name": "games", "tweets": 28},
]
    
var cx = 20;
var cy = 20;
var cw = 500;
var ch = 300;

//var fontsize = d3.scale.log() //for some reason log gives NaN
var fontsize = d3.scale.linear()
    .domain([0, 40])
    .range([10, 32]);

var chart = display.append("div")
.attr("width", 880)
.attr("height", 200)
    .classed("chart", true);

chart.selectAll("span.word")
  .data(data)
  .enter()
  .append("span")
  .classed("word", true)
  .text(function(d, i) { return d.name + "(" + d.tweets + " tweets) "; })
  .style("font-size", function(d) { 
    //console.log(fontsize(d.tweets));
    return fontsize(d.tweets) + "px"; 
  })
  .style("color", "white")
  .sort(function(a,b) { 
    return a.tweets < b.tweets;
  })