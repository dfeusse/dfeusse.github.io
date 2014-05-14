var svg = d3.select("#six").append("svg")
  .attr("width", 1175)
  .attr("height", 450);

var preReactionData = [
  {'reaction': 'lol', 'tweets': 92},
  {'reaction': 'omg', 'tweets': 40},
  {'reaction': 'wtf', 'tweets': 31}
  ]
    
var postReactionData = [
  {'reaction': 'lol', 'tweets': 65},
  {'reaction': 'omg', 'tweets': 17},
  {'reaction': 'wtf', 'tweets': 51}
  ]

var totalReactionData = [
  {'reaction': 'lol', 'tweets': 157},
  {'reaction': 'omg', 'tweets': 57},
  {'reaction': 'wtf', 'tweets': 82}
  ]
  
var preEmoticonData = [
  {'emoticon': ':)', 'tweets': 190},
  {'emoticon': ':(', 'tweets': 18},
  {'emoticon': ':/', 'tweets': 3},
  {'emoticon': '<3', 'tweets': 14}
  ]
    
var postEmoticonData = [
  {'emoticon': ':)', 'tweets': 177},
  {'emoticon': ':(', 'tweets': 32},
  {'emoticon': ':/', 'tweets': 5},
  {'emoticon': '<3', 'tweets': 12}
  ]
    
var totalEmoticonData = [
  {'emoticon': ':)', 'tweets': 367},
  {'emoticon': ':(', 'tweets': 50},
  {'emoticon': ':/', 'tweets': 7},
  {'emoticon': '<3', 'tweets': 26}
  ]

var preSwearingData = [
  {'swear': 'strongly', 'tweets': 77},
  {'swear': 'lightly', 'tweets': 39}
  ]    
    
var postSwearingData = [
  {'swear': 'strongly', 'tweets': 29},
  {'swear': 'lightly', 'tweets': 50}
  ]
    
var totalSwearingData = [
  {'swear': 'strongly', 'tweets': 106},
  {'swear': 'lightly', 'tweets': 89}
  ]

var prePolarizingData = [
  {'polarize': 'positive', 'tweets': 603},
  {'polarize': 'negative', 'tweets': 116}
  ]    

var postPolarizingData = [
  {'polarize': 'positive', 'tweets': 634},
  {'polarize': 'negative', 'tweets': 132}
  ]    
    
var totalPolarizingData = [
  {'polarize': 'positive', 'tweets': 1237},
  {'polarize': 'negative', 'tweets': 248}
  ]

var preConversationData = [
  {'conversation': 'reply', 'tweets': 9642},
  {'conversation': 'RT', 'tweets': 4133}
  ]    

var postConversationData = [
  {'conversation': 'reply', 'tweets': 5411},
  {'conversation': 'RT', 'tweets': 3907}
  ]    
    
var totalConversationData = [
  {'conversation': 'reply', 'tweets': 15053},
  {'conversation': 'RT', 'tweets': 8040}
  ]
   
var preCertaintyData = [
  {'certainty': '!', 'tweets': 4232},
  {'certainty': '?', 'tweets': 6981}
  ]    
   
var postCertaintyData = [
  {'certainty': '!', 'tweets': 2627},
  {'certainty': '?', 'tweets': 3680}
  ]    
    
var totalCertaintyData = [
  {'certainty': '!', 'tweets': 6859},
  {'certainty': '?', 'tweets': 10661}
  ]
  

var cx = 16;
var cy = 0; 
var cw = 1170;
var ch = 440;
var maxRange = 300;
var tilewidth = 377;
var tileheight = 200;
var barHeight = 20;
var barSpacing = 22;
var textSpacing = 21;

var columnOneX = 47;
var columnTwoX = 431;
var columnThreeX = 815;
var rowOneY = 55;
var rowOneYfourbars = rowOneY - 21;
var rowTwoY = 257;
var rowTwoYtwobars = rowTwoY + 11;

var rowOneAxis = 159;
var rowTwoAxis = 355;
 
var columnOneHeader = columnOneX - 30;
var columnTwoHeader = columnTwoX - 30;
var columnThreeHeader = columnThreeX - 30;
var rowOneHeader = 185;
var rowTwoHeader = 395;

