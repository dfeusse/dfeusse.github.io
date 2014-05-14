function mainbarchart(data, linechartdata) {

	var margin = {top:10, right:20, bottom:40, left:40},
		width = 600,
		height = 300 - margin.bottom;

	var x = d3.scale.ordinal()
		.domain(data.map(function(d) {
			return d.name;
		}))
		.rangeRoundBands([0, width - margin.left], .05);

	var y = d3.scale.linear()
		.domain([0, d3.max(data, function(d) { 
			return d.value; 
		})])
	    .range([height, 0]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
        .scale(y)
        //.tickSize(0)
        //.tickPadding(3)
        //.tickFormat(formatPercent);
        .orient("left");

	var svg = d3.select('#barchart').append('svg')
		.attr({
			width: width,
			height: height + margin.bottom
		})
	  .append("g")
		.attr("transform", "translate(" + margin.left + ',' + margin.top + ")");

	var rects = svg.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr("id", function(d, i) {
            return "bar_" + i;
        })
		.attr({
			x: function(d,i) {return x(d.name) },
			y: function(d) {return y(d.value) },
			width: x.rangeBand(),
			height: function(d) {return height - y(d.value) }
		})
		.on('mouseover', showDetails)
		.on('mouseout', hideDetails);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + "265" + ")")
      .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

	function showDetails(d, i) {
		d3.select(this)
			.style('fill', 'red');
			console.log(linechartdata[d.name])
			linkedlinechart(linechartdata[d.name]);

		d3.select("#barchart_subheader").text(subtitles["bar_title"].detail.replace("%s", d.name));
		d3.select("#linechart_subheader").text(subtitles["line_title"].detail.replace("%s", d.name));
	}

	function hideDetails(d, i) {
		d3.select(this)
			.style('fill', 'black')
	}
}