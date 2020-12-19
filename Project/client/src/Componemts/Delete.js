import React from 'react'
import superagent from 'superagent';


export default function Delete(props) {

    const refreshPage = ()=>{
        window.location.reload();
     }

    const deleteEntry =()=>{
        superagent
        .delete(`/modules/${props.entry}`)
        .set({"authentication": `Bearer ${localStorage.getItem("token")}`})
        .then(res=>{
            console.log(res);
        });

        refreshPage();
    }

    return (
        <div className="del-icon"onClick={deleteEntry}>
            <i className="fa fa-trash" aria-hidden="true"></i>
        </div>
    )
}

