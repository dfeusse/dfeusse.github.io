var square = 50;
	
var Column01 = square * 1,
  	Column02 = square * 2,
  	Column03 = square * 3,
  	Column04 = square * 4,
  	Column05 = square * 5,
  	Column06 = square * 6,
  	Column07 = square * 7,
  	Column08 = square * 8,
  	Column09 = square * 9,
  	Column10 = square * 10,
  	Column11 = square * 11,
  	Column12 = square * 12,
  	Row01 = square * 1,
  	Row02 = square * 2,
  	Row03 = square * 3,
  	Row04 = square * 4,
  	Row05 = square * 5,
  	Row06 = square * 6,
  	Row07 = square * 7,
  	Row08 = square * 8;

var data2 = [
  	{"stateName":"Alaska","Column":Column01,"Row":Row01, "abbr":"AK"},
  	{"stateName":"California","Column":Column01,"Row":Row05, "abbr":"CA"},
  	{"stateName":"Hawaii","Column":Column01,"Row":Row08, "abbr":"HI"},
  	{"stateName":"Washington","Column":Column02,"Row":Row03, "abbr":"WA"},
  	{"stateName":"Oregon","Column":Column02,"Row":Row04, "abbr":"OR"},
  	{"stateName":"Nevada","Column":Column02,"Row":Row05, "abbr":"NV"},
  	{"stateName":"Montana","Column":Column03,"Row":Row03, "abbr":"MT"},
  	{"stateName":"Idaho","Column":Column03,"Row":Row04, "abbr":"ID"},
  	{"stateName":"Utah","Column":Column03,"Row":Row05, "abbr":"UT"},
  	{"stateName":"Arizona","Column":Column03,"Row":Row06, "abbr":"AZ"},
  	{"stateName":"North Dakota","Column":Column04,"Row":Row03, "abbr":"ND"},
  	{"stateName":"Wyoming","Column":Column04,"Row":Row04, "abbr":"WY"},
  	{"stateName":"Colorado","Column":Column04,"Row":Row05, "abbr":"CO"},
  	{"stateName":"New Mexico","Column":Column04,"Row":Row06, "abbr":"NM"},
  	{"stateName":"Texas","Column":Column04,"Row":Row07, "abbr":"TX"},
  	{"stateName":"South Dakota","Column":Column05,"Row":Row03, "abbr":"SD"},
  	{"stateName":"Nebraska","Column":Column05,"Row":Row04, "abbr":"NE"},
  	{"stateName":"Kansas","Column":Column05,"Row":Row05, "abbr":"KS"},
  	{"stateName":"Oklahoma","Column":Column05,"Row":Row06, "abbr":"OK"},
  	{"stateName":"Louisiana","Column":Column05,"Row":Row07, "abbr":"LA"},
  	{"stateName":"Minnesota","Column":Column06,"Row":Row03, "abbr":"MN"},
  	{"stateName":"Iowa","Column":Column06,"Row":Row04, "abbr":"IA"},
  	{"stateName":"Missouri","Column":Column06,"Row":Row05, "abbr":"MO"},
  	{"stateName":"Arkansas","Column":Column06,"Row":Row06, "abbr":"AR"},
  	{"stateName":"Mississippi","Column":Column06,"Row":Row07, "abbr":"MS"},
  	{"stateName":"Wisconsin","Column":Column07,"Row":Row03, "abbr":"WI"},
  	{"stateName":"Illinois","Column":Column07,"Row":Row04, "abbr":"IL"},
  	{"stateName":"Kentucky","Column":Column07,"Row":Row05, "abbr":"KY"},
  	{"stateName":"Tennessee","Column":Column07,"Row":Row06, "abbr":"TN"},
  	{"stateName":"Alabama","Column":Column07,"Row":Row07, "abbr":"AL"},
  	{"stateName":"Michigan","Column":Column08,"Row":Row03, "abbr":"MI"},
  	{"stateName":"Indiana","Column":Column08,"Row":Row04, "abbr":"IN"},
  	{"stateName":"West Virginia","Column":Column08,"Row":Row05, "abbr":"WV"},
  	{"stateName":"Virginia","Column":Column08,"Row":Row06, "abbr":"VA"},
  	{"stateName":"Georgia","Column":Column08,"Row":Row07, "abbr":"GA"},
  	{"stateName":"Florida","Column":Column08,"Row":Row08, "abbr":"FL"},
  	{"stateName":"Ohio","Column":Column09,"Row":Row04, "abbr":"OH"},
  	{"stateName":"Washington DC","Column":Column09,"Row":Row05, "abbr":"DC"},
  	{"stateName":"North Carolina","Column":Column09,"Row":Row06, "abbr":"NC"},
  	{"stateName":"South Carolina","Column":Column09,"Row":Row07, "abbr":"SC"},
  	{"stateName":"New York","Column":Column10,"Row":Row02, "abbr":"NY"},
  	{"stateName":"Connecticut","Column":Column10,"Row":Row03, "abbr":"CT"},
  	{"stateName":"Pennsylvania","Column":Column10,"Row":Row04, "abbr":"PA"},
  	{"stateName":"Maryland","Column":Column10,"Row":Row05, "abbr":"MD"},
  	{"stateName":"Vermont","Column":Column11,"Row":Row02, "abbr":"VT"},
  	{"stateName":"Rhode Island","Column":Column11,"Row":Row03, "abbr":"RI"},
  	{"stateName":"New Jersey","Column":Column11,"Row":Row04, "abbr":"NJ"},
  	{"stateName":"Delaware","Column":Column11,"Row":Row05, "abbr":"DE"},
  	{"stateName":"Maine","Column":Column12,"Row":Row01, "abbr":"ME"},
  	{"stateName":"New Hampshire","Column":Column12,"Row":Row02, "abbr":"NH"},
  	{"stateName":"Massachusetts","Column":Column12,"Row":Row03, "abbr":"MA"}
];

