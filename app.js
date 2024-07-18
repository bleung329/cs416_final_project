const data = [10,20,30,40,50];

const svg = d3
  .select("#dvz")
  .append("svg")
  .attr("width", 800)
  .attr("height", 400);

console.log("test")

all_data = d3.csv("https://raw.githubusercontent.com/bleung329/cs416_final_project/main/data/Transistor_count_2.csv").then(function(data) {
  console.log(data);
})

console.log(all_data.transistor_count)

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