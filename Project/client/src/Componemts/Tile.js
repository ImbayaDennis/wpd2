import React from 'react';

const Tile = (props) =>{

    const time = ((props.time).toString().substr(0, 18));
    return(
        
        <div className="tile">
                <div>
                    <h2><strong>{props.title}</strong></h2>
                    <p>{props.desc}</p>
                    <small>{time}</small>
                </div>
        </div>
    );

};

export default Tile;