import React, { Component } from 'react';
import {  MDBRow, MDBCol } from "mdbreact";

class Map extends Component {




    render () {

        return (
        <div>
            <MDBRow>
              <MDBCol lg="12" >
                <div id="container" ref={this.props.mapRef} className="mapDiagram">
                </div>
              </MDBCol>
            </MDBRow>
            <hr />
        </div>
        )
    }
}

export default Map;
