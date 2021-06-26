import React from 'react';
import axios from 'axios';
import Moment from 'moment'

export default class PersonalFeed extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        currentUser: {sort: [{timeStamp: "desc"}],query: {match: { user: localStorage.getItem("user")}}},
        posts: [],
        counter: 0
    }

    componentDidMount() {
        console.log('Mount!')

        console.log(JSON.stringify(this.state.currentUser));

        axios.post('http://localhost:9200/postindex/post/_search', this.state.currentUser)
        .then(res => {
            console.log('Personal Posts' + res.data.hits.hits);
            const posts = res.data.hits.hits;
            console.log(localStorage.getItem("user"));

            this.setState({ posts })
        }).catch(function (error)  {
            console.log(error + ' Fehler! Code: ' + error.status);
        })
    }

    render() {

        var ev;
        ev = this.state.posts

        return(
                <table>
                    <tbody>
                        {ev.map((post) => {                        
                            return (
                                <tr>
                                    <td> {post._source.user} </td>
                                    <td> {post._source.emotion} </td>
                                    <td> {post._source.content} </td>
                                    <td> {Moment(post._source.timeStamp).format('lll')}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
        )
    }
}
