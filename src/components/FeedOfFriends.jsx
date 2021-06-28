import React from 'react';
import axios from 'axios';
import Moment from 'moment'

export default class FeedOfFriends extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        friends: [],
        user: localStorage.getItem("user"),
        posts: [],
        counter: 0
    }

    componentDidMount() {
        console.log('Mount!')

        axios.get('http://localhost:5005/getfollowed/', {name: this.state.user})
        .then(res => {
            if(res.data.get_all_users_following_successful) {
                this.setState({friends: JSON.parse(res.data.list_of_users_following)})
            } else {
                console.log("No Users followed!")
            }
        }).catch(function (error) {
            console.log(error)
        });


        this.state.friends.map(friend => {
            const query = {query: {match: {user: friend.FOLGT.name}}}
            axios.post('http://localhost:9200/postindex/post/_search', query)
            .then(res => {
                console.log('Post' + res.data.hits.hits);
                this.setState(state => {
                    const posts = state.posts.concat(res.data.hits.hits);
                    return {
                      posts
                    };
                  });
            }).catch(function (error) {
                console.log(error)
            })
        });
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