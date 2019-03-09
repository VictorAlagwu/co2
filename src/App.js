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
var rand = Math.floor(Math.random() * 5) + 1;

var westernCountries = {
  'USA': {fillkey: '#e30dfd'},
  'CAN': {fillkey: '#e30dfd'}, 
  'ESP': {fillkey: '#e30dfd'}
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
        birthCount: 0,
        deathCount: 0,
        showGarbageData: false
      };

      setInterval(this.updateMap, 2000);
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
        aspectRatio: 0.5625,
        projection: 'equirectangular',
        fills: {
          'Birth': '#ffc107',
          'Death': '#dc3545',
          // 'GBR': '#8c564b',
          // 'westernCountries': '#8c564b',
          defaultFill: "#7f7f7f"
        },
        data: { 
          // 'GBR': {fillKey: 'GBR'},
          // 'FRA': {fillKey: 'FRA'},
          // 'USA': {fillColor: 'westernCountries'}
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

    updateMap = () => {
      if(windowVisible) {
        var changePopulation = {};
        var countBirth = 0;
        var countDeath = 0;

       

        countries.map((country, i) => {
          var birthRatePerSec = country.birthRate * country.population / 31557600000;
          var deathRatePerSec = country.deathRate * country.population / 31557600000;

          var randomNumber = Math.random() * (1 - 0) + 0;

          changePopulation['population'] = country.population;

          // First Check if both Death and Birth occur at the same time for a country
          if ( randomNumber < birthRatePerSec && randomNumber < deathRatePerSec) {
            // changePopulation[country.codes] = '#61bd4f';
              console.log('Both Occur same time');
          } else {
            if (randomNumber < deathRatePerSec) {
              changePopulation[country.codes] = '#dc3545';
              country.newDeath++;
              country.population--;
              countDeath++
            } 
            if (randomNumber < birthRatePerSec) {
              // var newRand = Math.floor(Math.random() * 7) + 1;
                  changePopulation[country.codes] = '#ffc107'
                  country.newBirth++;
                  country.population++;
                  countBirth++
                  // setTimeout(, newRand * 1000);
              } 
            
          }
          
        })

        this.setState( (prevState, props) => ({
          countries: prevState.countries,
          birthCount: prevState.birthCount + countBirth,
          deathCount: prevState.deathCount + countDeath
        }));
        
        this.worldMap.updateChoropleth(changePopulation, {reset: true});
      }
    }

    handleButtonChange = () => {
      this.setState(prevstate => ({
        showGarbageData: !prevstate.showGarbageData
      }));
    }
    componentDidMount() {
      // console.log(this.state.rand);
      this.drawMap();     
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
                <Col xs="12">
                  <Row>
                    <Col sm="12" className="text-center">
                      <p className="">Total Birth:  {this.state.birthCount}</p>
                      <p>Total Death: {this.state.deathCount}</p>
                    </Col>
                  </Row>
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
