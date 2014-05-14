var margin = {top:20, right:40, bottom:30, left:65},
	width = 720 - margin.left - margin.right,
	height = 330 - margin.top - margin.bottom;

var numberFormat = d3.format(',')
var decimalFormat = d3.format(".1f")
var percentFormat = d3.format(".1%")
var granularDecimalFormat = d3.format(".2f")
var parseDate = d3.time.format("%Y-%m-%d")
var transitionDuration = 1000;



var tip = d3.tip()
    .attr('class', 'd3-main-tip')
    //.html(function(d) { return '<span>' + numberFormat(d.value) + '</span>' })
    .html(function(d) {
        if (d.metric == "page_fans") {return '<span>' + numberFormat(d.value) + '</span>'}
        else if (d.metric == "page_fan_adds") {return '<span>' + numberFormat(d.value) + '</span>'}
        else if (d.metric == "unlikes_likes") {return '<span>' + granularDecimalFormat(d.value) + '</span>'}
        else if (d.metric == "post_engagement") {return '<span>' + percentFormat(d.value) + '</span>'}
        else if (d.metric == "post_virality") {return '<span>' + percentFormat(d.value) + '</span>'}
        else if (d.metric == "page_storytellers") {return '<span>' + numberFormat(d.value) + '</span>'}
    })
    .direction('n')
    .offset([-12, 0])

var x = d3.scale.ordinal()
	.rangeRoundBands([0, width], .1);
/*
var x = d3.time.scale()
	.rangeRoundBands([0, width], .1);
*/
var y = d3.scale.linear()
	.range([height- margin.top - margin.bottom, 0]);

