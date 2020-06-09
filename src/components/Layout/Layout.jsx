import React from "react";
import Form from "../../containers/Form/Form";
import Map from "../../containers/Map/Map";
import "./Layout.css";
const layout = (props) => {
  return (
    <React.Fragment>
      <div className="grid-container">
        <div className="grid-item">
          <Form />
        </div>
        <div className="grid-item">
          <Map />
        </div>
      </div>
    </React.Fragment>
  );
};

export default layout;
