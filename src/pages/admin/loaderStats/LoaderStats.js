import React from "react";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import Form from "../../../components/form/Form";
import Xl8 from "../../../components/xl8/Xl8";
import Main from "../../../components/main/Main";
import { loaderStats } from "../../../services/serviceWrapper";
import { Container, Col } from "react-bootstrap";
import Title from "../../../components/title/Title";
import { localeDate } from "../../../utils/utils";

const LoaderStats = () => {
  const cb = () => {};

  const parseData = function(res) {
    const drools = res?.lastMessageAnalyzedByDrools;
    const msg = res?.lastMessageInSystem;
    const hit = res?.mostRecentRuleHit;

    const parsedData = {
      ...res,
      lastMessageInSystem: msg > 0 ? localeDate(msg) : " -- ",
      lastMessageAnalyzedByDrools: drools > 0 ? localeDate(drools) : " -- ",
      mostRecentRuleHit: hit > 0 ? localeDate(hit) : " -- "
    };

    return parsedData;
  };

  return (
    <Main className="full">
      <Title title={<Xl8 xid="ls001">Loader Statistics</Xl8>}></Title>
      <br></br>
      <Container>
        <Col lg={{ span: 4, offset: 4 }}>
          <Form
            getService={loaderStats.get}
            title=""
            callback={cb}
            action="refresh"
            submitText={<Xl8 xid="ls008">Refresh</Xl8>}
            parseData={parseData}
          >
            <LabelledInput
              datafield
              labelText={<Xl8 xid="ls004">Last message received:</Xl8>}
              inputtype="text"
              name="lastMessageInSystem"
              alt="Last message received"
              readOnly
              callback={cb}
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="ls002">Last message analyzed:</Xl8>}
              inputtype="text"
              name="lastMessageAnalyzedByDrools"
              callback={cb}
              readOnly
              alt="Last message analyzed"
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="ls003">Most recent rule hit (Partial excluded):</Xl8>}
              inputtype="text"
              name="mostRecentRuleHit"
              callback={cb}
              readOnly
              alt="Most recent rule hit (Partial excluded) timestamp"
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="ls005">Passengers last 500 messages:</Xl8>}
              inputtype="text"
              name="passengerCount"
              callback={cb}
              readOnly
              alt="Passengers Count from past 500 messages"
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="ls006">Loading/Parsing errors last 500 messages:</Xl8>}
              inputtype="text"
              name="totalLoadingParsingErrors"
              callback={cb}
              readOnly
              alt="Loading/Parsing errors past 500 messages"
            />

            <LabelledInput
              datafield
              labelText={<Xl8 xid="ls007">Rule errors last 500 messages:</Xl8>}
              inputtype="text"
              name="totalRuleErros"
              callback={cb}
              readOnly
              alt="Rule errors last 500 messages"
            />
          </Form>
        </Col>
      </Container>
    </Main>
  );
};

export default LoaderStats;