var data = [
  	{"stateName":"Alaska","Column":Column01,"Row":Row01, "abbr":"AK", "value":20},
  	{"stateName":"California","Column":Column01,"Row":Row05, "abbr":"CA", "value":10},
  	{"stateName":"Hawaii","Column":Column01,"Row":Row08, "abbr":"HI", "value":30},
  	{"stateName":"Washington","Column":Column02,"Row":Row03, "abbr":"WA", "value":23},
  	{"stateName":"Oregon","Column":Column02,"Row":Row04, "abbr":"OR", "value":4},
  	{"stateName":"Nevada","Column":Column02,"Row":Row05, "abbr":"NV", "value":24},
  	{"stateName":"Montana","Column":Column03,"Row":Row03, "abbr":"MT", "value":40},
  	{"stateName":"Idaho","Column":Column03,"Row":Row04, "abbr":"ID", "value":46},
  	{"stateName":"Utah","Column":Column03,"Row":Row05, "abbr":"UT", "value":7},
  	{"stateName":"Arizona","Column":Column03,"Row":Row06, "abbr":"AZ", "value":17},
  	{"stateName":"North Dakota","Column":Column04,"Row":Row03, "abbr":"ND", "value":2},
  	{"stateName":"Wyoming","Column":Column04,"Row":Row04, "abbr":"WY", "value":44},
  	{"stateName":"Colorado","Column":Column04,"Row":Row05, "abbr":"CO", "value":26},
  	{"stateName":"New Mexico","Column":Column04,"Row":Row06, "abbr":"NM", "value":29},
  	{"stateName":"Texas","Column":Column04,"Row":Row07, "abbr":"TX", "value":32},
  	{"stateName":"South Dakota","Column":Column05,"Row":Row03, "abbr":"SD", "value":41},
  	{"stateName":"Nebraska","Column":Column05,"Row":Row04, "abbr":"NE", "value":12},
  	{"stateName":"Kansas","Column":Column05,"Row":Row05, "abbr":"KS", "value":9},
  	{"stateName":"Oklahoma","Column":Column05,"Row":Row06, "abbr":"OK", "value":29},
  	{"stateName":"Louisiana","Column":Column05,"Row":Row07, "abbr":"LA", "value":2},
  	{"stateName":"Minnesota","Column":Column06,"Row":Row03, "abbr":"MN", "value":7},
  	{"stateName":"Iowa","Column":Column06,"Row":Row04, "abbr":"IA", "value":17},
  	{"stateName":"Missouri","Column":Column06,"Row":Row05, "abbr":"MO", "value":20},
  	{"stateName":"Arkansas","Column":Column06,"Row":Row06, "abbr":"AR", "value":27},
  	{"stateName":"Mississippi","Column":Column06,"Row":Row07, "abbr":"MS", "value":40},
  	{"stateName":"Wisconsin","Column":Column07,"Row":Row03, "abbr":"WI", "value":37},
  	{"stateName":"Illinois","Column":Column07,"Row":Row04, "abbr":"IL", "value":16},
  	{"stateName":"Kentucky","Column":Column07,"Row":Row05, "abbr":"KY", "value":11},
  	{"stateName":"Tennessee","Column":Column07,"Row":Row06, "abbr":"TN", "value":18},
  	{"stateName":"Alabama","Column":Column07,"Row":Row07, "abbr":"AL", "value":28},
  	{"stateName":"Michigan","Column":Column08,"Row":Row03, "abbr":"MI", "value":32},
  	{"stateName":"Indiana","Column":Column08,"Row":Row04, "abbr":"IN", "value":15},
  	{"stateName":"West Virginia","Column":Column08,"Row":Row05, "abbr":"WV", "value":12},
  	{"stateName":"Virginia","Column":Column08,"Row":Row06, "abbr":"VA", "value":20},
  	{"stateName":"Georgia","Column":Column08,"Row":Row07, "abbr":"GA", "value":2},
  	{"stateName":"Florida","Column":Column08,"Row":Row08, "abbr":"FL", "value":29},
  	{"stateName":"Ohio","Column":Column09,"Row":Row04, "abbr":"OH", "value":42},
  	{"stateName":"Washington DC","Column":Column09,"Row":Row05, "abbr":"DC", "value":16},
  	{"stateName":"North Carolina","Column":Column09,"Row":Row06, "abbr":"NC", "value":47},
  	{"stateName":"South Carolina","Column":Column09,"Row":Row07, "abbr":"SC", "value":20},
  	{"stateName":"New York","Column":Column10,"Row":Row02, "abbr":"NY", "value":12},
  	{"stateName":"Connecticut","Column":Column10,"Row":Row03, "abbr":"CT", "value":34},
  	{"stateName":"Pennsylvania","Column":Column10,"Row":Row04, "abbr":"PA", "value":22},
  	{"stateName":"Maryland","Column":Column10,"Row":Row05, "abbr":"MD", "value":12},
  	{"stateName":"Vermont","Column":Column11,"Row":Row02, "abbr":"VT", "value":32},
  	{"stateName":"Rhode Island","Column":Column11,"Row":Row03, "abbr":"RI", "value":39},
  	{"stateName":"New Jersey","Column":Column11,"Row":Row04, "abbr":"NJ", "value":7},
  	{"stateName":"Delaware","Column":Column11,"Row":Row05, "abbr":"DE", "value":44},
  	{"stateName":"Maine","Column":Column12,"Row":Row01, "abbr":"ME", "value":23},
  	{"stateName":"New Hampshire","Column":Column12,"Row":Row02, "abbr":"NH", "value":10},
  	{"stateName":"Massachusetts","Column":Column12,"Row":Row03, "abbr":"MA", "value":39}
];

