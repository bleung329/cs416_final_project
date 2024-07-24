//Display moores law line chart check

/*
<<<1970>>>
MP944, 4004 - First fully integrated CPU and commercially available processor. 1970
6502 - 1975
Z80 - 1976
8088 - First personal computer - 1979
<<<1980s>>>
8051 - micro - 1980
486/860 - first x86 processor with more than 1 mil - 1989
960CA - First superscalar
ARM2 - Yay embedded 32 - 1986 
<<<1990>>>
AVR - micro - 1997
<<<2000>>>
POWER4 - First commercial multicore - 2001
<<<2010>>>
Ivy Bridge - First 3D transistors or FinFETs - 2011
*/

//Change scale of x axis (Filtering year) check
//Change scale of y axis (log,linear,points) check?

//Filter out points (Select company)
//Mouseover to view annotation

//<<< Helper Definitions >>>

const chip_descs = {POWER4:"Blah blah blah"}

function init_scatter(data)
{
  scatter = svg
  .append('g')
  .attr("clip-path","url(#clip)")
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", function(d,i){ return yearScale(d.year)})
  .attr("y", function(d,i){ return transistorScale(d.transistor_count);})
  .attr("height",6)
  .attr("width",6)
  .attr("fill", function(d){
    switch (d.designer) {
      case "AMD":
        return "red"
      case "Intel":
        return "blue"
      case "Apple":
        return "black"
      case "IBM":
        return "#ffb6c1"
      default:
        return "#d3d3d3"
    }
  })
  //Check lookup table for if the device has a description. If so, set as a rectangle, else, set as circle.
  .attr("rx", 
    function(d){
      if (d.name in chip_descs){ return 0;}
      else{ return 6;}})
  .attr("ry", 6)
}

//Calculate out moores law values
var mooresPred = new Array();
var moores_transistor_count = 2250; //Start with the transistor count of the Intel 4004
for (let year = 1970; year < 2024; year+=2) {
  mooresPred.push([year,moores_transistor_count]);
  moores_transistor_count *= 2;
}

function init_moores_plot()
{
    mooresPlot = svg
    .append('g')
    .attr("clip-path","url(#clip)")
    .append('path')
    .attr("class","line")
    .datum(mooresPred)
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("stroke-width", 1.5)
    .style("stroke-dasharray",("10,10"))
    .attr("d", d3.line()
      .x(function(d) { return yearScale(d[0]) })
      .y(function(d) { return transistorScale(d[1]) })
      )
}

//<<< Main >>>

var margin = {top: 10, right: 30, bottom: 30, left: 100},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

const svg = d3
  .select("#dviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")


var yearScale,yearAxis,transistorScale,transistorAxis,scatter,mooresPlot = null;

const all_data = d3.csv("https://raw.githubusercontent.com/bleung329/cs416_final_project/main/data/processors.csv")
.then(
  function(data) {
    // X axis
    yearScale = d3.scaleLinear()
                .domain(d3.extent(data, 
                  function(d) {  
                    return d.year; 
                  }))
                .range([ 0, width ]);

    yearAxis =  svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(yearScale).tickFormat(d3.format("d")));
    
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("TRANSISTOR COUNT");
  
    // Y axis
    transistorScale = d3.scaleLog()
                      .domain([1, d3.max(data, 
                        function(d) { 
                          return +d.transistor_count; 
                        })])
                      .range([ height, 0 ]);

    transistorAxis =  svg.append("g")
                      .call(d3.axisLeft(transistorScale));

    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 6)
    .text("YEAR");

    // create a clipping region
    svg.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width+5)
    .attr("height", height+5);

    //Initialize actual plots
    init_scatter(data);
    init_moores_plot();
    
    var zoom =  d3.zoom()
    .scaleExtent([1, 5])
    .translateExtent([[0, 0], [width, height]])
    .extent([[0, 0], [width, height]])
    .on("zoom", zoomChart);
    
    svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all")
    .call(zoom).call(zoom.transform, d3.zoomIdentity);
    
    function zoomChart({transform}) {
    
      //Recover scale
      var newYearScale = transform.rescaleX(yearScale).interpolate(d3.interpolateRound);
      var newTransistorScale = transform.rescaleY(transistorScale).interpolate(d3.interpolateRound);
    
      //Update axes 
      yearAxis.call(d3.axisBottom(newYearScale).tickFormat(d3.format("d")))
      transistorAxis.call(d3.axisLeft(newTransistorScale))
    
      //Update plot positions and scales
      scatter.attr("transform",transform)
      mooresPlot.attr("transform",transform)
    }

    console.log("DONE?")
  }
)

var changeColor = function(){
  svg.selectAll("circle")
    .style("fill", "blue")
}

