var chart = d3.select(".keyword_textdiv")
var data = [
{"name": "Windows", "tweets": 20551},
{"name": "8", "tweets": 19998},



{"name": "RT", "tweets": 5219},
{"name": "Microsoft", "tweets": 4851},

{"name": "Windows8", "tweets": 2267},

{"name": "windows", "tweets": 1515},
{"name": "windows8", "tweets": 1395},

{"name": "new", "tweets": 1173},
{"name": "PC", "tweets": 1090},
{"name": "tablet", "tweets": 1083},

{"name": "will", "tweets": 964},
{"name": "launch", "tweets": 936},

{"name": "out", "tweets": 891},
{"name": "app", "tweets": 879},

{"name": "Win8", "tweets": 833},
{"name": "Surface", "tweets": 786},

{"name": "days", "tweets": 696},

{"name": "before", "tweets": 669},
{"name": "go", "tweets": 654},

{"name": "got", "tweets": 634},
{"name": "7", "tweets": 630},
  ]
    
var cx = 20;
var cy = 20;
var cw = 500;
var ch = 300;

//var fontsize = d3.scale.log() //for some reason log gives NaN
var fontsize = d3.scale.linear()
    .domain([0, 20551])
    .range([10, 32]);


chart.selectAll("span.word")
  .data(data)
  .enter()
  .append("span")
  .classed("word", true)
  .text(function(d, i) { return d.name + " (" + d.tweets +") "; })
  .style("font-size", function(d) { 
    //console.log(fontsize(d.tweets));
    return fontsize(d.tweets) + "px"; 
  })
  .style("color", "white")
