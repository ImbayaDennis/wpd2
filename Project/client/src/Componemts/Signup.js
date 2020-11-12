import React from 'react';
import {Link} from 'react-router-dom';

const Signup = () =>{

    return (
        <div>
            <div className="login-main">
                <div className="container">
                    <div className="title">
                        <h2>Sign up for a new account</h2>
                    </div>
                    
                    <form className="_form">
                        <input type="text" name="username" placeholder="Create username" required/>
                        <input type="email" name="email" placeholder="Enter Email Address" required/>
                        <input type="new-password" name="new-password" placeholder="Enter Password" required/>
                        <input type="new-password" name="new-password" placeholder="Re-enter Password" required/>
                        <button type="submit">Sign up</button>
                    </form>

                    <div className="links">
                        <Link to="/">
                            <p>Back to login</p><br/>
                        </Link>
                    </div>


                    <div className="xtra-btn">
                    <button>Signup with <i className="fab fa-google"></i></button>
                    <button>Signup with <i className="fab fa-facebook"></i></button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Signup;