import React, {useState} from "react";
import Table from "../../../components/table/Table";
import {auditlog, errorlog} from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import {Col, Container} from "react-bootstrap";
import SideNav from "../../../components/sidenav/SideNav";
import FilterForm from "../../../components/filterForm2/FilterForm";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import LabelledDateTimePickerStartEnd
    from "../../../components/inputs/LabelledDateTimePickerStartEnd/LabelledDateTimePickerStartEnd";
import Main from "../../../components/main/Main";

const AuditLog = ({ name }) => {
  const cb = function(result) {};
  const [data,setData] = useState([]);
  const [refreshKey,setRefreshKey] = useState(1);
  let sDate = new Date();
  let eDate = new Date();
  eDate.setDate(eDate.getDate() + 1);
  sDate.setDate(sDate.getDate() - 1);
  const [startDate, setStartDate] = useState(sDate);
  const [endDate, setEndDate] = useState(eDate);
  const auditActions = [
        {value:'ALL_ACTIONS', label:'ALL_ACTIONS'},
        {value:'CREATE_UDR', label:'CREATE_UDR'},
        {value:'UPDATE_UDR', label:'UPDATE_UDR'},
        {value:'UPDATE_UDR_META', label:'UPDATE_UDR_META'},
        {value:'DELETE_UDR', label:'DELETE_UDR'},
        {value:'CREATE_WL', label:'CREATE_WL'},
        {value:'UPDATE_WL', label:'UPDATE_WL'},
        {value:'DELETE_WL', label:'DELETE_WL'},
        {value:'LOAD_APIS', label:'LOAD_APIS'},
        {value:'LOAD_PNR', label:'LOAD_PNR'},
        {value:'CREATE_USER', label:'CREATE_USER'},
        {value:'UPDATE_USER', label:'UPDATE_USER'},
        {value:'SUSPEND_USER', label:'SUSPEND_USER'},
        {value:'DELETE_USER', label:'DELETE_USER'},
        {value:'TARGETING_RUN', label:'TARGETING_RUN'},
        {value:'LOADER_RUN', label:'LOADER_RUN'},
        {value:'UPDATE_DASHBOARD_RUN', label:'UPDATE_DASHBOARD_RUN'},
        {value:'MESSAGE_INGEST_PARSING', label:'MESSAGE_INGEST_PARSING'},
        {value:'RULE_HIT_CASE_OPEN', label:'RULE_HIT_CASE_OPEN'},
        {value:'DISPOSITION_STATUS_CHANGE', label:'DISPOSITION_STATUS_CHANGE'}
    ];
  const visibleCols = ["actionType", "status", "message", "user", "timestamp"];
  const preFetchCallback = params => {
      let parsedParams = "";
      if(params) {
          if (params.dateRange) {
              parsedParams += "?startDate=" + params.dateRange.etaStart.toISOString() + "&endDate=" + params.dateRange.etaEnd.toISOString();
          };
          if (params.action) {
              parsedParams += "&action=" + params.action;
          };
          if (params.user) {
              parsedParams += "&user=" + params.user;
          };
      };
      return parsedParams;
  };

  const setDataWrapper = res => {
      setData(res);
      setRefreshKey(refreshKey+1);
  };


  return (
      <>
          <SideNav>
              <Col>
                  <FilterForm
                      service={auditlog.get}
                      paramCallback={preFetchCallback}
                      callback={setDataWrapper}
                  >
                      <br />
                      <LabelledInput
                          labelText="User"
                          datafield="user"
                          name="user"
                          inputType="text"
                          callback={cb}
                          alt="User"
                      />
                      <LabelledInput
                          labelText="Actions"
                          datafield="action"
                          inputType="select"
                          name="action"
                          placeholder="Choose Action..."
                          options={auditActions}
                          required={true}
                          alt="nothing"
                          callback={cb}
                      />
                      <LabelledDateTimePickerStartEnd
                          labelText="Date Range"
                          inputType="date"
                          name="datefield"
                          datafield={["dateRange"]}
                          inputVal={{etaStart:startDate, etaEnd:endDate}}
                          callback={cb}
                          startDate={startDate}
                          endDate={endDate}
                          endMut={cb}
                          startMut={cb}
                          alt="datefield"
                      />
                  </FilterForm>
              </Col>
          </SideNav>
          <Main>
      <Title title={name}></Title>
      <Table data={data}
             key={refreshKey}
             id="Audit Log"
             callback={cb}
             header={visibleCols}></Table>
          </Main>
    </>
  );
};

export default AuditLog;
