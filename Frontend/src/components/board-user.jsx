import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../services/user-service";

export default class UserBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    userService.getUserBoard().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <nav className="flex justify-center mb-4">
          <Link to="/jobs" className="mr-4 font-bold">Offres d'emploi</Link>
        </nav>
        <header>
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}

