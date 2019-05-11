import React, { Component } from 'react';
import {  MDBRow, MDBCol } from "mdbreact";

class Map extends Component {




    render () {

        return (
        <div>
            <MDBRow>
              <MDBCol lg="12" >
                <div id="container" ref={this.props.mapRef} className="mapDiagram" onMouseMove={this.props.makeMouseMove}>
                </div>
              </MDBCol>
            </MDBRow>
            <hr />
        </div>
        )
    }
}

export default Map;
