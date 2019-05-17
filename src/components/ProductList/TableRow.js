import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button ,OverlayTrigger,Tooltip} from "react-bootstrap";
import "./TableRow.css";
import Swal from 'sweetalert2'
const BASE_URL="http://192.168.2.107:8000/";
class TableRow extends Component {
    state = { isOpen: false };

    handleShowDialog = () => {
      this.setState({ isOpen: !this.state.isOpen });
      console.log("cliked");
    };
    componentDidMount() {
        const token = localStorage.getItem("token");
        if (!token) {
        this.props.history.push("/login");
        }
        }
    onSubmit = async e => {
        e.preventDefault();
        try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
        "http://192.168.2.107:8000/deleteItem/" + this.props.obj._id , {
            headers: { Authorization: `Bearer ${token}` }}
        );
        this.props.history.push("/product-list");
        } catch (error) {
        console.log(error);
        }
        };
render() {
console.log(this.props);
return (
<tr align="center">
<td className="css-serial" />
<td className="cap">{this.props.obj.productTitle}</td>
<td className="cap">{this.props.obj.productDetail}</td>
<td>$ {this.props.obj.productPrice.toFixed(2)}</td>
<td>$ {this.props.obj.productSelling.toFixed(2)}</td>
<td>
  <img src={BASE_URL+this.props.obj.file} width="50px" height="50px" onClick={this.handleShowDialog}/>
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
</td>
<td >
<Link to={"/getItem/" + this.props.obj._id}>
<OverlayTrigger
      key="left"
      placement="left"
      overlay={
        <Tooltip id="tooltip-left">
          Click <strong>here</strong> for edit the product.
        </Tooltip>
      }
    >
<Button variant="outline-primary">Edit</Button>
</OverlayTrigger>
</Link>
</td>
<td>
<OverlayTrigger
      key="top"
      placement="top"
      overlay={
        <Tooltip id="tooltip-top">
          Click <strong>here</strong> for view a single product.
        </Tooltip>
      }
    >
    <Button variant="outline-success">View</Button>
</OverlayTrigger>    
</td>
<td>
{/* <OverlayTrigger
      key="right"
      placement="right"
      overlay={
        <Tooltip id="tooltip-right">
          Click <strong>here</strong> for delete the product.
        </Tooltip>
      }
    > */}
<Button variant="outline-danger" onClick={e =>
Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to delete this!",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.value) {
    Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
  }
}) &&
this.props.onDelete(this.props.obj._id)
} >Delete</Button>
{/* </OverlayTrigger> */}
</td>
</tr>

);
}
}
export default TableRow;