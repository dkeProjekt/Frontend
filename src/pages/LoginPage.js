import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';


class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            loggedIn: false,
            message: ''
        };

        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(evt) {
        evt.preventDefault();
        // send the username and password to the login server
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:5001/login',
            data: {
                username: this.state.username,
                password: this.state.password
            },
            headers: '',
        }).then(response => {
            if(response.data.login_successful) {
                console.log("Login was successful!")
                this.setState({loggedIn: true});

                // save the username (and the password) in the local storage of the browser
                // the user is kept logged in until the local storage is cleared
                // reading from the local storage ( with localStorage.getItem('user')), we can
                // check which user is logged in and use this to personalize content of the personal pages
                localStorage.setItem('user', response.data.username)
                localStorage.setItem('pwd', response.data.password)
                this.setState({message: 'Login was successful!'});
            } else {
                console.log("Login failed!")
                this.setState({message: "Login failed: " + response.data.error});
            }
        }).catch(error => {
            console.log("Login failed!")
            this.setState({message: "Login failed: " + error});
        });
    };


    handleUserChange(evt) {
        this.setState({
            username: evt.target.value,
        });
    };

    handlePassChange(evt) {
        this.setState({
            password: evt.target.value,
        });
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>User Name: </label></td>
                                <td><input type="text" data-test="username" value={this.state.username} onChange={this.handleUserChange} /></td>
                            </tr>
                            <tr>
                                <td><label>Password: </label></td>
                                <td><input type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                            <tr>
                                <td><input type="submit" value="Log In" data-test="submit" /></td>
                                <td><label>{this.state.message}</label></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default LoginPage;