var barColor = "white";
var hoverColor = "lightgrey";
var hoverTextTweets = "white";
var hoverTextVariable = "black";
var axisHeaderColor = "white";

var x = d3.scale.linear()
    .domain([0, 64])
    .range([0, maxRange]);

var widthReactionScale = d3.scale.linear()
    .domain([0, d3.max(totalReactionData, function(d) { return d.tweets; })])
  .range([0, maxRange]);


var widthEmoticonScale = d3.scale.linear()
    .domain([0, d3.max(totalEmoticonData, function(d) { return d.tweets; })])
  .range([0, maxRange]);


var widthSwearingScale = d3.scale.linear()
    .domain([0, d3.max(totalSwearingData, function(d) { return d.tweets; })])
  .range([0, maxRange]);


var widthPolarizingScale = d3.scale.linear()
    .domain([0, d3.max(totalPolarizingData, function(d) { return d.tweets; })])
  .range([0, maxRange]);


var widthConversationScale = d3.scale.linear()
    .domain([0, d3.max(totalConversationData, function(d) { return d.tweets; })])
  .range([0, maxRange]);

var widthCertaintyScale = d3.scale.linear()
    .domain([0, d3.max(totalCertaintyData, function(d) { return d.tweets; })])
  .range([0, maxRange]);

var chart = svg.append("g")
    .attr("transform", "translate(" + [cx,cy] + ")");

chart.append("rect")
   .attr("id", "bg")
   .attr("width", cw)
   .attr("height", ch)
   .attr("fill", "white")
   
chart.append("g")
  .attr("id", "points")
//  .attr("transform", "translate(" + [0,0] + ")")
 
//viz 1 background
chart.append("rect")
  .attr("id", "bgReaction")
  .attr("fill", "#FF981D")
  .attr("x", 0)
  .attr("y", 210)
  .attr("width", tilewidth)
  .attr("height", tileheight)
chart.append("g")
  .attr("id", "first")
//VIZ 1 Reaction
var hbarsReaction = chart.select("#first").selectAll("rect.reactionBars")
   .data(totalReactionData)
hbarsReaction.enter()
  .append("rect")
  .classed("bars", true)
  .attr("width", function(d, i) {
        return widthReactionScale(d.tweets)
      })
  .attr("height", barHeight)
  .attr("x", function(d, i) {
        return columnOneX
      })
   .attr("y", function(d, i) { 
        return (i * barSpacing) + rowTwoY; 
      })
      .style("fill", barColor)
      .on('mouseover', function(d,i) {
         d3.select(this).style('fill', hoverColor);  
            hoverTextName 
              .text(d.tweets)
              .attr("fill", hoverTextTweets)
              .attr("text-anchor", "start")
              .attr("x", 25)
              .attr("y", i * textSpacing + rowTwoY + 14)
              .style("font-size", 11);
      hoverTextVariable
              .text(d.reaction)
              .attr("fill", hoverTextVariable)
              .attr("text-anchor", "start")
              .attr("x", 50)
              .attr("y", i * textSpacing + rowTwoY + 13)
              .style("font-size", 11);
            })
      .on('mouseout', function(d, i) {
              hoverTextName
                .text("");
              hoverTextVariable
                .text("");
        d3.select(this).style('fill', barColor);
        });
    
//Reaction Axis 
var xAxisReaction = d3.svg.axis()
    .scale(widthReactionScale)
    .orient("top")
    .ticks(5)
chart.append("g")
  .attr("class", "axis")
 // .style("stroke", axisHeaderColor)
  .style("fill", axisHeaderColor)
  .style("font-size", 11)
  .attr("transform", "translate(" + [columnOneX, rowTwoAxis] + ")")
  .call(xAxisReaction)
chart.append("text")
  .text("Reactions")
  .attr("x", columnOneHeader)
  .attr("y", rowTwoHeader)
  .style("fill", axisHeaderColor)

//viz 2 background
chart.append("rect")
  .attr("id", "bgEmoticon")
  .attr("fill", "#FF1D77")
  .attr("x", 385)
  .attr("y", 0)
  .attr("width", tilewidth)
  .attr("height", tileheight)
