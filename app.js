//WARNING: This isn't particularly good JS.

//<<< Helper Definitions >>>

const intel4004Text = [
  {
    note: {
      label: "2250 Transistors",
      title: "Intel 4004"
    },
    color: ["blue"],
    x: 20,
    y: 390,
    dy: 50,
    dx: 50
  }
]

const mooresText = [
  {
    note: {
      label: "2x every 2 years",
      title: "Moores Law"
    },
    color: ["black"],
    x: 200,
    y: 320,
    dy: 50,
    dx: 50
  }
]

const actualFitText = [
  {
    note: {
      label: "~1.953 every 2 years",
      title: "Actual Results"
    },
    color: ["green"],
    x: 798,
    y: 115,
    dy: 50,
    dx: 50
  }
]

var sceneIdx = 0;

const bigSquareSize = 8;
const normalSquareSize = 6;
function initCpuScatter(data){
  scatter = svg
  .append('g')
  .attr("clip-path","url(#clip)")
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", function(d,i){ return yearScale(d.year)-normalSquareSize})
  .attr("y", function(d,i){ return transistorScale(d.transistor_count)-normalSquareSize;})
  .attr("fill", function(d){
    switch (d.designer.toLowerCase()) {
      case "amd":
        return "#ef0707"
      case "intel":
        return "blue"
      case "apple":
        return "black"
      case "ibm":
        return "#ffb6c1"
      case "arm":
        return "#0091BD"
      case "nvidia":
        return "#76B900"
      default:
        return "#d3d3d3"
    }
  })
  .attr("height",function(d){
    if (d.name in CHIP_DESCS){return bigSquareSize;}else{return normalSquareSize;}
  })
  .attr("width",function(d){
    if (d.name in CHIP_DESCS){return bigSquareSize;}else{return normalSquareSize;}
  })
  //Check lookup table for if the device has a description. If so, set as a rectangle, else, set as circle.
  .attr("rx", 
    function(d){
      if (d.name in CHIP_DESCS){return 0;}else{return 6;}
    })
  .attr("ry", 6)
  .on("mouseover",function(event,d){
    //Add annotation
    d3.select(this).attr("opacity",0.75)
    showText(d)
  })
  .on("mouseout",function(event,d){
    //Replace annotation with default Moores law text
    d3.select(this).attr("opacity",1)
    document.getElementById('annotation').innerHTML = SCENE_TEXT[sceneIdx];
  })
  .attr("id","scatterPoint")
}

//Calculate out moores law values
var cpuMooresPred = new Array();
var cpuMooresCount = 2250; //NOTE: Starts with the transistor count of the Intel 4004
var cpuActual = new Array();
var cpuActualCount = 2250.0; //NOTE: Also starts with the transistor count of the Intel 4004
for (let year = 1971; year < 2024; year+=2) {
  cpuMooresPred.push([year,cpuMooresCount]);
  cpuMooresCount *= 2;
  cpuActual.push([year,cpuActualCount]);
  cpuActualCount *= 1.953;
}

function initCpuMooresPlot(){
    cpuMooresPlot = svg
    .append('g')
    .attr("clip-path","url(#clip)")
    .append('path')
    .attr("class","line")
    .datum(cpuMooresPred)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .style("stroke-dasharray",("10,10"))
    .attr("d", d3.line()
      .x(function(d) { return yearScale(d[0]) })
      .y(function(d) { return transistorScale(d[1]) })
      )
}

