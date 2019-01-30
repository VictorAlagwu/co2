import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';

import Map from './components/Map';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <div className="header">
            <Row>
              <Col sm="12">Header</Col>
            </Row>
          </div>
          <br />
          <hr />
          <div className="main">
            <Row>
              <Col xs="12">
                <Map />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
