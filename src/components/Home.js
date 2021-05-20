import React from 'react';
import {Link} from 'react-router-dom';


function Home (){
    return (
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <label> Your are not logged in. </label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Link to="/login">Login</Link>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Link to="/signup">Sign Up</Link>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
}

export default Home;