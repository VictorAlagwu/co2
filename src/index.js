import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './iframe';
import App from './App';
import IframeCSS from './iframe.css';
import Notfound from './notfound';

import * as serviceWorker from './serviceWorker';


const routing = (
    <Router>
      <div>
        <Route path="/" component={App} />
        <Route 
            path="/iframe" 
            render={() => IframeCSS}
        />
        {/* <Switch>
            <Route exact path="/" component={App} />
            <Route component={Notfound} />
      </Switch> */}
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