var heightScale = d3.scale.linear()
	.range([0,height - margin.top - margin.bottom]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient('bottom');

var yAxis = d3.svg.axis()
	.scale(y)
	.orient('left')
	.tickSize(10,10,0);

var svg = d3.select('#chartContainer').append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
  .append('g')
  	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

//make ajax call
//metrics info: https://developers.facebook.com/docs/reference/api/insights/ 
//daily page stories (ptat) = http://localhost:3000/report/facebook?report=page_stories

//correct total page likes = http://localhost:3000/report/facebook?report=page_fans
//correct new likes = http://localhost:3000/report/facebook?report=page_fan_adds
//correct unlikes = http://localhost:3000/report/facebook?report=page_fan_removes
//correct (ptat) = http://localhost:3000/report/facebook?report=page_storytellers

//change key to be correct, place it in code, rerun url to load, then view

//page impressions = http://localhost:3000/report/facebook?report=page_impressions
//daily new likes = http://localhost:3000/report/facebook?report=page_fan_adds
//daily new likes (unique) = http://localhost:3000/report/facebook?report=page_fan_adds_unique
//daily unlikes = http://localhost:3000/report/facebook?report=page_fan_removes
//daily unlikes (unique) = http://localhost:3000/report/facebook?report=page_fan_removes_unique


//page stories
/* ourfbURL = 'http://localhost:3000/report/facebook?report=page_stories&start=1374000000&end=&format=json&period=day&action='
$.ajax({
    url: ourfbURL,
    //data: "message="+commentdata,
    type: 'GET',
    dataType: 'json',
    success: function (data) {
        //console.log(data.data.values);
		var metrics = data.data.values.map(function(item){
		return {
			date: item.endTimeString,
			metric: data.data.name,
			value: item.value
		};
	});
		console.log(metrics);
    },
    error: function(e) {
        alert('Error: '+e);
    }  
});
*/


//total pages likes
var total_page_likes;
//total_likes_url = 'http://localhost:3000/report/facebook?report=page_fans&start=1374000000&end=&format=json&period=lifetime&action='
total_likes_url = '/report/netflix?report=page_fans&start=1350000000&end=&format=json&period=lifetime&action=&groupBy=week'
$.ajax({
    url: total_likes_url,
    //data: "message="+commentdata,
    type: 'GET',
    async: false,
    dataType: 'json',
    success: function (data) {
        //console.log(data.data.values);
		var metrics = data.data.values.map(function(item){
		return {
			date: item.endTimeString,
			metric: data.data.name,
			value: item.value,
			title: data.data.title
		};
	});
		total_page_likes = metrics;
		console.log(metrics)
    },
    error: function(e) {
        alert('Error: '+e);
    }  
});

//new page likes
var new_page_likes;
//page_fan_adds = 'http://localhost:3000/report/facebook?report=page_fan_adds&start=1374000000&end=&format=json&period=day&action='
page_fan_adds = '/report/netflix?report=page_fan_adds&start=1350000000&end=&format=json&period=day&action=&groupBy=week'
$.ajax({
    url: page_fan_adds,
    //data: "message="+commentdata,
    type: 'GET',
    async: false,
    dataType: 'json',
    success: function (data) {
        //console.log(data.data.values);
		var metrics = data.data.values.map(function(item){
		return {
			date: item.endTimeString,
			metric: data.data.name,
			value: item.value,
			title: data.data.title
		};
	});
		//console.log('$$$$$$$$$$$$$')
		//console.log(metrics);
		//console.log('$$$$$$$$$$$$$')
		//window.cara = 10;

		new_page_likes = metrics;
    },
    error: function(e) {
        alert('Error: '+e);
    }  
});
		//console.log('-------------')
		//console.log(new_page_likes);
		//console.log('-------------')


//page unlikes
var page_fan_removes;
//page_fan_removes_url = 'http://localhost:3000/report/facebook?report=page_fan_removes&start=1374000000&end=&format=json&period=day&action='
page_fan_removes_url = '/report/netflix?report=page_fan_removes&start=1350000000&end=&format=json&period=day&action=&groupBy=week'
$.ajax({
    url: page_fan_removes_url,
    //data: "message="+commentdata,
    type: 'GET',
    async: false,
    dataType: 'json',
    success: function (data) {
        //console.log(data.data.values);
		var metrics_unlikes = data.data.values.map(function(item){
		return {
			date: item.endTimeString,
			metric: data.data.name,
			value: item.value,
			title: data.data.title
		};
	});
		page_fan_removes = metrics_unlikes;
    },
    error: function(e) {
        alert('Error: '+e);
    }  
});
//console.log('holaholahola')
//console.log(page_fan_removes)
//console.log('holaholahola')


//ptat
var ptat;
//var page_storytellers = 'http://localhost:3000/report/facebook?report=page_storytellers&start=1374000000&end=&format=json&period=day&action='
var page_storytellers = '/report/netflix?report=page_storytellers&start=1350000000&end=&format=json&period=day&action=&groupBy=week'
$.ajax({
    url: page_storytellers,
    //data: "message="+commentdata,
    type: 'GET',
    async: false,
    dataType: 'json',
    success: function (data) {
        //console.log(data.data.values);
		var metrics = data.data.values.map(function(item){
		return {
			date: item.endTimeString,
			metric: data.data.name,
			value: item.value,
			title: data.data.title
		};
	});
		ptat = metrics;
    },
    error: function(e) {
        alert('Error: '+e);
    }  
});

//lifetime engaged users
var page_engaged_users;
//var page_engaged_users_url = 'http://localhost:3000/report/facebook?report=page_engaged_users&start=1374000000&end=&format=json&period=day&action='
var page_engaged_users_url = '/report/netflix?report=page_engaged_users&start=1350000000&end=&format=json&period=day&action=&groupBy=week'
$.ajax({
    url: page_engaged_users_url,
    //data: "message="+commentdata,
    type: 'GET',
    async: false,
    dataType: 'json',
    success: function (data) {
        //console.log(data.data.values);
		var metrics = data.data.values.map(function(item){
		return {
			date: item.endTimeString,
			metric: data.data.name,
			value: item.value,
			title: data.data.title
		};
	});
		page_engaged_users = metrics;
    },
    error: function(e) {
        alert('Error: '+e);
    }  
});

//lifetime post total reach
var page_posts_impressions_unique;
//var page_posts_impressions_unique_url = 'http://localhost:3000/report/facebook?report=page_posts_impressions_unique&start=1374000000&end=&format=json&period=day&action='
var page_posts_impressions_unique_url = '/report/netflix?report=page_posts_impressions_unique&start=1350000000&end=&format=json&period=day&action=&groupBy=week'
$.ajax({
    url: page_posts_impressions_unique_url,
    //data: "message="+commentdata,
    type: 'GET',
    async: false,
    dataType: 'json',
    success: function (data) {
        //console.log(data.data.values);
		var metrics = data.data.values.map(function(item){
		return {
			date: item.endTimeString,
			metric: data.data.name,
			value: item.value,
			title: data.data.title
		};
	});
		page_posts_impressions_unique = metrics;
    },
    error: function(e) {
        alert('Error: '+e);
    }  
});

//lifetime post stories
//var post_stories_url = 'http://localhost:3000/report/facebook?report=post_stories&start=1374000000&end=&format=json&period=day&action='
var page_stories;
//var page_stories_url = 'http://localhost:3000/report/facebook?report=page_stories&start=1374000000&end=&format=json&period=day&action='
var page_stories_url = '/report/netflix?report=page_stories&start=1350000000&end=&format=json&period=day&action=&groupBy=week'
$.ajax({
    url: page_stories_url,
    //data: "message="+commentdata,
    type: 'GET',
    async: false,
    dataType: 'json',
    success: function (data) {
        //console.log(data.data.values);
		var metrics = data.data.values.map(function(item){
		return {
			date: item.endTimeString,
			metric: data.data.name,
			value: item.value,
			title: data.data.title
		};
	});
		page_stories = metrics;
    },
    error: function(e) {
        alert('Error: '+e);
    }  
});


//console.log('++++==========+++++')
//console.log(total_page_likes)
//console.log(new_page_likes);
//console.log(page_fan_removes)
//console.log(ptat)
//console.log(page_engaged_users)
//console.log(page_posts_impressions_unique)
//console.log(page_stories)
//console.log('++++==========+++++')



/*
//division calculation
var new_data = [];
var originalJson = new_page_likes;
var moreJson = page_fan_removes;
console.log('###################')
console.log(originalJson);
console.log(moreJson);
console.log('###################')
for(var i = 0; i < originalJson.length; i++){   
    for(var j = 0; j < moreJson.length; j++){
        if(originalJson[i]["date"] == moreJson[j]["date"]){
            //for(var key in moreJson[j]){
            //    originalJson[i][key] = moreJson[j][key]
            //}
            var new_data_element = {};
            new_data_element.date = originalJson[i]['date'];
            new_data_element.metric = 'unlikes_likes';
            new_data_element.value = moreJson[i]['value'] / originalJson[i]['value'] //think of how to divide by zero
            new_data.push(new_data_element);
            //break;           
       }
   }
}
console.log('###################')
//console.log(originalJson)
console.log(new_data)
console.log('###################')
*/

//UNLIKES / LIKES calculations
var unlikes_likes_data = [];
for(var i = 0; i < page_fan_removes.length; i++){   
    for(var j = 0; j < new_page_likes.length; j++){
        if(page_fan_removes[i]["date"] == new_page_likes[j]["date"]){
            //for(var key in moreJson[j]){
            //    originalJson[i][key] = moreJson[j][key]
            //}
            var new_data_element = {};
            new_data_element.date = page_fan_removes[i]['date'];
            new_data_element.metric = 'unlikes_likes';
            new_data_element.value = new_page_likes[i]['value'] != 0 ? page_fan_removes[i]['value'] / new_page_likes[i]['value'] : 0;
            new_data_element.title = 'Unlikes / Likes';
            unlikes_likes_data.push(new_data_element);
            //break;           
       }
   }
}
console.log('###################')
console.log(unlikes_likes_data)
//console.log('###################')

//POST ENGAGEMENT calculations; engaged users / reach
var post_engagement_data = [];
for(var i = 0; i < page_engaged_users.length; i++){   
    for(var j = 0; j < page_posts_impressions_unique.length; j++){
        if(page_engaged_users[i]["date"] == page_posts_impressions_unique[j]["date"]){

            var pe_data_element = {};
            pe_data_element.date = page_engaged_users[i]['date'];
            pe_data_element.metric = 'post_engagement';
            pe_data_element.value = page_posts_impressions_unique[i]['value'] != 0 ? page_engaged_users[i]['value'] / page_posts_impressions_unique[i]['value'] : 0;
            pe_data_element.title = 'Engagement';
            post_engagement_data.push(pe_data_element);       
       }
   }
}
//console.log('###################')
console.log(post_engagement_data)
//console.log('###################')

//POST VIRALITY calculations; stories / reach
var post_virality_data = [];
for(var i = 0; i < page_stories.length; i++){   
    for(var j = 0; j < page_posts_impressions_unique.length; j++){
        if(page_stories[i]["date"] == page_posts_impressions_unique[j]["date"]){
            //for(var key in moreJson[j]){
            //    originalJson[i][key] = moreJson[j][key]
            //}
            var pv_data_element = {};
            pv_data_element.date = page_stories[i]['date'];
            pv_data_element.metric = 'post_virality';
            pv_data_element.value = page_posts_impressions_unique[i]['value'] != 0 ? page_stories[i]['value'] / page_posts_impressions_unique[i]['value'] : 0;
            pv_data_element.title = 'Post Virality';
            post_virality_data.push(pv_data_element);
            //break;           
       }
   }
}
//console.log('###################')
//console.log(post_virality_data)
//console.log('###################')

var data = total_page_likes.concat(new_page_likes).concat(unlikes_likes_data).concat(post_engagement_data).concat(post_virality_data).concat(ptat);
//console.log('$$$$$$$$$$$$$$$$$$$$')
//console.log(data)


//var renderVisual = function(data) {


	filteredData = data.filter(function(d) { return d.metric == "page_fans"; });
	
	x.domain(filteredData.map(function(d) { return d.date; }));
	y.domain([0, d3.max(filteredData, function(d) {return d.value;})])
	heightScale.domain([0, d3.max(filteredData, function(d) {return d.value;}) ])

	d3.select(".title_eachbar").selectAll(".title_eachbar_text")
		.data(data)
		.text(function(d) {return d.title; });

	//var odds = postData.filter(function(d, i) { return i & 1; });
///////////////////////
//TEXT



//posts
postData = data.filter(function(d) { return d.metric == "page_fans"; });

var postLast = postData[0]
var postLastValue = postLast.value
d3.selectAll(".posts_week_data")
	//.data(postData)
	.text(numberFormat(postLastValue));

var postSum = d3.sum(postData, function(d) { return d.value; })
/* removed because summing total lifetime posts is wrong
d3.selectAll(".posts_total_data")
	//.data(postData)
	.text(numberFormat(postSum));
*/
//% post
var postMean = d3.mean(postData, function(d) { return d.value; })
//console.log(postMean)
//console.log(postLastValue)
var postDiff = (postLastValue - postMean) / postMean
//console.log(postDiff)
d3.selectAll(".posts_percent_change")
	.text(percentFormat(postDiff))
	.style("color", function(d) {
		if (postDiff > 0) {return "green"}
			else { return "red"}
	});

//impressions
impressionData = data.filter(function(d) { return d.metric == "page_fan_adds";});

var impressionLast = impressionData[0]
var impressionLastValue = impressionLast.value
d3.selectAll(".impressions_week_data")
	.text(numberFormat(impressionLastValue));

var impressionSum = d3.sum(impressionData, function(d) {return d.value; })
d3.selectAll(".impressions_total_data")
	.text(numberFormat(impressionSum));
//% impr
var imprMean = d3.mean(impressionData, function(d) {return d.value; })
var imprDiff = (impressionLastValue - imprMean) / imprMean
d3.selectAll(".impressions_percent_change")
	.text(percentFormat(imprDiff))
	.style("color", function(d) {
		if (imprDiff > 0) {return "green"}
			else { return "red"}
	});

//passion
passionData = data.filter(function(d) { return d.metric== "unlikes_likes"; })

var passionLast = passionData[0]
var passionLastValue = passionLast.value
d3.selectAll(".passion_week_data")
	.text(granularDecimalFormat(passionLastValue));

var passionMean = d3.mean(passionData, function(d) {return d.value; })
d3.selectAll(".passion_total_data")
	.text(granularDecimalFormat(passionMean));
//% passion
var passionDiff = (passionLastValue - passionMean) / passionMean
d3.selectAll(".passion_percent_change")
	.text(percentFormat(passionDiff))
	.style("color", function(d) {
		if (passionDiff >= 0) {return "green"}
			else { return "red"}
	});

//positive sentiment
positiveData = data.filter(function(d) { return d.metric == "post_engagement"; })

var positiveLast = positiveData[0]
var positiveLastValue = positiveLast.value
d3.selectAll(".positive_week_data")
	.text(percentFormat(positiveLastValue));

var positiveSum = d3.mean(positiveData, function(d) {return d.value; })
d3.selectAll(".positive_total_data")
	.text(percentFormat(positiveSum));
//%pos
var positiveMean = d3.mean(positiveData, function(d) {return d.value; })
var positiveDiff = (positiveLastValue - positiveMean) / positiveMean
d3.selectAll(".positive_percent_change")
	.text(percentFormat(positiveDiff))
	.style("color", function(d) {
		if (positiveDiff > 0) {return "green"}
			else { return "red"}
	});

//negative sentiment
negativeData = data.filter(function(d) {return d.metric == "post_virality"; })

var negativeLast = negativeData[0]
var negativeLastValue = negativeLast.value
d3.selectAll(".negative_week_data")
	.text(percentFormat(negativeLastValue));

var negativeSum = d3.mean(negativeData, function(d) {return d.value; })
d3.selectAll(".negative_total_data")
	.text(percentFormat(negativeSum));
//%neg
var negativeMean = d3.mean(negativeData, function(d) {return d.value; })
var negativeDiff = (negativeLastValue - negativeMean) / negativeMean
d3.selectAll(".negative_percent_change")
	.text(percentFormat(negativeDiff))
	.style("color", function(d) {
		if (negativeDiff > 0) {return "green"}
			else { return "red"}
	});

//net sentiment
netsentimentData = data.filter(function(d) { return d.metric == "page_storytellers"; })

var netsentimentLast = netsentimentData[0]
netsentimentLastValue = netsentimentLast.value
d3.selectAll(".netsentiment_week_data")
	.text(numberFormat(netsentimentLastValue));

var netsentimentMean = d3.sum(netsentimentData, function(d) {return d.value; })
d3.selectAll(".netsentiment_total_data")
	.text(numberFormat(netsentimentMean));
//%net
var netsentimentDiff = (netsentimentLastValue - netsentimentMean) / netsentimentMean
d3.selectAll(".netsentiment_percent_change")
	.text(percentFormat(netsentimentDiff))
	.style("color", function(d) {
		if (netsentimentDiff > 0) {return "green"}
			else { return "red"}
	});

//posts
//need the weekly average, and then it's just a formula


//END OF TEXT
///////////////////////////

	var bar = svg.selectAll('rect')
		.data(filteredData);
	bar.enter()
		.append('rect')
		.attr('width', x.rangeBand())
		.attr('height', 0)
		.attr('x', function(d,i) {
  			return x(d.date)
		})
		.style("fill", "#b9090b")
		/*
		.attr('y', function(d) {return height - margin.top - margin.bottom - y(d.value)})
		*/
		.attr('y', height - margin.top - margin.bottom)
		
		.on('mouseover', tip.show)
      	.on('mouseout', tip.hide)

		.transition()
		.duration(1000)

		.attr('y', function(d,i) {
  			return height - margin.top - margin.bottom - heightScale(d.value)
		})
		.attr('height', function(d,i) {
  			return heightScale(d.value)
		})
		

	bar.exit()
		.transition()
		.duration(transitionDuration)
		.attr('height', 0)
		.attr('y', heightScale())
		.remove();

	svg.append("g")
      	.attr("class", "x axis")
      	.attr("transform", "translate(0," + (height - margin.top -margin.bottom) + ")")
      	.style("font-size", "8px")
      	.call(xAxis)
      	.selectAll("text")  
            //.style("text-anchor", "end")
            //.attr("dx", "-.8em")
            .attr("dy", "-6px") //width
            .attr("dx", "-35px") //height
            //.attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-90)" 
                });

    svg.append("g")
    	.attr("class", "y axis")
    	.transition()
    	.style("font-size", "8px")
		.duration(transitionDuration)
    	.call(yAxis);

	bar.call(tip)

