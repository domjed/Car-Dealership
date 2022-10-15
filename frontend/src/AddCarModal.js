import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddCarModal extends Component {
    /** React modal component to add new car to database */

    constructor(props) {
        super(props);
        this.state = { brands: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);
    }

    photo_file_name = "defaultCars.jpg";
    imagesrc = process.env.REACT_APP_PICTURES_PATH + this.photo_file_name;

    componentDidMount() {
        fetch(process.env.REACT_APP_API + 'brand/')
            .then(response => response.json())
            .then(data => {
                this.setState({ brands: data });
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'car/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                car_id: null,
                brand_name: event.target.brand_name.value,
                car_name: event.target.car_name.value,
                engine_type: event.target.engine_type.value,
                transmission: event.target.transmission.value,
                purchase_date: event.target.purchase_date.value,
                photo_file_name: this.photo_file_name,
            })
        })
            .then(response => response.json())
            .then((result) => {
                alert(result);
            })
        window.location.reload(true);
    }

    handleFileSelected(event) {
        event.preventDefault();
        this.photo_file_name = event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "car_picture",
            event.target.files[0],
            event.target.files[0].name
        );
        fetch(process.env.REACT_APP_API + 'car/save_picture', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then((result) => {
                this.imagesrc = process.env.REACT_APP_PICTURES_PATH + result;
            },
                (error) => {
                    alert('Failed to add the photo: ', error);
                })
    }

    render() {
        return (
            <div className="container">
                <Modal
                    {...this.props}
                    animation={false}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Form onSubmit={this.handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Add Car
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Row>
                                <Col sm={6}>
                                    <Form.Group controlId="brand_name">
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.brands.map(brand =>
                                                <option key={brand.brand_id + brand.brand_name}>{brand.brand_name}</option>)}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="car_name">
                                        <Form.Label>Car Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="car_name"
                                            required
                                            placeholder="Car Name" />
                                    </Form.Group>
                                    <Form.Group controlId="engine_type">
                                        <Form.Label>Engine Type</Form.Label>
                                        <Form.Control
                                            name="engine_type"
                                            required
                                            placeholder="Engine Type"
                                        />
                                    </Form.Group>
                                </Col>

                                <Col sm={6}>
                                    <Form.Group controlId="transmission">
                                        <Form.Label>Transmission</Form.Label>
                                        <Form.Control as="select"
                                            name="transmission"
                                            required
                                            placeholder="Transmission"
                                        >
                                            <option key={"Manual"} value={"Manual"} >Manual</option>
                                            <option key={"Automatic"} value={"Automatic"}>Automatic</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="purchase_date">
                                        <Form.Label>Purchase Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="Purchase Date"
                                            required
                                        />
                                    </Form.Group>
                                    <input type="File" onChange={this.handleFileSelected} />
                                </Col>
                            </Row>
                        </Modal.Body>

                        <Modal.Footer>
                            <Form.Group>
                                <Button variant="primary" type="submit">
                                    Add new Car
                                </Button>
                            </Form.Group>
                            <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div >
        )
    }
}