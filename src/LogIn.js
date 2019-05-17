import React, {Component} from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";

import Button from '@material-ui/core/Button';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

class Login extends Component {
constructor(props){
super(props);
this.state = {
username: "",
email: "",
password: "",
mobile: "",
isLoading: false
};
}
onLogin = async (e) => {
e.preventDefault();
this.setState({
isLoading: true
})
try {
const {username, email , password , mobile} = this.state;
await Axios.post('http://localhost:8080/addUser', { username, email, password , mobile });
this.setState({username: "", email:"", password:"", mobile:"" , isLoading: false});
this.props.history.push("/")
alert("Data submitted success");
} catch (error) {
console.log(error)
}
}
onname = (e) => {
const { target } = e;
const { value } = target;
this.setState({
username: value,
})
}
onemail = (e) => {
const { target } = e;
const { value } = target;
this.setState({
email: value,
})
}
onpassword = (e) => {
const { target } = e;
const { value } = target;
this.setState({
password: value,
})
}
onmobile = (e) => {
const { target } = e;
const { value } = target;
this.setState({
mobile: value
})
}
render(){
const { username ,isLoading } = this.state;
const { email } = this.state;
const { password } = this.state;
const { mobile } = this.state;


const { buttonText } = this.props;
return isLoading ? <p>Loading...</p>: <form onSubmit={this.onLogin}>
<FormControl margin="normal">
<InputLabel htmlFor="username">User Name</InputLabel>
<Input id="username" name="username" type="text" value={username} onChange={this.onname} /> 
</FormControl><br></br>
<FormControl margin="normal">
<InputLabel htmlFor="email">Email Address</InputLabel>
<Input id="email" name="email" type="email" value={email} onChange={this.onemail} /> 
</FormControl><br></br>
<FormControl margin="normal" >
<InputLabel htmlFor="password">Password</InputLabel>
<Input name="password" type="password"value={password}id="password" onChange={this.onpassword} />
</FormControl><br></br>
<FormControl margin="normal" >
<InputLabel htmlFor="mobile">Contact No</InputLabel>
<Input name="mobile" type="number" value={mobile} id="mobile" onChange={this.onmobile} />
</FormControl><br></br>
<Button
type="submit"
value={buttonText} 
variant="contained"
color="primary"
>
Sign up
</Button>
<Button
type="button"
variant="contained"
color="secondary"
value={"Go to home"} 
onClick={() => {
this.props.history.push("/login")
}}
>
Sign In
</Button><br></br>
</form>
}};

export default withRouter(Login);

