import React, {Component} from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import Validator, { ValidationTypes } from "js-object-validation";
import {toast ,ToastContainer} from "react-toastify";
import { FormControl, Button, FormGroup, Row, Col, FormLabel, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.min.css' 

class Login extends Component {
constructor(props){
super(props);
this.state = {
email: "",
password:"",
isLoading: false,
errors:{},
};
}
componentDidMount() {
  const token = localStorage.getItem("token");
  if (token) {
  this.props.history.push("/product-list");
  }
  }
onLogin = async (e) => {
e.preventDefault();
this.setState({
isLoading: true
})
try {
const { email , password } = this.state;
 const obj ={email,password}
 const validations = {
    email: {
    [ValidationTypes.REQUIRED]: true,
    [ValidationTypes.EMAIL]: true
    },
    password: {
    [ValidationTypes.REQUIRED]: true,
    [ValidationTypes.MINLENGTH]: 8
    }
    };
    const messages = {
        email: {
            [ValidationTypes.REQUIRED]: "Please enter email.",
            [ValidationTypes.EMAIL]: "Please enter valid email."
        },
        password: {
            [ValidationTypes.REQUIRED]: "Please enter password.",
            [ValidationTypes.MINLENGTH]: "Please enter at least 8 characters.",
        },
    };        
    const { isValid, errors } = Validator(obj, validations,messages);
    if (!isValid) {
    this.setState({
    errors,
    isLoading: false
    });
    return;
    }

 const response = await Axios.post('http://192.168.2.107:8000/login',obj);
 if(response){
 this.setState({email: "",password: "" , isLoading: false});
 localStorage.setItem("token", response.data.token);
 localStorage.setItem("cid",response.data.result._id);
 Swal.fire({
  position: 'center',
  type: 'success',
  title: 'You are login successfully',
  showConfirmButton: false,
  timer: 1500
})
 this.props.history.push("/product-list");
 }
} catch (error) {
  console.log(error.response.data);
    this.setState({ isLoading: false });
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
     // footer: '<a href>Why do I have this issue?</a>'
    })
  toast.error(`${(error.response &&
      error.response.data &&
      error.response.data.message) ||
      "Unknown error"}`);
      console.log(error.response.data.message);
    }
    };

onInputChange = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
    [name]: value,
    errors: {
    ...this.state.errors,
    [name]: null
    }
    });
};
render(){
const { email , password,isLoading,errors } = this.state;
const { email: emailError, password: passwordError } = errors;
return(
    <Row className="animate" >
      
        <Col sm={6} md={4} lg={4} xs={12} />
        <Col sm={6} md={4} lg={4} xs={12} className="auth-box1">
        <div className="margin">
          <h1 className="header">LogIn</h1>
          <form onSubmit={this.onLogin} noValidate>
          
          <ToastContainer/>
          <FormGroup>
          
              <FormLabel>Enter Email</FormLabel>
              
              <FormControl id="email" name="email" type="email" value={email} onChange={this.onInputChange} placeholder={"Enter email"} />
             
              {emailError ? <p className=" text-danger">{emailError}</p> : null}
          
          </FormGroup>
         
          
            <FormGroup>
            
              <FormLabel>Enter Password</FormLabel>
              <FormControl name="password" type="password" value={password} id="password" onChange={this.onInputChange} placeholder={"Enter password"} />
              {passwordError ? <p className=" text-danger">{passwordError}</p> : null}
            
            </FormGroup>
            
            <Button
              type="submit"
              variant="outline-success"
            >
              {isLoading ? "please wait.." : "LogIn"}
            </Button>
  
            &nbsp;&nbsp;<Button
              variant="outline-primary"
              value={"Go to home"}
              onClick={() => {
                this.props.history.push("/signup")
              }}
            >
              Signup</Button>
        </form>
      </div>
        </Col>
      
    </Row>    

) }
};

export default withRouter(Login);
