import React, { Component } from "react";
import axios from "axios";

class Follow extends Component {
    constructor() {
        super();
        this.state = {
            username: localStorage.getItem("user"),
            id: localStorage.getItem("id"),
            username_to_follow: '',
            message: ''
        };
        this.handleUsernameToFollowChange = this.handleUsernameToFollowChange.bind(this);
    }


    handleUsernameToFollowChange(evt) {
        this.setState({
            username_to_follow: evt.target.value,
        });
    };

    async handleSubmit(evt) {
        evt.preventDefault();
        // send the username to the follow server in order to check if the user exists (in the mongoDB) and follow him, in case he exists
        // TODO: zwei möglichkeiten:
        //  1. entweder zuerst mit einem REST call von der MongoDB die ID des Users holen dem gefolgt werden soll und
        //  dann einen REST call an das Follow Backend machen.
        //  2. oder alles am Follow Backend machen, d.h. die beiden user names an das follow Backend schicken und dort die IDs aus der MongoDB abfragen

        const response = await axios({
            method: 'POST',
            url: 'http://localhost:5004/follow',
            data: {
                username_follower: this.state.username,
                username_to_follow: this.state.username_to_follow,
            },
            headers: '',
        }).then(response => {
            if(response.data.follow_successful) {
                console.log("Follow was successful!")
                this.setState({message: 'You now follow!' + this.state.username_to_follow});
            } else {
                console.log("Follow failed!")
                this.setState({message: "Follow failed: " + response.data.error});
            }
        }).catch(error => {
            console.log("Follow failed!")
            this.setState({message: "Follow failed: " + error});
        });
    };



    createFollowLabelsButtons = () => {
        const users = ['user1', 'user2', 'user3']
        let table = []
        table.push(<tr><td><label>Registered users:</label></td></tr>)
        // loop to create the rows
        for (let i = 0; i < 3; i++) {
            let row = []
            // create one row
            row.push(<td><label>{users[i]} </label></td>)
            row.push(<td><button>Follow</button></td>)
            // add the row to the table
            table.push(<tr>{row}</tr>)
        }
        return table
    }


    render() {
        return (
            <div className="Follow">
                <h3>Here you can follow other persons.</h3>
                <table>
                    <tbody>
                    <tr>
                        <td><label>Enter a User Name: </label></td>
                        <td><input type="text" data-test="search_username" value={this.state.username_to_follow} onChange={this.handleUsernameToFollowChange} /></td>
                        <td><input type="submit" value="Follow" data-test="submit" /></td>
                    </tr>
                    <tr>
                        <td>

                        </td>
                    </tr>

                    </tbody>
                </table>

                {this.createFollowLabelsButtons()}
            </div>
        );
    }

}

export default Follow;