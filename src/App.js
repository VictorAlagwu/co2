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
  AFG: '#000000',
  IRN: '#000000',
  MRT: '#000000',
  PAK: '#000000',
  SAU: '#000000',
  YEM: '#000000',
  DZA: '#000000',
  EGY: '#000000',
  IRQ: '#000000',
  JOR: '#000000',
  KWT: '#000000',
  LBY: '#000000',
  MYS: '#000000',
  MDV: '#000000',
  MAR: '#000000',
  SOM: '#000000',
  TUN: '#000000',
  ARE: '#000000',
  BRN: '#000000',
  LBN: '#000000',
  AGO: '#000000',
  GAB: '#000000',
  GMB: '#000000',
  GHA: '#000000',
  GIN: '#000000',
  GNB: '#000000',
  RWA: '#000000',
  BEN: '#000000',
  BWA: '#000000',
  BFA: '#000000',
  BDI: '#000000',
  KEN: '#000000',
  STP: '#000000',
  SEN: '#000000',
  SYC: '#000000',
  SLE: '#000000',
  ZAF: '#000000',
  SSD: '#000000',
  SDN: '#000000',
  CPV: '#000000',
  CMR: '#000000',
  CAF: '#000000',
  TCD: '#000000',
  COM: '#000000',
  COD: '#000000',
  COG: '#000000',
  CIV: '#000000',
  LSO: '#000000',
  LBR: '#000000',
  TZA: '#000000',
  TGO: '#000000',
  UGA: '#000000',
  MDG: '#000000',
  MWI: '#000000',
  MLI: '#000000',
  MUS: '#000000',
  MOZ: '#000000',
  DJI: '#000000',
  ZMB: '#000000',
  GNQ: '#000000',
  ERI: '#000000',
  CHE: '#000000',
  ETH: '#000000',
  NAM: '#000000',
  NER: '#000000',
  NGA: '#000000',
  ZWE: '#000000',
  RUS: '#000000',
  CHN: '#000000',
  IND: '#000000',
  ARG: '#000000',
  BOL: '#000000',
  BRA: '#000000',
  CHL: '#000000',
  COL: '#000000',
  ECU: '#000000',
  GUY: '#000000',
  PRY: '#000000',
  PER: '#000000',
  SUR: '#000000',
  URY: '#000000',
  VEN: '#000000',
  CUB: '#000000',
  DOM: '#000000',
  HTI: '#000000',
  PRI: '#000000',
  MAF: '#000000',
  MEX: '#000000',
  NIC: '#000000',
  GTM: '#000000',
  BLZ: '#000000',
  CRI: '#000000',
  SLV: '#000000',
  ATG: '#000000',
  ABW: '#000000',
  BHS: '#000000',
  BRB: '#000000',
  CYM: '#000000',
  HND: '#000000',
  PAN: '#000000',
  DMA: '#000000',
  GRD: '#000000',
  VGB: '#000000',
  VIR: '#000000',
  TCA: '#000000',
  TTO: '#000000',
  KNA: '#000000',
  LCA: '#000000',
  VCT: '#000000',
  JAM: '#000000',
  GUF: '#000000',
  IDN: '#000000',
  BGD: '#000000',
  PHL: '#000000',
  SYR: '#000000',
  TWN: '#000000',
  THA: '#000000',
  TJK: '#000000',
  UKR: '#000000',
  BIH: '#000000',
  PRK: '#000000',
  PSE: '#000000',
  QAT: '#000000',
  SHN: '#000000',
  SPM: '#000000',
  SGP: '#000000',
  SLB: '#000000',
  SMR: '#000000',
  SRB: '#000000',
  SVK: '#000000',
  SXM: '#000000',
  TKM: '#000000',
  TLS: '#000000',
  TON: '#000000',
  TUR: '#000000',
  TUV: '#000000',
  UZB: '#000000',
  VNM: '#000000',
  VUT: '#000000',
  KAZ: '#000000',
  ROU: '#000000',
  BLR: '#000000',
  CZE: '#000000',
  MMR: '#000000',
  AZE: '#000000',
  NPL: '#000000',
  HRV: '#000000',
  BGR: '#000000',
  POL: '#000000',
  PNG: '#000000',
  KHM: '#000000',
  ALB: '#000000',
  FRO: '#000000',
  MNG: '#000000',
  KGZ: '#000000',
  LAO: '#000000',
  MKD: '#000000',
  MLT: '#000000',
  MNE: '#000000',
  MSR: '#000000',
  MNP: '#000000',
  MYT: '#000000',
  HUN: '#000000',
  BTN: '#000000',
  SVN: '#000000',
};

