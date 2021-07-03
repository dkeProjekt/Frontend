import React, { Component } from "react";
import axios from "axios";

class Follow extends Component {

    constructor() {
        super();
        this.state = {
            username: localStorage.getItem("user"),
            username_to_follow: '',
            username_to_unfollow: '',
            message: '',
            all_users: [],
            users_following: [],
        };
        this.handleUsernameToFollowChange = this.handleUsernameToFollowChange.bind(this);
        this.handleUsernameToUnfollowChange = this.handleUsernameToUnfollowChange.bind(this);
        this.handleSubmitFollow = this.handleSubmitFollow.bind(this);
        this.handleSubmitUnfollow = this.handleSubmitUnfollow.bind(this);
        this.getAllUsersFollowing = this.getAllUsersFollowing.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);

    }

    async getListOfUsersFollowing() {
        const response = await axios({
            method: 'GET',
            url: 'http://localhost:5005/getfollowed/',
            params: {
                name: this.state.username,
            },
            data: {},
            headers: '',
        }).then(response => {
            if(response.data.get_all_users_following_successful) {
                console.log("Loading all users you follow was successful!")
                console.log(response.data)
                this.setState({message: 'Loading all users you follow was successful!'});
                this.setState({users_following: JSON.parse(response.data.list_of_users_following)})
                this.render()
            } else {
                console.log("Loading all users you follow failed!")
                this.setState({message: "Loading all users you follow failed: " + response.data.error});
            }
        }).catch(error => {
            console.log("Loading all users you follow failed!")
            this.setState({message: "Loading all users you follow failed: " + error});
        });
    };

    async getListOfAllUsers() {
        const response = await axios({
            method: 'GET',
            url: 'http://localhost:5002/get_all_users',
            data: {},
            headers: '',
        }).then(response => {
            if(response.data.get_all_users_successful) {
                console.log("Loading all users was successful!")
                console.log(response.data)
                this.setState({message: 'Loading all users was successful!'});
                this.setState({all_users: JSON.parse(response.data.list_of_users)})
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

    getAllUsersFollowing () {
        (async () => {
            await this.getListOfUsersFollowing();
        })();
    };

    getAllUsers () {
        (async () => {
            await this.getListOfAllUsers();
        })();
    };

    handleUsernameToFollowChange(evt) {
        this.setState({
            username_to_follow: evt.target.value,
        });
    };

    handleUsernameToUnfollowChange(evt) {
        this.setState({
            username_to_unfollow: evt.target.value,
        });
    };

    async handleSubmitFollow(evt) {
        evt.preventDefault();

        // follow
        await axios({
            method: 'POST',
            url: 'http://localhost:5005/follow',
            data: {
                name: this.state.username,
                followName: this.state.username_to_follow,
            },
            headers: '',
        }).then(response => {
            if (response.data.follows) {
                console.log("Follow was successful!")
                console.log(response.data)
                this.setState({message: 'You now follow ' + this.state.username_to_follow + "!"});
            } else {
                console.log("Follow failed!")
                this.setState({message: "Follow failed: " + response.data.error});
            }
        }).catch(error => {
            console.log("Follow failed!")
            this.setState({message: "Follow failed: " + error});
        });
    };

    async handleSubmitUnfollow(evt) {
        evt.preventDefault();

        // unfollow
        await axios({
            method: 'POST',
            url: 'http://localhost:5005/unfollow',
            data: {
                name: this.state.username,
                unfollowName: this.state.username_to_unfollow,
            },
            headers: '',
        }).then(response => {
            if (response.data.unfollow) {
                console.log("Unfollow was successful!")
                console.log(response.data)
                this.setState({message: 'You now do not follow ' + this.state.username_to_unfollow + " anymore!"});
            } else {
                console.log("Unfollow failed!")
                this.setState({message: "Unfollow failed: " + response.data.error});
            }
        }).catch(error => {
            console.log("Unfollow failed!")
            this.setState({message: "Unfollow failed: " + error});
        });
    };

    createUnfollowLabelsButtons = () => {
        let table = []
        table.push(<tr><td><button onClick={this.getAllUsersFollowing}>Load all Users you follow</button></td></tr>)
        if (this.state.users_following.length !== 0) {
            table.push(<tr><td><label>Users you follow:</label></td></tr>)
        }
        // loop to create the rows
        for (let i = 0; i < this.state.users_following.length; i++) {
            let row = []
            // create one row
            row.push(<td><label>{this.state.users_following[i]} </label></td>)
            // add the row to the table
            table.push(<tr>{row}</tr>)
        }
        return table
    }

    createFollowLabelsButtons = () => {
        let table = []
        table.push(<tr><td><button onClick={this.getAllUsers}>Load all Users</button></td></tr>)
        if (this.state.all_users.length !== 0) {
            table.push(<tr><td><label>Registered users:</label></td></tr>)
        }
        // loop to create the rows
        for (let i = 0; i < this.state.all_users.length; i++) {
            let row = []
            // create one row
            row.push(<td><label>{this.state.all_users[i]} </label></td>)
            // add the row to the table
            table.push(<tr>{row}</tr>)
        }
        return table
    }

    render() {
        return (
            <div className="Follow">
                <form onSubmit={this.handleSubmitFollow}>
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
                <form onSubmit={this.handleSubmitUnfollow}>
                    <table>
                        <tbody>
                        <tr>
                            <td><label>Enter a User Name: </label></td>
                            <td><input type="text" data-test="search_username" value={this.state.username_to_unfollow} onChange={this.handleUsernameToUnfollowChange} /></td>
                            <td><input type="submit" value="Unfollow" data-test="submit" /></td>
                        </tr>
                        </tbody>
                    </table>
                </form>
                <table>
                    <tbody>
                        {this.createUnfollowLabelsButtons()}
                    </tbody>
                </table>
                <table>
                    <tbody>
                        {this.createFollowLabelsButtons()}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default Follow;