import React, { Component } from "react";
// import { select, geoMercator, geoPath } from "d3";
import { geoMercator, geoPath, geoCentroid } from "d3-geo";

class Map extends Component {
  render() {
    let width = 500;
    let height = 500;
    let json = JSON.parse(this.props.geojson);
    let center = geoCentroid(json);
    let scale = 150;
    let offset = [width / 2, height / 2];
    let projection = geoMercator()
      .scale(scale)
      .translate(offset)
      .center(center);

    let pathGenerator = geoPath().projection(projection);
    //determining better values of scale and offset
    let bounds = pathGenerator.bounds(json);
    let hscale = (scale * width) / (bounds[1][0] - bounds[0][0]);
    let vscale = (scale * height) / (bounds[1][1] - bounds[0][1]);
    scale = hscale < vscale ? hscale : vscale;
    offset = [
      width - (bounds[0][0] + bounds[1][0]) / 2,
      height - (bounds[0][1] + bounds[1][1]) / 2,
    ];

    // new projection
    projection = geoMercator().scale(scale).translate(offset).center(center);
    pathGenerator = geoPath().projection(projection);

    let countries = "";
    if (json) {
      console.log(json.features);
      countries = json.features.map((d, i) => (
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
