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
    geometry: null,
    offset: null,
    scale: null,
    center: null,
  };

  onHandleViz = () => {
    let geojson = this.state.geometry.features;
    let data = this.state.data;
    //transformeData
    let transformedData = {};
    data.forEach((row) => {
      transformedData[row.id] = row;

      for (const property in row) {
        if (property !== "id") {
          row[property] = +row[property];
        }
      }
    });

    //Merged Data
    for (let j = 0; j < geojson.length; j++) {
      let id = geojson[j].properties.id;
      geojson[j].properties = transformedData[id];
    }
    console.log(geojson);
  };
  mapCalculation = () => {
    if (!this.state.selectedGeojson) return;
    let geometry = this.state.selectedGeojson;
    let center = geoCentroid(geometry);
    let scale = 100;
    let offset = [width / 2, height / 2];
    let projection = geoMercator()
      .scale(scale)
      .translate(offset)
      .center(center);

    let pathGenerator = geoPath().projection(projection);
    //determining better values of scale and offset
    let bounds = pathGenerator.bounds(geometry);
    let hscale = (scale * width) / (bounds[1][0] - bounds[0][0]);
    let vscale = (scale * height) / (bounds[1][1] - bounds[0][1]);
    scale = hscale < vscale ? hscale : vscale;
    offset = [
      width - (bounds[0][0] + bounds[1][0]) / 2,
      height - (bounds[0][1] + bounds[1][1]) / 2,
    ];

    this.setState({ geometry, scale, offset, center });
    // console.log({ geometry, scale, offset, center });
  };

  getdata = (data) => {
    this.setState({ data });
    //display table
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
            <Form
              getSelectedGeojson={this.getSelectedGeojson}
              getdata={this.getdata}
              onClickViz={this.onHandleViz}
            />
          </div>
          <div className="grid-item">
            <Map
              geometry={this.state.geometry}
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