function redraw(newData, barColor) {
    
	x.domain(newData.map(function(d) { return d.date; }));
	y.domain([0, d3.max(newData, function(d) {return d.value;})])
	heightScale.domain([0, d3.max(newData, function(d) {return d.value;}) ])

	d3.select(".title_eachbar").selectAll(".title_eachbar_text")
		.data(newData)
		.transition()
		.duration(transitionDuration)
		.text(function(d) {return d.title; });


    var newYAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickSize(10,10,0);

	var rect = svg.selectAll('rect')
		.data(newData, function(d) {return d.date; });

	rect.enter()//.insert("g", ".axis")
   		.append('rect')
   		.attr('class', 'bar')
   		.attr('width', x.rangeBand())
	//.attr('height', 0)
		.attr('x', function (d, i) {
		    return x(d.date)
		})
	//.attr('y', height - margin.top - margin.bottom)

		.transition()
		.duration(transitionDuration)

		.attr('y', function (d, i) {
		    return height - margin.top - margin.bottom - heightScale(d.value)
		})
		.attr('height', function (d, i) {
		    return heightScale(d.value)
		});

	rect.transition()
		.duration(transitionDuration)
		.style("fill", barColor)
		.attr('width', x.rangeBand())
		.attr('height', function (d, i) {
		    return heightScale(d.value)
		})
		.attr('x', function (d, i) {
		    return x(d.date)
		})
		.attr('y', function (d, i) {
		    return height - margin.top - margin.bottom - heightScale(d.value)
		});

	rect.exit()
		.transition()
		.duration(transitionDuration)
		.attr('y', height - margin.top - margin.bottom)
		.attr('height', 0)
		.remove();

	$('.x.axis').stop(true, true);
    $('.x.axis').hide();

	var newXAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');

	svg.selectAll(".x.axis")
        .attr("transform", "translate(0," + (height - margin.top - margin.bottom) + ")")
        .call(newXAxis)
        .selectAll("text")
		.attr("dy", "-6px") //width
        .attr("dx", "-35px") //height
        .attr("transform", function (d) {
		    return "rotate(-90)";
		});            

    svg.selectAll(".y.axis")
        .transition()
        .duration(transitionDuration)
        .call(newYAxis);

    //this is to make sure labels come out gradually. there are cases when some of the charts may have different number of data points.
    $(".x.axis").animate({ height: "toggle", opacity: "toggle" }, transitionDuration * 2);

} // end of function redraw

