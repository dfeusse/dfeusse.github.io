var width = 1000,
	height = 800;

var svg = d3.select("#basic").append("svg")
	.attr("width", width)
	.attr("height", height);

//var g = svg.append("g")
d3.json("randomdata_valid_large.json", function(error, data) {

var lineWidth = d3.scale.linear()
	.domain([0, d3.max(data.links, function(d) {return d.value})])
	.range([0, 8]);

var nodeSize = d3.scale.linear()
	.domain([0, d3.max(data.nodes, function(d) {return d.mentions})])
	.range([5, 20]);

var force = d3.layout.force()
	.nodes(data.nodes)
	.links(data.links)
	.size([width, height])
	.linkDistance([175])
	.charge(-[500])
	//.charge(-120)
	//.friction(0.8)
	//.gravity(0.5)
	.start();

var links = svg.selectAll("line")
	.data(data.links)
	.enter()
	.append("line")
	//.style("stroke", "#c0c0c0");
	//.style("stroke", "#262626")
	.style("stroke", "white")
	//.style("stroke-opacity", .7)
	.attr("stroke-width", function(d) {
		return lineWidth(d.value)
	});

var nodes = svg.selectAll("circle")
	.data(data.nodes)
	.enter()
	.append("circle")
	//.attr("r", 20)
	.attr("r", function(d) {
		return nodeSize(d.mentions)
	})
	.attr("stroke-width", 3)
	//.attr("stroke-opacity", .7)
	.attr("stroke", "white")
	//.attr("fill-opacity", .8)
	//.attr('stroke', function(d) {return d3.rgb(fill_color(d.category)).darker(); });
	.attr("fill", function(d) {            // <== Add these
            if (d.name == "Subaru") {return "red"}  // <== Add these
            else    { return "black" }          // <== Add these
        ;})                                     // <== Add these
	.call(force.drag)
	.on("mouseover", fade(.1))
	.on("mouseout", fade(1));

var linkedByIndex = {};
data.links.forEach(function(d) {
    linkedByIndex[d.source.index + "," + d.target.index] = 1;
});

function isConnected(a, b) {
    return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
}

force.on("tick", function() {
	links.attr("x1", function(d) {
		return d.source.x;
	})
	.attr("y1", function(d) {
		return d.source.y;
	})
	.attr("x2", function(d) {
		return d.target.x;
	})
	.attr("y2", function(d) {
		return d.target.y;
	});

	nodes.attr("cx", function(d) {
		return d.x;
	})
	.attr("cy", function(d) {
		return d.y;
	})
});

// what would the correct data structure be?
// definitely a path
// maybe d3.svg.line.radial

/*
svg.append("g")
    .attr("class", "pone")
  .selectAll("path")
    .data(data.links)
  .enter().append("path")
  //d attribute defines the paths data
    .attr("d", links)//d3.svg.chord().radius(innerRadius))
    .style("fill", function(d) { return "red" })//fill(d.target.index); })
    .style("opacity", 1);
*/

function fade(opacity) {
	return function(d) {
		nodes.style("stroke-opacity", function(o) {
			thisOpacity = isConnected(d, o) ? 1 : opacity;
			this.setAttribute('fill-opacity', thisOpacity);
			return thisOpacity;
		});
		links.style("stroke-opacity", function(o) {
			return o.source === d || o.target === d ? 1 : opacity;
		})
	}
}

nodes.attr("cx", function(d) {
		return d.x;
	})
	.attr("cy", function(d) {
		return d.y;
	})
 

 })