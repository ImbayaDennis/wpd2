import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Tile from './Tile';
import Add from './Add';

const Projects = (props) =>{
    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        fetchData();   
    },[]);

    const fetchData = async () =>{
        const raw = await fetch(`http://localhost:5000/modules/${props.match.params.id}`);
        const data = await raw.json();
        //console.log(data.projects);
        setProjects(data.projects);
    }

    //return(<div></div>);
    return (
        <div className="main">
            <Header title="Coursework Projects" back={true} prev_pg="/dashboard/modules" rest={props} />
            {projects.map(project=>(<Link key={project._id} to={`/dashboard/projects/${project._id}`}><Tile title={project.name} desc={project.desc} time={"Due on: " + project.end} dest={"/projects/" + project._id} /></Link>))}
            <Add action={`/modules/${props.match.params.id}`} />
        </div>
    );
    
}

export default Projects;