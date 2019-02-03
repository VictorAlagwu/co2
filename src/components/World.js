import React, { Component } from 'react';
// import ReactDom from 'react-dom';
import Highcharts from 'highcharts'
import HC_map from 'highcharts/modules/map'
import HighchartsReact from 'highcharts-react-official'
import map from '../world.js';
import data from '../data.js';

class World extends Component {
    constructor() {
        super()
        this.state = {
          map: data
        }
      }
    componentDidMount() {
        
    }
    
        
    render() {
        HC_map(Highcharts)
        const options = {
            chart: {
                map: map
            },
            title: {
                text: 'CO2 Emission World Map'
            },
            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },
            series: [{
                key: ['iso-a3', 'name', 'value', 'code'],
                joinBy: 'iso-a3',
                data: data,
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                }
            }],
            tooltip: { 
                pointFormat: '<span>{point.iso-a3}, Country: <b>{point.name}</b>, Population: <b>{point.value}</b>, Code: <b>{point.code}</b></span>'
           
            }
        }        
       
        return (
            <div>
                <div>
                    <HighchartsReact
                        highcharts={Highcharts}
                        constructorType={'mapChart'}
                        options={options}
                    />
                </div>
            </div>
        );
    }
}

export default World;