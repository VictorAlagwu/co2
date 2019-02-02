import React, { Component } from 'react';
import Highcharts from 'highcharts'
import HC_map from 'highcharts/modules/map'
import HighchartsReact from 'highcharts-react-official'
import map from '../world.js';
import data from '../data.js';

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
        data: data,
        states: {
            hover: {
                color: '#BADA55'
            }
        }
        // dataLabels: {
        //     enabled: true,
        //     format: '{point.name}'
        // }
    }]
}

class World extends Component {
    
    componentDidMount() {
    }
        
    render() {
        HC_map(Highcharts)
        
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