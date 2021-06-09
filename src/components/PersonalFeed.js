import React from 'react';
import axios from 'axios';
import Moment from 'moment'

export default class PersonalFeed extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        posts: [],
        counter: 0
    }

    componentDidMount() {
        console.log('Mount!')
        axios.get('http://localhost:9200/postindex/post/_search', {
            data: {
                query: {
                    match: {
                        user: localStorage.getItem("user")
                    }
                },
                sort: [
                    {
                        timestamp: "asc"
                    }
                ]
            }
        }).then(res => {
            console.log('Personal Posts' + res.data);
            const posts = res.data.hits.hits;

            this.setState({ posts })
        }).catch(function (error)  {
            console.log(error + ' Fehler! Code: ' + error.status);
        })
    }

    render() {
        Moment.locale('de');

        var ev;
        ev = this.state.posts

        return(
            <table>
                <tbody>
                {ev.map((post) => {
                    return (
                        <tr>
                            <td> {post._source.user}</td>
                            <td> {post._source.emotion}</td>
                            <td> {post._source.content}</td>
                            <td> {Moment(post._source.timestamp).format('DD MM YYYY')}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        )
    }
}