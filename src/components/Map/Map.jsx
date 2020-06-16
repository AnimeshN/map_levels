import React, { Component } from "react";
// import { select, geoMercator, geoPath } from "d3";
import { geoMercator, geoPath } from "d3-geo";

class Map extends Component {
  render() {
    let data = JSON.parse(this.props.geojson);

    // const projection = geoMercator();

    const projection = geoMercator()
      .scale(30000)
      .translate([500, 500])
      .center([73, 19.7]);

    const pathGenerator = geoPath().projection(projection);
    let countries = "";
    if (data) {
      console.log(data.features);
      countries = data.features.map((d, i) => (
        <path key={"path" + i} d={pathGenerator(d)} className="countries" />
      ));
    }

    return (
      <svg width={1000} height={1000}>
        {countries}
      </svg>
    );
  }
}

export default Map;