function initCpuActualPlot(){
    cpuActualPlot = svg
    .append('g')
    .attr("clip-path","url(#clip)")
    .append('path')
    .attr("class","line")
    .datum(cpuActual)
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("stroke-width", 2.0)
    .style("stroke-dasharray",("5,5"))
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

var yearScale,yearAxis,transistorScale,transistorAxis,scatter,cpuMooresPlot,cpuActualPlot,zoomRect = null;
var intel4004Anno, mooresAnno, actualFitAnno = null;

//<<< Initialize everything >>>
const cpu_data = d3.csv("https://raw.githubusercontent.com/bleung329/cs416_final_project/main/data/processors.csv")
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
    .text("Transistor Count (Log)");
  
    // Y axis
    transistorScale = d3.scaleLog()
                      .domain([1, d3.max(data, 
                        function(d) { 
                          return +d.transistor_count; 
                        })])
                      .range([ height, 0 ])
                      .base(10);

    transistorAxis =  svg.append("g")
                      .call(d3.axisLeft(transistorScale));

    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 6)
    .text("Year");

    //Clipping region for scatter
    svg.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width+60)
    .attr("height", height+5);

    
    //Initialize plots
    intel4004Anno = svg.append('g').call(d3.annotation().annotations(intel4004Text))
    mooresAnno = svg.append('g').call(d3.annotation().annotations(mooresText))
    actualFitAnno = svg.append('g').call(d3.annotation().annotations(actualFitText))
    initCpuScatter(data);
    initCpuMooresPlot();
    initCpuActualPlot();
    
    var zoom =  d3.zoom()
    .scaleExtent([1, 5])
    .translateExtent([[-20, -20], [width+30, height+30]])
    .extent([[-20, -20], [width+30, height+30]])
    .on("zoom", zoomChart);
    
    function zoomChart({transform}) {
      //Recover scale
      var newYearScale = transform.rescaleX(yearScale).interpolate(d3.interpolateRound);
      var newTransistorScale = transform.rescaleY(transistorScale).interpolate(d3.interpolateRound);
      
      //Update axes 
      yearAxis.call(d3.axisBottom(newYearScale).tickFormat(d3.format("d")))
      transistorAxis.call(d3.axisLeft(newTransistorScale))
      
      //Update plot positions and scales
      scatter.attr("transform",transform)
      cpuMooresPlot.attr("transform",transform)
      cpuActualPlot.attr("transform",transform)
      intel4004Anno.attr("transform",transform)
      mooresAnno.attr("transform",transform)
      actualFitAnno.attr("transform",transform)
    }

    //An invisible rectangle for catching zoom events
    zoomRect = svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all")
    .call(zoom).call(zoom.transform, d3.zoomIdentity)
    .lower() 
    .attr("id","zoomRect")


    intel4004Anno.lower()
    mooresAnno.lower()
    actualFitAnno.lower()

    sceneIdx = 0;
    changeScene(sceneIdx);
  }
)

function showHideCompany(elem){
  var temp = scatter.filter(function(d){return d.designer.toLowerCase() == elem.id;})
  if (elem.checked) {
    //Make nodes visible again.
    temp
    .attr("opacity",1)
    .attr("pointer-events", "all");
  }
  else{
    //Hide node and disable mouseover events
    temp
    .attr("opacity",0)
    .attr("pointer-events", "none");
  }
}

function showText(data){
  var chipInfoHtml = "Name: "+data.name+"<br></br>"
  chipInfoHtml += "Designer: "+data.designer+"<br></br>"
  chipInfoHtml += "Process: "+data.process_nm+" nm<br></br>"
  chipInfoHtml += "Transistor Count: "+data.transistor_count.toString().replace(/,/g,"").replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"<br></br>"
  var aboutString = " ---"
  if (data.name in CHIP_DESCS){ 
    aboutString = "<br></br>"+CHIP_DESCS[data.name]
  }
  chipInfoHtml += "Notes:"+aboutString
  document.getElementById('annotation').innerHTML = chipInfoHtml;
}

//Title 0: Zoomed out
//Scene 1: Focus in on Intel 4004 and overlay Moore line onto graph
//Scene 2: Transition into adding all scatter points
//Scene 3: Fade in best fit line and allow exploration

function changeScene(toNextScene){

  //Increment or decrement scene according to the toNextScene bool.
  if (toNextScene && sceneIdx < 3){
    sceneIdx += 1
  }
  if (!toNextScene && sceneIdx > 0){
    sceneIdx -= 1;
  }
  document.getElementById('annotation').innerHTML = SCENE_TEXT[sceneIdx];
  switch (sceneIdx) {
    case 0:
      zoomRect.style("pointer-events","none")
      cpuActualPlot.attr("opacity",0);
      cpuMooresPlot.attr("opacity",0);
      scatter.filter(function(d){return d.year >= 1975;}).attr("opacity",0).attr("pointer-events", "none");
      actualFitAnno.attr("opacity",0);
      mooresAnno.attr("opacity",0);
      var cbs = document.getElementsByTagName('input');
      for(var i=0; i < cbs.length; i++) {
        if(cbs[i].type == 'checkbox') {
          cbs[i].disabled = true;
        }
      }
      break;
    case 1:
      cpuMooresPlot.transition().duration(1000).attr("opacity",1);
      scatter.filter(function(d){return d.year >= 1975;}).attr("opacity",0).attr("pointer-events", "none");
      mooresAnno.transition().duration(1000).attr("opacity",1);
      break;
    case 2:
      cpuActualPlot.attr("opacity",0);
      actualFitAnno.attr("opacity",0);
      scatter.filter(function(d){return d.year >= 1975;}).transition()
      .duration(function(d){return (d.year-1971)*80})
      .attr("opacity",1)
      .attr("pointer-events", "all");
      break;
    case 3:
      var cbs = document.getElementsByTagName('input');
      for(var i=0; i < cbs.length; i++) {
        if(cbs[i].type == 'checkbox') {
          cbs[i].disabled = false;
        }
      }
      zoomRect.style("pointer-events", "all")
      cpuActualPlot.transition().duration(1000).attr("opacity",1);
      actualFitAnno.transition().duration(1000).attr("opacity",1);
      break;
    default:
      break;
  }
}
