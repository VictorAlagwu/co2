import React, { Component } from 'react';
import { MDBRow, MDBCol } from "mdbreact";
class Header extends Component {
    render () {
        return (
        <div>
            <br/>
            <div className="header text-center">
                <MDBRow>
                    <MDBCol lg="6">
                        <h3>CO2 Map - Birth and Death Rate</h3>
                        <p>
                        Get the current birth and death rate analysis
                        </p>
                    </MDBCol>
                </MDBRow>
            </div>
            <hr />
        </div>
        )
    }
}
export default Header;