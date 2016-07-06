var width = 1260,
    height = 700;

//tutorial for this map
//http://www.d3noob.org/2013/03/a-simple-d3js-map-explained.html
 
var projection = d3.geo.mercator()
    .center([0, 60])
    .scale(600)
    .rotate([0,0]);

var svg = d3.select("#existing-and-future").append("svg")
    .attr("width", width)
    .attr("height", height);

var path = d3.geo.path()
    .projection(projection);

var g1 = svg.append("g");

// load and display the World
d3.json("world-110m2.json", function(error, topology) {

// load and display the data
d3.csv("existing_and_future_stations.csv", function(error, data) {



    g1.selectAll("circle")
       .data(data)
       .enter()
       .append("a")
	.attr("xlink:href", function(d) {
			return "http://actris.nilu.no/";}
	)
       .append("circle")
                .attr("class","existing_and_profiles")
       .attr("cx", function(d) {
               return projection([d.lon, d.lat])[0];
       })
       .attr("cy", function(d) {
               return projection([d.lon, d.lat])[1];
       })
        .each(function (d, i) {
            if (d.network == "EMEP") {
              // put all your operations on the second element, e.g.
              d3.select(this).attr("r", 4);    
            }
            else if(d.network == "ACTRIS-INSITU"){
                d3.select(this).attr("r", 2);
            }})
        .each(function (d, i) {
            if (d.network == "EMEP") {
              // put all your operations on the second element, e.g.
              d3.select(this).attr("stroke", "red");    
            }
            else if(d.network == "ACTRIS-INSITU"){
                d3.select(this).attr("stroke", "blue");
            }})
        .each(function (d, i) {
            if (d.network == "EMEP") {
              // put all your operations on the second element, e.g.
              d3.select(this).attr("fill", "none");    
            }
            else if(d.network == "ACTRIS-INSITU"){
                d3.select(this).attr("fill", "blue");
            }})
       .attr("opacity", ".6");
    

       



});


g1.selectAll("path")
      .data(topojson.object(topology, topology.objects.countries)
          .geometries)
    .enter()
      .append("path")
      .attr("d", path)
});

// zoom and pan
var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        g1.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        g1.selectAll("circle")
            .attr("d", path.projection(projection));
        g1.selectAll("path")  
            .attr("d", path.projection(projection)); 

  });

svg.call(zoom)
