// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useEffect, useRef, useState } from "react";
// import "../../services/configService";
import Xl8 from "../xl8/Xl8";
import { cypher, cypherAuth } from "../../services/serviceWrapper";
import { provider, saves, palette } from "./structure";
import * as d3 from "d3";
import "./Graph.css";
import "../../../node_modules/vaquita/css/vaquita-svg.css";
import "vaquita/dist/vaquita.min.css";

const vaqu = require("vaquita");

const Graph = props => {
  const pax1 = {
    dob: props.paxData?.dob,
    updatedAt: props.paxData?.updatedAt,
    paxId: props.paxData?.paxId,
    // idTag: props.paxData?.paxIdTag,
    idTag: "8d5635b143ed8f1f53a1013b2c14843210a08b64",
    firstName: props.paxData?.firstName,
    middleName: props.paxData?.middleName,
    lastName: props.paxData?.lastName,
    id: props.paxData?.id,
    createdAt: props.paxData?.createdAt,
    createdBy: props.paxData?.createdBy,
    updatedBy: props.paxData?.updatedBy,
    suffix: props.paxData?.suffix,
    gender: props.paxData?.gender,
    nationality: props.paxData?.nationality,
    passengerType: props.paxData?.passengerType,
    seat: props.paxData?.seat,
    // flightIdTag: props.paxData.flightIdTag,
    flightIdTag: "07103978cbf7292d1ba23482875c32acdea3ca02",
    flightId: props.paxData?.flightId,
    flightNumber: props.paxData?.flightNumber,
    fullFlightNumber: `${props.paxData?.carrier}${props.paxData?.flightNumber}`.toUpperCase(),
    carrier: props.paxData?.carrier,
    etd: props.paxData?.etd,
    eta: props.paxData?.eta,
    flightOrigin: props.paxData?.flightOrigin,
    flightDestination: props.paxData?.flightDestination,
    onRuleHitList: props.paxData?.onRuleHitList,
    onGraphHitList: props.paxData?.onGraphHitList,
    onWatchList: props.paxData?.onWatchList,
    onWatchListDoc: props.paxData?.onWatchListDoc,
    onWatchListLink: props.paxData?.onWatchListLink,
    documents: props.paxData?.documents,
    origin: props.paxData.embarkation,
    destination: props.paxData.debarkation
  };
  const componentNodeRef = useRef(null);
  const [isReloaded, setIsReloaded] = useState(true);
  const [vaquita] = useState(vaqu);
  const [save] = useState(saves(pax1));

  const SvgType = 2;
  vaquita.tools.TOGGLE_TAXONOMY = false;
  vaquita.query.USE_RELATION_DIRECTION = false;
  vaquita.tools.SAVE_GRAPH = false;
  vaquita.query.RESULTS_PAGE_SIZE = 100;
  vaquita.query.MAX_RESULTS_COUNT = 30;
  vaquita.graph.link.SHOW_MARKER = false;
  vaquita.graph.node.DONUT_WIDTH = 15;
  vaquita.graph.HORIZONTAL_NODES = 1;

  vaquita.graph.setZoom(0.5, 2);

  /**  set the provider to filter on both pax idTag and flight idTag. This prevents vaquita from querying for counts of all entities
   */
  vaquita.provider.node.Provider = provider(vaquita, SvgType, {
    idTag: pax1.idTag,
    flightIdTag: pax1.flightIdTag
  });

  vaquita.provider.link.Provider = {
    getColor: function(link) {
      return palette[link.source.label.toLowerCase()];
    }
  };

  // vaquita.result.onTotalResultCount(function(count) {
  //   document.getElementById("result-total-count").innerHTML = "(" + count + ")";
  // });

  const setCypherUrl = () => {
    cypher.get().then(function(res) {
      vaquita.rest.CYPHER_URL = res.result;
    });
  };

  useEffect(() => {
    cypherAuth.get().then(function(res) {
      vaquita.rest.AUTHORIZATION = `${res.result}`;
      setCypherUrl();
      activateGraph();
    });

    return () => {
      // prevent jquery from attempting updates on the resize event after the component is unmounted
      // this deregisters the vaquita listener on the window on unmount
      window.removeEventListener("resize", vaquita.graph.centerRootNode, false);
    };
  }, []);

  const activateGraph = () => {
    const template = save.pax;

    vaquita.graph.HORIZONTAL_NODES = template.horiz || 1;

    // call start only when there's no rootnode
    //TODO vaquita - expose a status field on graph?
    if (vaquita.dataModel.getRootNode() === undefined) {
      vaquita.start(template);
      setIsReloaded(false);
    }
    // refresh graph arena if the page reloads with new pax data
    else if (isReloaded) {
      vaquita.refresh(template);
      setIsReloaded(false);
    }
  };

  const onClickSavedGraph = id => {
    if (id.endsWith("all"))
      vaquita.provider.node.Provider = provider(vaquita, SvgType, {
        flightIdTag: pax1.flightIdTag
      });
    else
      vaquita.provider.node.Provider = provider(vaquita, SvgType, {
        flightIdTag: pax1.flightIdTag,
        idTag: pax1.idTag
      });

    // Update Graph title:
    if (!id) {
      d3.select("#save-header").text(
        d3
          .select(this)
          .select(".ppt-label")
          .text()
      );
    }

    vaquita.graph.mainLabel = save[id];
    vaquita.graph.HORIZONTAL_NODES = save[id].horiz || 1;
    vaquita.tools.reset();
  };

  return (
    <div className="line-container" ref={componentNodeRef}>
      <div className="ppt-body">
        <section className="ppt-section-main">
          <div className="ppt-container-graph">
            <nav id="popoto-saves" className="ppt-taxo-nav">
              <div id="saves">
                <span className="ppt-header-span">
                  <Xl8 xid="link002">This Passenger:</Xl8>
                </span>
                <table className="ppt-saved-ul">
                  <tbody>
                    <tr id="Pax" onClick={() => onClickSavedGraph("pax")}>
                      <td>
                        <i className="fa fa-user-circle-o pptpassenger"></i>
                      </td>
                      <td>
                        <span className="ppt-label" title="Passenger links">
                          <Xl8 xid="link003">Passenger</Xl8>
                        </span>
                      </td>
                    </tr>
                    <tr id="Address" onClick={() => onClickSavedGraph("address")}>
                      <td>
                        <i className="fa fa-home pptaddress"></i>
                      </td>
                      <td>
                        <span
                          className="ppt-label"
                          title="Addresses used by this passenger"
                        >
                          <Xl8 xid="link004">Address</Xl8>
                        </span>
                      </td>
                    </tr>
                    <tr id="CreditCard" onClick={() => onClickSavedGraph("creditcard")}>
                      <td>
                        <i className="fa fa-credit-card-alt pptcreditcard"></i>
                      </td>
                      <td>
                        <span
                          className="ppt-label"
                          title="Credit cards used by this passenger"
                        >
                          <Xl8 xid="link005">Credit Card</Xl8>
                        </span>
                      </td>
                    </tr>
                    <tr id="Phone" onClick={() => onClickSavedGraph("phone")}>
                      <td>
                        <i className="fa fa-phone pptphone"></i>
                      </td>
                      <td>
                        <span
                          className="ppt-label"
                          title="Phone numbers used by this passenger"
                        >
                          <Xl8 xid="link006">Phone</Xl8>
                        </span>
                      </td>
                    </tr>
                    <tr id="Email" onClick={() => onClickSavedGraph("email")}>
                      <td>
                        <i className="fa fa-envelope pptemail"></i>
                      </td>
                      <td>
                        <span
                          className="ppt-label"
                          title="Email addresses used by this passenger"
                        >
                          <Xl8 xid="link007">Emails</Xl8>
                        </span>
                      </td>
                    </tr>
                    <tr id="Hit" onClick={() => onClickSavedGraph("hit")}>
                      <td>
                        <i className="fa fa-exclamation-circle ppthit"></i>
                      </td>
                      <td>
                        <span className="ppt-label" title="Hits for this passenger">
                          <Xl8 xid="link008">Hits</Xl8>
                        </span>
                      </td>
                    </tr>
                    <tr id="Document" onClick={() => onClickSavedGraph("document")}>
                      <td>
                        <div alt="" className="pptdocument"></div>
                      </td>
                      <td>
                        <span
                          className="ppt-label"
                          title="Documents used by this passenger"
                        >
                          <Xl8 xid="link009">Documents</Xl8>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <hr />
                <br />

                <span className="ppt-header-span">
                  <Xl8 xid="link010">This FLight:</Xl8>
                </span>
                <table className="ppt-saved-ul">
                  <tbody>
                    <tr id="Flight" onClick={() => onClickSavedGraph("flightall")}>
                      <td>
                        <i className="fa fa-plane pptflight"></i>
                      </td>
                      <td>
                        <span className="ppt-label" title="Flight links">
                          <Xl8 xid="link011">Flight</Xl8>
                        </span>
                      </td>
                    </tr>
                    <tr id="Address" onClick={() => onClickSavedGraph("addressall")}>
                      <td>
                        <i className="fa fa-home pptaddress"></i>
                      </td>
                      <td>
                        <span
                          className="ppt-label"
                          title="All passenger addresses for this flight"
                        >
                          <Xl8 xid="link012">All Addresses</Xl8>
                        </span>
                      </td>
                    </tr>
                    <tr
                      id="CreditCard"
                      onClick={() => onClickSavedGraph("creditcardall")}
                    >
                      <td>
                        <i className="fa fa-credit-card-alt pptcreditcard"></i>
                      </td>
                      <td>
                        <span
                          className="ppt-label"
                          title="All passenger credit cards for this flight"
                        >
                          <Xl8 xid="link013">All Credit Cards</Xl8>
                        </span>
                      </td>
                    </tr>
                    <tr id="Phone" onClick={() => onClickSavedGraph("phoneall")}>
                      <td>
                        <i className="fa fa-phone pptphone"></i>
                      </td>
                      <td>
                        <span
                          className="ppt-label"
                          title="All passenger phone numbers for this flight"
                        >
                          <Xl8 xid="link014">All Phones</Xl8>
                        </span>
                      </td>
                    </tr>
                    <tr id="Email" onClick={() => onClickSavedGraph("emailall")}>
                      <td>
                        <i className="fa fa-envelope pptemail"></i>
                      </td>
                      <td>
                        <span
                          className="ppt-label"
                          title="All passenger email addresses for this flight"
                        >
                          <Xl8 xid="link015">All Emails</Xl8>
                        </span>
                      </td>
                    </tr>
                    <tr id="Hit" onClick={() => onClickSavedGraph("hitall")}>
                      <td>
                        <i className="fa fa-exclamation-circle ppthit"></i>
                      </td>
                      <td>
                        <span
                          className="ppt-label"
                          title="All passenger hits for this flight"
                        >
                          <Xl8 xid="link016">All Hits</Xl8>
                        </span>
                      </td>
                    </tr>
                    <tr id="Document" onClick={() => onClickSavedGraph("documentall")}>
                      <td>
                        <div alt="" className="pptdocument"></div>
                      </td>
                      <td>
                        <span
                          className="ppt-label"
                          title="All passenger documents for this flight"
                        >
                          <Xl8 xid="link017">All Documents</Xl8>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </nav>
            <div id="popoto-graph" className="ppt-div-graph"></div>
            {/* <div id="popoto-results" class="ppt-container-results"></div> */}
          </div>

          {/* <div className="ppt-section-header">
            RESULTS
            <span id="result-total-count" className="ppt-count-results"></span>
          </div> */}
        </section>
      </div>
    </div>
  );
};

export default Graph;
