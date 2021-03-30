import React from "react";
import {BrowserRouter, Link} from "react-router-dom";
import {useRouteMatch} from "react-router";

// function App() {return <h1>Hello World!</h1>}


class TestPage extends React.Component{
    render(){
        return(
            <div className="App">
                <h1> Hello LoginPage! </h1>
                <Link to={"/"}>
                    <h3>Back to Homepage</h3>
                </Link>
            </div>
        );
    };
}


// class TestRouter extends React.Component{
//     constructor(props) {
//         super(props);
//         this.match = props.match;
//     }
//
//     render() {
//         console.log(this.match);
//         return (
//             <TestPage/>
//         )
//     }
// }

// function TestRouter(props){
//     console.log(props.match)
// }


// const TestRouter = (match) => {
//     console.log(match);
//     let {path, url} = useRouteMatch();
//     console.log(path);
//     console.log(url);
//     return (<TestPage/>);
// }

export default TestPage;