chart.append("g")
  .attr("id", "second")
//VIZ 2 Emoticon
var hbarsEmoticon = chart.select("#second").selectAll("rect.Emoticonbars")
    .data(totalEmoticonData)
hbarsEmoticon.enter()
  .append("rect")
  .classed("bars", true)
  .attr("height", barHeight)
  .attr("width", function(d, i) {
        return widthEmoticonScale(d.tweets)
      })
  .attr("y", function(d, i) {
        return (i * barSpacing) + rowOneYfourbars;  
      })
  .attr("x", function(d, i) {
        return columnTwoX
      })
      .style("fill", barColor)
      .on('mouseover', function(d,i) {
         d3.select(this).style('fill',hoverColor);  
            hoverTextName 
              .text(d.tweets)
              .attr("fill", hoverTextTweets)
              .attr("text-anchor", "start")
              .attr("x", columnTwoX - 23)
              .attr("y", i * textSpacing + rowOneY - 6)
              .style("font-size", 11);
      hoverTextVariable
              .text(d.emoticon)
              .attr("fill", hoverTextVariable)
              .attr("text-anchor", "start")
              .attr("x", columnTwoX + 5)
              .attr("y", i * textSpacing + rowOneY - 6)
              .style("font-size", 11);
            })
      .on('mouseout', function(d, i) {
              hoverTextName
                .text("");
              hoverTextVariable
                .text("");
        d3.select(this).style('fill', barColor);
        });
//Emoticon Axis
var xAxisEmoticon = d3.svg.axis()
    .scale(widthEmoticonScale)
    .orient("top")
    .ticks(5)
chart.append("g")
  .attr("class", "axis")
  //.style("stroke", axisHeaderColor)
  .style("fill", axisHeaderColor)
  .style("font-size", 11)
  .attr("transform", "translate(" + [columnTwoX, 159] + ")")
  .call(xAxisEmoticon)
chart.append("text")
  .text("Emoticons")
    .attr("x", columnTwoHeader)
    .attr("y", rowOneHeader)
    .attr("fill", axisHeaderColor)
 
 //viz 3 background
chart.append("rect")
  .attr("id", "bgSwearing")
  .attr("fill", "#199900")
  .attr("x", 385)
  .attr("y", 210)
  .attr("width", tilewidth)
  .attr("height", tileheight)
chart.append("g")
  .attr("id", "swearing")
  //VIZ 3 Swearing
var hbarsSwearing = chart.select("#swearing").selectAll("rect.Swearingbars")
    .data(totalSwearingData)
hbarsSwearing.enter()
  .append("rect")
  .classed("bars", true)
  .attr("height", barHeight)
  .attr("width", function(d, i) {
        return widthSwearingScale(d.tweets)
      })
   .attr("y", function(d, i) {
        return (i * barSpacing) + rowTwoYtwobars; 
      })
    .attr("x", function(d, i) {
        return columnTwoX
      })
      .style("fill", barColor)
      .on('mouseover', function(d,i) {
         d3.select(this).style('fill',hoverColor);  
            hoverTextName 
              .text(d.tweets)
              .attr("fill", hoverTextTweets)
              .attr("text-anchor", "start")
              .attr("x", 408)
              .attr("y", i * textSpacing + rowTwoYtwobars + 13)
              .style("font-size", 11);
      hoverTextVariable
              .text(d.swear)
              .attr("fill", hoverTextVariable)
              .attr("text-anchor", "start")
              .attr("x", 435)
              .attr("y", i * textSpacing + rowTwoYtwobars + 13)
              .style("font-size", 11);
            })
      .on('mouseout', function(d, i) {
              hoverTextName
                .text("");
              hoverTextVariable
                .text("");
        d3.select(this).style('fill', barColor);
        });   
//Swearing Axis
var xAxisSwearing = d3.svg.axis()
    .scale(widthSwearingScale)
    .orient("top")
    .ticks(5)
chart.append("g")
  .attr("class", "axis")
  //.style("stroke", "black")
  .style("fill", axisHeaderColor)
  .style("font-size", 11)
  .attr("transform", "translate(" + [columnTwoX, rowTwoAxis] + ")")
  .call(xAxisSwearing)
