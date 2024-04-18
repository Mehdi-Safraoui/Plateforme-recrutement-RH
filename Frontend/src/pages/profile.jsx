import React, { Component } from "react";
import authService from "../services/auth-service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authService.getCurrentUser(),
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="container mx-auto mt-32 max-w-4xl p-5 border rounded shadow-lg border-black">
        <header className="text-center mb-5">
          <h3 className="text-2xl font-bold">
            Profile de{" "}
            <span className="text-blue-700">
              "{currentUser.name} {currentUser.surname}"
            </span> :
          </h3>
        </header>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)}{" "}
            ...{" "}
            {currentUser.accessToken.substr(
              currentUser.accessToken.length - 20
            )}
          </p>
          <p>
            <strong>Id:</strong> {currentUser.id}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p>
            <strong>Ville:</strong> {currentUser.city}
          </p>
          <p>
            <strong>Numero:</strong> {currentUser.number}
          </p>
          <div className=" flex flex-row">
            <strong>Role:</strong>
            <ul className="pl-1">
              {currentUser.roles &&
                currentUser.roles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
