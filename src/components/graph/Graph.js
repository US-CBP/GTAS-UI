import React from "react";
import "../../services/configService";
import Xl8 from "../../components/xl8/Xl8";
import { cypher, cypherAuth } from "../../services/serviceWrapper";
import { provider, paxRelations, saves, palette } from "./structure";
import "./Graph.css";
import "../../../node_modules/vaquita/css/vaquita-svg.css";
import * as d3 from "d3";

const vaquita = require("vaquita");

class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.onClickSavedGraph = this.onClickSavedGraph.bind(this);
    this.activateGraph = this.activateGraph.bind(this);

    this.pax1 = {
      dob: this.props.paxData?.dob,
      updatedAt: this.props.paxData?.updatedAt,
      paxId: this.props.paxData?.paxId,
      idTag: this.props.paxData?.paxIdTag,
      firstName: this.props.paxData?.firstName,
      middleName: this.props.paxData?.middleName,
      lastName: this.props.paxData?.lastName,
      id: this.props.paxData?.id,
      createdAt: this.props.paxData?.createdAt,
      createdBy: this.props.paxData?.createdBy,
      updatedBy: this.props.paxData?.updatedBy,
      suffix: this.props.paxData?.suffix,
      gender: this.props.paxData?.gender,
      nationality: this.props.paxData?.nationality,
      passengerType: this.props.paxData?.passengerType,
      seat: this.props.paxData?.seat,
      flightId: this.props.paxData?.flightId,
      flightNumber: this.props.paxData?.flightNumber,
      paxFullFlightNumber: `${this.props.paxData?.carrier}${this.props.paxData?.flightNumber}`.toUpperCase(),
      carrier: this.props.paxData?.carrier,
      etd: this.props.paxData?.etd,
      eta: this.props.paxData?.eta,
      flightOrigin: this.props.paxData?.flightOrigin,
      flightDestination: this.props.paxData?.flightDestination,
      onRuleHitList: this.props.paxData?.onRuleHitList,
      onGraphHitList: this.props.paxData?.onGraphHitList,
      onWatchList: this.props.paxData?.onWatchList,
      onWatchListDoc: this.props.paxData?.onWatchListDoc,
      onWatchListLink: this.props.paxData?.onWatchListLink,
      documents: this.props.paxData?.documents,
      origin: this.props.paxData.embarkation,
      destination: this.props.paxData.debarkation,
      paxFlightIdTag: this.props.paxData.flightIdTag
    };

    this.setRef = componentNode => {
      Node.getRootNode = componentNode;
    };

    const SvgType = 2;

    vaquita.tools.TOGGLE_TAXONOMY = false;
    vaquita.query.USE_RELATION_DIRECTION = false;
    vaquita.tools.SAVE_GRAPH = false;
    vaquita.query.RESULTS_PAGE_SIZE = 100;
    vaquita.query.MAX_RESULTS_COUNT = 30;
    // vaquita.logger.LEVEL = vaquita.logger.LogLevels.INFO;
    vaquita.graph.link.SHOW_MARKER = false;
    vaquita.graph.node.DONUT_WIDTH = 15;
    vaquita.graph.HORIZONTAL_NODES = 1;

    vaquita.graph.setZoom(0.5, 2);

    vaquita.provider.node.Provider = provider(vaquita, SvgType);

    vaquita.provider.link.Provider = {
      getColor: function(link) {
        return palette[link.source.label.toLowerCase()];
      }
    };

    vaquita.result.onTotalResultCount(function(count) {
      document.getElementById("result-total-count").innerHTML = "(" + count + ")";
    });

    this.state = {
      pax1: this.pax1,
      svgType: 2,
      isReloaded: true,
      palette: palette,
      paxIdTag: this.pax1.paxIdTag,
      paxLastName: this.pax1.lastName,
      paxFlightIdTag: this.pax1.flightIdTag,
      paxFullFlightNumber: this.pax1.paxFullFlightNumber,
      origin: this.pax1.origin,
      destination: this.pax1.destination,
      vaquita: vaquita,
      paxRelations: paxRelations(this.pax1.paxFlightIdTag, this.pax1.paxFullFlightNumber),
      saves: saves(this.pax1),
      auth: ""
    };
  }

  componentDidMount() {
    this.setCypherUrl();
    this.setAuthorization();
    this.activateGraph();
  }
  setCypherUrl() {
    cypher.get().then(function(res) {
      vaquita.rest.CYPHER_URL = res.result; //result;
    });
  }
  setAuthorization() {
    cypherAuth.get().then(function(res) {
      // this.setState({ auth: res.result });
      vaquita.rest.AUTHORIZATION = res.result; //result;
    });
  }
  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    // prevent jquery from attempting updates on the resize event after the component is unmounted
    // this deregisters the vaquita listener on the window on unmount
    window.removeEventListener("resize", vaquita.graph.centerRootNode, false);
  }

  // documentPath = function() {
  //   return svgs.getDocumentPath();
  // };

  // airportPath = function() {
  //   return svgs.getAirportPath();
  // };

  activateGraph = function() {
    const template = this.state.saves.pax;

    let vaq = this.state.vaquita;
    vaq.graph.HORIZONTAL_NODES = template.horiz || 1;

    // call start only when there's no rootnode
    //TODO vaquita - expose a status field on graph?
    if (vaquita.dataModel.getRootNode() === undefined) {
      vaq.start(template);
      this.setState({ isReloaded: false });
    }
    // refresh graph arena if the page reloads with new pax data
    else if (this.state.isReloaded) {
      vaq.refresh(template);
      this.setState({ isReloaded: false });
    }
  };

  onClickSavedGraph = function(id) {
    // Update Graph title:
    if (!id) {
      d3.select("#save-header").text(
        d3
          .select(this)
          .select(".ppt-label")
          .text()
      );
      id = this.id;
    }

    let vaq = this.state.vaquita;

    vaq.graph.mainLabel = this.state.saves[id];
    vaq.graph.HORIZONTAL_NODES = this.state.saves[id].horiz || 1;
    vaq.tools.reset();
  };

  render() {
    return (
      <div className="line-container" ref={this.setRef.bind(this)}>
        <div className="flex flex-vert ie-fix-md full-width align-items-center scroll-container-outer">
          <div className="cbp-card-container full-width">
            <div className="cbp-card cbp-card-shadow">
              <h4 className="h-label no-margin-top">
                <Xl8 xid="link001">Search</Xl8>
              </h4>
              <div className="ppt-body">
                <section className="ppt-section-main">
                  <div className="ppt-container-graph row">
                    <nav id="popoto-saves" className="col-lg-2 ppt-taxo-nav">
                      <div id="saves">
                        <span className="ppt-header-span">
                          <Xl8 xid="link002">This Passenger:</Xl8>
                        </span>
                        <table className="ppt-saved-ul">
                          <tbody>
                            <tr id="Pax" onClick={() => this.onClickSavedGraph("pax")}>
                              <td>
                                <i className="fa fa-user-circle-o pptpassenger"></i>
                              </td>
                              <td>
                                <span className="ppt-label" title="Passenger links">
                                  <Xl8 xid="link003">Passenger</Xl8>
                                </span>
                              </td>
                            </tr>
                            <tr
                              id="Address"
                              onClick={() => this.onClickSavedGraph("address")}
                            >
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
                            <tr
                              id="CreditCard"
                              onClick={() => this.onClickSavedGraph("creditcard")}
                            >
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
                            <tr
                              id="Phone"
                              onClick={() => this.onClickSavedGraph("phone")}
                            >
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
                            <tr
                              id="Email"
                              onClick={() => this.onClickSavedGraph("email")}
                            >
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
                            <tr id="Hit" onClick={() => this.onClickSavedGraph("hit")}>
                              <td>
                                <i className="fa fa-exclamation-circle ppthit"></i>
                              </td>
                              <td>
                                <span
                                  className="ppt-label"
                                  title="Hits for this passenger"
                                >
                                  <Xl8 xid="link008">Hits</Xl8>
                                </span>
                              </td>
                            </tr>
                            <tr
                              id="Document"
                              onClick={() => this.onClickSavedGraph("document")}
                            >
                              <td>
                                <img
                                  alt=""
                                  src="resources/img/document.svg"
                                  className="pptdocument"
                                ></img>
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
                            <tr
                              id="Flight"
                              onClick={() => this.onClickSavedGraph("flight")}
                            >
                              <td>
                                <i className="fa fa-plane pptflight"></i>
                              </td>
                              <td>
                                <span className="ppt-label" title="Flight links">
                                  <Xl8 xid="link011">Flight</Xl8>
                                </span>
                              </td>
                            </tr>
                            <tr
                              id="Address"
                              onClick={() => this.onClickSavedGraph("addressall")}
                            >
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
                              onClick={() => this.onClickSavedGraph("creditcardall")}
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
                            <tr
                              id="Phone"
                              onClick={() => this.onClickSavedGraph("phoneall")}
                            >
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
                            <tr
                              id="Email"
                              onClick={() => this.onClickSavedGraph("emailall")}
                            >
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
                            <tr id="Hit" onClick={() => this.onClickSavedGraph("hitall")}>
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
                            <tr
                              id="Document"
                              onClick={() => this.onClickSavedGraph("documentall")}
                            >
                              <td>
                                <img
                                  alt=""
                                  src="resources/img/document.svg"
                                  className="pptdocument"
                                ></img>
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
                    <div id="popoto-graph" className="col-lg-10 ppt-div-graph"></div>
                  </div>

                  <div id="popoto-query" className="ppt-container-query"></div>

                  <div className="ppt-section-header">
                    RESULTS
                    <span id="result-total-count" className="ppt-count-results"></span>
                  </div>

                  <div id="popoto-results" className="ppt-container-results"></div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Graph;
