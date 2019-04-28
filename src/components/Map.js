import React, { Component } from 'react';
import { Row, Col} from 'reactstrap';

class Map extends Component {




    render () {
        return (
        <div>
            <Row>
              <Col xs="12">
                <div id="container" ref={this.props.mapRef} className="mapDiagram">
                </div>
              </Col>
            </Row>
            <hr />
        </div>
        )
    }
}

export default Map;
