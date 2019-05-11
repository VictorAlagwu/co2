import React, { Component } from 'react';
import {  MDBRow, MDBCol } from "mdbreact";

class Map extends Component {




    render () {

        return (
        <div>
            <MDBRow>
              <MDBCol lg="12" >
                <div id="container" ref={this.props.mapRef} className="mapDiagram" onMouseMove={this.props.makeMouseMove}>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1"> */}
                    {/* <linearGradient id="triangle">
                        <stop offset="28%" stopColor="rgba(255,193,7,1)" />
                        <stop offset="87%" stopColor="rgba(220,53,69,1)" />
                    </linearGradient> */}
                  {/* </svg> */}
    
                </div>
              </MDBCol>
            </MDBRow>
            <hr />
        </div>
        )
    }
}

export default Map;
