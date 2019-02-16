import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { Container, Row, Col } from 'reactstrap';
import d3 from 'd3';
import 'topojson';
import Datamap from 'datamaps';
// import data from './data';



 
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      population: 0
    };
    
    
  }

  resize = () => {
    if (this.worldMap) {
        this.worldMap.resize();
    }
}

    componentDidMount() {
      this.drawMap();
    }
  
    componentDidUpdate() {
      this.drawMap();
    }


    drawMap = () => {
      var worldMap = new Datamap ({
        element: document.getElementById("container"),
        scope: 'world',
      
        responsive: true,
        // dataType: 'json',
        // dataURL: data,
        projection: 'equirectangular',
        fills: {
          BIRTH: '#ffc107',
          DEATH: '#dc3545',
          defaultFill: "#000000a6"
        },
        data: {
          RUS: {
              fillKey: 'BIRTH',
              numberOfThings: 2034
          },
          USA: {
              fillKey: 'DEATH',
              numberOfThings: 4981
          }
        },
       
        geographyConfig: {
          borderColor: '#DEDEDE',
          highlightBorderWidth: 2,
          // don't change color on mouse hover
          highlightFillColor: function(geo) {
              return geo['fillColor'] || '#F5F5F5';
          },
          // only change border
          highlightBorderColor: '#B7B7B7',
          // show desired information in tooltip
          popupTemplate: function(geo, data) {
              // don't show tooltip if country don't present in dataset
              if (!data) { return ; }
              // tooltip content
              return ['<div class="hoverinfo">',
                  '<strong>', geo.properties.name, '</strong>',
                  '<br>Count: <strong>', data.numberOfThings, '</strong>',
                  '</div>'].join('');
          }
      }
        });
      var colors = d3.scale.category10();

        window.setInterval(function() {
          worldMap.updateChoropleth({
            USA: colors(Math.random() * 10),
            RUS: colors(Math.random() * 100),
            AUS: { fillKey: 'BIRTH' },
            BRA: colors(Math.random() * 50),
            CAN: colors(Math.random() * 50),
            ZAF: colors(Math.random() * 50),
            IND: colors(Math.random() * 50),
          });
        }, 2000);
      
      window.addEventListener("resize", this.resize());
      worldMap.legend();
      this.worldMap = worldMap;
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
            <div className="header text-center">
              <Row>
                <Col sm="12">Header</Col>
              </Row>
            </div>
            <br />
            <hr />
            
            <div className="main">
              <Row>
                <Col xs="12">
                  <div id="container"></div>
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
