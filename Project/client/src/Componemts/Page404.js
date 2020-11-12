import React from 'react'
import Header from './Header';

const Page404 = (props) => {
    return (
        <div className="main">
            <Header title="404 Error" back={false} rest={props} />
            <h2>We couldn't find what you're looking for</h2>
        </div>
    )
}

export default Page404
