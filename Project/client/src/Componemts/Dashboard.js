import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Modules from './Modules';
import Notifications from './Notifications';
import Milestones from './Milestones';
import Profile from './Profile';
import Projects from './Projects';
import Timeline from './Timeline';
import Page404 from './Page404';
import PrivateRouter from './auth/PrivateRoute';

const Dashboard = () =>{

    return (
        <Router>
            <div>
                <Switch>
                    <PrivateRouter exact path="/dashboard/modules" component={Modules}  />
                    <PrivateRouter exact path="/dashboard/notifications" component={Notifications}  />
                    <PrivateRouter exact path="/dashboard/milestones" component={Milestones}  />
                    <PrivateRouter exact path="/dashboard/profile" component={Profile}  />
                    <PrivateRouter exact path="/dashboard/modules/:id" component={Projects}  />
                    <PrivateRouter exact path="/dashboard/modules/:id/:id" component={Timeline}  />
                    <PrivateRouter component={Page404} />
                </Switch>
            </div>
        </Router>
    );
}

export default Dashboard;