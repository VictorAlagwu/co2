import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { Container, Row, Col, Table} from 'reactstrap';
import 'd3';
import 'topojson';
import Datamap from 'datamaps';
import update from 'immutability-helper';
import countries from './data';

var population = countries;
var birthRatePerSec = 0;
var birthCount = 0;
var deathRatePerSec = 0;
var deathCount = 0;


class App extends Component {
    constructor(props) {
      super(props)
      this.myMap = React.createRef();
      this.state = {
        population: population,
        birthRatePerSec: birthRatePerSec,
        deathRatePerSec: deathRatePerSec,
        birthCount: birthCount,
        deathCount: deathCount
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
        data: countries,
        responsive: true,
        projection: 'equirectangular',
        fills: {
          defaultFill: "#333333"
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
              console.log(data);
              // tooltip content
              return ['<div class="hoverinfo">',
                  '<strong>', geo.properties.name, '</strong>',
                  '<br>Count: <strong>', data.population, '</strong>',
                  '</div>'].join('');
          }
      }
        });
     
      window.addEventListener("resize", this.resize());
      worldMap.legend();
      this.worldMap = worldMap;
    }
    

    birthMap() {
     
      var changePopulation = {};

      const keys = Object.keys(this.state.population);
      const randomIndex = keys[Math.floor(Math.random() * keys.length)];
      const item = this.state.population[randomIndex];

      // console.log('Before ' + item.value );
      var oldPopulation = item.population;
      var newPopulationValue = item.population + 1; 
     
      var birthRate = Math.round(newPopulationValue/1000);
      var newBirthRatePerSec = Math.round(birthRate*(newPopulationValue/31557600000));

      // console.log('After Birth Population for ' + item.name + ' ' + newPopulationValue);
      // console.log('Before Birth Previous Population Value ' + oldPopulation);
      this.setState( (prevState, props) => ({
        birthRatePerSec: prevState.birthRatePerSec + newBirthRatePerSec,
        population: update(prevState.population, {[randomIndex]: {'population': {$set: newPopulationValue}}}),
        birthCount: birthCount++
      }));
      changePopulation[item.codes] = '#ffc107';
      changePopulation['population'] = item.population;

      console.log(changePopulation);
      
      this.worldMap.updateChoropleth(changePopulation, {reset: true});
    }

    deathMap() {
      
      var changePopulation = {};

      const keys = Object.keys(this.state.population);
      const randomIndex = keys[Math.floor(Math.random() * keys.length)];
      
      const item = this.state.population[randomIndex];
      var oldPopulation = item.population; 
      var decreasePopulation = item.population -= 1; 
      var deathRate = Math.round(item.population/1000);
      var newDeathRatePerSec = Math.round(deathRate*(item.population/31557600000));

      // console.log('After Death Population for ' + item.name + ' ' + decreasePopulation);
      // console.log('Before Death Previous Population Value ' + oldPopulation);

      // console.log(deathRate);
      this.setState( (prevState, props) => ({
        deathRatePerSec: newDeathRatePerSec - prevState.deathRatePerSec,
        population: update(prevState.population, {[randomIndex]: {'population': {$set: decreasePopulation}}}),
        deathCount: deathCount++
      }));

      changePopulation[item.codes] = '#dc3545';
     
      this.worldMap.updateChoropleth(changePopulation, {reset: true});
    }

    componentDidMount() {
      this.drawMap();
      console.log('mount');
    }
   //Forloop : select a random country, and add random timezone different country
    
    clear = () => {
      const mapContainer = this.myMap.current;

      for (const child of Array.from(mapContainer.childNodes)) {
          mapContainer.removeChild(child);
      }
    }
    render() {
      var mapList  = (country, i) => {
          return (
              <tr key={i}>
                  <th scope="row">{ country.name }</th>
                  <td>{ country.code }</td>
                  <td>Emission</td>
                  <td>{ country.population }</td>
                  <td>birthrate</td>
                  <td>death rate</td>
              </tr>
            )
        }

        var listCountries  = this.state.population.map(mapList)
       
     
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
                <Col sm="12">CO2 Map - Birth and Death Rate</Col>
              </Row>
            </div>
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
                  <Row>
                    <Col sm="12" className="text-center">
                      <p className="">BirthCount:  {this.state.birthCount}</p>
                      <p>DeathCount: {this.state.deathCount}</p>
                    </Col>
                  </Row>
                  <Table>
                      <thead>
                          <tr>
                              <th>Country</th>
                              <th>Country Code</th>
                              <th>CO2 Emissions per capital</th>
                              <th>Population</th>
                              <th>DeathRate </th>
                              <th>BirthRate </th>
                          </tr>
                      </thead>
                      <tbody>
                          { listCountries }
                      </tbody>
                  </Table>
                </Col>
              </Row>
            </div>
          </Container> 
        </div>
      );
    }
 
}

export default App;
