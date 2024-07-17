const data = [10,20,30,40,50];

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", 800)
  .attr("height", 400);

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