chart.append("text")
  .text("Swearing")
  .attr("x", columnTwoHeader)
  .attr("y", rowTwoHeader)
  .style("fill", axisHeaderColor)
 
  //viz 4 Polarizing background 
chart.append("rect")
  .attr("id", "bgPolarizing") 
  .attr("fill", "#1FAEFF")
  .attr("x", 770)
  .attr("y", 0)
  .attr("width", tilewidth)
  .attr("height", tileheight)
chart.append("g")
  .attr("id", "polarizing")
  //VIZ 4 Polarizing
var hbarsPolarizing = chart.select("#polarizing").selectAll("rect.Polarizingbars")
    .data(totalPolarizingData)
hbarsPolarizing.enter()
  .append("rect")
  .classed("bars", true)
  .attr("height", barHeight)
  .attr("width", function(d, i) {
        return widthPolarizingScale(d.tweets)
      })
   .attr("y", function(d, i) {
        return (i * barSpacing) + rowOneY; 
      })
    .attr("x", function(d, i) {
        return columnThreeX
      })
      .style("fill", barColor)
      .on('mouseover', function(d,i) {
         d3.select(this).style('fill',hoverColor);  
            hoverTextName 
              .text(d.tweets)
              .attr("fill", hoverTextTweets)
              .attr("text-anchor", "start")
              .attr("x", columnThreeX - 30)
              .attr("y", i * textSpacing + rowOneY + 13)
              .style("font-size", 11);
      hoverTextVariable
              .text(d.polarize)
              .attr("fill", hoverTextVariable)
              .attr("text-anchor", "start")
              .attr("x", columnThreeX + 5)
              .attr("y", i * textSpacing + rowOneY + 13)
              .style("font-size", 11);
            })
      .on('mouseout', function(d, i) {
              hoverTextName
                .text("");
              hoverTextVariable
                .text("");
        d3.select(this).style('fill', barColor);
        });
//Polarizing Axis
var xAxisPolarizing = d3.svg.axis()
    .scale(widthPolarizingScale)
    .orient("top")
    .ticks(5)
chart.append("g")
  .attr("class", "axis")
  //.style("stroke", "black")
  .style("fill", axisHeaderColor)
  .style("font-size", 11)
  .attr("transform", "translate(" + [columnThreeX, rowOneAxis] + ")")
  .call(xAxisPolarizing)
chart.append("text")
  .text("Polarizing Comments")
  .attr("x", columnThreeHeader)
  .attr("y", rowOneHeader)
  .style("fill", axisHeaderColor)
 
  //viz 5 conversation background
chart.append("rect")
  .attr("id", "bgConversation")
  .attr("fill", "#00A0B1")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", tilewidth)
  .attr("height", tileheight)
chart.append("g")
  .attr("id", "conversation")
  //VIZ 5 Conversation
var hbarsConversation = chart.select("#conversation").selectAll("rect.Conversationbars")
    .data(totalConversationData)
hbarsConversation.enter()
  .append("rect")
  .classed("Conversationbars", true)
  .attr("height", barHeight)
  .attr("width", function(d, i) {
        return widthConversationScale(d.tweets)
      })
   .attr("y", function(d, i) {
        return (i * barSpacing) + rowOneY; 
      })
    .attr("x", function(d, i) {
        return columnOneX
      })
      .style("fill", barColor)
      .on('mouseover', function(d,i) {
         d3.select(this).style('fill',hoverColor);  
            hoverTextName 
              .text(d.tweets)
              .attr("fill", hoverTextTweets)
              .attr("text-anchor", "start")
              .attr("x", 13)
              .attr("y", i * textSpacing + rowOneY + 13)
              .style("font-size", 11);
      hoverTextVariable
              .text(d.conversation)
              .attr("fill", hoverTextVariable)
              .attr("text-anchor", "start")
              .attr("x", 50)
              .attr("y", i * textSpacing + rowOneY + 13)
              .style("font-size", 11);
            })
      .on('mouseout', function(d, i) {
              hoverTextName
                .text("");
              hoverTextVariable
                .text("");
        d3.select(this).style('fill', barColor);
        });
