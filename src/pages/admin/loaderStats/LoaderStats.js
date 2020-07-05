import React, { useEffect, useState } from "react";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import Form from "../../../components/form/Form";
import { loaderStats } from "../../../services/serviceWrapper";
import { Container, Col } from "react-bootstrap";

const LoaderStats = ({ name }) => {
  const cb = function(result) {};
  const onChange = function(result) {};
  const [data, setData] = useState();
  const [key, setKey] = useState(0);

  useEffect(() => {
    loaderStats.get().then(res => {
      setData(res);
      setKey(key + 1);
    });
  }, []);

  return (
    <Container>
      <Col lg={{ span: 4, offset: 4 }}>
        <Form data={data} key={key} title="" callback={cb} submitText="Refresh">
          <LabelledInput
            datafield
            labelText="Last message received:"
            inputType="text"
            name="lastMessageInSystem"
            alt="Last message received"
            readOnly
            callback={onChange}
          />
          <LabelledInput
            datafield
            labelText="Last message analyzed:"
            inputType="text"
            name="lastMessageAnalyzedByDrools"
            callback={onChange}
            readOnly
            alt="Last message analyzed"
          />
          <LabelledInput
            datafield
            labelText="Most recent rule hIt (Partial excluded) timestamp:"
            inputType="text"
            name="mostRecentRuleHit"
            callback={onChange}
            readOnly
            alt="Most recent rule hit (Partial excluded) timestamp"
          />
          <LabelledInput
            datafield
            labelText="Passengers Count from past 500 messages:"
            inputType="text"
            name="passengerCount"
            callback={onChange}
            readOnly
            alt="Passengers Count from past 500 messages"
          />
          <LabelledInput
            datafield
            labelText="Loading/Parsing errors past 500 messages:"
            inputType="text"
            name="totalLoadingParsingErrors"
            callback={onChange}
            readOnly
            alt="Loading/Parsing errors past 500 messages"
          />

          <LabelledInput
            datafield
            labelText="Rule errors last 500 messages:"
            inputType="text"
            name="totalRuleErros"
            callback={onChange}
            readOnly
            alt="Rule errors last 500 messages"
          />
        </Form>
      </Col>
    </Container>
  );
};

export default LoaderStats;
