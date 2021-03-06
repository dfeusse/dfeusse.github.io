function PieChart(element, data) {
	var self = this;
	var color = d3.scale.category10();
	var el = element[0];
	var width = el.clientWidth;
	var height = el.clientHeight;
	var min = Math.min(width, height);
	var pie = d3.layout.pie().sort(null);
	var arc = d3.svg.arc()
		.outerRadius(min / 2 * 0.9)
		.innerRadius(min / 2 * 0.5);

	svg = d3.select(el).append('svg')
		.attr({
			width: width,
			height: height
		})
		.append('g')
		.attr('transform', 'translate(' + width/2 + ',' + height/2 + ')');

	svg.on('mousedown', function(d) {
		self.onClick();
	});

	arcs = svg.selectAll('path.arc')
		.data(pie(data))
		.enter()
		.append('path')
		.attr('class', 'arc')
		.style('stroke', 'white')
		.attr('fill', function(d,i) {
			return color(i)
		})
		.each(function(d) {
			return this._current = d
		})

	var arcTween = function (a) {
		var i = d3.interpolate(this._current, a);
		this._current = i(0);
		return function(t) {
			return arc(i(t));
		};
	}
	this.onClick = function() {

	};

	this.updateData = function(newData, oldData) {
		var data = newData.slice(0); //copy
		var duration = 500;
		var PI = Math.PI;
		while(data.length < oldData.length) data.push(0);
		arcs = svg.selectAll('.arc')
			.data(pie(data));
		arcs
			.transition()
			.duration(duration)
			.attrTween('d', arcTween);
		arcs
			.enter()
			.append('path')
			.style('stroke', 'white')
			.attr('class', 'arc')
			.attr('fill', function(d,i) {
				return color(i)
			})
			.each(function(d) {
				this._current = {startAngle: 2*PI - 0.001, endAngle: 2*PI}
			})
			.transition()
			.duration(duration)
			.attrTween('d', arcTween);
		arcs
			.filter(function(d) {
				d.data===0
			})
			.transition()
			.duration(duration)
			.each(function(d) {
				d.startAngle = 2*PI - 0.001;
				d.endAngle = 2*PI;
			})
			.attrTween('d', arcTween)
			.remove();
	}
}