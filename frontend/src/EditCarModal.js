import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class EditCarModal extends Component {
    /** React modal component to edit car from database */

    constructor(props) {
        super(props);
        this.state = { brands: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);
    }

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
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                car_id: event.target.car_id.value,
                brand_name: event.target.brand_name.value,
                car_name: event.target.car_name.value,
                engine_type: event.target.engine_type.value,
                transmission: event.target.transmission.value,
                purchase_date: event.target.purchase_date.value,
                photo_file_name: this.photo_file_name ?? this.props.photo_file_name,
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            },
            );
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
            .then(res => res.json())
            .then((result) => {
                this.imagesrc = process.env.REACT_APP_PICTURES_PATH + result;
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
                                Edit Car
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Row>
                                <Col sm={6}>
                                    <Form.Group controlId="car_id">
                                        <Form.Label>Car ID</Form.Label>
                                        <Form.Control type="text" name="car_id" required
                                            placeholder="Car ID"
                                            disabled
                                            defaultValue={this.props.car_id} />
                                    </Form.Group>

                                    <Form.Group controlId="brand_name">
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control as="select" defaultValue={this.props.brand_name}>
                                            {this.state.brands.map(brand =>
                                                <option key={brand.brand_id + brand.brand_name}>{brand.brand_name}</option>)}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="car_name">
                                        <Form.Label>Car Name</Form.Label>
                                        <Form.Control type="text" name="car_name" required
                                            defaultValue={this.props.car_name}
                                            placeholder="Car Name" />
                                    </Form.Group>

                                    <Form.Group controlId="engine_type">
                                        <Form.Label>Engine Type</Form.Label>
                                        <Form.Control type="text" name="engine_type" required
                                            defaultValue={this.props.engine_type}
                                            placeholder="Engine Type" />
                                    </Form.Group>
                                </Col>

                                <Col sm={6}>
                                    <Form.Group controlId="transmission">
                                        <Form.Label>Transmission</Form.Label>
                                        <Form.Control as="select"
                                            name="transmission"
                                            required
                                            placeholder="Transmission"
                                            defaultValue={this.props.transmission}
                                        >
                                            <option key={"Manual"} value={"Manual"} >Manual</option>
                                            <option key={"Automatic"} value={"Automatic"}>Automatic</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="purchase_date">
                                        <Form.Label>Purchase Date</Form.Label>
                                        <Form.Control type="date" name="purchase_date" required
                                            defaultValue={this.props.purchase_date}
                                            placeholder="Purchase Date" />
                                    </Form.Group>
                                    <input onChange={this.handleFileSelected} type="File" />
                                </Col>
                            </Row>
                        </Modal.Body>

                        <Modal.Footer>
                            <Form.Group>
                                <Button variant="primary" type="submit">
                                    Update Car
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