// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useEffect, useState } from "react";
import { settingsinfo } from "../../../services/serviceWrapper";
import Form from "../../../components/form/Form";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { Container, Col, Button } from "react-bootstrap";
import Title from "../../../components/title/Title";
import Main from "../../../components/main/Main";
import Xl8 from "../../../components/xl8/Xl8";
import SettingModal from "./settingModal";

const Settings = () => {
  const [data, setData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState();
  const [formKey, setFormKey] = useState();

  const cb = function() {};
  const onChange = () => {
    setRefreshKey(new Date());
    setShowModal(false);
  };

  const editButton = (
    <Button onClick={() => setShowModal(true)}>
      <Xl8 xid="set007">Edit Settings</Xl8>
    </Button>
  );
  useEffect(() => {
    settingsinfo.get().then(res => {
      setData(res);
      setFormKey(new Date());
    });
  }, [refreshKey]);

  return (
    <Main className="full">
      <Title title={<Xl8 xid="set001">Settings</Xl8>}></Title>
      <br></br>
      <Container>
        <Col lg={{ span: 4, offset: 4 }}>
          <Form
            callback={cb}
            title=""
            action="readonly"
            data={data}
            key={formKey}
            customButtons={editButton}
          >
            <LabelledInput
              datafield
              labelText={<Xl8 xid="set002">Matching Threshold</Xl8>}
              inputtype="number"
              name="matchingThreshold"
              callback={cb}
              alt={<Xl8 xid="7">Matching Threshold</Xl8>}
              readOnly
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="set003">Maximum Passenger Query Results: </Xl8>}
              inputtype="number"
              name="maxPassengerQueryResult"
              callback={cb}
              alt="nothing"
              readOnly
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="set004">Maximum Flight Query Results: </Xl8>}
              inputtype="number"
              name="maxFlightQueryResult"
              callback={cb}
              alt="nothing"
              readOnly
            />
            <LabelledInput
              datafield
              labelText={
                <Xl8 xid="set005">Maximum Rule Hits Allowed Per Run on Rule: </Xl8>
              }
              inputtype="number"
              name="maxRuleHit"
              callback={cb}
              alt="nothing"
              readOnly
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="set006">APIS Only Flag:</Xl8>}
              inputtype="text"
              name="apisOnlyFlag"
              callback={cb}
              alt="nothing"
              readOnly
            />
          </Form>
        </Col>
      </Container>
      <SettingModal
        show={showModal}
        onHide={() => setShowModal(false)}
        data={data}
        callback={onChange}
      />
    </Main>
  );
};

export default Settings;
