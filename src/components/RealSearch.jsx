import React from 'react';
import axios from 'axios';
import Moment from 'moment'

export default class RealSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        posts: [],
        counter: 0,
        searchTerm: []
    }

    handleChange = event => {
        this.setState( {searchTerm: {sort: [{timeStamp: "desc"}],query: {multi_match: {query: event.target.value, fields:["user", "content"]}}}})
    }

    handleSubmit = post => {
        post.preventDefault();

        console.log(this.state.searchTerm)
        
        axios.post('http://localhost:9200/postindex/post/_search', this.state.searchTerm)
        .then(res => {
            console.log('Posts' + res.data);
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

        let buttonStyle = {
            width: 'auto',
            height: '34px',
            margin: '20px 10px 0 40px',
            float: 'left',
            backgroundColor: 'yellow'
        }
        let inputStyle = {
            height: '30px',
            width: '200px',
            marginTop: '20px',
            border: '2px solid #00ddff'
        }
        let divStyle = {
            backgroundColor: 'lightblue',
            paddingBottom: '20px'
        }

        return(
            <div>
                <p>
                    <form onSubmit={this.handleSubmit}>
                        <input style={inputStyle} type="text" placeholder="What are you looking for?"  onChange={this.handleChange}/><button type="submit" style={buttonStyle}>search</button>
                    </form>
                </p>
                
                <table>
                    <tbody>
                        {ev.map((post) => {                        
                            return (
                                <tr>
                                    <td> {post._source.user}</td>
                                    <td> {post._source.emotion}</td>
                                    <td> {post._source.content}</td>
                                    <td> {Moment(post._source.timeStamp).format('lll')}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
