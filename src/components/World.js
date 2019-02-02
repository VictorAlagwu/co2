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
        text: 'My map chart'
    },
    series: [{
        data: data
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