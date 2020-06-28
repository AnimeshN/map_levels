import React, { Component } from "react";
// import { select, geoMercator, geoPath } from "d3";
import { geoMercator, geoPath } from "d3-geo";
import "./Map.css";

class Map extends Component {
  state = {
    dimensions: null,
  };

  render() {
    // new projection
    let polygon = "";
    let { data, scale, offset, center } = this.props;
    if (data) {
      let projection = geoMercator()
        .scale(scale)
        .translate(offset)
        .center(center);

      let pathGenerator = geoPath().projection(projection);

      console.log(data.features);
      polygon = data.features.map((d, i) => (
        <path key={"path" + i} d={pathGenerator(d)} className="polygon" />
      ));
    }

    return (
      <svg width={500} height={500}>
        {polygon}
      </svg>
    );
  }
}

export default Map;