//Conversation Axis
var xAxisConversation = d3.svg.axis()
    .scale(widthConversationScale)
    .orient("top")
    .ticks(5)
chart.append("g")
  .attr("class", "axis")
  //.style("stroke", "black")
  .style("fill", axisHeaderColor)
  .style("font-size", 11)
  .attr("transform", "translate(" + [columnOneX, rowOneAxis] + ")")
  .call(xAxisConversation)
chart.append("text")
  .text("Conversation")
  .attr("x", columnOneHeader)
  .attr("y", rowOneHeader)
  .attr("fill", axisHeaderColor)
  
  //viz 6 background
chart.append("rect")
  .attr("id", "bgCertainty")
  .attr("fill", "#7200AC")
  .attr("x", 770)
  .attr("y", 210)
  .attr("width", tilewidth)
  .attr("height", tileheight)
chart.append("g")
  .attr("id", "certainty")
  //VIZ 6 Certainty
var hbarsCertainty = chart.select("#certainty").selectAll("rect.certBars")
    .data(totalCertaintyData)
hbarsCertainty.enter()
  .append("rect")
  .classed("certBars", true)
  .attr("height", barHeight)
  .attr("width", function(d, i) {
        return widthCertaintyScale(d.tweets)
      })
   .attr("y", function(d, i) {
        return (i * barSpacing) + rowTwoYtwobars; 
      })
    .attr("x", function(d, i) {
        return columnThreeX
      })
        .style("fill", barColor)
      .on('mouseover', function(d,i) {
         d3.select(this).style('fill',hoverColor);  
            hoverTextName 
              .text(d.tweets)
              .attr("fill", hoverTextTweets)
              .attr("text-anchor", "start")
              .attr("x", columnThreeX - 34)
              .attr("y", i * textSpacing + rowTwoYtwobars + 13)
              .style("font-size", 11);
      hoverTextVariable
              .text(d.certainty)
              .attr("fill", hoverTextVariable)
              .attr("text-anchor", "start")
              .attr("x", columnThreeX + 5)
              .attr("y", i * textSpacing + rowTwoYtwobars + 13)
              .style("font-size", 11);
            })
      .on('mouseout', function(d, i) {
              hoverTextName
                .text("");
              hoverTextVariable
                .text("");
        d3.select(this).style('fill', barColor);
        });
//Certainty Axis
var xAxisCertainty = d3.svg.axis()
    .scale(widthCertaintyScale)
    .orient("top")
    .ticks(5)
chart.append("g")
  .attr("class", "axis")
  //.style("stroke", "black")
  .style("fill", axisHeaderColor)
  .style("font-size", 11)
  .attr("transform", "translate(" + [columnThreeX, rowTwoAxis] + ")")
  .call(xAxisCertainty)
chart.append("text")
  .text("Certainty")
  .attr("x", columnThreeHeader)
  .attr("y", rowTwoHeader)
  .style("fill", axisHeaderColor)
  
var hoverTextName = chart.append("text");
var hoverTextVariable = chart.append("text");

//button attributes

   

//buttons
    
//pre launch button
var prelaunch = svg.append("g")
  .attr("transform", "translate(" + [cw - 318, ch - 20] + ")")
    .attr("pointer-events","all")
prelaunch.append("rect")
    .attr("width", 100)
    .attr("height", barHeight)
    .style("fill", "none")
    .style("stroke", "black")
