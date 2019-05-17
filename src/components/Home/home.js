import React, { Component } from 'react'
class home extends Component
{
    componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
    this.props.history.push("/product-list");
    }
    }
  
render()
{
    return(
        <div className="animate"><h1>Welcome</h1></div>
    )
}

}
export default home;