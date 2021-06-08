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

        if (this.state.id === '') { // no id in neo4j yet, thus generate an entry in neo4j

        /*    const response0 = await axios({
                method: 'GET',
                url: 'http://localhost:8080/api/person/test',
               // headers: {'Access-Control-Allow-Origin': true},
                mode: 'cors',
                //headers: ''
               // headers: 'Access-Control-Allow-Origin: *'
                headers: { 'Access-Control-Allow-Origin': '*' }
            }).then(response => {
                    console.log("Sign up in follow db was successful!")
                    console.log(response.data);
                    this.setState({message: "Signing Up failed: " + response.data.error});
                }
            ).catch(error => {
                console.log("Signing Up failed!")
                this.setState({message: "Signing Up: " + error});
            });
         */

            const response = await axios({
                method: 'POST',
                url: 'http://localhost:8080/api/person/',
                data: {
                    "name":this.state.username,
                    "persons" : {}
                },
                headers: ''
            }).then(response => {
                if (response.data.signup_successful) {
                    console.log("Sign up in follow db was successful!")
                    this.setState({id: response.data.entityId});
                    console.log(response.data.entityId);
                    console.log(response.data.persons);
                } else {
                    console.log("Signing Up failed!")
                    this.setState({message: "Signing Up failed: " + response.data.error});
                }
            }).catch(error => {
                console.log("Signing Up failed!")
                this.setState({message: "Signing Up: " + error});
            });
        }

        if (this.state.id === '') {
            return;
        }


        if (this.state.password === this.state.passwordRep) {
            // send the username and password to the login server
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5002/signup',
                data: {
                    email: this.state.email,
                    username: this.state.username,
                    password: this.state.password,
                    id: this.state.id
                },
                headers: '',
            }).then(response => {
                if (response.data.signup_successful) {
                    console.log("Sign up was successful!")
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
