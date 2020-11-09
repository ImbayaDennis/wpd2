import React from 'react';

const Popup = (props) =>{

    const prev_def = (e) =>{
        e.preventDefault();
        console.log("Posted");
    }

    let popup;
    if(props.formState){
        popup = "form-open";
    }
    else{
        popup = "form-close"
    }

    return(
        <div className="popup br-1">
           <form className={"_form " + popup} method="post" action={props.action}>
                <input type="text" name="title" id="title" placeholder="Title"/>
                <input type="text" name="description" id="desc" placeholder="Add a description"/>
                <input type="date" name="start_date" id="start" />
                <input type="date" name="end_date" id="end" />
                <button type="submit"><span className="fa fa-plus"></span></button>
           </form>
        </div>
    );
}

export default Popup;