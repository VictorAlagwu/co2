import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import World from './components/World';
import Emission from './components/CoEmission';
import data from './data.js';

class App extends Component {
  constructor() {
    super()
    this.state = {
      mapData: data
    }
  }
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
                <World mapData={this.state.mapData}/>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs="12">
                <Emission mapData={this.state.mapData} />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
