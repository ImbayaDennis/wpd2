import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import superagent from 'superagent';
import auth from './auth/auth'

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        }
    }

    refreshPage(){
        window.location.reload();
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
        .post('/')
        .send(this.state)
        .end((err, res)=>{
            if(err){this.setState({errorMessage: "authentication failed"}); return;}
            localStorage.setItem("token", res.body.Token);
            this.refreshPage();
        });
    }


    render() {
        const isAuth = auth.isAuthenticated();
        return (
        <div className="login-main">
            {isAuth ? <Redirect to={{pathname: '/dashboard/modules'}}/> : (
                <div className="container">
                <div className="title">
                    <h2>Login to your account</h2>
                </div>

                <form className="_form" onSubmit={this.handleSubmit.bind(this)}>
                    <input type="email" name="email" placeholder="Email address" value={this.state.email} onChange={this.handleEmail.bind(this)} required />
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePassword.bind(this)} required />
                    <button type="submit">Login</button>
                </form>

                <div className="links">
                    {/* eslint-disable-next-line*/}
                    <a href="#">Forgot password?</a><br /><br />
                    <Link to='/signup'>
                        <p>New here? Create an account</p><br />
                    </Link>
                </div>
            </div>
            )}
        </div>
        )
    }
}

export default Login;