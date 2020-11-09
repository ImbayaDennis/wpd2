import React from 'react';
import {Link} from 'react-router-dom';
import auth from './auth/auth'

const Login = (props) =>{

    return (
        <div className="login-main">
            <div className="container">
                <div className="title">
                    <h2>Login to your account</h2>
                </div>
                
                <form className="_form">
                    <input type="text" name="username" placeholder="Username or email" required/>
                    <input type="password" name="pwd" placeholder="Password" required/>
                    <button type="submit" onClick={
                        () =>{
                            auth.login(() =>{props.history.push("/dashboard/modules")})
                        }
                    }>Login</button>
                </form>

                <div className="links">
                    <a href="#">Forgot password?</a><br/><br/>
                    <Link to='/signup'>
                        <p>New here? Create an account</p><br/>
                    </Link>
                </div>


                <div className="xtra-btn">
                    <button>Login with <span className="fab fa-google"></span></button>
                    <button>Login with <span className="fab fa-facebook"></span></button>
                </div>

            </div>
        </div>
    );
}

export default Login;