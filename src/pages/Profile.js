import React, { Component } from "react";
import axios from "axios";


class Profile extends Component {
    constructor() {
        super();
        this.state = {
            username: localStorage.getItem("user"),
            password: localStorage.getItem("pwd"),
            username_show: '',
            email: '',
            registration_date: '',
            message: ''
        };
    }

    async handleShowData() {
        console.log(localStorage.getItem("user"))
        console.log(localStorage.getItem("pwd"))
        console.log(this.state.username)
        console.log(this.state.password)
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:5003/get_personal_data',
            data: {
                username: this.state.username,
                password: this.state.password
            },
            headers: '',
        }).then(response => {
            if (response.data.get_data_successful) {
                console.log("Receiving the personal data was successful!")
                this.setState({message: 'Receiving the personal data was successful!'});
                this.setState({username_show: response.data.username})
                this.setState({email: response.data.email})
                this.setState({registration_date: response.data.registration_date})
            } else {
                console.log("Receiving the personal data failed!")
                this.setState({message: "Receiving the personal data failed: " + response.data.error});
            }
        }).catch(error => {
            console.log("Receiving the personal data failed!")
            this.setState({message: "Receiving the personal data failed: " + error});
        });

    };


    render() {
        return (
            <div className="Profile">
                <label>Hello {localStorage.getItem("user")}! Welcome to your profile!</label>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <button onClick={() => this.handleShowData()}>
                                    Show personal data
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Username: {this.state.username_show}</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>E-Mail: {this.state.email}</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Registration Date: {this.state.registration_date}</label>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>{this.state.message}</label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Profile;