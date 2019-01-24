
import React from 'react';
import axios from 'axios';
import Users from './Users';
import { Redirect } from 'react-router-dom'
class SignUp extends React.Component {
    state = {
        username:'',
        name: '',
        department: '',
        password: '',
        status: false,
    }
    handleInputChange = event =>{
        const { name, value} = event.target;
        this.setState({[name]: value});
    }
    submitHandler = event =>{
        event.preventDefault();
        axios
        .post('http://localhost:5000/api/register', {
            username: this.state.username, 
            name: this.state.name, 
            department: this.state.department, 
            password: this.state.password})
        .then(res =>{console.log('registered user')})
        .catch(err=> console.log(err));
        axios
        .post('http://localhost:5000/api/login', this.state)
        .then(res=>{
            localStorage.setItem('jwt',res.data.token);
            this.setState({status: true})
        })
        .catch(err=> console.log(err))
        this.setState({username: '',name:'', department: '', password: ''})
        
    }
    render() {
        if(!this.state.status){
        return (
            <div>
                <form onSubmit = {this.submitHandler}>
                    username:
                    <input 
                    type = "text" 
                    name = 'username' 
                    value = {this.state.username} 
                    onChange = {this.handleInputChange}/>
                    name:
                    <input 
                    type = "text" 
                    name = 'name' 
                    value ={this.state.name}
                    onChange = {this.handleInputChange}/>
                    department:
                    <input 
                    type = "text" 
                    name = 'department' 
                    value = {this.state.department}onChange = {this.handleInputChange}/>
                    password:
                    <input 
                    type = "password" 
                    name = 'password' 
                    value =  {this.state.password}
                    onChange = {this.handleInputChange}/>   
                    <button type = 'submit'>signup</button>
                </form>
            </div>
        )
        }else{
            return (
                <Redirect to = 'users'/>
                    )
        }
    }
}
export default SignUp