function linkedlinechart(data) {

	console.log('emmaemmaemmaemmawatson')
	console.log(data)

	data.forEach(function(d) {
		//d.date = +d.date;
		d.date = new Date(d.date);
	});

	data.sort(function(a,b) {
		return a.date - b.date;
	});

	var margin = {top: 20, right: 20, bottom: 30, left: 30},
    	width = 400 - margin.left - margin.right,
    	height = 320 - margin.top - margin.bottom;

	var x = d3.time.scale()
		.domain(d3.extent(data, function(d) { return d.date; }))
    	.range([0, width]);

	var y = d3.scale.linear()
		.domain(d3.extent(data, function(d) { return d.visits; }))
	    .range([height, 0]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	var line = d3.svg.line()
		.defined(function(d) {
	            return d.visits != null;
	        })
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.visits); })
	    .interpolate("monotone");

	if (data && d3.select("#linechart svg")[0][0]) update(data);
    else drawme(data);

	function drawme(data) {
		var vis = d3.select("#linechart").append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		vis.append("path")
		    //.datum(data)
		    .attr("class", "linechart")
		    .attr("d", line(data));
/*
		vis.append("g")
            .attr("class", "linechart yaxis")
            //.attr("transform", "translate(" + margin.left + ",0)")
            .call(yAxis);

        vis.append("g")
            .attr("class", "linechart xaxis")
            //.attr("transform", "translate(0," + (height - margin.bottom) + ")")
            .call(xAxis);
*/
		var g = vis.append("g").attr("class", "circles");

		g.selectAll("circle.data")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "data")
            .attr("cy", line.y())
            .attr("cx", line.x())
            .attr("r", "8.5")
            .attr("id", function(d) {
                return d["date"].getFullYear();
            })
            .style("opacity", 0.1)
            .style("fill", "red")
            .on("mouseover", showLineDetails)
            .on("mouseout", hideLineDetails);
	} //end of drawme function

	function update(data) {
		var vis = d3.select("#linechart svg").transition();

		vis.select(".linechart")
			.duration(750)
			.attr("d", line(data))

		var circles = d3.select("#linechart svg g.circles");

        var circles = circles.selectAll("circle.data")
            .data(data);

        circles
            .transition()
            .duration(750)
            .attr("cx", function(d) {
                return x(d.date);
            })
            .attr("cy", function(d) {
                return y(d.visits)
            });

        circles.enter().insert("circle")
            .attr("class", "data")
            .attr("cy", function(d) {
                return y(d.visits);
            })
            .attr("cx", function(d) {
                return x(d.date);
            })
            .attr("r", "5")
            .attr("id", function(d) {
                return d["date"].getFullYear();
            })
            .style("opacity", 1)
            .on("mouseover", showLineDetails)
            .on("mouseout", hideLineDetails);

        circles.exit().remove();
	} //end of update(data) function

	function showLineDetails(d, i) {
        d3.select(this).style('opacity', 1);
    }
    function hideLineDetails(d, i) {
        d3.select(this).style('opacity', .1);
    }
	

}