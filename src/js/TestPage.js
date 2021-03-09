import React from "react";
import {Link} from "react-router-dom";

class TestPage extends React.Component{
    render(){
        return(
            <div className="App">
                <h1> Hello TestPage! </h1>
                <Link to={"/"}>
                    <h3>Back to Homepage</h3>
                </Link>
            </div>
        );
    };
}

export default TestPage;