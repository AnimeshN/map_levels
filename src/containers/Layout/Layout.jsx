import React, { Component } from "react";
import { geoMercator, geoPath, geoCentroid } from "d3-geo";

import Form from "../../components/Form/Form";
import Map from "../../components/Map/Map";
import "./Layout.css";
let width = 500;
let height = 500;

class Layout extends Component {
  state = {
    selectedGeojson: null,
    data: null,
    offset: null,
    scale: null,
    center: null,
  };
  mapCalculation = () => {
    if (!this.state.selectedGeojson) return;
    let data = this.state.selectedGeojson;
    let center = geoCentroid(data);
    let scale = 100;
    let offset = [width / 2, height / 2];
    let projection = geoMercator()
      .scale(scale)
      .translate(offset)
      .center(center);

    let pathGenerator = geoPath().projection(projection);
    //determining better values of scale and offset
    let bounds = pathGenerator.bounds(data);
    let hscale = (scale * width) / (bounds[1][0] - bounds[0][0]);
    let vscale = (scale * height) / (bounds[1][1] - bounds[0][1]);
    scale = hscale < vscale ? hscale : vscale;
    offset = [
      width - (bounds[0][0] + bounds[1][0]) / 2,
      height - (bounds[0][1] + bounds[1][1]) / 2,
    ];

    this.setState({ data, scale, offset, center });
    // console.log({ data, scale, offset, center });
  };
  getSelectedGeojson = (selectedGeojson) => {
    this.setState({ selectedGeojson });
    this.mapCalculation();
  };
  render() {
    return (
      <React.Fragment>
        <div className="grid-container">
          <div className="grid-item">
            <Form getSelectedGeojson={this.getSelectedGeojson} />
          </div>
          <div className="grid-item">
            <Map
              data={this.state.data}
              scale={this.state.scale}
              offset={this.state.offset}
              center={this.state.center}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Layout;