document.addEventListener("visibilitychange", function() {
  document.visibilityState === "hidden" ? windowVisible = false : windowVisible = true;
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
      setInterval(this.updateMap, 1000);
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
          'western': '#296f4b',
          defaultFill: "#000000"
        },
        data: {
          GRL: {fillKey: 'western'},
          USA: {fillKey: 'western'},
          CAN: {fillKey: 'western'}, 
          ESP: {fillKey: 'western'},
          PRT: {fillKey: 'western'},
          FRA: {fillKey: 'western'},
          GBR: {fillKey: 'western'},
          IRL: {fillKey: 'western'},
          LUX: {fillKey: 'western'},
          BEL: {fillKey: 'western'},
          NLD: {fillKey: 'western'},
          DEU: {fillKey: 'western'},
          SWZ: {fillKey: 'western'},
          ITA: {fillKey: 'western'},
          AUS: {fillKey: 'western'},
          AUT: {fillKey: 'western'},
          NOR: {fillKey: 'western'},
          DNK: {fillKey: 'western'},
          ISL: {fillKey: 'western'},
          SWE: {fillKey: 'western'},
          FIN: {fillKey: 'western'},
          JPN: {fillKey: 'western'},
          KOR: {fillKey: 'western'},
          NZL: {fillKey: 'western'},
          GRC: {fillKey: 'western'},
        },
        geographyConfig: {
          borderColor: '#808080',
          highlightOnHover: false,
          popupOnHover: true,
          highlightBorderWidth: 2,
        
      }
        });
     
      
      // worldMap.legend();
      this.worldMap = worldMap;
    }

    
    updateMap = () => {
      if(windowVisible) {
        var changePopulation = {};
        for (var x = 0; x < countries.length; x++) {
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
              changePopulation[countries[x]['codes']] = '#EE7B26';
              countries[x]['newBirth']++;
              countries[x]['newDeath']++;
              countries[x]['garbageProduction'] =+ randomNumber;

            } else if (birthHappened) {
              changePopulation[countries[x]['codes']] = '#ffc107';
              countries[x]['newBirth']++;
              countries[x]['population']++;
              countries[x]['garbageProduction'] =+ randomNumber;

            } else if (deathHappened) {
              changePopulation[countries[x]['codes']] = '#dc3545';
              countries[x]['newDeath']++;
              countries[x]['population']--;
              countries[x]['garbageProduction'] =+ randomNumber;
              //Change back to default Color
          
            }
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
    }
  }
    handleButtonChange = () => {
      this.setState(prevstate => ({
        showGarbageData: !prevstate.showGarbageData
      }));
    }
    componentDidMount() {
      this.drawMap();
      window.addEventListener("resize", this.resize());
    
    }

    render() {
      var mapList  = (country, i) => {
          
      if(country.newBirth > 0 || country.newDeath > 0){
        return(
          <tr key={i}>
            <td><img className="img-fluid flagImage" src={"/country-flags/" + country.code.toLowerCase() + ".svg"} alt={ country.name + "Flag"} /></td>
            <th scope="row">{ country.name }</th>
            <td>{ '+' + country.newBirth + ' ,  -' + country.newDeath}</td>
            <td>
                { this.state.showGarbageData === false ? (
                      +(country.carbondioxide * ( country.newBirth - country.newDeath)).toFixed(2)
                  ) : (
                      country.garbageProduction.toFixed(2)
                  )
              }
              </td>
          </tr>
          )
        }
    }
    var listCountries;
    if (this.state.showGarbageData === false) {
         listCountries =  this.state.countries.sort((a, b) => 
                              ((b.carbondioxide * ( b.newBirth - b.newDeath)).toFixed(2)) - ((a.carbondioxide * ( a.newBirth - a.newDeath)).toFixed(2))
                            ).map(mapList);
    } else {
        listCountries = this.state.countries.sort((a, b) => 
            (b.garbageProduction.toFixed(2)) - (a.garbageProduction.toFixed(2))
            ).map(mapList);
      }
     
      return (
        <div className="App">
          <Helmet>
            <meta charSet="utf-8" />
            <title>CO2 Emission</title>
            <link rel="canonical" href="#" />
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
                  <div id="container" ref={this.myMap} className="mapDiagram" />
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
                <Col sm="6" className="countryTable">
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
