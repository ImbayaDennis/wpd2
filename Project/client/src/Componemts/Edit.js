import React, {useState} from 'react'
import Update from './Update';


export default function Edit(props) {

    const[form, setForm] = useState(false);

    const toggleForm = () =>{
        setForm(!form);
    }

    return (
        <>
        <Update formState={form} entry={props.entry}/>

        <div className="del-icon"onClick={toggleForm}>
            <i className="fa fa-edit" aria-hidden="true"></i>
        </div>
        </>
    )
}

