import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Header from './Header';
import Tile from './Tile';
import Add from './Add';
import model from './account-document-model'

const Modules = () =>{

    const [modules, setModules] = useState([]);

    useEffect(()=>{
        fetchData();   
    },[]);

    const fetchData = async () =>{
       // const raw = await fetch("https://fortnite-api.com/v2/cosmetics/br/new");
       // const data = await raw.json();

        setModules(model[0].data.modules);
    }


    return (
        <div className="main">
            <Header title="Modules" back={false} />
            
            {modules.map(module =>(<Link key={module.id} to={`/projects/${module.id}`}><Tile title={module.name} desc={module.facilitator} time={"End on: " + module.end} dest={"/projects/" + module.id} /></Link>))}

            <Add />
        </div>
    );
}

export default Modules;