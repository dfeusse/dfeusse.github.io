var width = 800,
	height = 430;

var tip = d3.tip()
    .attr('class', 'd3-tip')
    //.html(function(d) { return 'name: ' + '<span>' + d.name + '</span>' + '<br>' + '<span>' +'$'+ d.value + '</span>' + ' raised' + '<br>' + d.category })
    .html(function(d) { return 'name: ' + '<span>' + d.name + '</span>' + '<br>' + 'group: ' + '<span>' + d.group + '</span>' + '<br>' + 'mentions: ' + '<span>' + d.mentions + '</span>';})
    .offset([-12, 0]);

var buttonShowText = d3.select("#buttons")
    .append("input")
    .attr("class", "btn btn-primary")
    .attr("id", "button_showtext")
    .attr("type","button")
    .attr("value", "Show text");

var buttonNoText = d3.select("#buttons")
    .append("input")
    .attr("class", "btn btn-primary")
    .attr("id", "button_notext")
    .attr("type","button")
    .attr("value", "Hide text");

var buttonNoLinks = d3.select("#buttons")
    .append("input")
    .attr("class", "btn btn-info")
    .attr("id", "button_nolinks")
    .attr("type","button")
    .attr("value", "Hide links");

var buttonShowLinks = d3.select("#buttons")
    .append("input")
    .attr("class", "btn btn-info")
    .attr("id", "button_showlinks")
    .attr("type","button")
    .attr("value", "Show links");

var fillColor = d3.scale.ordinal()
	.domain(["eleven", "twelve", "thirteen", "two", "three"]) 
	//.range(['#8b0000', '#de8637', '#c4e8ba', 'steelblue', 'yellow']);
	.range(['#8b0000','#de8637','#ffe4ac','#8bb6a5','#004499']);

var colors = {
  "eleven": "#8b0000",
  "twelve": "#de8637",
  "thirteen": "#ffe4ac",
  "two": "#8bb6a5",
  "three": "#004499"
};

var svg = d3.select("#basic").append("svg")
	.attr("width", width)
	.attr("height", height);

var pone = svg.call(tip);

var force = d3.layout.force()
	.charge(-[500])
	.linkDistance([180])
	.size([width, height]);

//var g = svg.append("g")
d3.json("randomdata_valid_large.json", function(error, data) {

var lineWidth = d3.scale.linear()
	.domain([0, d3.max(data.links, function(d) {return d.value})])
	.range([1, 5]);

var nodeSize = d3.scale.linear()
	.domain([0, d3.max(data.nodes, function(d) {return d.mentions})])
	.range([5, 20]);

force
	.nodes(data.nodes)
	.links(data.links)
	//.charge(-120)
	.charge(-400)
	//.friction(0.8)
	.gravity(0.15)
	.on("tick", tick)
	.start();

//var links = svg.selectAll("line")
var links = svg.selectAll(".link")
	.data(data.links)
	.enter()
	.append("line")
	.attr("class", "link")
	.attr("stroke-width", function(d) {
		return lineWidth(d.value)
	});

//var nodes = svg.selectAll("circle")
var nodes = svg.selectAll(".node")
	.data(data.nodes)
	.enter()
	.append("g")
	.attr("class", "node")
	.call(force.drag);

nodes
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
	/*
	.attr("fill", function(d) {            // <== Add these
            if (d.name == "Subaru") {return "red"}  // <== Add these
            else    { return "black" }          // <== Add these
        ;}) 
    */                                    // <== Add these
    .attr("fill", function(d) {return fillColor(d.group)})
    //.on('mouseover', tip.show)
	//.on('mouseout', tip.hide);
	.on("mouseover", fade(.1))
	.on("mouseout", fade(1));

nodes.on('mouseover', tip.show);
nodes.on('mouseout', tip.hide);

function showNodes() {
	/*
	nodes
		.append("text")
		.attr("class", "nodelabels")
		.attr("dy", -5)
		//.attr("text-anchor", "middle")
		.text(function(d) {return d.name});
	*/
	// A copy of the text with a thick white stroke for legibility.
	/*
	nodes
		.append("text")
	    .attr("x", 8)
	    .attr("y", ".31em")
	    .attr("class", "nodelabels")
	    .text(function(d) { return d.name; });
	*/
	nodes
		.append("text")
	    .attr("x", 8)
	    .attr("y", ".31em")
	    .attr("class", "nodelabels")
	    .text(function(d) { return d.name; });

}


var linkedByIndex = {};
data.links.forEach(function(d) {
    linkedByIndex[d.source.index + "," + d.target.index] = 1;
});

function isConnected(a, b) {
    return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
}

function tick() {
	links
		.attr("x1", function(d) {
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

	nodes
	.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	/*
		.attr("cx", function(d) {
			return d.x;
		})
		.attr("cy", function(d) {
			return d.y;
		})
	*/
};

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
} //end of function fade(opacity)

buttonShowText
	.on("click", function() {
		showNodes();
	})

buttonNoText
	.on("click", function() {
		svg.selectAll(".nodelabels").remove()
	})

buttonNoLinks
	.on("click", function() {
		links
			.attr("opacity", 0)
	})

buttonShowLinks
	.on("click", function() {
		links
			.attr("opacity", 1)
	})
/*
var legend = svg.append("g")
	  .attr("class", "legend")
	  .attr("x", width - 65)
	  .attr("y", 25)
	  .attr("height", 100)
	  .attr("width", 100);

legend.selectAll('g')
	.data(data.nodes, function(d) {return d.group})
      .enter()
      .append('g')
      .each(function(d, i) {
        var g = d3.select(this);
        g.append("rect")
          .attr("x", width - 65)
          .attr("y", i * 4)
          .attr("width", 10)
          .attr("height", 10)
          .style("fill", function(d) {return fillColor(d.group)});
        
        g.append("text")
          .attr("x", width - 50)
          .attr("y", i * 4 + 10)
          .attr("height",30)
          .attr("width",100)
          .style("fill", function(d) {return fillColor(d.group)})
          .text(function(d) { return d.group; });
      })
*/ 

drawLegend();
  d3.select("#togglelegend").on("click", toggleLegend);

function drawLegend() {

  // Dimensions of legend item: width, height, spacing, radius of rounded rect.
  var li = {
    w: 75, h: 30, s: 3, r: 3
  };

  var legend = d3.select("#legend").append("svg")
      .attr("width", li.w)
      .attr("height", d3.keys(colors).length * (li.h + li.s));

  var g = legend.selectAll("g")
      .data(d3.entries(colors))
      .enter().append("svg:g")
      .attr("transform", function(d, i) {
              return "translate(0," + i * (li.h + li.s) + ")";
           });

  g.append("svg:rect")
      .attr("rx", li.r)
      .attr("ry", li.r)
      .attr("width", li.w)
      .attr("height", li.h)
      .style("fill", function(d) { return d.value; });

  g.append("svg:text")
      .attr("x", li.w / 2)
      .attr("y", li.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.key; });
}

function toggleLegend() {
  var legend = d3.select("#legend");
  if (legend.style("visibility") == "hidden") {
    legend.style("visibility", "");
  } else {
    legend.style("visibility", "hidden");
  }
}


 }) //end of json wrapper