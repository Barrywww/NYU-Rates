import React, {lazy, Suspense} from "react";
import ReactDOM from "react-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import {createBrowserHistory} from "history";
import {BrowserRouter, Route, Switch, NavLink, Link} from "react-router-dom";

// import IndexPage from "./index";
const IndexPage = lazy(() => import('./index'));
const TestPage = lazy(() => import("./TestPage"));

class MainRouter extends React.Component{
    render() {
        return(
            <BrowserRouter>
                <Suspense fallback={<div/>}>
                    <Switch>
                        <Route exact path="/" component={IndexPage}/>
                        <Route path="/test" component={TestPage}/>
                    </Switch>
                </Suspense>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<MainRouter />, document.getElementById("root"));