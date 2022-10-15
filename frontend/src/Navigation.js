import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export class Navigation extends Component {

    render() {
        return (
            <Navbar bg="info" expand="lg" style={{ fontSize: "25px", fontFamily: "Courier New" }} >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink className="p-3 bg-info text-white" to="/">
                            Home
                        </NavLink>
                        <NavLink className="p-3 bg-info text-white" to="/brand">
                            Brands
                        </NavLink>
                        <NavLink className="p-3 bg-info text-white" to="/car">
                            Cars
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}