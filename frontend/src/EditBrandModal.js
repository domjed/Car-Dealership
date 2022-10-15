import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class EditBrandModal extends Component {
    /** React modal component to edit brand from database */

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'brand/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                brand_id: event.target.brand_id.value,
                brand_name: event.target.brand_name.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            })
        window.location.reload(true);
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
                                Edit Brand
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Row>
                                <Col sm={6}>
                                    <Form.Group controlId="brand_id">
                                        <Form.Label>Brand ID</Form.Label>
                                        <Form.Control type="text" name="brand_id" required
                                            disabled
                                            defaultValue={this.props.brand_id}
                                            placeholder="Brand ID" />
                                    </Form.Group>

                                    <Form.Group controlId="brand_name">
                                        <Form.Label>Brand Name</Form.Label>
                                        <Form.Control type="text" name="brand_name" required
                                            defaultValue={this.props.brand_name}
                                            placeholder="Brand Name" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Modal.Body>

                        <Modal.Footer>
                            <Form.Group>
                                <Button variant="primary" type="submit">
                                    Update Brand
                                </Button>
                            </Form.Group>
                            <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }
}