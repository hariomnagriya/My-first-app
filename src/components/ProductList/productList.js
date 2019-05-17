import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {Table,Button} from "react-bootstrap";
import Validator, { ValidationTypes } from "js-object-validation";
import { toast } from "react-toastify";
import TableRow from "./TableRow";
class ProductList extends Component {
constructor(props) {
super(props);
this.state = { product: [] ,
Cid:localStorage.getItem("cid")
}

}
componentDidMount = async () => {
const token = localStorage.getItem("token");
if (!token) {
    this.props.history.push("/login");
    }
this.getData();
  }
  
 getData=async()=>{
    const{Cid}=this.state;
const obj= {Cid};
const res = await axios.post("http://192.168.2.107:8000/showproduct",obj)//console.log(res.data.result);
console.log("result");
const result = res.data.result;
this.setState({ product: result });
//console.log(result);
if (!result) {
console.log("error");
}
}
onDelete=async productId=>{

  try {
  const token = localStorage.getItem("token");
  const response = await axios.delete(
  "http://192.168.2.107:8000/deleteItem/" + productId )
  } catch (error) {
  console.log(error);
  }
  this.getData();
}

render() {
  //const { todos, currentPage, todosPerPage,product } = this.state;
  const {product} = this.state;
    // Logic for displaying todos
    // const indexOfLastTodo = currentPage * todosPerPage;
    // const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    // const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

return (
<>
<div className="animate">

<h2 align="center"> Product List</h2><br/>
 <Link to={"/add-product"} >
<Button variant="primary" align="center">Add-Product</Button>
</Link><br/><br/>
<Table striped bordered hover variant="secondary" >
<thead>
<tr align="center">
<th>S.No.</th>
<th>Product Title</th>
<th>Product Details</th>
<th>Product Price</th>
<th>Product Selling Price</th>
<th>Product Image</th>
<th colSpan="3">Action</th>
</tr>
</thead>
<tbody>
  {console.log(product.length)}  
{product && product.length
? product.map(product => {
return <TableRow obj={product} key={product._id} onDelete={this.onDelete}/>;
})
: null}
</tbody>
</Table>
{
  
}
</div>
{
  
}
</>

);
}
}

export default ProductList;
