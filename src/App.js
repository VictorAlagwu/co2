import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import World from './components/World';
import Emission from './components/CoEmission';


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
            <Row  style={{ height: 'auto'}}>
              <Col xs="12">
                <World />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs="12">
                <Emission />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
