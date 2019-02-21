import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { Container, Row, Col } from 'reactstrap';
import 'd3';
import 'topojson';
import Datamap from 'datamaps';
import countries from './data';

var population = countries;
var birthRatePerSec = 0;
var deathRatePerSec = 0;


class App extends Component {
    constructor(props) {
      super(props)
      this.myMap = React.createRef();
      this.state = {
        population: population,
        birthRatePerSec: birthRatePerSec,
        deathRatePerSec: deathRatePerSec
      };
      
      
      this.birthMap = this.birthMap.bind(this);
      setInterval(this.birthMap, 1000);

      this.deathMap = this.deathMap.bind(this);
      setInterval(this.deathMap, 1500);
      
    }

    resize = () => {
      if (this.worldMap) {
          this.worldMap.resize();
      }
    }

    drawMap = () => {
      var worldMap = new Datamap ({
        element: document.getElementById("container"),
        scope: 'world',
      
        responsive: true,
        projection: 'equirectangular',
        fills: {
          BIRTH: '#ffc107',
          DEATH: '#dc3545',
          defaultFill: "#000000a6"
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
     
      window.addEventListener("resize", this.resize());
      worldMap.legend();
      this.worldMap = worldMap;
    }
    

    birthMap() {
      console.log('Running');
      
      var changePopulation = {};

      const keys = Object.keys(this.state.population);
      const randomIndex = keys[Math.floor(Math.random() * keys.length)];
      const item = this.state.population[randomIndex];

      console.log('Before ' + item.value );
      item.value += 1; 
      console.log('After ' + item.value );
      var birthRate = Math.round(item.value/10);
      var newBirthRatePerSec = birthRate*item.value/31557600000;

      console.log(birthRate);
      this.setState( (prevState, props) => ({
        birthRatePerSec: prevState.birthRatePerSec + newBirthRatePerSec
      }));
      changePopulation[item.codes] = '#ffc107';

     
      this.worldMap.updateChoropleth(changePopulation, {reset: true});
    }

    deathMap() {
      console.log('Running');
      
      var changePopulation = {};

      const keys = Object.keys(this.state.population);
      const randomIndex = keys[Math.floor(Math.random() * keys.length)];
      const item = this.state.population[randomIndex];
      
      console.log('Before ' + item.value );
      item.value += 1; 
      console.log('After ' + item.value );
      var deathRate = Math.round(item.value/10);
      var newDeathRatePerSec = deathRate*item.value/31557600000;

      console.log(deathRate);
      this.setState( (prevState, props) => ({
        deathRatePerSec: newDeathRatePerSec - prevState.deathRatePerSec
      }));

      changePopulation[item.codes] = '#dc3545';
     
      this.worldMap.updateChoropleth(changePopulation, {reset: true});
    }

    componentDidMount() {
      this.drawMap();
      console.log('moun');
    }
   //Forloop : select a random country, and add random timezone different country
    
    clear = () => {
      const mapContainer = this.myMap.current;

      for (const child of Array.from(mapContainer.childNodes)) {
          mapContainer.removeChild(child);
      }
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
                  <div id="container" ref={this.myMap} />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col xs="12">
                  BirthRate Per Second {this.state.birthRatePerSec}
                  <p>DeathRate per Second {this.state.deathRatePerSec}</p>
                  
                </Col>
              </Row>
            </div>
          </Container> 
        </div>
      );
    }
 
}

export default App;
