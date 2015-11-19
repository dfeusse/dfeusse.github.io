//reorder code using this forum post
// http://stackoverflow.com/questions/11102795/d3-node-labeling
var tip = d3.tip()
    .attr('class', 'd3-tip')
    //.html(function(d) { return 'name: ' + '<span>' + d.name + '</span>' + '<br>' + '<span>' +'$'+ d.value + '</span>' + ' raised' + '<br>' + d.category })
    .html(function(d) { return 'name: ' + '<span>' + d.show + '</span>' + '<br>' + 'theme: ' + '<span>' + d.theme + '</span>' + '<br>' + 'mentions: ' + '<span>' + d.mentions + '</span>' + '<br>' + 'sentiment: ' + '<span>' + d.sentiment + '</span>' + '<br>' + 'passion: ' + '<span>' + d.passion + '</span>';})
    .offset([-12, 0]);

var ICON_UNICODE = {
	//true: "\uf087", //thumbs up
	//false: "\uf088" // thumbs down
	true: "\uf00c", // checkbox
	false: "\uf00d" // x sign
}

var margin = {top: 0, right: 50, bottom: 50, left: 0},
	width = 800 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var correctCenters = {
	'true': {x: width/3, y: height/2.5},
	'false': {x: width/1.5, y: height/2.5}
}

var svg = d3.select('#visual').append('svg')
	.attr('width', width)
	.attr('height', height)
  .append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

svg.call(tip);

var nodes = [],
	damper = 0.1;

d3.json('/static/js/data.json', function(data) {
	//console.log(data)

	data.forEach(function(d) {

		node = {
			//parse date eventually
			correct: d.correct,
			show: d.show,
			mentions: d.mentions,
			theme: d.theme,
			sentiment: d.sentiment,
			passion: d.passion,
			//radius: radiusScale(parseInt(d.mentions, 10)),
			radius: 20,
			// SHOULD DO IF STATEMENT FOR RADIUS SIZE DEP ON DEVICE
			//radius: function() {
				//if (d.mentions) {return radiusScale(parseInt(d.mentions, 10))}
				//else {return 20}
				//return 20
			//},
			x: Math.random() * 900,
			y: Math.random() * 800
		};
		nodes.push(node);
	}); //end of data.forEach
	nodes.sort(function(a,b) {return b.value - a.value; });
	//console.log(nodes);

	var circles = svg.selectAll('.node')
		.data(nodes)
	//circles.enter()
		.enter()
		.append('g')
		.attr('class', 'node');
		
	circles.append('circle')
		.attr('class', 'mynodes')
		.attr('id', function(d,i) {return d.show + '_' + d.theme + '_' + i})
		//.attr('r', 20)
		//.attr('r', d3.max(nodes, function(d) {return radiusScale(d.mentions)})
		.attr('r', function(d) {return d.radius})
		.attr('stroke-width', 2)
		.attr('fill', function(d) {
			if (d.correct == true) {return '#3D9970'}
			else {return '#FF4136'}
		})
		//.attr('stroke', function(d) {return strokeColor(d.theme)})
		.attr('stroke', function(d) {
			if (d.correct == true) {return 'green'}
			else {return 'red'}
		});

	circles.selectAll('.mynodes').on('mouseover', tip.show);
	circles.selectAll('.mynodes').on('mouseout', tip.hide);

	function charge(d) {
		//return -Math.pow(d.radius*4, 2.0) / 60;
		//return -20;
		//return -40;
		//return d.radius * d.radius * -0.25;
		return d.radius * d.radius * -0.2;
	};

	var force = d3.layout.force()
		.nodes(nodes)
		.size([width, height]);

	circles.call(force.drag);

	force.gravity(-0.01)
		.charge(charge)
		.friction(0.95)
				.on('tick', function(e) {
				force.nodes().forEach(function(d) {
					//var target;
						//if (d.show) {d.show = d.show}
 						//else {d.show = null}
					var target = correctCenters[d.correct]
						d.x = d.x + (target.x - d.x) * (damper + 0.02) * e.alpha;
						d.y = d.y + (target.y - d.y) * (damper + 0.02) * e.alpha;
				})
				circles
					.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
			}); //end of .on('tick') etc etc
	force.start();

	circles
		.append('text')
		.attr('id', function(d,i) {return d.show + '_' + d.theme + '_' + i})
		//.attr("x", 1)
	    //.attr("y", ".31em")
	    .style("text-anchor", "middle")
	    .attr('dominant-baseline', 'central')
	    .attr('font-family', 'FontAwesome')
	    .attr('fill', 'white')
	    //.attr("class", "nodelabels")
	    .text(function(d) {
	    	return ICON_UNICODE[d.correct]
		}) 

	// do this every 5 seconds to get nodes to dance
	setInterval(function(){ 
		force.start();
	}, 5000);

}); //end of json function

