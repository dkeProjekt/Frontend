import React, { Component } from "react";
import PostEmotion from "../components/PostEmotion";

let container = {
    border: '2px solid lightgray',
    width: '480px',
    margin: 'auto'
}

class Post extends Component {
    constructor() {
        super();
    }


    render() {
        return (
            <div style={container}>
                <PostEmotion/>
            </div>
        );
    }
}

export default Post;