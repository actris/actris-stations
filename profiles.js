var width = 1260,
    height = 700;

//tutorial for this map
//http://www.d3noob.org/2013/03/a-simple-d3js-map-explained.html
 
var projection = d3.geo.mercator()
    .center([0, 60])
    .scale(600)
    .rotate([0,0]);

var svg = d3.select("#profiles").append("svg")
    .attr("width", width)
    .attr("height", height);

var path = d3.geo.path()
    .projection(projection);

var g2 = svg.append("g");

// load and display the World
d3.json("world-110m2.json", function(error, topology) {

// load and display the data
d3.csv("profiles_stations.csv", function(error, data) {



    g2.selectAll("circle")
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
       .attr("r", 3)
       .style("fill", "brown")
       .attr("opacity", ".7");
	
  d3.select("circle").append("text")
  .text("works")
  .attr("font-weight","bold")	


});


g2.selectAll("path")
      .data(topojson.object(topology, topology.objects.countries)
          .geometries)
    .enter()
      .append("path")
      .attr("d", path)
});

// zoom and pan
var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        g2.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        g2.selectAll("circle")
            .attr("d", path.projection(projection));
        g2.selectAll("path")  
            .attr("d", path.projection(projection)); 

  });

svg.call(zoom)