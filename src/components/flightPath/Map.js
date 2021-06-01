// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useRef } from "react";
import { select } from "d3";
import * as d3 from "d3-geo";

import "./FlightPath.scss";

const Map = ({ mapData }) => {
  const rn = useRef();

  React.useEffect(() => {
    renderMap();
  }, [mapData]);

  const renderMap = () => {
    const node = rn.current;
    const width = node.width.animVal.value;
    const height = node.height.animVal.value;

    const projection = () => {
      return d3
        .geoMercator()
        .scale(90)
        .translate([width / 2, height / 1.5]);
    };

    select(node)
      .append("g")
      .classed("countries", true);

    select("g")
      .selectAll("path")
      .data(mapData)
      .enter()
      .append("path")
      .classed("country", true)
      .attr("stroke", "white")
      .attr("strokeWidth", 0.3)
      .each(function(d, i) {
        select(this).attr("d", d3.geoPath().projection(projection())(d));
      });
  };

  return (
    <div className="map-container">
      <svg width={600} height={350} ref={rn} />
    </div>
  );
};

export default Map;
