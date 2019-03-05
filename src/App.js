import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { Container, Row, Col, Table} from 'reactstrap';
import 'd3';
import 'topojson';
import Datamap from 'datamaps';
import update from 'immutability-helper';
import countries from './data';

var population = countries;
var birthCount = 0;
var deathCount = 0;

//Each Country get its own timer, then inside a forloop, we run different for a country
class App extends Component {
    constructor(props) {
      super(props)
      this.myMap = React.createRef();
      this.state = {
        population: population,
        nga: 111506000,
        birthCount: birthCount,
        deathCount: deathCount
      };
      setInterval(this.birthMap, 1000);
      setInterval(this.deathMap, 1500);
    }

    resize = () => {
      if (this.worldMap) {
          this.worldMap.resize();
      }
    }

    // Draw Map
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
              // tooltip content
              return ['<div class="hoverinfo">',
                  '<strong>', geo.properties.name, '</strong>'
                 ,
                  '</div>'].join('');
          }
      }
        });
     
      window.addEventListener("resize", this.resize());
      worldMap.legend();
      this.worldMap = worldMap;
    }
    
    // testMap = () => {
    //   var randomNum = Math.random() ;
    //   var birthRateNGR = 38.9;
      
    //   var birthRatePerSecNGR = birthRateNGR*this.state.nga/31557600000;
    //   console.log(randomNum < birthRatePerSecNGR, randomNum,birthRatePerSecNGR);
    //   if (randomNum < birthRatePerSecNGR) {
    //     this.setState((prevState, props) => {
    //       return {
    //         nga: prevState.nga++
    //       }
    //     })
    //   }
      
    // }


    birthMap = () => {
     
      var changePopulation = {};
      for (var x = 0; x < population.length; x++) {
        var randomNumber = Math.floor(Math.random() * 10) + 1;
       
        var birthRatePerSec = population[x]['birthRate'] * population[x]['population']/31557600000;
        changePopulation['population'] = population[x]['population'];

         // Increment One to Country Population if random number is less than BPS
        if ( birthRatePerSec < randomNumber) {
            changePopulation[population[x]['codes']] = '#ffc107';
            population[x]['population']++;
        }
      }
      this.setState( (prevState, props) => ({
        population: prevState.population,
        birthCount: birthCount++
      }));
      

      console.log(changePopulation);
      
      this.worldMap.updateChoropleth(changePopulation, {reset: true});
    }

    deathMap = () => {
      var changePopulation = {};
      for (var x = 0; x < population.length; x++) {
        var randomNumber = Math.floor(Math.random() * 10) + 1;
       
        var deathRatePerSec = population[x]['deathRate'] * population[x]['population']/31557600000;
        changePopulation['population'] = population[x]['population'];

         // Increment One to Country Population if random number is less than BPS
        if ( deathRatePerSec > randomNumber) {
            changePopulation[population[x]['codes']] = '#dc3545';
            population[x]['population']--;
        }
      }
      this.setState( (prevState, props) => ({
        population: prevState.population,
        deathCount: deathCount++
      }));
      this.worldMap.updateChoropleth(changePopulation, {reset: true});
    }

    componentDidMount() {
      this.drawMap();
      setInterval(this.testMap, 1000);
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
                  <td>{ country.birthRate }</td>
                  <td>{ country.deathRate }</td>
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
                              <th>Birth Rate </th>
                              <th>Death Rate </th>
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
