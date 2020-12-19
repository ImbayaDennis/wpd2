import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Header from './Header';
import Tile from './Tile';
import Add from './Add';
import Delete from './Delete';
import Edit from './Edit';

const Modules = (props) => {

    const [modules, setModules] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const options = {
            method: "GET",
            headers: {
                "Authentication": `Bearer ${token}`
            }
        }
        const raw = await fetch("/modules", options);
        const data = await raw.json();
        setModules(data);
    }

    let render;

    if (modules === []) {
        render = (<h2>No modules available</h2>)

    } else {
        render = (
        <div>{ modules.map(module => (
            <div key={module._id} className="tile-tab">
                <Link  to={`/dashboard/modules/${module._id}`}>
                    <Tile title={module.name} desc={module.desc} time={"End on: " + module.end} dest={"/dashboard/modules/" + module._id} />
                </Link>
                <div>
                    <Edit entry={module._id} />
                    <Delete entry={module._id} />
                </div>
            </div>
            ))}
        </div>)

    }
    return (
        <div className="main">
            <Header title="Modules" back={false} rest={props} />
            {render}
            <Add action="/modules" />
        </div>
    );
    ;
}

export default Modules;