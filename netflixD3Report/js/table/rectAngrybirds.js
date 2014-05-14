function rectAB() {
var svg = d3.select("#rectAB").append("svg")
.attr({
  width:120,
  height:20
})

var data = [36271281]
var data2 = [36271281, 36224344, 26116516, 26002725, 36936, 32215]

var heightScale = d3.scale.linear()
	.domain([0, d3.max(data2, function(d) { return d; }) ])
	.range([0,120]);

var bars = svg.selectAll("rect")
	.data(data)
	.enter()
	.append("rect")
.attr({
  height:20,
  width: function(d,i) {
    return heightScale(d)
  },
  y: 0,
  x: 0    
})
//console.log(data)
}

rectAB()