var svg = d3.select("#states_visual").append("svg")
	.attr({
		height:500,
		width:700
	});

var heightScale = d3.scale.linear()
	//.domain([0, d3.max(function(d) {return d.])
	.domain([0, Column12])
	.range([0, Column12]);

var group = svg.append("g")
	.attr("transform", "translate(0,5)");

var color_scale = d3.scale.linear()
	.domain([0, d3.max(data, function(d) {return d.value }) ])
	//.range(["#01C6E0", "#8C00C2"]);
	//.range(['white', '#B9090B']);
  .range(['#f41b1d', '#700507']);

var rects = group.selectAll('rect')
	.data(data)
	.enter()
rects.append('rect')
	.attr({
	  	x: function(d,i) {return d.Column},
	  	y: function(d,i) {return heightScale(d.Row)},
	  	height: square,
	  	width:square,
	  	stroke: "white",
	  	fill: function(d) {return color_scale(d.value)}
});

var text = rects.append('text')
//.text('pone')
	.attr({
		x: function(d,i) {
    		return d.Column + square/2
  		},
  		y: function(d,i) {return heightScale(d.Row)+ 30}
	})
	.text(function(d) {
  		return d.abbr;
	})
	//.attr('fill', 'steelblue')
	.attr('fill', 'black')
	.attr("text-anchor", "middle")
	.style("font-size","14px");




