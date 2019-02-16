import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { Container, Row, Col } from 'reactstrap';
import 'd3';
import 'topojson';
import Datamap from 'datamaps';
import './App.css';


var map;
class App extends Component {
  constructor() {
    super()
    this.state = {
      // mapData: data,
      population: 0
    };
    // this.changePopulation = this.changePopulation.bind(this);
    // setInterval(this.changePopulation, 200);
  }
  // changePopulation () {
  //     var newPopulation = 0;
  //     this.setState({population: this.state.population + newPopulation});
  //   }
    componentDidMount() {
      map = new Datamap({
        element: document.getElementById("map"),
        responsive: true,
        projection: "mercator",
        fills: {
          defaultFill: "#333333"
        },
        geographyConfig: {
          highlightBorderColor: "white"
        }
       });
   
       window.addEventListener("resize", function() {
        map.resize();
       });
    }
  
  
    render() {
      return (
        <div className="App">
          <Helmet>
            <meta charSet="utf-8" />
            <title>CO2 Emission</title>
            <link rel="canonical" href="http://mysite.com/example" />
          </Helmet>
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
                <Col xs="12" id="map">
                  {/* <World /> */}
                  
                </Col>
              </Row>
              <hr />
              <Row>
                <Col xs="12">
                  {/* <Emission mapData={this.state.mapData} population={this.state.population} changePopulation={this.changePopulation} /> */}
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      );
    }
 
}

export default App;
