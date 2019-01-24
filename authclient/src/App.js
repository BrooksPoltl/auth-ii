import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom'

import Users from './components/Users'
import SignUp from './components/Signup'
import SignIn from './components/Signin'

class App extends Component {
  signOut =() =>{
    localStorage.clear();
    window.location.reload()
  }
  render() {
    return (
      <div className="App">
        <h1>Welcome to the Landing Page</h1>
        <header>        
          <nav>
            <li><NavLink to='/signup'>signup</NavLink></li>
            <li><NavLink to='/signin'>signin</NavLink></li>
            <li><NavLink to='/users'>users</NavLink></li> 
          </nav>
        </header>
        <main>
          <Route path = '/signup' render ={()=> <SignUp/>}/>
          <Route path='/signin' render={() => <SignIn />}/>
          <Route path='/users' render ={()=><Users/>}/>
        </main>
        <button onClick = {this.signOut}>Sign Out</button>
      </div>
    )
}
}

export default App;
