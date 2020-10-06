import React from 'react';

const Popup = (props) =>{


        const prevDef = (event) => {       
          event.preventDefault();
        };

    let popup;
    if(props.formState){
        popup = "form-open";
    }
    else{
        popup = "form-close"
    }

    return(
        <div className="popup br-1">
           <form onSubmit={prevDef} className={"_form " + popup}>
                <input type="text" name="title" id="title" placeholder="Title"/>
                <input type="text" name="description" id="desc" placeholder="Add a description"/>
                <input type="date" name="start-date" id="start" />
                <input type="date" name="end-date" id="end" />
                <button type="submit"><span className="fa fa-plus"></span></button>
           </form>
        </div>
    );
}

export default Popup;