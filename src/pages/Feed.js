import React, { Component } from "react";
import PersonalFeed from "../components/PersonalFeed";
import FeedOfFriends from "../components/FeedOfFriends";

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
                <h1>Personal Feed</h1>
                <PersonalFeed/>
                <h1>Feed of your friends</h1>
                <FeedOfFriends/>
            </div>
        );
    }
}

export default Feed;
