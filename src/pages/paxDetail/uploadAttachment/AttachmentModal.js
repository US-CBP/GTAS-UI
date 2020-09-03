import React, {useEffect, useState} from "react";
import {Button, Container, Modal} from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import {attachment} from "../../../services/serviceWrapper";
import {asArray} from "../../../utils/utils";

const AttachmentModal = props => {
    const cb = function(result) {};
    const [show, setShow] = useState(false);
    const [carouselItems, setCarouselItems] = useState([]);
    const handleShow = () => {
        getAttachments();
    }


    const handleClose = (status, res) => {
        setShow(false);
    };

    const getAttachments = () => {
        attachment.get(props.paxId).then(res => {
            const imageSource = `data:image/jpeg;base64,${res[0].content}`;
            const CarouselCollection = [];
            const CarouselItem =
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={imageSource}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>;
            CarouselCollection.push(CarouselItem);
            setCarouselItems(CarouselCollection)
            setShow(true);
            console.log(res[0]);
        });
    };

    return (
        <>
        <Button variant="outline-info" size="sm" onClick={handleShow}>
            <i className="fa fa-pencil"></i> Attachments
        </Button>

        <Modal
            show={show}
            onHide={handleClose}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Attachments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid>
                <Carousel
                interval={null}
                >
                    {carouselItems}
                </Carousel>
                </Container>
            </Modal.Body>
        </Modal>
        </>
    );
};

export default AttachmentModal;
