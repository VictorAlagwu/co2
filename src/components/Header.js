import React, { Component } from 'react';
import {Col, Row, Nav, NavItem, NavLink} from 'reactstrap';

class Header extends Component {
    render () {
        return (
        <div>
            <div className="nav">
                <Nav>
                    <NavItem>
                        <NavLink href="#">CO2 App</NavLink>
                    </NavItem>
                </Nav>
            </div>
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