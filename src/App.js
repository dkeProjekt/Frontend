import React from "react";
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";


import Home from './components/Home';
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import SignUpPage from "./pages/SignUpPage";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Follow from "./pages/Follow";
import Post from "./pages/Post";
import Feed from "./pages/Feed";
import Search from "./pages/Search";
import PrivateRoute from "./components/PrivateRoute";

class App extends React.Component {
    componentDidMount() {
        // here the local storage is cleared when the page is loaded, to make sure that no user is logged in when the page
        // is loaded
        localStorage.clear()
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <h1>Welcome to Fakebook!</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <Link to="/login">Log In</Link>
                                </td>
                                <td>
                                    <Link to="/logout">Log Out</Link>
                                </td>
                                <td>
                                    <Link to="/signup">Sign Up</Link>
                                </td>
                                <td>
                                    <Link to="/profile">Profile</Link>
                                </td>
                                <td>
                                    <Link to="/settings">Settings</Link>
                                </td>
                                <td>
                                    <Link to="/follow">Follow</Link>
                                </td>
                                <td>
                                    <Link to="/post">Post</Link>
                                </td>
                                <td>
                                    <Link to="/feed">Feed</Link>
                                </td>
                                <td>
                                    <Link to="/search">Search</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/login' component={LoginPage}/>
                        <Route exact path='/logout' component={LogoutPage}/>
                        <Route exact path='/signup' component={SignUpPage}/>
                        <PrivateRoute exact path="/profile" component={Profile}/>
                        <PrivateRoute exact path="/settings" component={Settings}/>
                        <PrivateRoute exact path="/follow" component={Follow}/>
                        <PrivateRoute exact path="/post" component={Post}/>
                        <PrivateRoute exact path="/feed" component={Feed}/>
                        <PrivateRoute exact path="/search" component={Search}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
