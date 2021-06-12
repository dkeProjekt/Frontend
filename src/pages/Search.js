import React, { Component } from "react";
import RealSearch from "../components/RealSearch";

let container = {
    border: '2px solid lightgray',
    width: '480px',
    margin: 'auto'
}


class Search extends Component {
    constructor() {
        super();
    }
    render() {
        return(
            <div style={container}>
                <RealSearch/>
            </div>
        );
    }
}

export default Search;
