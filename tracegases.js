var width = 1260,
    height = 700;

//tutorial for this map
//http://www.d3noob.org/2013/03/a-simple-d3js-map-explained.html
 
var projection = d3.geo.mercator()
    .center([0, 60])
    .scale(600)
    .rotate([0,0]);

var svg = d3.select("#tracegases").append("svg")
    .attr("width", width)
    .attr("height", height);

var path = d3.geo.path()
    .projection(projection);

var g3 = svg.append("g");

// load and display the World
d3.json("world-110m2.json", function(error, topology) {

// load and display the data
d3.csv("tracegas_stations.csv", function(error, data) {



    g3.selectAll("circle")
       .data(data)
       .enter()
       .append("a")
	.attr("xlink:href", function(d) {
			return "http://actris.nilu.no/";}
	)
       .append("circle")
       .attr("cx", function(d) {
               return projection([d.lon, d.lat])[0];
       })
       .attr("cy", function(d) {
               return projection([d.lon, d.lat])[1];
       })
       .attr("r", 5)
       .style("fill", function(d){

       		if(d.color == "red"){
                  return "red";     
                }else if(d.color == "blue"){
                  return "blue";     
                }
		else if(d.color == "black"){
                  return "black";     
                }
		else if(d.color == "green"){
                  return "green";     
                }
       })
       .attr("opacity", ".7");
	
  d3.select("circle").append("text")
  .text("works")
  .attr("font-weight","bold")	


});


g3.selectAll("path")
      .data(topojson.object(topology, topology.objects.countries)
          .geometries)
    .enter()
      .append("path")
      .attr("d", path)
});

// zoom and pan
var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        g3.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        g3.selectAll("circle")
            .attr("d", path.projection(projection));
        g3.selectAll("path")  
            .attr("d", path.projection(projection)); 

  });

svg.call(zoom)