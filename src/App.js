import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { Container, Row, Col, Table} from 'reactstrap';
import 'd3';
import 'topojson';
import Datamap from 'datamaps';
import update from 'immutability-helper';
import countries from './data';


for (var x = 0; x < countries.length; x++) {
  countries[x]["newBirth"] = 0;
  countries[x]['newDeath'] = 0;
}
var windowVisible = true;

document.addEventListener("visibilitychange", function() {
  console.log( document.visibilityState );
  if(document.visibilityState === "hidden"){
    windowVisible = false;
  }else{
    windowVisible = true;
  }
});

//Each Country get its own timer, then inside a forloop, we run different for a country
class App extends Component {
    constructor(props) {
      super(props)
      this.myMap = React.createRef();
      this.state = {
        countries: countries,
        birthCount: 0,
        deathCount: 0
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


    birthMap = () => {
      if(windowVisible){
        var changePopulation = {};
        var countBirth = 0;
        countries.map((country, i) => {
         
            var birthRatePerSec = (country.birthRate * country.population) / 31557600000;

            changePopulation['population'] = country.population;

            if ( (Math.random() * (1 - 0) + 0) < birthRatePerSec ) {
                changePopulation[country.codes] = '#ffc107';
                console.log();
                country.newBirth++;
                country.population++;
                countBirth++
              }

          })
        
        this.setState( (prevState, props) => ({
          countries: prevState.countries,
          birthCount: prevState.birthCount + countBirth
        }));
        
        this.worldMap.updateChoropleth(changePopulation, {reset: true});
      }
    }

    deathMap = () => {
      if(windowVisible){
        var changePopulation = {};
          var countDeath = 0;
          countries.map((country, i) => {
          
            var deathRatePerSec = (country.deathRate * country.population) / 31557600000;

              changePopulation['population'] = country.population;

              if ( (Math.random() * (1 - 0) + 0) < deathRatePerSec ) {
                  changePopulation[country.codes] = '#dc3545';
                  console.log();
                  country.newDeath++;
                  country.population--;
                  countDeath++
                }

            })
          
        this.setState( (prevState, props) => ({
          countries: prevState.countries,
          deathCount: prevState.deathCount + countDeath
        }));
        this.worldMap.updateChoropleth(changePopulation, {reset: true});
      }
    }

    componentDidMount() {
      this.drawMap();
      setInterval(this.testMap, 1000);
    }
    render() {
      var mapList  = (country, i) => {
          return (
              <tr key={i}>
                  <th scope="row">{ country.name }</th>
                  <td>{ country.code }</td>
                  <td>{ country.population }</td>
                  <td>{ country.birthRate }</td>
                  <td>{ country.deathRate }</td>
                  <td>{ +(country.carbondioxide * ( country.newBirth - country.newDeath)).toFixed(2) }</td>
                  <td>{ country.newBirth }</td>
                  <td>{ country.newDeath }</td>
              </tr>
            )
        }

        var listCountries  = this.state.countries.map(mapList)
       
     
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
                      <p className="">Total Birth:  {this.state.birthCount}</p>
                      <p>Total Death: {this.state.deathCount}</p>
                    </Col>
                  </Row>
                  <Table>
                      <thead>
                          <tr>
                              <th>Country</th>
                              <th>Country Code</th>
                              <th>Population</th>
                              <th>Birth Rate </th>
                              <th>Death Rate </th>
                              <th>Marginal CO2</th>
                              <th>Birth Count</th>
                              <th>Death Count</th>
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
