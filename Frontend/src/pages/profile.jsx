import React, { Component } from "react";
import authService from "../services/auth-service";

export default class Profile extends Component{
    constructor(props){
        super(props)

        this.state = {
            currentUser:authService.getCurrentUser()
        }
    }

    render(){
        const { currentUser } = this.state

        return(
            <div className="container">
                <header>
                    <h3>
                        <strong>{currentUser.name}</strong>
                        <strong>{currentUser.surname}</strong> profile:
                    </h3>
                </header>
                <p>
                    <strong>Token:</strong>{" "}
                    {currentUser.accessToken.substring(0,20)} ...{" "}
                    {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                </p>
                <p>
                    <strong>Id:</strong>{" "}
                    {currentUser.id}
                </p>
                <p>
                    <strong>Email:</strong>{" "}
                    {currentUser.email}
                </p>
                <p>
                    <strong>Ville:</strong>{" "}
                    {currentUser.city}
                </p>
                <p>
                    <strong>Numero:</strong>{" "}
                    {currentUser.number}
                </p>
                <strong>Role:</strong>
                <ul>
                    {
                     currentUser.roles && 
                     currentUser.roles.map((role,index)=><li key={index}>{role}</li>)
                    }
                </ul>
            </div>
        )
    }
}