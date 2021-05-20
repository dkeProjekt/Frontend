import React, { Component } from 'react';
import '../App.css';


class LogoutPage extends Component {
    constructor() {
        super();
        this.state = {
            message: ''
        };
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        localStorage.clear();
        this.setState({message: "You are now logged out!"})
    };

    render() {
        return (
            <div className="Logout">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <button onClick={() => this.handleLogout()}>
                                    Log Out
                                </button>
                            </td>
                        </tr>
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

export default LogoutPage;
