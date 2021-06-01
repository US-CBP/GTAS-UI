// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useEffect, useState, useRef } from "react";
// import * as d3 from "d3";
// import * as d3geo from "d3-geo";
import { Row } from "react-bootstrap";
import geojson from "./world.js";
import Map from "./Map";
import * as countries from "./countries.geojson";
// import * as city from "./cities.csv";
import "./FlightPath.scss";

import { select } from "d3";
import * as d3 from "d3-geo";

const FlightPath = props => {
  const [mapData, setMapData] = React.useState(null);

  useEffect(() => {
    setMapData(geojson);
  }, []);

  return mapData && <Map mapData={mapData.features} />;

  // const foo = useRef();

  // const [worldmap, setWorldMap] = useState();
  // const [cities, setCities] = useState();

  // useEffect(() => {
  //   // setCities(d3.csv("./cities.csv"));
  //   // setWorldMap(d3.json(geojson));
  //   setWorldMap(geojson);
  // }, []);

  // useEffect(() => {
  //   const w = 1400;
  //   const h = 700;

  //   if (foo.current && worldmap) {
  //     console.log("all of it");
  // d3.select(foo.current)
  //   .append("svg")
  //   .attr("preserveAspectRatio", "xMinYMin meet")
  //   .style("background-color", "#c9e8fd")
  //   .attr("viewBox", "0 0 " + w + " " + h)
  //   .classed("svg-content", true);

  // var projection = d3
  //   .geoMercator()
  //   .translate([w / 2, h / 2])
  //   .scale(2200)
  //   .center([0, 40]);

  // var path = d3.geoPath().projection(projection);

  // Promise.all([worldmap, cities]).then(values => {
  //   console.log(values);

  //   d3.selectAll("path")
  //     .data(values[0].features)
  //     .enter()
  //     .append("path")
  //     .attr("class", "continent")
  //     .attr("d", path);
  //   // draw points

  //   d3.selectAll("circle")
  //     .data(values[1])
  //     .enter()
  //     .append("circle")
  //     .attr("class", "circles")
  //     .attr("cx", d => projection([d.Longitude, d.Lattitude])[0])
  //     .attr("cy", d => projection([d.Longitude, d.Lattitude])[1])
  //     .attr("r", "1px");

  //   // add labels
  //   d3.selectAll("text")
  //     .data(values[1])
  //     .enter()
  //     .append("text")
  //     .text(d => d.City)
  //     .attr("x", d => projection([d.Longitude, d.Lattitude])[0] + 5)
  //     .attr("y", d => projection([d.Longitude, d.Lattitude])[1] + 15)
  //     .attr("class", "labels");
  // });

  /// # 4
  //     const projection = () => {
  //       return d3
  //         .geoMercator()
  //         .scale(150)
  //         .translate([w / 2, h / 2]);
  //     };

  //     select(foo.current)
  //       .append("g")
  //       .classed("countries", true);
  //     const countries = select("g")
  //       .selectAll("path")
  //       .data(worldmap);

  //     countries
  //       .enter()
  //       .append("path")
  //       .classed("country", true)
  //       .attr("stroke", "red")
  //       .attr("strokeWidth", 0.75)
  //       .each(function(d, i) {
  //         select(this).attr("d", d3.geoPath().projection(projection())(d));
  //       });
  //   } // if foo.current
  // }, []);

  // useEffect(() => {
  //   var svg = d3.select("svg"),
  //     width = +svg.attr("width"),
  //     height = +svg.attr("height");

  //   // Map and projection
  //   var projection = geo
  //     .geoNaturalEarth1()
  //     .scale(width / 1.3 / Math.PI)
  //     .translate([width / 2, height / 2]);

  //   // Load external data and boot
  //   d3.json(geojson, function(data) {
  //     svg
  //       .append("g")
  //       .selectAll("path")
  //       .data(data.features)
  //       .enter()
  //       .append("path")
  //       .attr("fill", "#69b3a2")
  //       .attr("d", d3.geoPath().projection(projection))
  //       .style("stroke", "#888");
  //   });
  // });

  // return (
  //   <>
  //     <svg width={1000} height={900} ref={foo} />
  //     {/* <div id="fp" className="svg-container" ref={foo}></div> */}
  //   </>
  // );

  // return <svg id="my_dataviz" width="400" height="300"></svg>;
};

export default FlightPath;
