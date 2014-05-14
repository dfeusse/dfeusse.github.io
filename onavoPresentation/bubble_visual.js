var data = [
    {"week": 1, "date": "8-Feb-13", "month": "Feb", "name": "Team Rubicon", "category": "disaster relief", "donation": 95, "location": "x"},
    {"week": 2, "date": "15-Feb-13", "month": "Feb", "name": "Project C.U.R.E.", "category": "health_wellness", "donation": 245, "location": "x"},
    {"week": 3, "date": "22-Feb-13", "month": "Feb", "name": "Building Tomorrow", "category": "education", "donation": 430, "location": "x"},
    {"week": 4, "date": "1-Mar-13", "month": "Mar", "name": "P.S. Arts", "category": "children", "donation": 565, "location": "x"},
    {"week": 5, "date": "8-Mar-13", "month": "Mar", "name": "I Am That Girl", "category": "womens issues", "donation": 590, "location": "x"},
    {"week": 6, "date": "15-Mar-13", "month": "Mar", "name": "The Adventure Project", "category": "human rights", "donation": 610, "location": "x"},
    {"week": 7, "date": "22-Mar-13", "month": "Mar", "name": "Water.org", "category": "hunger_water", "donation": 690, "location": "x"},
    {"week": 8, "date": "29-Mar-13", "month": "Mar", "name": "Can Do Multiple Sclerosis", "category": "health_wellness", "donation": 725, "location": "x"},
    {"week": 9, "date": "5-Apr-13", "month": "Apr", "name": "Bonnie J. Addario Lung Cancer Foundation", "category": "health_wellness", "donation": 730, "location": "x"},
    {"week": 10, "date": "12-Apr-13", "month": "Apr", "name": "Move For Hunger", "category": "hunger_water", "donation": 740, "location": "x"},
    {"week": 11, "date": "19-Apr-13", "month": "Apr", "name": "TUGG Boston Marathon Fundraiser", "category": "disaster relief", "donation": 770, "location": "x"},
    {"week": 12, "date": "26-Apr-13", "month": "Apr", "name": "Injured Marine Semper Fi Fund", "category": "disaster relief", "donation": 810, "location": "x"},
    {"week": 13, "date": "3-May-13", "month": "May", "name": "Free Wheelchair Mission", "category": "health_wellness", "donation": 815, "location": "x"},
    {"week": 14, "date": "10-May-13", "month": "May", "name": "Citizens For Animal Prevention", "category": "animals", "donation": 830, "location": "x"},
    {"week": 15, "date": "17-May-13", "month": "May", "name": "American Foundation for Suicide Prevention", "category": "education", "donation": 850, "location": "x"},
    {"week": 16, "date": "24-May-13", "month": "May", "name": "Team Rubicon - OK Tornado Support", "category": "disaster relief", "donation": 850, "location": "x"},
    {"week": 17, "date": "31-May-13", "month": "May", "name": "Matthew 25 Ministries - OK Tornado Relief", "category": "disaster relief", "donation": 865, "location": "x"},
    {"week": 18, "date": "7-Jun-13", "month": "Jun", "name": "Henry Street Settlement", "category": "human rights", "donation": 875, "location": "x"},
    {"week": 19, "date": "14-Jun-13", "month": "Jun", "name": "Action Against Hunger", "category": "hunger_water", "donation": 885, "location": "x"}
];

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function(d) { return 'charity: ' + '<span>' + d.name + '</span>' + '<br>' + '<span>' +'$'+ d.value + '</span>' + ' raised' + '<br>' + d.category })
    //.html(function(d) { return d.name; })
    .offset([-12, 0]);

var buttonAll = d3.select("#buttons")
    .append("input")
    //.attr("class", "btn btn-large btn-block btn-primary")
    .attr("class", "btn")
    .attr("id", "button_all")
    .attr("type","button")
    .attr("value", "All Donations");

var buttonWeekly = d3.select("#buttons")
    .append("input")
    .attr("class", "btn")
    .attr("id", "button_weekly")
    .attr("type","button")
    .attr("value", "Monthly Donations");

var buttonCategory = d3.select("#buttons")
    .append("input")
    .attr("class", "btn")
    .attr("id", "button_category")
    .attr("type","button")
    .attr("value", "Charity Class");

var width = 592,
	height = 520,
	layout_gravity = -0.01,
	damper = 0.1,
	nodes = [],
	vis, force, circles, radius_scale;

var center = {x: width / 2, y: height / 2};

var center_all = {x: 296, y: 250};

