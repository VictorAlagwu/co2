import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import ReactSVG from 'react-svg';
import World from './world.svg';

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
                <ReactSVG 
                  src={World}
                  evalScripts="always"
                  fallback={() => <span>Error!</span>}
                  loading={() => <span>Loading</span>}
                  onInjected={(error, svg) => {
                    if (error) {
                      console.error(error)
                      return
                    }
                    console.log(svg)
                  }}
                  renumerateIRIElements={false}
                  svgClassName="worldSVG"
                  svgStyle={{  }}
                  wrapper="span"
                  className="wrapper-class-name"
                  onClick={() => {
                    console.log('wrapper onClick')
                  }}
                />
              </Col>
            </Row>
          </div>
         
         
        </Container>
      </div>
    );
  }
}

export default App;
