//Display moores law line chart

//Change scale of x axis (Filtering year)
//Change scale of y axis (log,linear,points)

//Filter out points (Select company)
//Mouseover to view annotation

//<<< Helper Function Definitions >>>

function init_scatter(data)
{
  // create a clipping region
  svg.append("defs").append("clipPath")
  .attr("id", "clip")
  .append("rect")
  .attr("width", width+5)
  .attr("height", height+5);

  scatter = svg
  .append('g')
  .attr("clip-path","url(#clip)")
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", function(d,i){ return yearScale(d.year)})
  .attr("cy", function(d,i){ return transistorScale(d.transistor_count);})
  .attr("r", 4)
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

var yearScale,yearAxis,transistorScale,transistorAxis,scatter = null;

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

    init_scatter(data)
    
    var zoom =  d3.zoom()
    .scaleExtent([1, 5])
    .translateExtent([[0, 0], [width, height]])
    .extent([[0, 0], [width, height]])
    .on("zoom", updateChart);
    
    svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .call(zoom).call(zoom.transform, d3.zoomIdentity);
    
    function updateChart({transform}) {
    
      // recover the new scale
      var newYearScale = transform.rescaleX(yearScale).interpolate(d3.interpolateRound);
      var newTransistorScale = transform.rescaleY(transistorScale).interpolate(d3.interpolateRound);
    
      // update axes with these new boundaries
      yearAxis.call(d3.axisBottom(newYearScale).tickFormat(d3.format("d")))
      transistorAxis.call(d3.axisLeft(newTransistorScale))
    
      // update circle positions
      scatter.attr("transform",transform)
    }

    console.log("DONE?")
  }
)

var changeColor = function(){
  svg.selectAll("circle")
    .style("fill", "blue")
}

