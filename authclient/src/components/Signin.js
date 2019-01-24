import React from 'react';
import axios from 'axios'
import  { Redirect } from 'react-router-dom'
class SignIn extends React.Component{
    state = {
        username: '',
        password: '',
        loginStatus: false
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    submitHandler = event => {
        event.preventDefault();
        axios
            .post('http://localhost:5000/api/login', this.state)
            .then(res => {
                localStorage.setItem('jwt', res.data.token);
                this.setState({ loginStatus: true })
            })
            .catch(err => console.log(err))
        this.setState({ username: '', password: ''})

    }
    render(){
        if(!this.state.loginStatus){
        return (
            <div>
                <form onSubmit = {this.submitHandler}>
                    username:
                    <input type = 'text' name = 'username' onChange = {this.handleInputChange}value = {this.state.username}/>
                    password:
                    <input type ='password' name ='password' onChange = {this.handleInputChange}value ={this.state.password}/>
                    <button type = 'submit'>signin</button>
                </form>
            </div>
        )
        }
        else{
            return <Redirect to = 'users'/>
        }
    }
}
export default SignIn