var month_centers = {
    "Feb": {x: 148, y: 175},
    "Mar": {x: 296, y: 175},
    "Apr": {x: 444, y: 175},
    "May": {x: 197, y: 370},
    "Jun": {x: 394, y: 370}
    //"31": {x: width - 160, y: 400}
};

var category_centers = {
    "animals": {x: 118.5, y: 175},
    "children": {x: 236, y: 175},
    "disaster relief": {x: 355.5, y: 175},
    "education": {x: 474, y: 175},
    "health_wellness": {x: 118.5, y: 400},
    "human rights": {x: 236, y: 400},
    "hunger_water": {x: 355.5, y: 400},
    "womens issues": {x: 474, y: 400}
};

var fill_color = d3.scale.ordinal()
	.domain(["animals", "children", "disaster relief", "education", "health_wellness", "human rights", "hunger_water", "womens issues"])
	.range(["#d71028","#FAD640", "black", "#238443", "#ff7b00", "#8a8989", "steelblue", "#6A51A3"]);

//var max_amount = d3.max(data, function(d) {return parseInt(d.donation, 10); });
var max_amount = d3.max(data, function(d) {return d.donation;});

//var radius_scale = d3.scale.pow().exponent(0.5)
var radius_scale = d3.scale.linear()
	.domain([0, max_amount])
	.range([2, 25]);

data.forEach(function(d) {
	node = {
		id: d.week,
        date: d.date,
		radius: radius_scale(parseInt(d.donation, 10)),
        value: d.donation,
		name: d.name,
		//group: d.group,
		//year: d.start_year,
		x: Math.random() * 900,
		y: Math.random() * 800,
        //meetup: d.event_id,
        month: d.month,
        category: d.category
	};
	nodes.push(node);
});

nodes.sort(function(a,b) {return b.value - a.value; });

vis = d3.select("#display").append("svg")
    .attr('width', width)
    .attr('height', height)
    .attr('id', 'svg_vis');

var pone = vis.call(tip);

circles = vis.selectAll('circle')
	.data(nodes, function(d) {return d.id; });

circles.enter()
	.append('circle')
	.attr('r', function(d) {return d.radius})
	.attr('fill', function(d) {return fill_color(d.category); })
	.attr('stroke-width', 2)
	.attr('stroke', function(d) {return d3.rgb(fill_color(d.category)).darker(); });

//circles.on("mouseover", myMouseOverFunction)

/*
circles.on("mouseover", function(d) {
    var circle = d3.select(this);
        //circle.attr("stroke", "red");
        if (d.id == 1) {
            return circle.attr("stroke", "red")}
         //   else {return "yellow"}
})
    .on("mouseout", myMouseOutFunction);
*/

function charge(d) {
	return -Math.pow(d.radius * 4, 2.0) / 60;
    //return -Math.pow(50, 2.0) / 60;
}

force = d3.layout.force()
	.nodes(nodes)
	.size([width, height]);

circles.call(force.drag);

force.gravity(-0.01)
	.charge(charge)
	.friction(0.9)
	.on('tick', function(e) {
			force.nodes().forEach(function(d) {
                //var target = center
                var target = month_centers[d.month]
				d.x = d.x + (target.x - d.x) * (damper + 0.02) * e.alpha;
				d.y = d.y + (target.y - d.y) * (damper + 0.02) * e.alpha;
			})
			vis.selectAll('circle')
				.attr('cx', function(d) {return d.x;})
				.attr('cy', function(d) {return d.y;});
	});

//column labeling
var meetups_x = {"February": 148 - 55, "March": 296 - 10, "April": 444 + 45, "May": 197 - 30, "June": 394 + 27};
var meetups_y = {"February": 50, "March": 50, "April": 50, "May": 300, "June": 300};
var meetups_x_data = d3.keys(meetups_x)
//var meetups_y_data = d3.keys(meetups_y)
var columnlabels = vis.selectAll("body")
    .data(meetups_x_data);

columnlabels.enter().append("text")
    .attr("class", "years")
    .attr("x", function(d) { return meetups_x[d]; })
    .attr("y", function(d) { return meetups_y[d]; })
    .attr("text-anchor", "middle")
    .text(function(d) { return d; });

//start
force.start();

