import React, { Component } from "react";
import PersonalFeed from "../components/PersonalFeed";

let container = {
    border: '2px solid lightgray',
    width: '400px',
    margin: 'auto'
}

class Feed extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div style={container}>
                <PersonalFeed/>
            </div>
        );
    }
}

export default Feed;