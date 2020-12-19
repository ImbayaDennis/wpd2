import React, { useEffect, useState } from 'react';
import Header from './Header';
import Add from './Add';
import Edit from './Edit';
import Delete from './Delete';
import Milestone from './Milestones';


const Timeline = (props) => {

    const [milestones, setMilestones] = useState([])

    const cur_url = props.location.pathname;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const raw = await fetch(cur_url.substring(10, cur_url.length));
        const data = await raw.json();

        if (data) {
            setMilestones(data);
        } else {
            setMilestones([])
        }

    }

    let rndr;

    if (milestones) {
        if (milestones !== []) {
            rndr = (milestones.map(milestone => (
                <div key={milestone._id} className="tile-tab">

                    <Milestone name={milestone.name} desc={milestone.desc} start={"Starts on: " + milestone.start} end={"Due on: " + milestone.end} ></Milestone>

                    <div>
                        <Edit entry={`${cur_url.substring(19, cur_url.length)}/${milestone._id}`} />
                        <Delete entry={`${cur_url.substring(19, cur_url.length)}/${milestone._id}`} />
                    </div>
                </div>
            )));
        } else {
            rndr = (<div>
                <br />
                <h2>404 Error</h2>
                <br />
                <p>There is no record corresponding to inserted ID</p>
            </div>)
        }
    } else {
        rndr = (<div>
            <br />
            <h2>500 Error</h2>
            <br />
            <p>Invalid ID</p>
        </div>)
    }

    return (
        <div className="main">
            <Header title="Timeline" back={true} prev_pg={cur_url.substring(0, cur_url.length - 24)} />

            {rndr}

            <Add action={cur_url.substring(10, cur_url.length)} />
        </div>
    )
}

export default Timeline;