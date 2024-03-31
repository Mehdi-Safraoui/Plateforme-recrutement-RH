import React , {Component} from "react";
import userService from "../services/user-service";

export default class boardAdmin extends Component{

    constructor(props){
        super(props)

        this.state = {
            content: ""
        }
    }

    componentDidMount(){
        userService.getAdminBoard().then(
            response => {
                this.setState({
                    content: response.data
                })
            },
            error => {
                content:
                (error.response &&
                    error.response.data &&
                    error.response.data.message) || 
                    error.message ||
                    error.toString()
            })
    }
}