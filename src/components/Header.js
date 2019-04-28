import React, { Component } from 'react';
import {Col, Row} from 'reactstrap';

class Header extends Component {
    render () {
        return (
        <div>
            <br/>
            <div className="header text-center">
                <Row>
                <Col sm="12">
                    <h3>CO2 Map - Birth and Death Rate</h3>
                    <p>
                    Get the current birth and death rate analysis
                    </p>
                </Col>
                </Row>
            </div>
            <hr />
        </div>
        )
    }
}
export default Header;