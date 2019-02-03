import React, { Component } from 'react';
import { Table } from 'reactstrap';
import data from '../data.js';

class Emission extends Component {
    mapList = (country, i) => {
        return (
            <tr>
                <th scope="row">{ i + 1 }</th>
                <td>{ country.name }</td>
                <td>{ country.code }</td>
                <td>{ country.value }</td>
            </tr>
        )
    }
    render() {
        const listCountries = data.map(this.mapList)
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