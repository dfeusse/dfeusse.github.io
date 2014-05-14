var svg = d3.select("#rectTwo").append("svg")
.attr({
  width:120,
  height:40
})

var data = [32]
var data2 = [20, 50, 25, 16, 37]

var heightScale = d3.scale.linear()
	.domain([0, d3.max(data2, function(d) { return d }) ])
	.range([0,50]);

var bars = svg.selectAll("rect")
	.data(data)
	.enter()
	.append("rect")
.attr({
  height:20,
  width: function(d,i) {
    return heightScale(d)
  },
  y: 12,
  x: 1    
})
//console.log(data)