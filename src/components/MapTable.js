import React, { Component } from 'react';
import { Table, CustomInput, FormGroup, Input } from 'reactstrap';
import { MDBRow, MDBCol } from "mdbreact";


class MapTable extends Component {

    render () {
      let mapList  = (country, i) => {
          
        if(country.newBirth > 0 || country.newDeath > 0){
          return(
            <tr key={i}>
              <td width="20"><img className="img-fluid flagImage" src={"/country-flags/" + country.code.toLowerCase() + ".svg"} alt={ country.name + "Flag"} /></td>
              <td width="20">{ country.name }</td>
              <td width="20">{ '+' + country.newBirth + ' '}<small> ({ country.population.toLocaleString() })</small></td>
              <td width="40">
                  { this.props.showGarbageData === false ? (
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
      
      let listCountries;
      if (this.props.showGarbageData === false) {
          listCountries =  this.props.countries.sort((a, b) => 
                                ((b.carbondioxide * ( b.newBirth - b.newDeath)).toFixed(2)) - ((a.carbondioxide * ( a.newBirth - a.newDeath)).toFixed(2))
                              ).slice(0, this.props.noOfCountriesOnTable).map(mapList);
      } else {
          listCountries = this.props.countries.sort((a, b) => 
              (b.garbageProduction.toFixed(2)) - (a.garbageProduction.toFixed(2))
              ).map(mapList);
        }

        return (
          <div>
            <MDBRow>
              <MDBCol lg="9" className="tableChange">
              
                <CustomInput className="text-left" onClick={this.props.handleToggle} id="exampleCustomSwitch" type="switch"  name="customSwitch" label= {  this.props.showGarbageData === false ? 
                            "Marginal Garbage Production" : "Marginal CO2Emission " 
                      } /> 
                <FormGroup className="text-right">
                  <Input type="select" name="select" onChange={this.props.handleTableCountriesToShow} value={this.props.noOfCountriesOnTable} className="selectOption animate slideIn" >
                    <option value={this.props.countries.length}>Show All Countries</option>
                    <option value="10">Show Top 10 Countries</option>
                    <option value="20">Show Top 20 Countries</option>
                    <option value="50">Show Top 50 Countries</option>
                    <option value="100">Show Top 100 Countries</option>
                  </Input>
                </FormGroup> 
              </MDBCol>
            </MDBRow>
            <MDBRow>
            <MDBCol lg="6" className="countryTable">
              <Table className="table-striped">
                <thead>
                  <tr>
                      <th scope="col" width="20">Flag</th>
                      <th scope="col" width="20">Country</th>
                      <th scope="col" width="20">Population</th>
                      <th scope="col" width="40"> 
                        { this.props.showGarbageData === false ? 
                             "Marginal CO2 Emission" : "Marginal Garbage Production."
                        }
                      </th>
                  </tr>
                </thead>
                <tbody>
                    { listCountries }
                </tbody>
            </Table>
            </MDBCol>
          </MDBRow>
          </div>
        )
    }

}

export default MapTable;