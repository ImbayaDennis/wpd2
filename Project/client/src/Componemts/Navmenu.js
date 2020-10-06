import React from 'react';
import {Link} from 'react-router-dom';

const Navmenu = (props) =>{

    let menuState;

    if(!props.close){
        menuState = "nav-close";
    }
    else{
        menuState = "nav-open";
    }

    return (
        <div>
            <div className={"cont " + menuState}>
            </div>

            <div className={"nav-bg " + menuState}>
                <div className="links">
                    <Link to='/dashboard/modules'>
                        <div className="menu-link br-1"><div className="menu-icon"><span className="fa fa-book fa-2x"></span></div><div className="txt"><h4>Modules</h4></div></div>
                    </Link>

                    <Link to='/dashboard/notifications'>
                        <div className="menu-link br-1"><div className="menu-icon"><span className="fa fa-bell fa-2x"></span></div><div className="txt"><h4>Notifications</h4></div></div>
                    </Link>

                    <Link to='/dashboard/milestones'>
                        <div className="menu-link br-1"><div className="menu-icon"><span className="fa fa-flag fa-2x"></span></div><div className="txt"><h4>Milestones</h4></div></div>
                    </Link>

                    <Link to='/dashboard/profile'>
                        <div className="menu-link br-1"><div className="menu-icon"><span className="fa fa-user-circle fa-2x"></span></div><div className="txt"><h4>Profile</h4></div></div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navmenu;