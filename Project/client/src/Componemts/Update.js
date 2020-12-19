import React, { Component } from 'react'
import superagent from 'superagent';

export default class Update extends Component {
    constructor() {
        super();
        this.state = {
            name: undefined,
            desc: undefined,
            start: undefined,
            end: undefined
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
       let dataArray = [];

        for (let property in this.state) {
            if (this.state[property] !== undefined) {
                const data = { propName: property, value: this.state[property] }
                dataArray.push(data)
            }
        }

        console.log(dataArray)
        superagent
            .put(`/modules/${this.props.entry}`)
            .set({ "authentication": `Bearer ${localStorage.getItem("token")}` })
            .send(dataArray)
            .end((err, res) => {
                if (err) { this.setState({ errorMessage: "authentication failed" }); return; }
                this.refreshPage();
            });
            //event.preventDefault();
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
                    <input type="text" value={this.state.name} onChange={this.handleTitle.bind(this)} name="name" id="name" placeholder="Title" />
                    <input type="text" value={this.state.desc} onChange={this.handleDescription.bind(this)} name="desc" id="desc" placeholder="Add a description" />
                    <input type="date" value={this.state.start} onChange={this.handleStart.bind(this)} name="start" id="start" placeholder="Start date" />
                    <input type="date" value={this.state.end} onChange={this.handleEnd.bind(this)} name="end" id="end" placeholder="End date" />
                    <button type="submit"><span className="fa fa-plus"></span></button>
                </form>
            </div>
        )
    }
}

