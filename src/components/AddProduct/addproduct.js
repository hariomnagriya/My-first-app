import React, { Component } from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { FormControl, Button, FormGroup, Row, Col, FormLabel } from 'react-bootstrap';
import Validator, { ValidationTypes } from "js-object-validation";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productTitle: "",
      productDetail: "",
      productPrice: "",
      productSelling: "",
      file: "",
      cid:localStorage.getItem("cid"),
      errors: {},
      isLoading: false
    };
  }
  componentDidMount() {
    
      const token = localStorage.getItem("token");
      if (!token) {
      this.props.history.push("/login");
      }
     
      
  }

  
  onLogin = async (e) => {
    e.preventDefault();
    this.setState({
      isLoading: true,
      errors: {}
    })
    try {
      const { productTitle, productDetail, productSelling, productPrice, file, cid } = this.state;
      const obj = { productTitle, productDetail, productSelling, productPrice }
      const validations = {
        productTitle: {
          [ValidationTypes.REQUIRED]: true
        },
        productDetail: {
          [ValidationTypes.REQUIRED]: true,
        },
        productPrice: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.NUMERIC]: true,
        },
        productSelling: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.NUMERIC]: true,
        },
        file: {
          [ValidationTypes.REQUIRED]: true
        }
      };
      const messages = {
        productTitle: {
          [ValidationTypes.REQUIRED]: "Please enter productTitle."
        },
        productDetail: {
          [ValidationTypes.REQUIRED]: "Please enter productDetail.",
        },
        productPrice: {
          [ValidationTypes.REQUIRED]: "Please enter productPrice.",
          [ValidationTypes.NUMERIC]: "ProductPrice only contain numeric value."
        },
        productSelling: {
          [ValidationTypes.REQUIRED]: "Please enter confirm productSelling.",
          [ValidationTypes.NUMERIC]: "ProductSelling price only conatin numeric value."
        },
      };
      const { isValid, errors } = Validator(obj, validations, messages);
      if (!isValid) {
        this.setState({
          errors,
          isLoading: false
        });
        return;
      }
      const data = { productTitle, productDetail, productPrice, productSelling, file,cid };
      const body = new FormData();
      for (const i in data) {
        if (data.hasOwnProperty(i)) {
          const element = data[i];
          body.append(i, element)
        }
      }
      const token = localStorage.getItem("token");
     const result= await Axios.post('http://192.168.2.107:8000/addProduct', body, {
        headers: { Authorization: `Bearer ${token}` }});
        if(result){
      this.setState({ productTitle: "", productDetail: "", productPrice: "", productSelling: "", file: "", isLoading: false });
      this.props.history.push("/product-list");
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'New Product Add Successfully',
        showConfirmButton: false,
        timer: 1500
      })
        }


    } catch (error) {
      console.log(error)
      this.setState({ isLoading: false });
      toast.error(`${error.message || "Unknown error"}`)
      this.props.history.push("/add-product")
      alert("Something went wrong");
      this.setState({ isLoading: false });
      toast.error(`${error.message || "Unknown error"}`);
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
    const { productTitle,
      productDetail,
      productPrice,
      productSelling,
      categoryData,
      isLoading,
      errors } = this.state;

    const { productTitle: productTitleError,
      productDetail: productDetailError,
      productPrice: productPriceError,
      productSelling: productSellingError,
      file: fileError,
    } = errors;


    return (
      <div className="animate">
      <h2 align="center">Add-Product </h2>
      <Row >
        <Col sm={6} md={4} lg={4} xs={12} />
        <Col sm={6} md={4} lg={4} xs={12} className={"auth-box1"}>
          
          <form onSubmit={this.onLogin} noValidate>
            <FormGroup>
              <FormLabel>Enter Product Title</FormLabel>
              <FormControl id="productTitle" name="productTitle" placeholder={"Enter Product Title"} value={productTitle} autoComplete="productTitle" onChange={this.onInputChange} className="cap"/>
              {productTitleError ? <p className="text-danger">{productTitleError}</p> : null}
            </FormGroup>

            <FormGroup>
            <FormLabel>Enter Product Detail</FormLabel>
              <FormControl id="productDetail" name="productDetail" type="text" value={productDetail} onChange={this.onInputChange} placeholder={"Enter Product Detail"} className="cap" />
              {productDetailError ? <p className="text-danger">{productDetailError}</p> : null}
            </FormGroup>

            <FormGroup>
            <FormLabel>Enter Product Price</FormLabel>
              <FormControl name="productPrice" type="text" value={productPrice} id="productPrice" onChange={this.onInputChange} placeholder={"Enter Product Price"}  />
              {productPriceError ? <p className="text-danger">{productPriceError}</p> : null}
            </FormGroup>

            <FormGroup>
            <FormLabel>Enter Product Selling Price</FormLabel>
              <FormControl name="productSelling" type="text" value={productSelling} id="productSelling" onChange={this.onInputChange} placeholder={"Enter Product Selling Price"} />
              {productSellingError ? <p className="text-danger">{productSellingError}</p> : null}
            </FormGroup>

            
            <FormGroup>
            <FormLabel>Select Product Image</FormLabel>
              <FormControl name="file" type="file" onChange={this.onfileChange} placeholder={"choose Product Image"} />
              {fileError ? <p className="text-danger">{fileError}</p> : null}
            </FormGroup>

            <Button
              type="submit"
              variant="outline-success"
            >
              {isLoading ? "please wait.." : "Add-Product"}
            </Button>
            &nbsp;&nbsp;
            
          </form>
        </Col>
      </Row>
      </div>
    )
  }
};

export default withRouter(AddProduct);