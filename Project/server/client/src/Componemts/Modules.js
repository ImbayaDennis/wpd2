import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Header from './Header';
import Tile from './Tile';
import Add from './Add';

const Modules = (props) =>{

    const [modules, setModules] = useState([]);

    useEffect(()=>{
        fetchData();   
    },[]);

    const fetchData = async () =>{
       const raw = await fetch("http://localhost:5000/modules");
       const data = await raw.json();
        //console.log(data);
        setModules(data);
    }


    return (
        <div className="main">
            <Header title="Modules" back={false} rest={props} />
            
            {modules.map(module =>(<Link key={module._id} to={`/dashboard/modules/${module._id}`}><Tile title={module.name} desc={module.facilitator} time={"End on: " + module.end} dest={"/dashboard/modules/" + module._id} /></Link>))}

            <Add action="/modules"/>
        </div>
    );
}

export default Modules;