//first button, show all weeks together
buttonAll
    .on("click", function() {
        force//.gravity(-0.01)
        //.charge(charge)
        //.friction(0.9)
        .on('tick', function(e) {
                force.nodes().forEach(function(d) {
                    var target = center_all
                    //var target = meetup_centers[d.meetup]
                    d.x = d.x + (target.x - d.x) * (damper + 0.02) * e.alpha;
                    d.y = d.y + (target.y - d.y) * (damper + 0.02) * e.alpha;
                })
                vis.selectAll('circle')
                    .attr('cx', function(d) {return d.x;})
                    .attr('cy', function(d) {return d.y;});
        });

        //hide years
        vis.selectAll(".years").remove();
        //vis.selectAll(".years").transition().duration(1000).remove();
        //hide rows
        vis.selectAll(".rows").remove();

        //labels
        var meetups_x = {"All Friday5 Donations": width / 2 - 0};
        var meetups_y = {"All Friday5 Donations": 70};
        var meetups_x_data = d3.keys(meetups_x)
        //var meetups_y_data = d3.keys(meetups_y)
        var columnlabels = vis.selectAll("body")
            .data(meetups_x_data);

        columnlabels.enter().append("text")
            .attr("class", "years")
            .attr("x", function(d) { return meetups_x[d]; })
            .attr("y", function(d) { return meetups_y[d]; })
            .attr("text-anchor", "middle")
            .text(function(d) { return d; });

        //start
        force.start();
    })

//second button, break up by week
buttonWeekly
    .on("click", function() {
        force//.gravity(-0.01)
        //.charge(charge)
        //.friction(0.9)
        .on('tick', function(e) {
            force.nodes().forEach(function(d) {
                //var target = center
                var target = month_centers[d.month]
                d.x = d.x + (target.x - d.x) * (damper + 0.02) * e.alpha;
                d.y = d.y + (target.y - d.y) * (damper + 0.02) * e.alpha;
            })
            vis.selectAll('circle')
                .attr('cx', function(d) {return d.x;})
                .attr('cy', function(d) {return d.y;});
    });

        //hide years
        vis.selectAll(".years").remove();
        //vis.selectAll(".years").transition().duration(1000).remove();
        //hide rows
        vis.selectAll(".rows").remove();

        //column labeling
        var meetups_x = {"February": 148 - 55, "March": 296 - 10, "April": 444 + 45, "May": 197 - 30, "June": 394 + 27};
        var meetups_y = {"February": 50, "March": 50, "April": 50, "May": 300, "June": 300};
        var meetups_x_data = d3.keys(meetups_x)
        //var meetups_y_data = d3.keys(meetups_y)
        var columnlabels = vis.selectAll("body")
            .data(meetups_x_data);

        columnlabels.enter().append("text")
            .attr("class", "years")
            .attr("x", function(d) { return meetups_x[d]; })
            .attr("y", function(d) { return meetups_y[d]; })
            .attr("text-anchor", "middle")
            .text(function(d) { return d; });
        //start
        force.start();
    }) //end of buttonWeekly

//third button, break up by category
buttonCategory
    .on("click", function() {
        force//.gravity(-0.01)
        //.charge(charge)
        //.friction(0.9)
        .on('tick', function(e) {
            force.nodes().forEach(function(d) {
                //var target = center
                var target = category_centers[d.category]
                d.x = d.x + (target.x - d.x) * (damper + 0.02) * e.alpha;
                d.y = d.y + (target.y - d.y) * (damper + 0.02) * e.alpha;
            })
            vis.selectAll('circle')
                .attr('cx', function(d) {return d.x;})
                .attr('cy', function(d) {return d.y;});
    });

        //hide years
        vis.selectAll(".years").remove();
        //vis.selectAll(".years").transition().duration(1000).remove();
        //hide rows
        vis.selectAll(".rows").remove();

        //column labeling
        var meetups_x = {"Animals": 118.5 - 47, 
                        "Children": 236 - 30, 
                        "Disaster Relief": 355.5 + 10, 
                        "Education": 479 + 55, 
                        "Health & Wellness": 118.5 - 47, 
                        "Human Rights": 236 - 15, 
                        "Hunger & Water": 355.5 + 20, 
                        "Womens Issue's": 479 + 45};

        var meetups_y = {"Animals": 50, 
                        "Children": 50, 
                        "Disaster Relief": 50, 
                        "Education": 50, 
                        "Health & Wellness": 325,
                        "Human Rights": 325, 
                        "Hunger & Water": 325, 
                        "Womens Issue's": 325};

        var meetups_x_data = d3.keys(meetups_x)
        //var meetups_y_data = d3.keys(meetups_y)
        var columnlabels = vis.selectAll("body")
            .data(meetups_x_data);

        columnlabels.enter().append("text")
            .attr("class", "years")
            .attr("x", function(d) { return meetups_x[d]; })
            .attr("y", function(d) { return meetups_y[d]; })
            .attr("text-anchor", "middle")
            .text(function(d) { return d; });
        //start
        force.start();
    }) //end of buttonWeekly

//initialize tooltips
circles.on('mouseover', tip.show);
circles.on('mouseout', tip.hide);