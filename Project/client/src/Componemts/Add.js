import React, { useState } from 'react';
import Popup from './Popup'

const Add = () =>{

    const[form, setForm] = useState(false);

    const toggleForm = () =>{
        setForm(!form);
    }

    return(
        <div>
            <Popup formState={form} />

            <div className="add" onClick={toggleForm}>
                <span className="fa fa-plus-square fa-2x"></span>
            </div>
        </div>
    );
}

export default Add;
