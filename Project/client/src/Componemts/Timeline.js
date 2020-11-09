import React from 'react'
import Header from './Header'
import model from './account-document-model'
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize } from '@syncfusion/ej2-react-schedule'


class Timeline extends React.Component{
    constructor(props){
        super(props);
        this.data = model[0].data.modules[0].projects[0].milestones;
        console.log(this.props);
    }

    

    render(){
        return(
        <div className="main">
            <Header title="Timeline" back={true} prev_pg={this.props.history.goBack()} rest={this.props} />

            <ScheduleComponent currentView="Month" eventSettings={{ dataSource: this.data }}>
                <Inject services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]} />
            </ScheduleComponent>
        </div>
        )
    }
}

export default Timeline;