import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import { Button } from "react-bootstrap";
import { FormControl, Button, FormGroup, Row, Col, FormLabel ,Image} from 'react-bootstrap';
import "./TableRow1.css"
const BASE_URL="http://192.168.2.107:8000/";
class TableRow extends Component {
  // componentDidMount() {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //   this.props.history.push("/login");
  //   }
  //   }
    state = { isOpen: false };
  handleShowDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
    console.log("cliked");
  };
    
render() {
console.log(this.props);
return (
    <>

        <Col sm={6} md={4} lg={4} xs={12} />
        <Col sm={6} md={4} lg={4} xs={12} className={"auth-box1"}>
            <FormGroup align="center">
            <Image src={BASE_URL+this.props.obj.file}  width="150px" height="160px" align="center"
            onClick={this.handleShowDialog} roundedCircle/>
            {this.state.isOpen && (
          <dialog
            className="dialog animate"
            style={{ position: "absolute" }}
            open
            onClick={this.handleShowDialog}
          >
            <img
              className="image1"
              src={BASE_URL+this.props.obj.file}
              onClick={this.handleShowDialog}
              alt="no image"
            />
          </dialog>
        )}
            </FormGroup>
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormControl id="name" name="name"  value={this.props.obj.name} readOnly />
            
            </FormGroup>

            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormControl id="email" name="email"  value={this.props.obj.email} readOnly />
             
            </FormGroup>

            <FormGroup>
              <FormLabel>Mobile No.</FormLabel>
              <FormControl name="mobile" type="text" value={this.props.obj.mobile} id="mobile" readOnly />
              
            </FormGroup>

            <FormGroup >
            <FormLabel>Category</FormLabel>
              <FormControl name="category" type="text" value={this.props.obj.category} readOnly />
             
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Id Proof</FormLabel>
              <FormControl name="idproof" value={this.props.obj.idproof} readOnly className="cap"/>
               
            </FormGroup>

            {/* <FormGroup margin="normal">
              <FormLabel>Select Id Proof File </FormLabel>
              <FormControl name="file" type="file" onChange={this.onfileChange} placeholder={"choose file for idproof"} />
             
            </FormGroup>
 */}
            &nbsp;&nbsp;
            <FormGroup align="center">
            <Link to={"/profile-Update"} >
            <Button variant="outline-primary">Edit profile</Button>
            </Link>
            </FormGroup>
        </Col>
      
</>
);
}
}
export default TableRow;