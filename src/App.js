import React, { Component } from "react";
import "./style.css";
import axios from "axios";
import Loading from "./Loading";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Please wait data is loading....",
      users: [],
      loading: false,
      name: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getUsers() {
    this.setState({
      loading: true
    });

    axios("https://api.randomuser.me/?results=5").then(response => {
      this.setState({
        users: [...this.state.users, ...response.data.results],
        loading: false
      });
      console.log("this.state", this.state);
    });
  }

  componentDidMount() {
    this.getUsers();
  }

  handleSubmit(e) {
    this.getUsers();
    //alert("Entered name is " + this.state.name);
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({
      name: e.target.value
    });
    e.preventDefault();
  }

  render() {
    const { loading, users } = this.state;
    return (
      <div className="App">
        {!loading ? (
          users.map(user => (
            <>
              <p
                style={{
                  color: "red",
                  border: "1px solid green",
                  "text-align": "center"
                }}
              >
                {" "}
                {user.cell}{" "}
              </p>
              <p> {user.email} </p>
              <hr />
            </>
          ))
        ) : (
          <Loading message={this.state.message} />
        )}
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter First Name
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <input
            type="submit"
            onClick={this.handleSubmit}
            value="Load more users"
          />
          <p>{this.state.name} </p>
        </form>
      </div>
    );
  }
}

export default App;
