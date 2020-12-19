import React from 'react';
import Header from './Header';

const Milestones = (props) => {
    const start_time = ((props.start).toString().substr(0, 21));
    const end_time = ((props.end).toString().substr(0, 18));
    return (
        <div className="timeline">
            <h2>{props.name}</h2><br></br>
            <h5>{start_time}</h5>
            <h5>{end_time}</h5><br></br>
            <p>{props.desc}</p>
        </div>
    );
}

export default Milestones;