import React, { Component } from 'react'
//import SignUp from './components/signUp/signUp'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Home from "./components/Home/home";
// import Login from "./components/Login/login";
// import Add from "./components/AddProduct/addproduct";
// import List from "./components/ProductList/productList";
// import Update from "./components/UpdateProduct/update";
// import Logout from "./components/Logout/logout";
// import Profile from "./components/Profile/profile";
// import NotFound from "./components/NotFound/notFound";
// import ProfileUpdate from "./components/ProfileUpdate/updateProfile";
import { Navbar, Nav, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import "./App.css";
library.add(faStroopwafel);

class App extends Component {

  render() {
    return (

      <Router>

        <Navbar bg="primary" variant="dark">
          {/* <Navbar.Brand href="/"></Navbar.Brand> */}
          <Nav className="mr-auto">

            {/* {localStorage.getItem("token") ? ( */}
              <>
                <React.Fragment>
                  {/* <OverlayTrigger
                    key="bottom"
                    placement="bottom"
                    overlay={
                      <Tooltip id="tooltip-bottom">
                        Click <strong>here</strong> to see the profile.
        </Tooltip>
                    }
                  >
                    <NavLink to={"/profile"} className="text-white nav-item" activeClassName="active">Profile</NavLink>
                  </OverlayTrigger>&nbsp;&nbsp;&nbsp;
     <OverlayTrigger
                    key="bottom"
                    placement="bottom"
                    overlay={
                      <Tooltip id="tooltip-bottom">
                        Click <strong>here</strong> to see the product list.
        </Tooltip>
                    }
                  >
                    <NavLink to={"/product-list"} className="text-white nav-item" activeClassName="active">Product-List</NavLink>
                  </OverlayTrigger>&nbsp;&nbsp;&nbsp; 
     <OverlayTrigger
                    key="bottom"
                    placement="bottom"
                    overlay={
                      <Tooltip id="tooltip-bottom">
                        Click <strong>here</strong> to add the new product.
        </Tooltip>
                    }
                  >
                    <NavLink to={"/add-product"} className="text-white nav-item" activeClassName="active">Add-Product</NavLink>
                  </OverlayTrigger>&nbsp;&nbsp;&nbsp;
      <OverlayTrigger
                    key="bottom"
                    placement="bottom"
                    overlay={
                      <Tooltip id="tooltip-bottom">
                        Click <strong>here</strong> to do logout.
        </Tooltip>
                    }
                  >
                    <NavLink to={"/logout"} className="text-white nav-item" activeClassName="active" >LogOut</NavLink>
                  </OverlayTrigger>  */}
                </React.Fragment>
              </>
            {/* )
              : ( */}
                <>
                  <React.Fragment>
                    <OverlayTrigger
                      key="bottom"
                      placement="bottom"
                      overlay={
                        <Tooltip id="tooltip-bottom">
                          Click <strong>here</strong> to go home page.
        </Tooltip>
                      }
                    >
                      <i class="fa fa-home" aria-hidden="true"></i>&nbsp;
     <NavLink exact to={"/"} className="text-white nav-item" activeClassName="active">Home</NavLink>
                    </OverlayTrigger> &nbsp;&nbsp;&nbsp;
     {/* <OverlayTrigger
                      key="bottom"
                      placement="bottom"
                      overlay={
                        <Tooltip id="tooltip-bottom">
                          Click <strong>here</strong> to do signup.
        </Tooltip>
                      }
                    >
                      <NavLink to={"/signup"} className="text-white nav-item" activeClassName="active">SignUp</NavLink>
                    </OverlayTrigger>&nbsp;&nbsp;&nbsp;
      <OverlayTrigger
                      key="bottom"
                      placement="bottom"
                      overlay={
                        <Tooltip id="tooltip-bottom">
                          Click <strong>here</strong> to do login.
        </Tooltip>
                      }
                    >
                      <NavLink to={"/login"} className="text-white nav-item" activeClassName="active">LogIn</NavLink>
                    </OverlayTrigger> */}
                  </React.Fragment> 
                </>
                {/* )} */}
          </Nav>
        </Navbar>

        <Container>
          <Switch>
            <Route exact path="/" component={Home} />

            {/* <Route path="/signup" component={SignUp} />

            <Route path="/login" component={Login} />

            <Route path="/add-product" component={Add} />

            <Route path="/product-list" component={List} />

            <Route path="/getItem/:_id" component={Update} />

            <Route path="/logout" component={Logout} />

            <Route path="/profile" component={Profile} />

            <Route path="/profile-Update" component={ProfileUpdate} />

            <Route component={NotFound} /> */}

          </Switch>
        </Container>

      </Router>
    )
  }
}

export default App;