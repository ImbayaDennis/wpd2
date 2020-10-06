import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Tile from './Tile';
import Add from './Add';
import model from './account-document-model'

const Projects = (match) =>{
    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        fetchData();   
    },[]);

    const fetchData = async () =>{
      //  const raw = await fetch(`https://fortnite-api.com/v2/cosmetics/br/new`);
      //  const data = await raw.json();
        setProjects(model[0].data.modules[0].projects);
    }

    //return(<div></div>);
    return (
        <div className="main">
            <Header title="Coursework Projects" back={true} prev_pg="/dashboard/modules" />
            {projects.map(project=>(<Link key={project.id} to={`/timeline/${project.id}`}><Tile title={project.name} desc={project.desc} time={"Due on: " + project.due} dest={"/projects/" + project.id} /></Link>))}
            <Add />
        </div>
    );
    
}

export default Projects;