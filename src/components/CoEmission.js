import React, { Component } from 'react';
import { Table } from 'reactstrap';

class Emission extends Component {
    mapList = (country, i) => {
        return (
            <tr key={i}>
                <th scope="row">{ i }</th>
                <td>{ country.name }</td>
                <td>{ country.code }</td>
                <td onMouseOver={this.props.changePopulation} >{ country.value }</td>
            </tr>
        )
    }
    render() {
        const listCountries = this.props.mapData.map(this.mapList)
        return <div>
                 <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Country</th>
                            <th>CO2 Emission</th>
                            <th>Population</th>
                        </tr>
                    </thead>
                    <tbody>
                        { listCountries }
                    </tbody>
                </Table>
            </div>
        
    }
}

// const Table
export default Emission;