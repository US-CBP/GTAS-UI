import React, {useState} from "react";
import Table from "../../../../components/table/Table";
import Title from "../../../../components/title/Title";
import {Button, Col, Container, Row} from "react-bootstrap";
import {codeEditor} from "../../../../services/serviceWrapper";
import AddCarrierModal from "./AddCarrierModal";

const Carriers = ({ name }) => {
    const cb = function(result) {};
    const [showModal, setShowModal] = useState(false);
    const visibleCols = ["iata", "name"];

    return (
        <Container fluid>
            <Row>
                <Col sm={{ span: 3, offset: 1 }}>
                    <Button variant="outline-dark" onClick={() => setShowModal(true)}>
                        Add Carrier
                    </Button>
                    <AddCarrierModal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        callback={cb}
                    />
                </Col>
                <Col sm={3}>
                    <Title title={name}></Title>
                </Col>
                <Col sm={{span:3, offset: 1}}>
                    <Button variant="outline-dark" onClick={codeEditor.put.restoreCarriersAll}>
                        Restore All Carriers
                    </Button>
                </Col>
            </Row>

            <Table
                service={codeEditor.get.carrierCodes}
                id="carriers"
                callback={cb}
                header={visibleCols}
            ></Table>
        </Container>
    );
};

export default Carriers;
