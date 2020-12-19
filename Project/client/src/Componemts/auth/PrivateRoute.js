import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './auth'


const PrivateRouter = ({component: Component, ...rest}) =>{

    const isAuth = auth.isAuthenticated();

    return(
        <div>
            <Route {...rest} render={
                (props) =>{
                    if(isAuth){
                        return <Component {...props} />
                    }else{
                        return <Redirect to="/" />
                    }
                    
                }
            } />
        </div>
    )
}

export default PrivateRouter;