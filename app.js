//<<< Helper Function Definitions >>>

function make_scatter(data,company,start_year,end_year,color)
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
  .attr("fill", color);

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
    transistorScale = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.transistor_count; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(transistorScale));

    console.log(data);
    make_scatter(data,"Apple",1970,2024,"purple")
    make_scatter(data,"Intel",1970,2024,"blue")
    console.log("DONE?")
  }
)

console.log(all_data.transistor_count)

var changeColor = function(){
  svg.selectAll("circle")
    .style("fill", "blue")
}