prelaunch.append("text")
  .text("pre launch")
    .attr("alignment-baseline", "hanging")
    .attr("text-anchor", "middle")
    .attr("x", 50)
    .attr("y", 2.5)
  prelaunch.on("click", function() {
    
    //Viz 1
    hbarsReaction
      .data(preReactionData)
      .transition()
      .duration(1000)
      .attr("width", function(d, i) {
        return widthReactionScale(d.tweets)
      })
      .attr("height", barHeight)
      .attr("x", function(d, i) {
        return columnOneX
      })
      .attr("y", function(d, i) {
        return (i * barSpacing) + rowTwoY; 
      })
      
      //Viz 2
    hbarsEmoticon
        .data(preEmoticonData)
        .transition()
        .duration(1000)
        .attr("height", barHeight)
        .attr("width", function(d, i) {
            return widthEmoticonScale(d.tweets)
          })
        .attr("y", function(d, i) {
            return (i * barSpacing) + rowOneYfourbars; 
          })
        .attr("x", function(d, i) {
            return columnTwoX
          })
      
     //Viz 3  
     hbarsSwearing
        .data(preSwearingData)
        .transition()
        .duration(1000)
        .attr("height", barHeight)
        .attr("width", function(d, i) {
            return widthSwearingScale(d.tweets)
          })
        .attr("y", function(d, i) {
            return (i * barSpacing) + rowTwoYtwobars; 
          })
        .attr("x", function(d, i) {
            return columnTwoX
          })
           
    //Viz 4
   hbarsPolarizing
        .data(prePolarizingData)
        .transition()
        .duration(1000)
        .attr("height", barHeight)
        .attr("width", function(d, i) {
            return widthPolarizingScale(d.tweets)
          })
        .attr("y", function(d, i) {
            return (i * barSpacing) + rowOneY; 
          })
        .attr("x", function(d, i) {
            return columnThreeX
          })  
           
    //Viz 5
   hbarsConversation
        .data(preConversationData)
        .transition()
        .duration(1000)
        .attr("height", barHeight)
        .attr("width", function(d, i) {
            return widthConversationScale(d.tweets)
          })
        .attr("y", function(d, i) {
            return (i * barSpacing) + rowOneY; 
          })
        .attr("x", function(d, i) {
            return columnOneX
          })     
           
    ///Viz 6
   hbarsCertainty
        .data(preCertaintyData)
        .transition()
        .duration(1000)
        .attr("height", barHeight)
        .attr("width", function(d, i) {
            return widthCertaintyScale(d.tweets)
          })
        .attr("y", function(d, i) {
            return (i * barSpacing) + rowTwoYtwobars; 
          })
        .attr("x", function(d, i) {
            return columnThreeX
          })
            
   //end        
  })
    
//post launch button
   var postlaunch = svg.append("g")
  .attr("transform", "translate(" + [cw - 213, ch - 20] + ")")
    .attr("pointer-events", "all")
postlaunch.append("rect")
    .attr("width", 100)
    .attr("height", barHeight)
    .style("fill", "none")
    .style("stroke", "black")
postlaunch.append("text")
  .text("post launch")
    .attr("alignment-baseline", "hanging")
    .attr("text-anchor", "middle")
    .attr("x", 50)
    .attr("y", 2.5)
  postlaunch.on("click", function() {
    
        //Viz 1
    hbarsReaction
      .data(postReactionData)
      .transition()
      .duration(1000)
      .attr("width", function(d, i) {
        return widthReactionScale(d.tweets)
      })
      .attr("height", barHeight)
      .attr("x", function(d, i) {
        return columnOneX
      })
      .attr("y", function(d, i) {
        return (i * barSpacing) + rowTwoY; 
      })
      
      //Viz 2
    hbarsEmoticon
        .data(postEmoticonData)
        .transition()
        .duration(1000)
        .attr("height", barHeight)
        .attr("width", function(d, i) {
            return widthEmoticonScale(d.tweets)
          })
        .attr("y", function(d, i) {
            return (i * barSpacing) + rowOneYfourbars; 
          })
        .attr("x", function(d, i) {
            return columnTwoX
          })
      
   //Viz 3  
     hbarsSwearing
        .data(postSwearingData)
        .transition()
        .duration(1000)
        .attr("height", barHeight)
        .attr("width", function(d, i) {
            return widthSwearingScale(d.tweets)
          })
        .attr("y", function(d, i) {
            return (i * barSpacing) + rowTwoYtwobars; 
          })
        .attr("x", function(d, i) {
            return columnTwoX
          })  
         
    //Viz 4
   hbarsPolarizing
        .data(postPolarizingData)
        .transition()
        .duration(1000)
        .attr("height", barHeight)
        .attr("width", function(d, i) {
            return widthPolarizingScale(d.tweets)
          })
        .attr("y", function(d, i) {
            return (i * barSpacing) + rowOneY; 
          })
        .attr("x", function(d, i) {
            return columnThreeX
          })
     
  //Viz 5
   hbarsConversation
        .data(postConversationData)
        .transition()
        .duration(1000)
        .attr("height", barHeight)
        .attr("width", function(d, i) {
            return widthConversationScale(d.tweets)
          })
        .attr("y", function(d, i) {
            return (i * barSpacing) + rowOneY; 
          })
        .attr("x", function(d, i) {
            return columnOneX
          }) 
     
 ///Viz 6
   hbarsCertainty
        .data(postCertaintyData)
        .transition()
        .duration(1000)
        .attr("height", barHeight)
        .attr("width", function(d, i) {
            return widthCertaintyScale(d.tweets)
          })
        .attr("y", function(d, i) {
            return (i * barSpacing) + rowTwoYtwobars; 
          })
        .attr("x", function(d, i) {
            return columnThreeX
          })
     
    //end   
  })
    
