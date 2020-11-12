import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Tile from './Tile';
import Add from './Add';

const Projects = (props) =>{
    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        fetchData();   
    },[1]);

    const fetchData = async () =>{
        const raw = await fetch(`/modules/${props.match.params.id}`);
        const data = await raw.json();

        if(data){
            setProjects(data.projects);
        }else{
            setProjects([])
        }
        
    }

    let rndr;

    if(projects){
        if(projects !== []){
            rndr = (projects.map(project=>(<Link key={project._id} to={`/dashboard/modules/${props.match.params.id}/${project._id}`}><Tile title={project.name} desc={project.desc} time={"Due on: " + project.end} dest={`modules/${props.match.params.id}/${project._id}`} /></Link>)));
        }else{
            rndr = (<div>
                <br/>
                <h2>404 Error</h2>
                <br/>
                <p>There is no record corresponding to inserted ID</p>
                </div>)
        }
    }else{
        rndr = (<div>
                <br/>
                <h2>500 Error</h2>
                <br/>
                <p>Invalid ID</p>
                </div>)
    }

    return (
        <div className="main">
            <Header title="Coursework Projects" back={true} prev_pg="/dashboard/modules/" />

            {rndr}
            
            <Add action={`/modules/${props.match.params.id}`} />
        </div>
    );
    
}

export default Projects;