chart = d3.select(".linkspre_textdiv");
data = [
{"name": "http://t.co/cdnoI8pK", "tweets": 362},
{"name": "http://t.co/9He7SuXA", "tweets": 108},
{"name": "http://t.co/6hrtFOLs", "tweets": 83},
{"name": "http://t.co/aXkxemD0", "tweets": 69},
{"name": "http://t.co/FapnxsWh", "tweets": 60},
{"name": "http://t.co/l9b73dXX", "tweets": 42},
{"name": "http://t.co/oXYNOrcr", "tweets": 32},
{"name": "http://t.co/EgQ4eMaX", "tweets": 28},
{"name": "http://t.co/h9pNQpmT", "tweets": 26},
{"name": "http://t.co/bwSOLW7R", "tweets": 26},
  ];
    
var cx = 20;
var cy = 20;
var cw = 500;
var ch = 300;

//var fontsize = d3.scale.log() //for some reason log gives NaN
var fontsize = d3.scale.linear()
    .domain([0, 362])
    .range([10, 32]);

chart.selectAll("span.word")
  .data(data)
  .enter()
  .append("span")
  .classed("word", true)
  .text(function(d, i) { return d.name + " (" + d.tweets + ") "; })
  .style("font-size", function(d) { 
    //console.log(fontsize(d.tweets));
    return fontsize(d.tweets) + "px"; 
  })
