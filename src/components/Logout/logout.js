import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

class Logout extends Component {
    componentDidMount() {
        const token = localStorage.getItem("token");
        if (!token) {
        this.props.history.push("/login");
        }
        }
        
render() {
return (
<div>

<Link to={"/"} onClick={localStorage.clear()}>
LOGOUT
</Link>

</div>
);
}
}
export default Logout;