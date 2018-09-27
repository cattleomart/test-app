import React, { Component } from "react";
import logo from "./logo.svg";
import Login from "./Login.js";
import SuccessMessage from "./SuccessMessage.js";
import "./App.css";

class App extends Component {
  state = { 
    complete: false, 
    firstName: ''
  
  };

  handleSubmit = e => {
    e.preventDefault()
    if(document.cookie.includes('JWT')){
      this.setState({complete:true})
    }

   
    document.cookie = `firstName=${this.state.firstName}`
     
  };

  handleInput = e => {
    this.setState({ firstName: e.currentTarget.value})
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title" data-testid="h1">
            Welcome to React
          </h1>

          <nav className="navbar" data-testid="navbar">
            <ul>
              <li className="nav-li" data-testid="nav-li">
                <a href="http://google.com">Home</a>
              </li>
              <li className="nav-li" data-testid="nav-li">
                <a href="http://google.com">About</a>
              </li>
              <li className="nav-li" data-testid="nav-li">
                <a href="http://google.com">Skills</a>
              </li>
              <li className="nav-li" data-testid="nav-li">
                <a href="http://google.com">Works</a>
              </li>
            </ul>
          </nav>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.state.complete ? (
          <SuccessMessage />
        ) : (
          <Login submit={this.handleSubmit} input={this.handleInput} />
        )}
      </div>
    );
  }
}

export default App;
