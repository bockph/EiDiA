"use strict";

import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {WelcomeView} from "./views/WelcomeView";
import {SearchView} from "./views/SearchView";
import {FileCabinetView} from "./views/FileCabinetView"
import {RecordView} from "./views/RecordView";

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'EiDiA - Einfache Digitale Akte',
            routes: [
                {component: WelcomeView, path: '/', exact: true},
                {component: SearchView, path: '/search', exact: true},
                {component: RecordView, path: '/record', exact: true},
                {component: FileCabinetView, path: '/cabinet', exact: true}
            ]
        };
    }

    componentDidMount(){
        document.title = this.state.title;
    }

    render() {
        return(
            <div>
                <Router>
                    <Switch>
                        {this.state.routes.map((route, i) => (<Route key={i} {...route}/>) )}
                    </Switch>
                </Router>
            </div>
        );
    }
}

