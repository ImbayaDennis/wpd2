import React from 'react'
import Header from './Header'
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule'


const Timeline = (props) =>{

    return(
        <div className="main">
            <Header title="Timeline" back={true} prev_pg={`/projects/${props.match.params.id}`} />

            <ScheduleComponent currentView="Month">
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>
        </div>
    )
}

export default Timeline;