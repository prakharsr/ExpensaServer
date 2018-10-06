import React, { Component } from 'react';
import { setBalance, setName } from '../models/actions';
import { connect } from 'react-redux'

class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newBalance: props.balance,
      newName: props.name
    };
  }

  updateBalance = event => {
    event.preventDefault();
    this.props.setBalance(this.state.newBalance);
  }

  updateName = event => {
    event.preventDefault();
    this.props.setName(this.state.newName);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="text-muted small">Name</div>
          {this.props.name}<br/>

          <div className="text-muted small">Balance</div>
          ₹ {this.props.balance}

          <br/><br/>

          <form onSubmit={this.updateName} className="form-inline mb-2">
            <input type="text" value={this.state.newName} className="form-control mr-1" name="newName" onChange={this.handleChange} />
            <button type="submit" className="btn btn-outline-success">Update</button>
          </form>

          <form onSubmit={this.updateBalance} className="form-inline">
            <input type="number" value={this.state.newBalance} className="form-control mr-1" name="newBalance" onChange={this.handleChange} />
            <button type="submit" className="btn btn-outline-success">Update</button>
          </form>
        </div>
      </div>
    );
  }
}
  
const mapStateToProps = ({ name, balance }) => ({
  name, balance
});

export default connect(mapStateToProps, { setBalance, setName })(MyAccount);