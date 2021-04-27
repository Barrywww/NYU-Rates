import React, {lazy, Suspense} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import "../css/fonts.css"
import 'antd/dist/antd.compact.css'
import Logout from "../components/common/logout";

// import IndexPage from "./index";
const IndexPage = lazy(() => import('./index'));
const TestPage = lazy(() => import("./TestPage"));
const LoginPage = lazy(() => import("./Login"));
const RegisterPage = lazy(() => import("./Register"));
const AboutUsPage = lazy(() => import("./AboutUs"));
const SearchPage = lazy(() => import("./search"));
const ProfilePage = lazy(() => import("./profile"));

class MainRouter extends React.Component{

    state = {};

   componentDidMount(){
       try {
           const currUser = localStorage.getItem('userInfo');
           this.setState({currUser});
       } catch (error) {
           return;
       }
   };
    
    render() {
        return(
            <BrowserRouter>
                <Suspense fallback={<div/>}>
                    <Switch>
                        <Route exact path="/" component={IndexPage}/>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/AboutUs" component={AboutUsPage}/>
                        <Route path="/profile" component={ProfilePage}/>
                        <Route path="/register" component={RegisterPage}/>
                        <Route path="/test" component={TestPage}/>
                        <Route path="/search" component={SearchPage}/>
                    </Switch>
                </Suspense>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<MainRouter />, document.getElementById("root"));