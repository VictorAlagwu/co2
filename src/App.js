import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import World from './components/World';
import Emission from './components/CoEmission';
import data from './data.js';

class App extends Component {
  constructor() {
    super()
    this.state = {
      mapData: data
    };
    
    
  }
   //Separate Interval for each country

  // You have to use "currying" to pass arguments functions passed as props.
  // https://medium.freecodecamp.org/reactjs-pass-parameters-to-event-handlers-ca1f5c422b9
  changePopulation = (idx) => (e) => { 

    // This is a special form of setState() which provides a "copy" of state which you can mutate.
    this.setState((state) => {

        state.mapData[idx].value =  state.mapData[idx].value + 5 // Add 5 to population

        // This still generates a error: Uncaught TypeError: Cannot read property '0' of undefined
        // I think it's a bug with highmaps.
        // Either way, you should separate the data for the list and the map into separate date
        // and keep a the 2 letter country code as the key to link the 2 sets of data.
        // That way you can mutate the population for each country without it interfering with the map
        return {
          'mapData': state.mapData,
        }    
    });
  }
  
  componentDidMount(){ 
    // this.timer = setInterval(() => {
		// 	this.tick()
		// }, 1000)
  }
  
    render() {
      return (
        <div className="App">
          <Container>
            <div className="header">
              <Row>
                <Col sm="12">Header</Col>
              </Row>
            </div>
            <br />
            <hr />
            <div className="main">
              <Row  style={{ height: 'auto'}}>
                <Col xs="12">
                  <World mapData={this.state.mapData}/>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col xs="12">
                  <Emission mapData={this.state.mapData} changePopulation={this.changePopulation} />
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      );
    }
 
}

export default App;
