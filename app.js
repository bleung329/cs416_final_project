const data = [10,20,30,40,50];

const svg = d3
  .select("#dvz")
  .append("svg")
  .attr("width", 1200)
  .attr("height", 500);

console.log("test")

const all_data = d3.csv("https://raw.githubusercontent.com/bleung329/cs416_final_project/main/data/processors.csv").then(function(data) {
  console.log(data);
  svg
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", function(d, i){console.log(i+50); return i + 50;})
  .attr("y", function(d,i){return 300;})
  .attr("width", 50)
  .attr("height", function(d,i){ console.log(d.transistor_count); return 0.00001*Number(d.transistor_count.replace(/,/g, ''));})
  .attr("fill", "red");
  console.log("DONE?")
})

console.log(all_data.transistor_count)

var changeColor = function(){
  svg.selectAll("rect")
    .style("fill", "blue")
}