d3.selectAll("input[value=posts]").on("change", togglePosts);
d3.selectAll("input[value=impressions]").on("change", toggleImpressions);
d3.selectAll("input[value=passion]").on("change", togglePassion);
d3.selectAll("input[value=positive]").on("change", togglePositive);
d3.selectAll("input[value=negative]").on("change", toggleNegative);
d3.selectAll("input[value=net]").on("change", toggleNet);

function togglePosts() {
	postData = data.filter(function(d) { return d.metric == "page_fans"; });
	redraw(postData, "#b9090b");
};

function toggleImpressions() {
	impressionData = data.filter(function(d) {return d.metric == "page_fan_adds"; });
	redraw(impressionData, "#f29e38");
};

function togglePassion() {
	passionData = data.filter(function(d) {return d.metric == "unlikes_likes"; });
	redraw(passionData, "#1c578c");
};

function togglePositive() {
	positiveData = data.filter(function(d) {return d.metric == "post_engagement"; });
	redraw(positiveData, "#5787a5");
};

function toggleNegative() {
	negativeData = data.filter(function(d) {return d.metric == "post_virality"; });
	redraw(negativeData, "#f2e0c9");
};

function toggleNet() {
	netsentimentData = data.filter(function(d) {return d.metric == "page_storytellers"; });
	redraw(netsentimentData, "#f2d750");
};
