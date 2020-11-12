import React from 'react';
import Header from './Header';
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize } from '@syncfusion/ej2-react-schedule';
import { DataManager, JsonAdaptor } from '@syncfusion/ej2-data'


class Timeline extends React.Component {

    render(){
        const cur_url = this.props.location.pathname

        const remoteData = new DataManager({
            url: `http://localhost:5000${cur_url.substring(10, cur_url.length)}`,
            adaptor: new JsonAdaptor(),
            crossDomain: true
        });

        return (
            <div className="main">
                <Header title="Timeline" back={true} prev_pg={cur_url.substring(0, cur_url.length - 24)} />

                <ScheduleComponent currentView="Month" eventSettings={{ dataSource: remoteData }}>
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]} />
                </ScheduleComponent>
            </div>
        )
    }
}

export default Timeline;