import React, { Component } from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { FormControl, Button, FormGroup, Row, Col, FormLabel } from 'react-bootstrap';
import Validator, { ValidationTypes } from "js-object-validation";
import { toast ,ToastContainer} from 'react-toastify';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      cpassword: "",
      mobile: "",
      category: "this.state.value",
      option: "",
      categoryData: [],
      idproof: "",
      file: "",
      errors: {},
      isLoading: false
    };
  }
  
  componentDidMount() {
    try {
      const token = localStorage.getItem("token");
    if (token) {
    this.props.history.push("/product-list");
    }
      Axios.get('http://192.168.2.107:8000/users')
        .then(res => {
          const result = res.data;
          const option = []
          if (result.result1 && result.result1.length) {
            console.log('in if')
            // eslint-disable-next-line
            result.result1.map(Category => {
              option.push({
                value: Category.c_id,
                label: Category.category
              })
            })
          }
          console.log(option);
          this.setState({ option, categoryData: result.result1 });
        })
    }
    catch (error) {
      console.log(error)
      toast.error(`${error.message || "Unknown error"}`);
    }
  }

  onLogin = async (e) => {
    e.preventDefault();
    this.setState({
      isLoading: true,
      errors: {}
    })
    try {
      const { name, email, password, cpassword, mobile, category, idproof, file } = this.state;
      const obj = { name, email, password, cpassword, mobile, category, idproof }
      const validations = {
        name: {
          [ValidationTypes.REQUIRED]: true
        },
        email: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.EMAIL]: true
        },
        password: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.MINLENGTH]: 8,
        },
        cpassword: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.EQUAL]: "password"
        },
        mobile: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.NUMERIC]: true,
          [ValidationTypes.MINLENGTH]: 7,
          [ValidationTypes.MAXLENGTH]: 14
        },
        category: {
          [ValidationTypes.REQUIRED]: true
        },
        idproof: {
          [ValidationTypes.REQUIRED]: true
        },
        file: {
          [ValidationTypes.REQUIRED]: true
        }
      };
      const messages = {
        name: {
          [ValidationTypes.REQUIRED]: "Please enter username."
        },
        email: {
          [ValidationTypes.REQUIRED]: "Please enter email.",
          [ValidationTypes.EMAIL]: "Please enter valid email."
        },
        password: {
          [ValidationTypes.REQUIRED]: "Please enter password.",
          [ValidationTypes.MINLENGTH]: "Please enter at least 8 characters.",
        },
        cpassword: {
          [ValidationTypes.REQUIRED]: "Please enter confirm password.",
          [ValidationTypes.EQUAL]: "Password and confirm password didn't match."
        },
        mobile: {
          [ValidationTypes.REQUIRED]: "Please enter mobile no.",
          [ValidationTypes.NUMERIC]: "Please enter in number.",
          [ValidationTypes.MINLENGTH]: "Please enter atleast 7 digits.",
          [ValidationTypes.MAXLENGTH]: "Please enter upto 14 digits."
        },
        category: {
          [ValidationTypes.REQUIRED]: "Please select category."
        },
        idproof: {
          [ValidationTypes.REQUIRED]: "Please select idproof."
        },
        file: {
          [ValidationTypes.REQUIRED]: "Please select the file"
        }

      };
      const { isValid, errors } = Validator(obj, validations, messages);
      if (!isValid) {
        this.setState({
          errors,
          isLoading: false
        });
        return;
      }
      const data = { name, email, password, cpassword, mobile, category, idproof, file };
      const body = new FormData();
      for (const i in data) {
        if (data.hasOwnProperty(i)) {
          const element = data[i];
          body.append(i, element)
        }
      }
     const result1= await Axios.post('http://192.168.2.107:8000/addUser', body);
     if(result1){
      this.setState({ name: "", email: "", password: "", cpassword: "", mobile: "", category: "", idproof: "", file: "", isLoading: false });
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Yor are signup successfully',
        showConfirmButton: false,
        timer: 1500
      })
      this.props.history.push("/login")
      
     }


    } catch (error) {
      console.log(error)
      this.setState({ isLoading: false });
      this.props.history.push("/signup")
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        //footer: '<a href>Why do I have this issue?</a>'
      })
      this.setState({ isLoading: false });
      toast.error(`${(error.response &&
        error.response.data &&
        error.response.data.message) ||
        "Unknown error"}`);
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
  
  onfileChange = (e) => {
    this.setState({
      file: e.target.files[0] ? e.target.files[0] : null,
    })
  }

  render() {
    const { name,
      email,
      password,
      cpassword,
      mobile,
      category,
      categoryData,
      idproof,
      isLoading,
      errors } = this.state;

    const { name: nameError,
      email: emailError,
      password: passwordError,
      cpassword: cpasswordError,
      mobile: mobileError,
      category: categoryError,
      idproof: idproofError,
      file: fileError,
    } = errors;


    return (
      <>
      <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
            integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
            crossorigin="anonymous"
      />
      <Row className="animate">
        <Col sm={6} md={4} lg={4} xs={12} />
        <Col sm={6} md={4} lg={4} xs={12} className={"auth-box1"}>
          <h1 className={"h2"}>Sign Up </h1>
          <form onSubmit={this.onLogin} noValidate>
          
          <ToastContainer/>
            <FormGroup>
            <i class="fa fa-home" aria-hidden="true"></i>&nbsp;
              <FormLabel>Enter Name</FormLabel>
              <FormControl id="name" name="name" placeholder={"Enter username"} value={name} autoComplete="username" onChange={this.onInputChange} />
              {nameError ? <p className={'text-danger'}>{nameError}</p> : null}
            </FormGroup>

            <FormGroup>
              <FormLabel>Enter Email</FormLabel>
              <FormControl id="email" name="email" type="email" value={email} onChange={this.onInputChange} placeholder={"Enter email"} />
              {emailError ? <p className={'text-danger'}>{emailError}</p> : null}
            </FormGroup>

            <FormGroup>
            <FormLabel>Enter Password</FormLabel>
              <FormControl name="password" type="password" value={password} id="password" onChange={this.onInputChange} placeholder={"Enter password"} />
              {passwordError ? <p className={'text-danger'}>{passwordError}</p> : null}
            </FormGroup>

            <FormGroup>
              <FormLabel>Enter Confirm Password</FormLabel>
              <FormControl name="cpassword" type="password" value={cpassword} id="cpassword" onChange={this.onInputChange} placeholder={"Confirm password"} />
              {cpasswordError ? <p className={'text-danger'}>{cpasswordError}</p> : null}
            </FormGroup>

            <FormGroup>
            <i class="fa fa-mobile" aria-hidden="true"></i>&nbsp;
              <FormLabel>Enter Mobile No.</FormLabel>
              <FormControl name="mobile" type="text" value={mobile} id="mobile" onChange={this.onInputChange} placeholder={"Enter mobile no."} />
              {mobileError ? <p className={'text-danger'}>{mobileError}</p> : null}
            </FormGroup>

            <FormGroup margin="normal">
            <FormLabel>Select Category</FormLabel>
              <FormControl as="select" name={"category"} value={this.state.category} onChange={this.onInputChange}>
                <option value="">Select category</option>
                {categoryData && categoryData.length ? categoryData.map(category => {
                  return <option key={category.c_id} >{category.category}</option>
                })
                  : null})
            </FormControl>
              {categoryError ? <p className={'text-danger'}>{categoryError}</p> : null}
            </FormGroup>
            
            <FormGroup margin="normal">
              <FormLabel>Select Id Proof</FormLabel>
              <FormControl as="select" name={"idproof"} placeholder="Id Proof" value={idproof} onChange={this.onInputChange} >
                <option value={""}>-Select Id Proof Type-</option>
                <option value={"VoterId"}>Voter id</option>
                <option value={"Aadhar Card"}>Aadhar card</option>
                <option value={"Passport"} >Passport</option>
              </FormControl>
              {idproofError ? <p className={'text-danger'}>{idproofError}</p> : null}
            </FormGroup>

            <FormGroup margin="normal">
            <i class="fa fa-picture-o" aria-hidden="true"></i>&nbsp;
              <FormLabel>Select  {` ${this.state.idproof}`}  File </FormLabel>
              <FormControl name="file" type="file" onChange={this.onfileChange} placeholder={"choose file for idproof"} />
              {fileError ? <p className={'text-danger'}>{fileError}</p> : null}
            </FormGroup>

            <Button
              type="submit"
              variant="outline-success"
            >
              {isLoading ? "please wait.." : "Sign Up"}
            </Button>
            &nbsp;&nbsp;
            <Button
              variant="outline-primary"
              value={"Go to home"}
              onClick={() => {
                this.props.history.push("/login")
              }}
            >
              LogIn</Button>
            
          </form>
        </Col>
      </Row>
      </>
    )
  }
};

export default withRouter(Signup);