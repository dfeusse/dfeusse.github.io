var titles = {
	"bar_title": "Five Most Visited Pages",
	//"bar_subtitle": "Hover over each bar to see the page's performance over time",
	"line_title": "Pages Trended Over Time",
	//"line_subtitle": "Total visits"
}

var subtitles = {
	"bar_title": {
		"overview": "Hover over each bar to see the trend over time.",
		"detail": "%s visits"
	},
	"line_title": {
		"overview": "This chart shows each page trended over time. Now showing visits for top 5 pages.",
		"detail": "%s visits over time"
	}
}

$(document).ready(function() {

	d3.select("#barchart_header").append("h4").text(titles["bar_title"]);
	//d3.select("#barchart_subheader").append("h5").text(subtitles["bar_title"].overview);
	d3.select("#linechart_header").append("h4").text(titles["line_title"]);
	//d3.select("#linechart_subheader").append("h5").text(subtitles["line_title"].overview);

	var parseDate = d3.time.format("%Y-%m-%d").parse;

	d3.json('data.json', function(error, data) {
		if (error) console.log("error on data_json, get it together dum dum");

		data.forEach(function(d) {
			d.date = parseDate(d.date)
		})
		console.log('##### original data')
		console.log(data)

		// BAR CHART DATA
		var barchartData = [];

		var nestedData = d3.nest()
			.key(function(d) {return d.name})
			.entries(data, d3.map)

		for(var i in nestedData) {
			newvalues = nestedData[i].values
			var newsum = d3.sum(newvalues, function(d) {
				return d.visits
			})

			newdict = {};
			newdict.name = nestedData[i].key
			newdict.value = newsum
			barchartData.push(newdict)

		} //end of for loop


		//for line chart, starting point
		var linetotalData = [];

		var nestedDate = d3.nest()
			.key(function(d) {return d.date})
			.entries(data, d3.map)

		for(var i in nestedDate) {
			val = nestedDate[i].values
			var datesum = d3.sum(val, function(d) {
				return d.visits
			})

			datedict = {};
			datedict.date = nestedDate[i].key
			datedict.visits = datesum
			linetotalData.push(datedict)
		}

		console.log('^^^^^^ total line chart data')
		console.log(linetotalData)

		//for line chart, hover
		var nestedByPage = d3.nest().key(function(d) {
			return d.name;
		}).entries(data.sort(function(a,b) {
			return +a.year - +b.year;
		}))
		var linechartHoverData = {};
		nestedByPage.forEach(function(name) {
			linechartHoverData[name.key] = [];
			name.values.forEach(function(val) {
				obj = {};
				obj["visits"] = val.visits;
				obj["name"] = name.key;
				obj["date"] = val.date;
				linechartHoverData[name.key].push(obj);
			});
		});		

		console.log('******** pone')
		console.log(linechartHoverData)

		console.log('$$$$$ barchart data: ')
		console.log(barchartData)


	//calling bar chart
	mainbarchart(barchartData, linechartHoverData);
	//calling line chart
	linkedlinechart(linetotalData);
	//show labels
	showLabels();

	function showLabels() {
		//d3.select("#barchart_subheader").remove();
		//d3.select("#linechart_subheader").remove();

		d3.select("#barchart_subheader").text(subtitles["bar_title"].overview);
		d3.select("#linechart_subheader").text(subtitles["line_title"].overview);

		//d3.selectAll("g#bigbarchart g.yaxis g.tick.major text").attr("class", null);
	}

	})//end of data.json function
}) //end of document.ready function (not sure if this funciton is necessary, but was recommended)