import React, { Component } from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { FormControl, Button, FormGroup, Row, Col, FormLabel, Image} from 'react-bootstrap';
import Validator, { ValidationTypes } from "js-object-validation";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
const BASE_URL="http://192.168.2.107:8000/";
//import "./index.css";

class ProfileUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mobile: "",
      category: "this.state.value",
      option: "",
      categoryData: [],
      idproof: "",
      file: "",
      Cid:localStorage.getItem("cid"),
      imageUpdated:false
      };
  }
  
  componentDidMount =async () => {
    try {
      const token = localStorage.getItem("token");
    if (!token) {
    this.props.history.push("/login");
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
        const{Cid}=this.state;
            const obj= {Cid};
            const response = await Axios.post("http://192.168.2.107:8000/profile",obj, {
                headers: { Authorization: `Bearer ${token}` }});
                this.setState({
                    name: response.data.result.name,
                    email: response.data.result.email,
                    mobile: response.data.result.mobile,
                    category: response.data.result.category,
                    idproof:response.data.result.idproof,
                    file:response.data.result.file,
                  });        
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
      const { name, email, mobile, category, idproof, file , Cid, imageUpdated} = this.state;
     
      const data = { name, email,  mobile, category, idproof, file , Cid, imageUpdated};
      const body = new FormData();
      for (const i in data) {
        if (data.hasOwnProperty(i)) {
          const element = data[i];
          body.append(i, element)
        }
      }
      const result=await Axios.post('http://192.168.2.107:8000/profileUpdate', body);
console.log(result);
if(result){
      this.props.history.push("/profile")
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Your Profile Update Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }

    } catch (error) {
      console.log(error)
     
    }
  };

  onInputChange = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value,
      
    });
  };
  
  onfileChange = (e) => {
    this.setState({
      file: e.target.files[0] ? e.target.files[0] : null,
      imageUpdated:true
    })
  }

  render() {
    const{categoryData}=this.state;
    
    return (
      <Row className="animate">
        <Col sm={6} md={4} lg={4} xs={12} />
        <Col sm={6} md={4} lg={4} xs={12} className={"auth-box1"}>
          <h1 className={"h2"}>Profile Update </h1>
          <form onSubmit={this.onLogin} noValidate>
           <FormGroup>
           <Image src={BASE_URL+this.state.file} width="150px" height="160" roundedCircle/>
           </FormGroup>

            <FormGroup>
              <FormLabel> Name</FormLabel>
              <FormControl id="name" name="name" placeholder={"Enter username"} value={this.state.name} autoComplete="username" onChange={this.onInputChange} />
              {/* {nameError ? <p className={'text-danger'}>{nameError}</p> : null} */}
            </FormGroup>

            <FormGroup>
              <FormLabel> Email</FormLabel>
              <FormControl id="email" name="email" type="email" value={this.state.email} onChange={this.onInputChange} placeholder={"Enter email"} />
              {/* {emailError ? <p className={'text-danger'}>{emailError}</p> : null} */}
            </FormGroup>

            <FormGroup>
              <FormLabel> Mobile No.</FormLabel>
              <FormControl name="mobile" type="text" value={this.state.mobile} id="mobile" onChange={this.onInputChange} placeholder={"Enter mobile no."} />
              {/* {mobileError ? <p className={'text-danger'}>{mobileError}</p> : null} */}
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
              {/* {categoryError ? <p className={'text-danger'}>{categoryError}</p> : null} */}
            </FormGroup>
            
            <FormGroup margin="normal">
              <FormLabel>Select Id Proof</FormLabel>
              <FormControl as="select" name={"idproof"} placeholder="Id Proof" value={this.state.idproof} onChange={this.onInputChange} >
                <option value={""}>-Select Id Proof Type-</option>
                <option value={"voterId"}>Voter id</option>
                <option value={"aadhar"}>Aadhar card</option>
                <option value={"passport"} >Passport</option>
              </FormControl>
              {/* {idproofError ? <p className={'text-danger'}>{idproofError}</p> : null} */}
            </FormGroup>

            <FormGroup margin="normal">
              <FormLabel>Select Id Proof File </FormLabel>
              <FormControl name="file" type="file" onChange={this.onfileChange} placeholder={"choose file for idproof"} />
              {/* {fileError ? <p className={'text-danger'}>{fileError}</p> : null} */}
            </FormGroup>
            <FormGroup float="right">
            <Button
              type="submit"
              variant="outline-success"
            >
            Profile-Update
            </Button>
            
            &nbsp;&nbsp;
            
            <Button
              variant="outline-danger"
              value={"Go to home"}
              onClick={() => {
                this.props.history.push("/profile")
              }}
              
            >
              Cancle</Button>
              </FormGroup>
            
          </form>
        </Col>
      </Row>
    )
  }
};

export default withRouter(ProfileUpdate);