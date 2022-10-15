import React, { Component } from 'react';

export class Home extends Component {

    render() {
        return (
            <h5 className="mt-3" style={{ fontSize: "25px", fontFamily: "Courier New" }}>
                Welcome to the Car Dealership Management. To add, view, edit or delete cars listed in database click on Cars section.
                Info related to car brands can be found in Brands tab.
            </h5>
        )
    }
}