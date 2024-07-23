//<<< Helper Function Definitions >>>

function make_scatter(data,start_year,end_year)
{
  var filtered = data.filter(function(d){ return d.year >= start_year && d.year <= end_year})

  svg
  .selectAll("circle")
  .data(filtered)
  .enter()
  .append("circle")
  .attr("cx", function(d,i){ return yearScale(d.year)})
  .attr("cy", function(d,i){ return transistorScale(d.transistor_count);})
  .attr("r", 5)
  .attr("fill", function(d){
    switch (d.designer) {
      case "AMD":
        return "red"
        break;
      case "Intel":
        return "blue"
        break;
      case "Apple":
        return "black"
        break;
      case "IBM":
        return "#ffb6c1"
        break;
      default:
        return "#d3d3d3"
        break;
    }
  });

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
          "translate(" + margin.left + "," + margin.top + ")");

yearScale = null;
transistorScale = null;

const all_data = d3.csv("https://raw.githubusercontent.com/bleung329/cs416_final_project/main/data/processors.csv")
.then(
  function(data) {

    // X axis
    yearScale = d3.scaleLinear()
      .domain(d3.extent(data, function(d) {  
        return d.year; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(yearScale).tickFormat(d3.format("d")));
  
    // Y axis
    transistorScale = d3.scaleLog()
      .domain([1, d3.max(data, function(d) { return +d.transistor_count; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(transistorScale));

    make_scatter(data,1970,2024)
    make_scatter(data,1970,2024)
    console.log("DONE?")
  }
)


var changeColor = function(){
  svg.selectAll("circle")
    .style("fill", "blue")
}

