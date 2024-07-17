const data = [10,20,30,40,50];

const svg = d3
  .select("#dvz")
  .append("svg")
  .attr("width", 800)
  .attr("height", 400);

console.log("test")

svg
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d, i) => i * 100 + 50)
  .attr("y", (d) => 400 - d)
  .attr("width", 50)
  .attr("height", (d) => d)
  .attr("fill", "red");


var changeColor = function(){
  svg.selectAll("rect")
    .style("fill", "blue")
}