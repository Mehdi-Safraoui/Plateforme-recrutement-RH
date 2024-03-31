import React , { Component } from "react";
import userService from "../services/user-service";

export default class rhBoard extends Component {

    constructor (props){
        super(props)

        this.state={
            content : ""
        }
    }

    componentDidMount(){
        userService.getRhBoard().then(
            response => {
                this.setState({
                    content:
                    (error.response &&
                        error.response.date &&
                        error.response.data.message)||
                     error.message ||
                     error.toString()   
                });
            }
        )
    }
}