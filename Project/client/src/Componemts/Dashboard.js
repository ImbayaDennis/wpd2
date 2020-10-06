import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Modules from './Modules';
import Notifications from './Notifications';
import Milestones from './Milestones';
import Profile from './Profile';
import Projects from './Projects';
import Timeline from './Timeline';

const Dashboard = () =>{

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/dashboard/modules" component={Modules}  />
                    <Route path="/dashboard/notifications" component={Notifications}  />
                    <Route path="/dashboard/milestones" component={Milestones}  />
                    <Route path="/dashboard/profile" component={Profile}  />
                    <Route path="/projects/:id" component={Projects}  />
                    <Route path="/timeline/:id" component={Timeline}  />
                </Switch>
            </div>
        </Router>
    );
}

export default Dashboard;