import React, {useState} from 'react';
import Picker from 'emoji-picker-react';
import axios from 'axios';


export default class PostEmotion extends React.Component{

    state = {
        username: localStorage.getItem("user"),
        chosenEmoji:'',
        content:'',
        timeStamp:''
    }

    handleChange = event => {
        this.setState({ content: event.target.value });
    }

    handleSubmit = post => {
        post.preventDefault();

        const shortpost = {
            user: this.state.username,
            emotion: this.state.chosenEmoji.emoji,
            content: this.state.content,
            timeStamp: new Date(Date.now())
        };

        const json = JSON.stringify(shortpost);
        console.log(json);

        axios.post('http://localhost:9200/postindex/post', json)
            .then(res => {
                console.log(res)
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            })
    }



    render (){
        let buttonStyle = {
            width: 'auto',
            height: '34px',
            margin: '20px 10px 0 40px',
            float: 'left',
            backgroundColor: 'yellow'
        }
        let inputStyle = {
            height: '30px',
            width: '200px',
            marginTop: '20px',
            border: '2px solid #00ddff'
        }
        let divStyle = {
            backgroundColor: 'lightblue',
            paddingBottom: '20px'
        }

        const onEmojiClick = (event, emojiObject) => {
            this.setState({chosenEmoji: emojiObject});
        }

        return (
            <div style={divStyle}>
                {this.state.chosenEmoji ? (
                    <span>You chose: {this.state.chosenEmoji.emoji}</span>
                ) : (
                    <span>Choose your feeling</span>
                )}
                <form onSubmit={this.handleSubmit}>
                    <table>
                        <tbody>
                        <tr>
                            <td><Picker onEmojiClick={onEmojiClick} /></td>
                        </tr>
                        <tr>
                            <td><input style={inputStyle} type="text" placeholder="How are you feelin' today?" value={this.state.content} onChange={this.handleChange}/><button type="submit" style={buttonStyle}>post</button></td>
                        </tr>
                        </tbody>
                    </table>

                </form>

            </div>
        );
    }
}

