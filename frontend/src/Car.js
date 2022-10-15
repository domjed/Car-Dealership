import React, { Component } from 'react';

import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar, Image } from 'react-bootstrap';
import { AddCarModal } from './AddCarModal';
import { EditCarModal } from './EditCarModal';

export class Car extends Component {
    /** Display car list to the user */

    constructor(props) {
        super(props);
        this.state = { cars: [], addModalShow: false, editModalShow: false }
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'car/')
            .then(response => response.json())
            .then(data => {
                this.setState({ cars: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    deleteCar(car_id) {
        if (window.confirm('Are you sure? This item will be removed pernamently')) {
            fetch(process.env.REACT_APP_API + 'car/' + car_id, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            this.refreshList();
            window.location.reload(false);
        }
    }
    render() {
        const { cars, car_id, car_name, brand_name, engine_type, transmission, purchase_date, photo_file_name } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Car ID</th>
                            <th>Car Name</th>
                            <th>Brand</th>
                            <th>Engine Type</th>
                            <th>Transmission</th>
                            <th>Purchase Date</th>
                            <th>Photo</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map(car =>
                            <tr key={car.car_id + car.brand_name}>
                                <td>{car.car_id}</td>
                                <td>{car.brand_name}</td>
                                <td>{car.car_name}</td>
                                <td>{car.engine_type}</td>
                                <td>{car.transmission}</td>
                                <td>{car.purchase_date}</td>
                                <td><Image width="150px" height="100px" src={process.env.REACT_APP_PICTURES_PATH + car.photo_file_name} /></td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={() => {
                                                this.setState({
                                                    editModalShow: true,
                                                    car_id: car.car_id, car_name: car.car_name, brand_name: car.brand_name,
                                                    engine_type: car.engine_type, transmission: car.transmission,
                                                    purchase_date: car.purchase_date, photo_file_name: car.photo_file_name
                                                });
                                            }}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteCar(car.car_id)}>
                                            Delete
                                        </Button>

                                        <EditCarModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            car_id={car_id}
                                            car_name={car_name}
                                            brand_name={brand_name}
                                            engine_type={engine_type}
                                            transmission={transmission}
                                            purchase_date={purchase_date}
                                            photo_file_name={photo_file_name}
                                        />
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                        Add Car</Button>
                    <AddCarModal show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>
            </div>
        )
    }
}