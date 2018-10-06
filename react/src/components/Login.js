import React, { Component } from 'react';
import "./Login.css";

class Login extends Component {
  render() {
    return (
      <div className="card card-center mat-elevation-z1 bg-white">
        <div className="card-body">
          <form>
            <br/>

            <h1 className="display-4 text-center">Login</h1>

            <br/>

            <div className="form-group">
              <label>Phone</label>

              <input type="tel" className="form-control" placeholder="Enter Phone Number" name="phone" required/>
            </div>

            <div className="form-group">
              <label>Password</label>

              <input type="password" className="form-control" placeholder="Enter Password" name="password" required/>
            </div>

            <br/>

            <button className="btn btn-primary btn-block">Login</button>

            <br/>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;