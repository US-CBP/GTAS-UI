import React, { useEffect, useState } from "react";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import Form from "../../../components/form/Form";
import Xl8 from "../../../components/xl8/Xl8";
import Main from "../../../components/main/Main";
import { loaderStats } from "../../../services/serviceWrapper";
import { Container, Col } from "react-bootstrap";
import Title from "../../../components/title/Title";
import { localeDate } from "../../../utils/utils";

const LoaderStats = ({ name }) => {
  const onChange = function(result) {};
  const cb = () => {};
  const [key, setKey] = useState(0);

  const parseData = function(res) {
    const parsedData = {
      ...res,
      lastMessageAnalyzedByDrools: localeDate(res?.lastMessageAnalyzedByDrools),
      lastMessageInSystem: localeDate(res?.lastMessageInSystem),
      mostRecentRuleHit: localeDate(res?.mostRecentRuleHit)
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
            key={key}
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
              inputType="text"
              name="lastMessageInSystem"
              alt="Last message received"
              readOnly
              callback={onChange}
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="ls002">Last message analyzed:</Xl8>}
              inputType="text"
              name="lastMessageAnalyzedByDrools"
              callback={onChange}
              readOnly
              alt="Last message analyzed"
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="ls003">Most recent rule hit (Partial excluded):</Xl8>}
              inputType="text"
              name="mostRecentRuleHit"
              callback={onChange}
              readOnly
              alt="Most recent rule hit (Partial excluded) timestamp"
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="ls005">Passengers from past 500 messages:</Xl8>}
              inputType="text"
              name="passengerCount"
              callback={onChange}
              readOnly
              alt="Passengers Count from past 500 messages"
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="ls006">Loading/Parsing errors past 500 messages:</Xl8>}
              inputType="text"
              name="totalLoadingParsingErrors"
              callback={onChange}
              readOnly
              alt="Loading/Parsing errors past 500 messages"
            />

            <LabelledInput
              datafield
              labelText={<Xl8 xid="ls007">Rule errors last 500 messages:</Xl8>}
              inputType="text"
              name="totalRuleErros"
              callback={onChange}
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
