function barChart(element, data) {
	console.log('BAR CHART CALLED')
	var self = this;
	//var color = d3.scale.category20b();
	var el = element[0];
	var width = el.clientWidth;
	//var height = el.clientWidth;
	var height = el.clientHeight;
	//var width = 400;
	//var height = 400;
	var svg,
		bars;


	svg = d3.select(el).append('svg')
		.attr({
			width: width,
			height: height
		})
		//.append('g')
		//.attr('transform', 'translate(' + width/2 + ',' + height/2 + ')');
/*
	x = d3.scale.linear()
        .range([0, width]);

    y = d3.scale.ordinal()
        .rangeRoundBands([0, height], .05);

    y.domain(data.map(function(d) { return d; } ));
    x.domain([0, d3.max(data, function(d) { return d; }) ]);
*/
    var x = d3.scale.ordinal()
		.rangeRoundBands([0, width], .05);

	var y = d3.scale.linear()
	    .range([height, 0]);

	x.domain(data.map(function(d) {
		return d;
	}))

	y.domain([0, d3.max(data, function(d) { 
		return d; 
	})]);

	bars = svg.selectAll('rect.bars')
		.data(data)
		.enter()
		.append('rect')
		.attr('class', 'bars')
		/*
		.each(function(d) {
			return this._current = d
		})
		.attr("width", function(d) { return x(d); })
        .attr("height", y.rangeBand())
        .attr("x", 5)
        .attr("y", y.rangeBand() / 2)
        */
        /*
        .attr("x", function(d,i) {return i*21 + 10})
        .attr("y", 0)
        .attr("width", 20)
        .attr("height", function(d) {return d; })
		*/
        .attr({
			//x: function(d) {return d.date},
			x: function(d,i) {return x(d) },
			y: function(d) {return y(d) },
			width: x.rangeBand(),
			height: function(d) {return height - y(d) }
		})

/*
	function resize() {
		
		svg.attr({
			width: width,
			height: height
		})

		y.range([height, 0])
		x.rangeRoundBands([0, width], .05);

		bars.attr({
			//x: function(d) {return d.date},
			x: function(d,i) {return x(d) },
			y: function(d) {return y(d) },
			width: x.rangeBand(),
			height: function(d) {return height - y(d) }
		});
	}

	scope.$watch(function() {
		return el.clientWidth * el.clientHeight
	}, function() {
		width = el.clientWidth
		height = el.clientHeight
		resize()
	})
 */       
}