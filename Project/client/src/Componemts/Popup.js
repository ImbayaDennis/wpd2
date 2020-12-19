import React from 'react';
import superagent from 'superagent';

class Popup extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            desc: "",
            start: "",
            end: ""
        };
    }

    refreshPage() {
        window.location.reload();
    }

    handleTitle(event) {
        this.setState({ name: event.target.value })
    }

    handleDescription(event) {
        this.setState({ desc: event.target.value })
    }

    handleStart(event) {
        this.setState({ start: event.target.value })
    }

    handleEnd(event) {
        this.setState({ end: event.target.value })
    }

    handleSubmit(event) {
        superagent
            .post(this.props.action)
            .set({ "authentication": `Bearer ${localStorage.getItem("token")}` })
            .send(this.state)
            .end((err, res) => {
                if (err) { this.setState({ errorMessage: "authentication failed" }); return; }
                this.refreshPage();
            });
    }

    render() {
        let popup;
        if (this.props.formState) {
            popup = "form-open";
        }
        else {
            popup = "form-close"
        }

        return (
            <div className="popup br-1">
                <form className={"_form " + popup} onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" value={this.state.title} onChange={this.handleTitle.bind(this)} name="title" id="title" placeholder="Title" />
                    <input type="date" value={this.state.start_date} onChange={this.handleStart.bind(this)} name="start_date" id="start" placeholder="Start date" />
                    <input type="date" value={this.state.end_date} onChange={this.handleEnd.bind(this)} name="end_date" id="end" placeholder="End date" />
                    <textarea type="text" value={this.state.description} onChange={this.handleDescription.bind(this)} name="description" id="desc" placeholder="Add a description" />
                    <button type="submit"><span className="fa fa-plus"></span></button>
                </form>
            </div>
        );
    }
}

export default Popup;