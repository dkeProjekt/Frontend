import React, { Component } from "react";
import axios from "axios";


class Settings extends Component {
    constructor() {
        super();
        this.state = {
            username: localStorage.getItem("user"),
            password_old: '',
            password_new: '',
            password_new_rep: '',
        };

        this.handlePassOldChange = this.handlePassOldChange.bind(this);
        this.handlePassNewChange = this.handlePassNewChange.bind(this);
        this.handlePassNewRepChange = this.handlePassNewRepChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(evt) {
        evt.preventDefault();
        if (this.state.password_new === this.state.password_new_rep) {
            // send the username, old password and new password to the settings server
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5003/change_password',
                data: {
                    username: this.state.username,
                    password_old: this.state.password_old,
                    password_new: this.state.password_new
                },
                headers: '',
            }).then(response => {
                if (response.data.change_password_successful) {
                    console.log("Changing password up was successful!")
                    console.log(response.data.password_new)
                    localStorage.setItem('pwd', response.data.password_new)
                    this.setState({message: 'Changing password up was successful!'});
                } else {
                    console.log("Changing password failed!")
                    this.setState({message: "Changing password failed: " + response.data.error});
                }
            }).catch(error => {
                console.log("Changing password failed!")
                this.setState({message: "Change password: " + error});
            });
        } else {
            this.setState({message: "You entered two different new passwords!"});
        }
    };


    handlePassOldChange(evt) {
        this.setState({
            password_old: evt.target.value,
        });
    };

    handlePassNewChange(evt) {
        this.setState({
            password_new: evt.target.value,
        });
    }

    handlePassNewRepChange(evt) {
        this.setState({
            password_new_rep: evt.target.value,
        });
    }

    render() {
        return (
            <div className="Settings">
                <label>Hello {localStorage.getItem("user")}! Here you can change your settings.</label>
                <form onSubmit={this.handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>Old Password: </label></td>
                                <td><input type="password" data-test="password" value={this.state.password_old} onChange={this.handlePassOldChange} /></td>
                            </tr>
                            <tr>
                                <td><label>New Password: </label></td>
                                <td><input type="password" data-test="password" value={this.state.password_new} onChange={this.handlePassNewChange} /></td>
                            </tr>
                            <tr>
                                <td><label>Repeat New Password: </label></td>
                                <td><input type="password" data-test="password" value={this.state.password_new_rep} onChange={this.handlePassNewRepChange} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                        <tr>
                            <td><input type="submit" value="Change Password" data-test="submit" /></td>
                            <td><label>{this.state.message}</label></td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default Settings;