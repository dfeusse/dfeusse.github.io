var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(10,10,0);
    

var svg = d3.select("#chartContainer").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




d3.csv("YouGovData.csv", function(error, data) {

  {if (error) return console.log("there was an error loading the data: " + error);
      console.log("there are " + data.length + " elements in my dataset");
  
  console.log(data);
  console.log(data.map(function(d) { return d.bank }));

  data.forEach(function(d) {
    d.score = +d.score;
  });

  filteredData = data.filter(function(d) { return d.metric == "Impression"; });

  d3.select(".header").selectAll("h1")
        .data(data)
        .text(function(d) { return d.metric; });
  x.domain(filteredData.map(function(d) { return d.bank; }));
  y.domain([d3.min(filteredData, function(d) { return d.score;}), d3.max(filteredData, function(d) { return d.score; })])};
 
  bar = svg.selectAll("rect")
      .data(filteredData, function(d) {return d.bank; });

  bar.enter().append("rect")
      .attr("class", "bar")
      .attr("title", function(d) { return d.score; })
      .attr("x", function(d) { return x(d.bank); })
      .attr("width", x.rangeBand())
      .attr("y", y(0))
      .attr("height", 0)
      .on("mouseover", function(d) {
          div.transition()
              .duration(500)
              .style("opacity", .95);
          div.text(d.bank + ": " + d.score);
          svg.style("cursor", "none");
      })
      .on("mouseout", mouseout)
      .on("mousemove", mousemove)
      .transition()
      .duration(1500)
      .attr("y", function(d) { return d.score>0 ? y(d.score) : y(0); })
      .attr("height", function(d) { return Math.abs(y(d.score)-y(0)); });
  bar.exit()
      .transition()
      .duration(500)
      .attr("height", 0)
      .attr("y", y(0))
      .remove();

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + y(0) + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Score");

  var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 1e-6);



  function redraw(newData) {

    var rect = svg.selectAll("rect")
      .data(newData, function(d) {return d.bank; });

    x.domain(newData.map(function(d) { return d.bank; }));
    y.domain([d3.min(newData, function(d) { return d.score;}), d3.max(newData, function(d) { return d.score; })]);

    d3.select(".header").selectAll("h1")
      .data(newData)
      .transition()
      .duration(1000)
      .text(function(d) { return d.metric; });

    var newXAxis = d3.svg.axis()
      .scale(x)
      .orient("top");

    var newYAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickSize(10,10,0);

    rect.enter().append("rect")
        .attr("class", "bar")
        .attr("title", function(d) { return d.score; })
        .attr("x", function(d) { return x(d.bank); })
        .attr("width", x.rangeBand())
        .attr("y", y(0))
        .attr("height", 0)
        .on("mouseover", function(d) {
             div.transition()
                .duration(500)
                .style("opacity", .95);
            div.text(d.score);
            svg.style("cursor", "none");
        })
        .on("mouseout", mouseout)
        .on("mousemove", mousemove)
        .transition()
        .duration(1000)
        .attr("y", function(d) { return d.score>0 ? y(d.score) : y(0); })
        .attr("height", function(d) { return Math.abs(y(d.score)-y(0)); });
    
    rect.transition()
        .duration(1000)
        .attr("x", function(d) { return x(d.bank); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return d.score>0 ? y(d.score) : y(0); })
        .attr("height", function(d) { return Math.abs(y(d.score)-y(0)); });
    
    rect.exit()
        .transition()
        .duration(1000)
        .attr("y", y(0))
        .attr("height", 0)
        .remove();
    
    svg.selectAll(".x.axis")
        .transition()
        .duration(1000)
        .attr("transform", "translate(0," + y(0) + ")")
        .call(newXAxis);
    
    svg.selectAll(".y.axis")
        .transition()
        .duration(1000)
        .call(newYAxis);

  };


  function mousemove() {
    div
       .style("left", (d3.event.pageX - 34) + "px")
       .style("top", (d3.event.pageY - 12) + "px");
  };

  function mouseout() {
    div.transition()
        .duration(500)
        .style("opacity", 1e-6);
  };
  

  d3.selectAll("input[value=impression]").on("change", toggleImpression);
  d3.selectAll("input[value=awareness]").on("change", toggleAwareness);
  d3.selectAll("input[value=consideration]").on("change", toggleConsideration);
  d3.selectAll("input[value=recommend]").on("change", toggleRecommend);
  d3.selectAll("input[value=awareness]").on("change", toggleAwareness);
  d3.selectAll("input[value=value]").on("change", toggleValue);
  d3.selectAll("input[value=adAwareness]").on("change", toggleAdAwareness);
  d3.selectAll("input[value=womExposure]").on("change", toggleWOMExposure);
  d3.selectAll("input[value=purchaseIntent]").on("change", togglePurchaseIntent);
  d3.selectAll("input[value=currentCustomer]").on("change", toggleCurrentCustomer);

  function toggleImpression() {
    impData = data.filter(function(d) { return d.metric == "Impression"; });
    redraw(impData);
    console.log("ImpsSelect");
  };

  function toggleConsideration() {
   consData = data.filter(function(d) { return d.metric == "Consideration"; });
    redraw(consData);
    console.log("ImpsSelect");
  };

  function toggleRecommend() {
    recData = data.filter(function(d) { return d.metric == "Recommend"; });
    redraw(recData);
    console.log("ImpsSelect");
  }; 

  function toggleAwareness() {
    awareData = data.filter(function(d) { return d.metric == "Awareness"; });
    redraw(awareData);
    console.log("ImpsSelect");
  };   

  function toggleValue() {
    valueData = data.filter(function(d) { return d.metric == "Value"; });
    redraw(valueData);
    console.log("ImpsSelect");
  };  

  function toggleAdAwareness() {
    adAwareData = data.filter(function(d) { return d.metric == "Ad Awareness"; });
    redraw(adAwareData);
    console.log("ImpsSelect");
  };    

  function toggleWOMExposure() {
    WOMExposureData = data.filter(function(d) { return d.metric == "WOM Exposure"; });
    redraw(WOMExposureData);
    console.log("ImpsSelect");
  };    

  function togglePurchaseIntent() {
    purchaseIntentData = data.filter(function(d) { return d.metric == "Purchase Intent"; });
    redraw(purchaseIntentData);
    console.log("ImpsSelect");
  };    

  function toggleCurrentCustomer() {
    currentCustData = data.filter(function(d) { return d.metric == "Current Customer"; });
    redraw(currentCustData);
    console.log("ImpsSelect");
  };
});