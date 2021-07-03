import React from 'react';
import axios from 'axios';
import Moment from 'moment'

export default class FeedOfFriends extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        friends: [],
        posts: [],
        username: localStorage.getItem("user")
    }

    async componentDidMount() {
        console.log('Mount!')
        await axios({
            method: 'GET',
            url: 'http://localhost:5005/getfollowed/',
            params: {
                name: this.state.username,
            },
            data: {},
            headers: '',
        }).then(res => {
            if(res.data.get_all_users_following_successful) {
                this.setState({friends: JSON.parse(res.data.list_of_users_following)})
                console.log("Users following loaded!")
                console.log(this.state.friends)
            } else {
                console.log("No Users followed!")
            }
        }).catch(function (error) {
            console.log(error)
        });

        const query = {sort: [{timeStamp: "desc"}],query: {match: {user : JSON.stringify(this.state.friends)}}}

            axios.post('http://localhost:9200/postindex/post/_search', query)
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