//total button
    var totallaunch = svg.append("g")
  .attr("transform", "translate(" + [cw - 108, ch - 20] + ")")
    .attr("pointer-events","all")
totallaunch.append("rect")
    .attr("width", 100)
    .attr("height", barHeight)
    .style("fill", "none")
    .style("stroke", "black")
totallaunch.append("text")
  .text("total")
    .attr("alignment-baseline", "hanging")
    .attr("text-anchor", "middle")
    .attr("x", 50)
    .attr("y", 2.5)
  totallaunch.on("click", function() {
    
        //Viz 1
        hbarsReaction
      .data(totalReactionData)
      .transition()
      .duration(1000)
      .attr("width", function(d, i) {
        return widthReactionScale(d.tweets)
      })
      .attr("height", barHeight)
      .attr("x", function(d, i) {
        return columnOneX
      })
      .attr("y", function(d, i) {
        return (i * barSpacing) + rowTwoY;
      })
    
    //Viz2
    hbarsEmoticon
        .data(totalEmoticonData)
        .transition()
        .duration(1000)
        .attr("height", barHeight)
        .attr("width", function(d, i) {
            return widthEmoticonScale(d.tweets)
          })
        .attr("y", function(d, i) {
            return (i * barSpacing) + rowOneYfourbars; 
          })
        .attr("x", function(d, i) {
            return columnTwoX
        })
             
   //Viz 3  
     hbarsSwearing
        .data(totalSwearingData)
        .transition()
        .duration(1000)
        .attr("height", barHeight)
        .attr("width", function(d, i) {
            return widthSwearingScale(d.tweets)
          })
        .attr("y", function(d, i) {
            return (i * barSpacing) + rowTwoYtwobars; 
          })
        .attr("x", function(d, i) { 
            return columnTwoX
        })
       
  //Viz 4
   hbarsPolarizing
        .data(totalPolarizingData)
        .transition()
        .duration(1000)
        .attr("height", barHeight)
        .attr("width", function(d, i) {
            return widthPolarizingScale(d.tweets)
          })
        .attr("y", function(d, i) {
            return (i * barSpacing) + rowOneY; 
          })
        .attr("x", function(d, i) {
            return columnThreeX
        })
     
  //Viz 5
   hbarsConversation
        .data(totalConversationData)
        .transition()
        .duration(1000)
        .attr("height", barHeight)
        .attr("width", function(d, i) {
            return widthConversationScale(d.tweets)
          })
        .attr("y", function(d, i) {
            return (i * barSpacing) + rowOneY; 
          })
        .attr("x", function(d, i) {
            return columnOneX
          })
     
   ///Viz 6
   hbarsCertainty
        .data(totalCertaintyData)
        .transition()
        .duration(1000)
        .attr("height", barHeight)
        .attr("width", function(d, i) {
            return widthCertaintyScale(d.tweets)
          })
        .attr("y", function(d, i) {
            return (i * barSpacing) + rowTwoYtwobars; 
          })
        .attr("x", function(d, i) {
            return columnThreeX;
        }) 
  
  //end       
  })
    chart.append("text")
  .text("*all values represent number of tweets")    
    .attr("x", columnOneHeader)
  .attr("y", 430)
  .style("fill", "black")
  .style("font-size", 11);