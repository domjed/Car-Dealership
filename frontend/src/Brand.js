import React, { Component } from 'react';

import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddBrandModal } from './AddBrandModal';
import { EditBrandModal } from './EditBrandModal';

export class Brand extends Component {
    /** Display brand list to the user */

    constructor(props) {
        super(props);
        this.state = { brands: [], addModalShow: false, editModalShow: false }
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'brand/')
            .then(response => response.json())
            .then(data => {
                this.setState({ brands: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    deleteBrand(brand_id) {
        if (window.confirm('Are you sure? This item will be pernamently removed.')) {
            fetch(process.env.REACT_APP_API + 'brand/' + brand_id, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            window.location.reload(true);
        }
    }
    render() {
        const { brands, brand_id, brand_name } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Brand ID</th>
                            <th>Brand Name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.map(brand =>
                            <tr key={brand.brand_id + brand.brand_name}>
                                <td>{brand.brand_id}</td>
                                <td>{brand.brand_name}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                brand_id: brand.brand_id,
                                                brand_name: brand.brand_name
                                            })}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteBrand(brand.brand_id)}>
                                            Delete
                                        </Button>

                                        <EditBrandModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            brand_id={brand_id}
                                            brand_name={brand_name} />
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                        Add Brand</Button>

                    <AddBrandModal show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>
            </div>
        )
    }
}