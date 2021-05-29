import React, { Component } from "react";
import axios from "axios";

class Follow extends Component {

    constructor() {
        super();
        this.state = {
            username: localStorage.getItem("user"),
            id: localStorage.getItem("id"),
            username_to_follow: '',
            message: '',
            users: []
        };
        this.handleUsernameToFollowChange = this.handleUsernameToFollowChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);

    }

    async getListOfUsers() {
        const response = await axios({
            method: 'GET',
            url: 'http://localhost:5004/get_all_users',
            data: {},
            headers: '',
        }).then(response => {
            if(response.data.get_all_users_successful) {
                console.log("Loading all users was successful!")
                this.setState({message: 'Loading all users was successful!'});
                // console.log(response.data.list_of_users)
                this.setState({users: JSON.parse(response.data.list_of_users)})
                // console.log(this.users)
                for(var i = 0; i < this.state.users.length; i++) {
                    console.log(this.state.users[i])
                }
                this.render()
            } else {
                console.log("Loading all users failed!")
                this.setState({message: "Loading all users failed: " + response.data.error});
            }
        }).catch(error => {
            console.log("Loading all users failed!")
            this.setState({message: "Loading all users failed: " + error});
        });
    };

    getAllUsers () {
        (async () => {
            await this.getListOfUsers();
        })();
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
        if (this.state.users.length !== 0) {
            let table = []
            table.push(<tr><td><label>Registered users:</label></td></tr>)
            // loop to create the rows
            for (let i = 0; i < this.state.users.length; i++) {
                let row = []
                // create one row
                row.push(<td><label>{this.state.users[i]} </label></td>)
                row.push(<td><button>Follow</button></td>)
                // add the row to the table
                table.push(<tr>{row}</tr>)
            }
            return table
        } else {
            return (<div>
                <table>
                    <tbody>
                    <tr>
                        <td><button onClick={this.getAllUsers}>Load all Users</button></td>
                    </tr>
                    </tbody>
                </table>
            </div>)
        }
    }

    render() {
        return (
            <div className="Follow">
                {/*<h3>Here you can follow other persons.</h3>*/}
                    <form onSubmit={this.handleSubmit}>
                        <table>
                            <tbody>
                                <tr>
                                    <td><label>Enter a User Name: </label></td>
                                    <td><input type="text" data-test="search_username" value={this.state.username_to_follow} onChange={this.handleUsernameToFollowChange} /></td>
                                    <td><input type="submit" value="Follow" data-test="submit" /></td>
                                    <td><label>{this.state.message}</label></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    {this.createFollowLabelsButtons()}
            </div>
        );
    }

}

export default Follow;