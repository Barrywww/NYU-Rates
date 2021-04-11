import React, {lazy, Suspense} from "react";
import ReactDOM from "react-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import {createBrowserHistory} from "history";
import {BrowserRouter, Route, Switch, NavLink, Link} from "react-router-dom";

// import IndexPage from "./index";
const IndexPage = lazy(() => import('./index'));
const TestPage = lazy(() => import("./TestPage"));
const LoginPage = lazy(() => import("./Login"));
const RegisterPage = lazy(() => import("./Register"));
const AboutUsPage = lazy(() => import("./AboutUs"));

let history = createBrowserHistory(location);

class MainRouter extends React.Component{
    render() {
        return(
            <BrowserRouter>
                <Suspense fallback={<div/>}>
                    <Switch>
                        <Route exact path="/" component={IndexPage}/>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/AboutUs" component={AboutUsPage}/>
                        <Route path="/register" component={RegisterPage}/>
                        <Route path="/test" component={TestPage}/>
                    </Switch>
                </Suspense>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<MainRouter />, document.getElementById("root"));