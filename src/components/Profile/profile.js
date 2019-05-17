import React, { Component } from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import {Table,Button,Row} from "react-bootstrap";
import TableRow from "./TableRow1";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { profile:"" ,
        Cid:localStorage.getItem("cid")};
        //console.log(Cid);
        }
        componentDidMount = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                this.props.history.push("/login");
                }
            const{Cid}=this.state;
            const obj= {Cid};
            const res = await Axios.post("http://192.168.2.107:8000/profile",obj, {
                headers: { Authorization: `Bearer ${token}` }});
            //console.log(res.data.result);
            //console.log("result");
            const result = res.data.result;
            this.setState({ profile: result });
            //console.log(result);
            if (!result) {
            console.log("error");
            }
            }
            render() {
            const { profile } = this.state;
            //console.log({profile});
            return (
            <>
            <div className="animate">
            <h2 align="center">User-Profile</h2>
            <Row  bordered hover  borderless="true" className="animate">
            
            <TableRow obj={profile} key={profile._id} />
        
            </Row>
            </div>
            </>
            );
            }
}
export default Profile;