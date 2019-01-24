
import React from 'react';
import axios from 'axios';

class Users extends React.Component {
    state = {
        users: [],
    }
    componentDidMount(){
        const token = localStorage.getItem('jwt')
        const request = {
            headers: {
                authorization: token,
            }
        }
        axios
        .get('http://localhost:5000/api/users', request)
        .then(res=> this.setState({users:res.data.user}))
        .catch(err=>console.log(err))
    }
    render() {
        return (
            <div>
                <h2> our users</h2>
                <ul>{this.state.users.map(user=> (<li key = {user.id}>{user.username}</li>) )}</ul>
            </div>
        )
    }
}
export default Users