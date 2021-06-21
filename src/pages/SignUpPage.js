import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';


class SignUpPage extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            passwordRep: '',
            email: '',
            id: ''
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handlePassRepChange = this.handlePassRepChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(evt) {
        evt.preventDefault();

        if (this.state.password === this.state.passwordRep) {
            // send username, email and password to the signup service (microservice makes entry in mongoDB)

            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5002/signup',
                data: {
                    email: this.state.email,
                    username: this.state.username,
                    password: this.state.password,
                },
                headers: '',
            }).then(response => {
                if (response.data.signup_successful) {
                    console.log("Sign up in mongoDB was successful!")
                } else {
                    console.log("Signing Up failed!")
                    this.setState({message: "Signing Up failed: " + response.data.error});
                }
            }).catch(error => {
                console.log("Signing Up failed!")
                this.setState({message: "Signing Up: " + error});
            });

            // send username to Follow Service (microservice creates entry in follow DB (neo4j))
            await axios({
                method: 'POST',
                url: 'http://localhost:5005/create',
                data: {
                    name: this.state.username,
                },
                headers: '',
            }).then(response => {
                if (response.data.created) {
                    console.log("Sign up in neo4j was successful!")
                    this.setState({message: 'Signing Up was successful!'});

                    // after a successful signup, the user should automatically be logged in, therefore
                    // the username and the id is saved in the local storage (see loginPage for a explanation of local storage)
                    localStorage.setItem('user', response.data.username)
                    localStorage.setItem('id', response.data.id)
                } else {
                    console.log("Signing Up failed!")
                    this.setState({message: "Signing Up failed: " + response.data.error});
                }
            }).catch(error => {
                console.log("Signing Up failed!")
                this.setState({message: "Signing Up: " + error});
            });


        } else {
            this.setState({message: "You entered two different passwords!"});
        }
    };

    handleEmailChange(evt) {
        this.setState({
            email: evt.target.value,
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

    handlePassRepChange(evt) {
        this.setState({
            passwordRep: evt.target.value,
        });
    }

    render() {
        return (
            <div className="Signup">
                <form onSubmit={this.handleSubmit}>
                    <table>
                        <tbody>
                        <tr>
                            <td><label>E-Mail: </label></td>
                            <td><input type="text" data-test="email" value={this.state.email} onChange={this.handleEmailChange} /></td>
                        </tr>
                        <tr>
                            <td><label>User Name: </label></td>
                            <td><input type="text" data-test="username" value={this.state.username} onChange={this.handleUserChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Password: </label></td>
                            <td><input type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Repeat Password: </label></td>
                            <td><input type="password" data-test="password" value={this.state.passwordRep} onChange={this.handlePassRepChange} /></td>
                        </tr>

                        </tbody>
                    </table>
                    <table>
                        <tbody>
                        <tr>
                            <td><input type="submit" value="Sign Up" data-test="submit" /></td>
                            <td><label>{this.state.message}</label></td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default SignUpPage;
