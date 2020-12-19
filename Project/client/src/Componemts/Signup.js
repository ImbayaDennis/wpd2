import React from 'react';
import { Link } from 'react-router-dom';
import superagent from 'superagent';

class Signup extends React.Component {

    constructor() {
        super();
        this.state={
            username: "",
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        }
    }

    refreshPage(){
        window.location.reload();
     }

    handleUsername(event) {
        this.setState({ username: event.target.value });
    }

    handleFirstname(event) {
        this.setState({ firstname: event.target.value });
    }

    handleLastname(event) {
        this.setState({ lastname: event.target.value });
    }

    handleEmail(event) {
        this.setState({ email: event.target.value });
    }

    handlePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        superagent
        .post('/signup')
        .send(this.state)
        .end((err, res)=>{
            if(err){this.setState({errorMessage: "authentication failed"}); return;}
            this.refreshPage();
        });
    }

    render() {
        return (
            <div>
                <div className="login-main">
                    <div className="container">
                        <div className="title">
                            <h2>Sign up for a new account</h2>
                        </div>

                        <form className="_form" onSubmit={this.handleSubmit.bind(this)}>
                            <input type="text" name="username" placeholder="Create username" value={this.state.username} onChange={this.handleUsername.bind(this)} required />
                            <input type="text" name="firstname" placeholder="First Name" value={this.state.firstname} onChange={this.handleFirstname.bind(this)} required />
                            <input type="text" name="lastname" placeholder="Last Name" value={this.state.lastname} onChange={this.handleLastname.bind(this)} required />
                            <input type="email" name="email" placeholder="Enter Email Address" value={this.state.email} onChange={this.handleEmail.bind(this)} required />
                            <input type="password" name="new_password" placeholder="Enter Password" value={this.state.password} onChange={this.handlePassword.bind(this)} required />
                            <button type="submit">Sign up</button>
                        </form>

                        <div className="links">
                            <Link to="/">
                                <p>Back to login</p><br />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;