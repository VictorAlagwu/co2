import React, { Component, Fragment} from 'react';
// import { Container} from 'reactstrap';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter
} from "mdbreact";
import countries from './data';
import defaultColorCodes from './defaultColorCodes';
import 'topojson';
import Datamap from 'datamaps';
import Map from './components/Map';
import MapTable from './components/MapTable';
import Header from './components/Header';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Iframe from './components/Iframe';


for (var x = 0; x < countries.length; x++) {
  countries[x]["newBirth"] = 0;
  countries[x]['newDeath'] = 0;
  countries[x]['garbageProduction'] = 1;
}
var windowVisible = true;


document.addEventListener("visibilitychange", function() {
  document.visibilityState === "hidden" ? windowVisible = false : windowVisible = true;
});

class App extends Component {
    constructor(props) {
      super(props)
      this.myMap = React.createRef();
      this.state = {
        countries: countries,
        showGarbageData: false,
        noOfCountriesOnTable: countries.length,
        x: 0,
        y: 0,
        showEmbeddedCode: false,
        copied: false
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
          projection: 'mercator',
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
            highlightOnHover: true,
            popupOnHover: true,
            highlightBorderColor: 'white',
            highlightBorderWidth: 2,
          
        }
          });
       
        
        // worldMap.legend();
        this.worldMap = worldMap;
      }

      _onMouseMove = (e) => {
        this.setState(prevState => ({ 
          x: prevState.e.screenX, 
          y: prevState.e.screenY 
        })
        );
      }

      updateMap = () => {
        if(windowVisible) {
          var changePopulation = {};
          for (var x = 0; x < countries.length; x++) {
              var birthRatePerSec = (countries[x]['birthRate'] * countries[x]['population']) / 31557600000;
              var deathRatePerSec = (countries[x]['deathRate'] * countries[x]['population']) / 31557600000;
    
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
      handleToggle = () => {
        this.setState(prevstate => ({
          showGarbageData: !prevstate.showGarbageData
        }));
      }
    
    
      onCopy = () => {
        this.setState({copied: true});
      };
    
      showEmbeddedWidget = () => {
        this.setState(prevstate => ({
          showEmbeddedCode: !prevstate.showEmbeddedCode
        }));
      }

      handleTableCountriesToShow = (event) => {
        this.setState({
          noOfCountriesOnTable: parseInt(event.target.value, 10)
        })
      }
      componentDidMount() {
        this.drawMap();
        window.addEventListener("resize", this.resize());
      
      }

    render() {
      var tar = document.getElementsByClassName('datamaps-hoverover');
      // tar.style.top = this.state.x;
      // tar.style.left = this.state.y;
      console.log(this.state.x);
      const codeString = 
                "<div className='embed-responsive embed-responsive-21by9'>\n" + 
                "<iframe className='embed-responsive-item' title='myco2' src='https://reactco2emission.netlify.com'>\n" + 
                    "</iframe>\n" +
                "</div>";
      return (
       <Fragment>
          <MDBContainer>
            <Header />
            <div className="main container-fluid">
              <Map mapRef= {this.myMap} />
              <MDBBtn color="info" rounded onClick={this.showEmbeddedWidget}>
                  Get Embeddable Widget Code
              </MDBBtn>
              {/* Modal code below: */}
              
              <MDBModal isOpen={this.state.showEmbeddedCode} toggle={this.showEmbeddedWidget}>
                <MDBModalHeader
                  className="text-center"
                  titleClass="w-100 font-weight-bold"
                  toggle={this.showEmbeddedWidget}
                >
                 {this.state.copied ? <span >Copied.</span> : null}
                 
                </MDBModalHeader>
                <MDBModalBody>
                  <CopyToClipboard 
                      text={codeString}
                      onCopy={this.onCopy} >
                      <SyntaxHighlighter language='javascript' style={docco}>{codeString}</SyntaxHighlighter>
                             </CopyToClipboard>          
                  </MDBModalBody>
                <MDBModalFooter className="justify-content-center">
                </MDBModalFooter>
              </MDBModal>

              <MapTable 
                      handleToggle={this.handleToggle}
                      handleTableCountriesToShow={this.handleTableCountriesToShow}
                      showGarbageData={this.state.showGarbageData}
                      countries={this.state.countries} 
                      noOfCountriesOnTable={this.state.noOfCountriesOnTable} 
                      />
               
            </div>
          </MDBContainer> 
        </Fragment>
      );
    }
 
}

export default App;
