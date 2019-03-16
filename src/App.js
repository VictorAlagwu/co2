import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { Container, Row, Col, Table, Button} from 'reactstrap';
import 'topojson';
import Datamap from 'datamaps';
import countries from './data';


for (var x = 0; x < countries.length; x++) {
  countries[x]["newBirth"] = 0;
  countries[x]['newDeath'] = 0;
  countries[x]['garbageProduction'] = 1;
}
var windowVisible = true;

var defaultColorCodes = {
  GRL: '#296f4b',
  USA: '#296f4b',
  CAN: '#296f4b', 
  ESP: '#296f4b',
  PRT: '#296f4b',
  FRA: '#296f4b',
  GBR: '#296f4b',
  IRL: '#296f4b',
  LUX: '#296f4b',
  BEL: '#296f4b',
  NLD: '#296f4b',
  DEU: '#296f4b',
  SWZ: '#296f4b',
  ITA: '#296f4b',
  AUS: '#296f4b',
  AUT: '#296f4b',
  NOR: '#296f4b',
  DNK: '#296f4b',
  ISL: '#296f4b',
  SWE: '#296f4b',
  FIN: '#296f4b',
  JPN: '#296f4b',
  KOR: '#296f4b',
  NZL: '#296f4b',
  GRC: '#296f4b',
  AFG: '#af8c8f',
  IRN: '#af8c8f',
  MRT: '#af8c8f',
  PAK: '#af8c8f',
  SAU: '#af8c8f',
  YEM: '#af8c8f',
  DZA: '#af8c8f',
  EGY: '#af8c8f',
  IRQ: '#af8c8f',
  JOR: '#af8c8f',
  KWT: '#af8c8f',
  LBY: '#af8c8f',
  MYS: '#af8c8f',
  MDV: '#af8c8f',
  MAR: '#af8c8f',
  SOM: '#af8c8f',
  TUN: '#af8c8f',
  ARE: '#af8c8f',
  BRN: '#af8c8f',
  LBN: '#af8c8f',
  AGO: '#99995e',
  GAB: '#99995e',
  GMB: '#99995e',
  GHA: '#99995e',
  GIN: '#99995e',
  GNB: '#99995e',
  RWA: '#99995e',
  BEN: '#99995e',
  BWA: '#99995e',
  BFA: '#99995e',
  BDI: '#99995e',
  KEN: '#99995e',
  STP: '#99995e',
  SEN: '#99995e',
  SYC: '#99995e',
  SLE: '#99995e',
  ZAF: '#99995e',
  SSD: '#99995e',
  SDN: '#99995e',
  CPV: '#99995e',
  CMR: '#99995e',
  CAF: '#99995e',
  TCD: '#99995e',
  COM: '#99995e',
  COD: '#99995e',
  COG: '#99995e',
  CIV: '#99995e',
  LSO: '#99995e',
  LBR: '#99995e',
  TZA: '#99995e',
  TGO: '#99995e',
  UGA: '#99995e',
  MDG: '#99995e',
  MWI: '#99995e',
  MLI: '#99995e',
  MUS: '#99995e',
  MOZ: '#99995e',
  DJI: '#99995e',
  ZMB: '#99995e',
  GNQ: '#99995e',
  ERI: '#99995e',
  CHE: '#99995e',
  ETH: '#99995e',
  NAM: '#99995e',
  NER: '#99995e',
  NGA: '#99995e',
  ZWE: '#99995e',
  RUS: '#99d8c9',
  CHN: '#fdc086',
  IND: '#377eb8',
  ARG: '#9563d4',
  BOL: '#9563d4',
  BRA: '#9563d4',
  CHL: '#9563d4',
  COL: '#9563d4',
  ECU: '#9563d4',
  GUY: '#9563d4',
  PRY: '#9563d4',
  PER: '#9563d4',
  SUR: '#9563d4',
  URY: '#9563d4',
  VEN: '#9563d4',
  CUB: '#9563d4',
  DOM: '#9563d4',
  HTI: '#9563d4',
  PRI: '#9563d4',
  MAF: '#9563d4',

};
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
        showGarbageData: false
      };
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
        responsive: true,
        projection: 'equirectangular',
        fills: {
          'Birth': '#ffc107',
          'Death': '#dc3545',
          'Western': '#296f4b',
          'Orthodox': '#99d8c9',
          'Islamic': '#af8c8f',
          'African': '#99995e',
          'Hindu': '#377eb8',
          'Buddhist': '#3182bd',
          'Japanese': '#bcbddc',
          'Sinic': '#fdc086',
          'Latin American': '#9563d4',
          defaultFill: "#7f7f7f"
        },
        // data: 
        geographyConfig: {
          borderColor: '#343a4061',
          highlightOnHover: false,
          popupOnHover: true,
          highlightBorderWidth: 2,
        
      }
        });
     
      
      worldMap.legend();
      this.worldMap = worldMap;
    }

    
    updateMap = (countryCode) => {
      if(windowVisible) {
        var changePopulation = {};
        for (var x = 0; x < countries.length; x++) {
          if (countryCode === countries[x]['codes']) {
            var birthRatePerSec = countries[x]['birthRate'] * countries[x]['population'] / 31557600000;
            var deathRatePerSec = countries[x]['deathRate'] * countries[x]['population'] / 31557600000;
  
            var randomNumber = Math.random();
            changePopulation['population'] = countries[x]['population'];
            var birthHappened = false;
            var deathHappened = false;

            if ( randomNumber < birthRatePerSec ) {
              birthHappened = true;
            }
  
            if ( randomNumber < (deathRatePerSec)) {
              deathHappened = true;
            }
  
            if (birthHappened && deathHappened) {
              changePopulation[countries[x]['codes']] = '#ffc107';
              
  
            } else if (birthHappened) {
              changePopulation[countries[x]['codes']] = '#ffc107';
              countries[x]['newBirth']++;
              countries[x]['population']++;
          
            } else if (deathHappened) {
              changePopulation[countries[x]['codes']] = '#dc3545';
              countries[x]['newDeath']++;
              countries[x]['population']--;
              //Change back to default Color
          
            }

            this.setState((prevState, props) => {
              return { 
                countries: prevState.countries
              }
            }, () => { 
              window.addEventListener("resize", this.resize());
                this.worldMap.updateChoropleth(changePopulation)
                setTimeout( () => {
                  
                  this.worldMap.updateChoropleth(defaultColorCodes)
                }, 500);
                }
            );
            break;
          }
         
        }

        

       
    
    }
  }
    handleButtonChange = () => {
      this.setState(prevstate => ({
        showGarbageData: !prevstate.showGarbageData
      }));
    }
    componentDidMount() {
      this.drawMap();
      for(let x = 0; x < countries.length; x++) {
        var randomTimer = Math.floor(Math.random() * 300) + 1;
        setTimeout(() => {
            setInterval(() => { 
              this.updateMap(countries[x]['codes']);
            }, 1000)
        }, randomTimer)
        
        
      }
    }

    render() {
      var mapList  = (country, i) => {
          return (
              <tr key={i}>
                  <td><img className="img-fluid" src={"/country-flags/" + country.code.toLowerCase() + ".png"} alt={ country.name + "Flag"} /></td>
                  <th scope="row">{ country.name }</th>
                  <td>{ '+' + country.newBirth + ' ,  -' + country.newDeath}</td>
                  <td>
                      { this.state.showGarbageData === false ? (
                            +(country.carbondioxide * ( country.newBirth - country.newDeath)).toFixed(2)
                        ) : (
                            country.garbageProduction
                        )
                     }
                  </td>
              </tr>
            )
        }

        var listCountries  = this.state.countries.sort((a, b) => {
          var countryA = a.name;
          var countryB = b.name;
          return (countryA < countryB) ? -1 : (countryA > countryB) ? 1 : 0;
        }).map(mapList)
       
     
      return (
        <div className="App">
          <Helmet>
            <meta charSet="utf-8" />
            <title>CO2 Emission</title>
            <link rel="canonical" href="http://mysite.com/example" />
          </Helmet>
          <Container fluid>
            <div className="header text-center">
              <Row>
                <Col sm="12">CO2 Map - Birth and Death Rate</Col>
              </Row>
            </div>
            <hr />
            
            <div className="main container-fluid">
              <Row>
                <Col xs="12">
                  <div id="container" ref={this.myMap} />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm="12">
                  <Button onClick={this.handleButtonChange}>
                      {  this.state.showGarbageData === false ? 
                                      "Show Marginal Garbage Production" : "Show Marginal CO2Emission "

                      }
                  </Button>
                  <hr/>
                </Col>
              </Row>
              <Row>
                <Col sm="12">
                  <Table>
                    <thead>
                      <tr>
                          <th>Flag</th>
                          <th>Country</th>
                          <th>Population</th>
                          <th> 
                            { this.state.showGarbageData === false ? 
                                            "Marginal CO2" : "Marginal Garbage Prod."
                            }
                          </th>
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
