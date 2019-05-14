import React, { Component, Fragment} from 'react';
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



for (let x = 0; x < countries.length; x++) {
  countries[x]["newBirth"] = 0;
  countries[x]['newDeath'] = 0;
  countries[x]['garbageProduction'] = 1;
}
let windowVisible = true;

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
        let worldMap = new Datamap ({
          element: document.getElementById("container"),
          scope: 'world',
          responsive: true,
          projection: 'mercator',
          fills: {
            'western': '#296f4b',
            defaultFill: '#000000'
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
        if (document.querySelector('.hoverinfo')){
          let mapTooltip = document.querySelector('.datamaps-hoverover');
          let mapHoverSVG = document.querySelector('svg');
          let point = mapHoverSVG.createSVGPoint();
          point.x = e.clientX;
          point.y = e.clientY;
          let cursor = point.matrixTransform(mapHoverSVG.getScreenCTM().inverse());
          mapTooltip.style.top = (cursor.y + 16) + "px";
          console.log(cursor.y);
          
        }
      }
      
      updateMap = () => {
        if(windowVisible) {
            let changePopulation = {};
            for (let x = 0; x < countries.length; x++) {
                let birthRatePerSec = (countries[x]['birthRate'] * countries[x]['population']) / 31557600000;
                let deathRatePerSec = (countries[x]['deathRate'] * countries[x]['population']) / 31557600000;
      
                let randomNumber = Math.random();
                changePopulation['population'] = countries[x]['population'];
                let birthHappened = false;
                let deathHappened = false;
                if ( randomNumber < birthRatePerSec ) {
                  birthHappened = true;
                }
                if ( randomNumber < (deathRatePerSec)) {
                  deathHappened = true;
                }
      
                if (birthHappened && deathHappened) {
                  changePopulation[countries[x]['codes']] = 'url(#redYellow)';
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

      inIframe = () => {
        try {
          if (window.self !== window.top) {

            //Adding CSS Stylesheet to the iframe
              let cssId = 'myCss';  
              if (!document.getElementById(cssId))
              {
                  let head  = document.getElementsByTagName('head')[0];
                  let link  = document.createElement('link');
                  link.id   = cssId;
                  link.rel  = 'stylesheet';
                  link.type = 'text/css';
                  link.href = 'https://reactco2emission.netlify.com/iframe.css';
                  link.media = 'all';
                  head.appendChild(link);
              }
            document.querySelector('.widgetContainer').style.display = 'none';
            document.querySelector('.selectCountriesToShow').style.display = 'none';
            //TODO: Load 
              this.setState({
                  noOfCountriesOnTable: 5
              });

          } else{ 
          console.log('Not in Iframe');
          }
        } catch (e) {
          console.log('Not in Iframe : exception');
        }
      }
      handleToggle = () => {
        this.setState(prevstate => ({
          showGarbageData: !prevstate.showGarbageData,
        
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
        this._onMouseMove();
        this.inIframe();

        this.drawMap();
        let datamapSVG = document.querySelector('.datamap');
        datamapSVG.insertAdjacentHTML('afterbegin', 
                '<defs>' +
                  '<pattern id="redYellow" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">'+ 
                    '<rect x="0" y="0" width="10" height="10" style="fill:yellow"></rect>'+
                    '<line x1="0" y1="0" x2="0" y2="10" style="stroke:red; stroke-width:8"></line>'+
                  '</pattern>'+
                  '</defs>');


        window.addEventListener("resize", this.resize());
      
      }
      
    render() {
      const codeString = 
                        "<!-- Copy and Paste the section you want -->\n"+
                        "<div class='co2Widget'>\n" + 
                          "    <iframe class='widgetButton' id='widgetSnippet' title='myco2' src='https://reactco2emission.netlify.com' width='640' height='360' frameborder='0'>\n" + 
                          "    </iframe>\n" +
                        "</div>";
      return (
       <Fragment>
          <MDBContainer>
            <Header />
            <div className="main container-fluid">
              <Map mapRef= {this.myMap} makeMouseMove={this._onMouseMove} />
              <div className="widgetContainer">
              <MDBBtn color="info" rounded onClick={this.showEmbeddedWidget} id="widgetButton" data-class="widgetButton">
                  Get Embeddable Widget Code
              </MDBBtn>
              {/* Modal code below: */}
              
              <MDBModal isOpen={this.state.showEmbeddedCode} toggle={this.showEmbeddedWidget}>
                <MDBModalHeader
                  className="text-center"
                  titleClass="w-100 font-weight-bold"
                  toggle={this.showEmbeddedWidget}
                >
                "Copy and paste on site"
                 {this.state.copied ? <span > Copied to clipboard.</span> : null}
                 
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
              <br></br><hr />
              </div>
              
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
