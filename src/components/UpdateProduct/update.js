import React, { Component } from "react";
import axios from "axios";
import {FormGroup,FormLabel,Button,Row,Col,FormControl,Table, Container,Image} from "react-bootstrap";
import Validator, { ValidationTypes } from "js-object-validation";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";
import "./update.css"
const BASE_URL="http://192.168.2.107:8000/";
var image;
//import TableRow from "./TableRow";
// RenderToLayer from "material-ui/internal/RenderToLayer";

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetail: "",
      productTitle: "",
      productPrice: "",
      productSelling: "",
      file:"",
      imageUpdated:false
    };
  }

  componentDidMount = async () => {
    try {
      const token = localStorage.getItem("token");
    if (!token) {
    this.props.history.push("/login");
    }
      const response = await axios.get(
        "http://192.168.2.107:8000/getItem/" + this.props.match.params._id
      );
      console.log(response);

      this.setState({
        productDetail: response.data.result.productDetail,
        productTitle: response.data.result.productTitle,
        productPrice: response.data.result.productPrice,
        productSelling: response.data.result.productSelling,
        file: response.data.result.file,
      });
      console.log(BASE_URL+response.data.result.file);
       image = BASE_URL+response.data.result.file;
      console.log(image)
    } catch (error) {
      console.log(error);
    }
  };
  notify = () =>
  (this.toastId = toast("Update Done", {
  autoClose: 2000,
  closeButton: false // Remove the closeButton
  }));
  
  onSubmit = async e => {
    e.preventDefault();
    const obj = {
      productDetail: this.state.productDetail,
      productTitle: this.state.productTitle,
      productPrice: this.state.productPrice,
      productSelling: this.state.productSelling,
      file:this.state.file
    };
    const { productTitle, productDetail, productSelling, productPrice, file,imageUpdated  } = this.state;
    const data = { productTitle, productDetail, productPrice, productSelling, file,imageUpdated};
      const body = new FormData();
      for (const i in data) {
        if (data.hasOwnProperty(i)) {
          const element = data[i];
          body.append(i, element)
        }
      }
    console.log(this.props.match.params._id);
    const result = await axios.post(
      "http://192.168.2.107:8000/editItem/" + this.props.match.params._id,
      body
    );
    console.log(result);
    if(result)
    {
    this.props.history.push("/product-list");
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Your Product Detail Update Successfully',
      showConfirmButton: false,
      timer: 1500
    })
    }
  };

  onInputChange = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  };

  onfileChange = (e) => {
    this.setState({
      file: e.target.files[0] ? e.target.files[0] : null,
      imageUpdated:true
    })
  }
  render() {
    return (
        <Row className="animate">
        
        <Col sm={6} md={4} lg={4} xs={12} />
        <Col sm={6} md={4} lg={4} xs={12} className={"auth-box1"}>
          <h1 className={"h2"}>Update-Product </h1>
          <form onSubmit={this.onSubmit} noValidate >
          <FormGroup align="center">
            <Image src={BASE_URL+this.state.file ||BASE_URL+'./uploads/loding.gif'} width="150px" height="160" align="center" roundedCircle />
          </FormGroup>
            <FormGroup>
              <FormLabel>Product Title</FormLabel>  
              <FormControl id="productTitle" name="productTitle" placeholder={"Enter ProductTitle"} value={this.state.productTitle} autoComplete="productTitle" onChange={this.onInputChange} className="cap"/>
              {/* {productTitleError ? <p style={{ color: "red" }}>{productTitleError}</p> : null} */}
            </FormGroup>

            <FormGroup>
              <FormLabel>Product Detail</FormLabel>
              <FormControl id="productDetail" name="productDetail" type="text" value={this.state.productDetail} onChange={this.onInputChange} placeholder={"Enter ProductDetail"} className="cap"/>
              {/* {productDetailError ? <p style={{ color: "red" }}>{productDetailError}</p> : null} */}
            </FormGroup>

            <FormGroup>
              <FormLabel>Product Price</FormLabel>  
              <FormControl name="productPrice" type="text" value={this.state.productPrice} id="productPrice" onChange={this.onInputChange} placeholder={"Enter ProductPrice"} />
              {/* {productPriceError ? <p style={{ color: "red" }}>{productPriceError}</p> : null} */}
            </FormGroup>

            <FormGroup>
              <FormLabel>Product Selling Price</FormLabel>
              <FormControl name="productSelling" type="text" value={this.state.productSelling} id="productSelling" onChange={this.onInputChange} placeholder={"Enter ProductSelling"} />
              {/* {productSellingError ? <p style={{ color: "red" }}>{productSellingError}</p> : null} */}
            </FormGroup>

            
            <FormGroup>
              <FormControl name="file" type="file"  onChange={this.onfileChange} placeholder={"choose file for idproof"} />
              {/* {fileError ? <p style={{ color: "red" }}>{fileError}</p> : null} */}
            </FormGroup> 

            <Button
              type="submit"
              variant="outline-success"
              onClick={this.notify}
            >
            Update-Product
            </Button>
            &nbsp;&nbsp;
            
          </form>
        </Col>
    
      </Row>
    );
  }
}
export default Update;