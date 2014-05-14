var chart = d3.select(".hashtag_textdiv")
var data = [
{"name": "#Windows8", "tweets": 2130},
{"name": "#windows8", "tweets": 1346},
{"name": "#windows", "tweets": 572},
{"name": "#windows8keys", "tweets": 522},
{"name": "#Giveaways", "tweets": 522},
{"name": "#win8", "tweets": 288},
{"name": "#Win8", "tweets": 230},
{"name": "#tech", "tweets": 220},
{"name": "#Microsoft", "tweets": 219},
{"name": "#Windows", "tweets": 207},
{"name": "#microsoft", "tweets": 148},
{"name": "#tablet", "tweets": 147},
{"name": "#news", "tweets": 118},
{"name": "#Tech", "tweets": 107},
{"name": "#hp", "tweets": 95},
{"name": "#Surface", "tweets": 92},
]
    
var cx = 20;
var cy = 20;
var cw = 500;
var ch = 300;

//var fontsize = d3.scale.log() //for some reason log gives NaN
var fontsize = d3.scale.linear()
    .domain([0, 2130])
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
 
 /* .sort(function(a,b) { 
    return a.tweets < b.tweets;
  }) */