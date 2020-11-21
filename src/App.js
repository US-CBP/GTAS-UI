import React, { Suspense } from "react";
import { Router, Redirect, navigate } from "@reach/router";
import IdleTimer from "react-idle-timer";
import loadable from "@loadable/component";

import "./App.css";
import "font-awesome/css/font-awesome.min.css";
// import "@fortawesome/free-solid-svg-icons";

import Xl8 from "./components/xl8/Xl8";

import Authenticator from "./context/authenticator/Authenticator";
import RoleAuthenticator from "./context/roleAuthenticator/RoleAuthenticator";
import UserProvider from "./context/user/UserContext";
import LiveEditProvider from "./context/translation/LiveEditContext";
import LookupProvider from "./context/data/LookupContext";

import { ROLE, TIME } from "./utils/constants";

//login bundle
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import ResetPassword from "./pages/login/ResetPassword";
import ForgotPassword from "./pages/login/ForgotPassword";
import Page404 from "./pages/page404/Page404";

const kibanaUrl = process.env.REACT_APP_KIBANA_LOGIN;
const neo4jUrl = process.env.REACT_APP_NEO4J_BROWSER;

const Flights = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/flights/Flights")
);
const PriorityVetting = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/vetting/Vetting")
);
const Home = loadable(() => import(/* webpackChunkName: "authed" */ "./pages/home/Home"));
const Dashboard = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/dashboard/Dashboard")
);
const PaxDetail = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/paxDetail/PaxDetail")
);
const Summary = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/paxDetail/summary/Summary")
);
const APIS = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/paxDetail/apis/APIS")
);
const PNR = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/paxDetail/pnr/PNR")
);
const FlightHistory = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/paxDetail/flightHistory/FlightHistory")
);
const FlightPax = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/flightPax/FlightPax")
);
const LinkAnalysis = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/paxDetail/linkAnalysis/LinkAnalysis")
);
const Rules = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/tools/queryrules/Rules")
);
const Queries = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/tools/queryrules/Queries")
);
const QRDetails = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/tools/queryrules/QRDetails")
);
const POE = loadable(() => import(/* webpackChunkName: "authed" */ "./pages/poe/POE"));
const Tools = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/tools/Tools")
);
const Watchlist = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/tools/watchlist/Watchlist")
);
const About = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/tools/about/About")
);
const GModal = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./components/modal/GModal")
);
const PageUnauthorized = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/pageUnauthorized/PageUnauthorized")
);
const SeatChart = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./components/seatChart/SeatChart")
);
const UploadAttachment = loadable(() =>
  import(
    /* webpackChunkName: "authed" */ "./pages/paxDetail/uploadAttachment/UploadAttachment"
  )
);

const Search = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/search/Search")
);

//Admin bundle imports
const Admin = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/Admin")
);
const ManageUser = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/manageUsers/ManageUsers")
);
const FileDownload = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/fileDownload/FileDownload")
);
const AuditLog = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/auditLog/AuditLog")
);
const ErrorLog = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/errorLog/ErrorLog")
);
const CodeEditor = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/codeEditor/CodeEditor")
);
const Airport = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/codeEditor/airport/Airport")
);
const Carrier = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/codeEditor/carrier/Carrier")
);
const Country = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/codeEditor/country/Country")
);
const CreditCardType = loadable(() =>
  import(
    /* webpackChunkName: "admin" */ "./pages/admin/codeEditor/creditcardtype/CreditCardType"
  )
);
const LoaderStats = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/loaderStats/LoaderStats")
);
const Settings = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/settings/Settings")
);
const HitCats = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/hitCats/HitCats")
);
const NoteCats = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/noteCats/NoteCats")
);
const SignUpRequests = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/signUpRequests/SignUpRequests")
);
const Auxiliary = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./components/auxiliary/Auxiliary")
);
const LanguageEditor = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/lang/LanguageEditor")
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.idleTimer = null;
    this.onAction = this._onAction.bind(this);
    this.onActive = this._onActive.bind(this);
    this.onIdle = this._onIdle.bind(this);
    this.state = {
      showModal: false,
      redirect: false
    };
  }

  _onAction(e) {
    // console.log('user did something', e)
  }

  _onActive(e) {
    // console.log('user is active', e)
    // console.log('time remaining', this.idleTimer.getRemainingTime())
  }

  _onIdle(e) {
    console.log("user is idle", e);
    console.log("last active", this.idleTimer.getLastActiveTime());

    // Logout and redirect to login page
    // this.setState({ redirect: true });
    navigate("/login");
  }

  toggleModal() {
    // this.setState({ showModal: !this.state.showModal });
  }

  render() {
    const UNAUTHED = <PageUnauthorized path="pageUnauthorized"></PageUnauthorized>;

    return (
      <React.StrictMode>
        <UserProvider>
          <LookupProvider>
            <LiveEditProvider>
              <Suspense fallback="loading">
                <Router>
                  <Redirect from="/" to="/login" noThrow />
                  <Login path="/login"></Login>
                  <SignUp path="/signup"></SignUp>
                  <ResetPassword path="/reset-password/:username/:resetToken"></ResetPassword>
                  <ForgotPassword path="/forgot-password"></ForgotPassword>
                </Router>
              </Suspense>
                <div>
                  <h1>{process.env.REACT_APP_NEO4J_BROWSER}</h1>
                  <h1>{process.env.REACT_APP_KIBANA_LOGIN}</h1>
                </div>
              {this.state.showModal ? (
                <GModal>
                  <div>
                    <h1>You have been inactive for {this.idleTimer.getElapsedTime()}</h1>
                    <button onClick={this.toggleModal}>OK</button>
                  </div>
                </GModal>
              ) : null}
              <div className="App">
                <IdleTimer
                  ref={ref => {
                    this.idleTimer = ref;
                  }}
                  element={document}
                  onActive={this.onActive}
                  onIdle={this.onIdle}
                  onAction={this.onAction}
                  debounce={250}
                  timeout={TIME.MINUTES_25}
                />
                <Suspense fallback="loading">
                  <Authenticator>
                    <Router>
                      {UNAUTHED}
                      <RoleAuthenticator
                        path="/"
                        roles={[
                          ROLE.ADMIN,
                          ROLE.PAXVWR,
                          ROLE.RULEMGR,
                          ROLE.WLMGR,
                          ROLE.HITMGR,
                          ROLE.QRYMGR,
                          ROLE.FLIGHTVWR
                        ]}
                      >
                        <Redirect from="/" to="/gtas" noThrow />
                        <Home path="/gtas">
                          <Page404 default></Page404>
                          <Redirect from="/gtas" to="/gtas/flights" noThrow />
                          <RoleAuthenticator
                            path="flights"
                            roles={[ROLE.ADMIN, ROLE.FLIGHTVWR]}
                          >
                            <Flights path="/"></Flights>
                          </RoleAuthenticator>
                          <RoleAuthenticator
                            path="flightpax"
                            roles={[ROLE.ADMIN, ROLE.PAXVWR]}
                          >
                            <FlightPax path="/:id"></FlightPax>
                          </RoleAuthenticator>
                          <RoleAuthenticator
                            path="paxDetail/:flightId/:paxId"
                            roles={[ROLE.ADMIN, ROLE.PAXVWR]}
                          >
                            <PaxDetail path="/">
                              <Summary path="summary" default></Summary>
                              <APIS path="apis"></APIS>
                              <PNR path="pnr"></PNR>
                              <FlightHistory path="flighthistory"></FlightHistory>
                              <LinkAnalysis path="linkanalysis"></LinkAnalysis>
                              <UploadAttachment path="uploadattachment"></UploadAttachment>
                            </PaxDetail>
                          </RoleAuthenticator>
                          <POE path="poe"></POE>
                          <RoleAuthenticator
                            path="vetting"
                            roles={[ROLE.ADMIN, ROLE.PAXVWR]}
                          >
                            <PriorityVetting path="/"></PriorityVetting>
                          </RoleAuthenticator>
                          <Tools path="tools">
                            <Rules path="rules"></Rules>
                            <Rules path="rules/:mode"></Rules>
                            <Queries path="queries"></Queries>
                            <QRDetails path="qrdetails"></QRDetails>
                            <Watchlist path="watchlist"></Watchlist>
                            <Watchlist path="watchlist/:mode"></Watchlist>
                            <About path="about"></About>
                          </Tools>
                          <Search path="search/:searchParam"></Search>
                          <SeatChart path="seat-chart/:flightId/:paxId/:currentPaxSeat"></SeatChart>
                          <RoleAuthenticator
                            path="seat-chart/:flightId/:paxId/:currentPaxSeat"
                            roles={[ROLE.ADMIN, ROLE.PAXVWR]}
                          >
                            <SeatChart path="/"></SeatChart>
                          </RoleAuthenticator>
                          <RoleAuthenticator path="langEditor" roles={[ROLE.ADMIN]}>
                            <LanguageEditor path="/"></LanguageEditor>
                          </RoleAuthenticator>
                          <RoleAuthenticator
                            path="admin"
                            alt={UNAUTHED}
                            roles={[ROLE.ADMIN]}
                          >
                            <Admin path="/">
                              <ManageUser
                                name={<Xl8 xid="app009">Manage Users</Xl8>}
                                path="manageusers"
                                desc={
                                  <Xl8 xid="app010">
                                    Manage user profiles and privileges
                                  </Xl8>
                                }
                                icon="fa-users"
                              ></ManageUser>
                              <SignUpRequests
                                name={<Xl8 xid="app010">Sign Up Requests</Xl8>}
                                desc={
                                  <Xl8 xid="app011">Manage system access requests</Xl8>
                                }
                                icon="fa-user-plus"
                                path="signuprequests"
                              ></SignUpRequests>
                              <AuditLog
                                name={<Xl8 xid="app012">Audit Log</Xl8>}
                                desc={<Xl8 xid="app013">View the system audit log</Xl8>}
                                path="auditlog"
                                icon="fa-question-circle"
                              ></AuditLog>
                              <ErrorLog
                                name={<Xl8 xid="app014">Error Log</Xl8>}
                                desc={<Xl8 xid="app015">View the system error log</Xl8>}
                                path="errorlog"
                                icon="fa-exclamation-triangle"
                              ></ErrorLog>
                              <Settings
                                name={<Xl8 xid="app016">Settings</Xl8>}
                                desc={
                                  <Xl8 xid="app017">View or edit system settings</Xl8>
                                }
                                path="settings"
                                icon="fa-toggle-on"
                              ></Settings>
                              <FileDownload
                                name={<Xl8 xid="app018">Download Logs</Xl8>}
                                desc={<Xl8 xid="app019">Download system log files</Xl8>}
                                icon="fa-download"
                                path="filedownload"
                              ></FileDownload>
                              <CodeEditor
                                name={<Xl8 xid="app020">Code Editor</Xl8>}
                                desc={
                                  <Xl8 xid="app021">
                                    View or edit Airport, Carrier, and Country codes
                                  </Xl8>
                                }
                                icon="fa-list-ul"
                                path="codeeditor"
                                startTab="country"
                              >
                                <Country
                                  name={<Xl8 xid="app022">Country</Xl8>}
                                  path="country"
                                ></Country>
                                <Airport
                                  name={<Xl8 xid="app023">Airport</Xl8>}
                                  path="airport"
                                ></Airport>
                                <Carrier
                                  name={<Xl8 xid="app024">Carrier</Xl8>}
                                  path="carrier"
                                ></Carrier>
                                <CreditCardType
                                  name={<Xl8 xid="app035">Card Types</Xl8>}
                                  path="cctype"
                                ></CreditCardType>
                              </CodeEditor>
                              <LoaderStats
                                name={<Xl8 xid="app025">Loader Statistics</Xl8>}
                                desc={
                                  <Xl8 xid="app026">
                                    View current message loading statistics
                                  </Xl8>
                                }
                                icon="fa-bar-chart"
                                path="loaderstats"
                              ></LoaderStats>
                              <HitCats
                                name={<Xl8 xid="app027">Hit Categories</Xl8>}
                                desc={<Xl8 xid="app028">View or edit Hit categories</Xl8>}
                                icon="fa-user-secret"
                                path="hitcats"
                              ></HitCats>
                              <NoteCats
                                name={<Xl8 xid="app029">Note Categories</Xl8>}
                                desc={
                                  <Xl8 xid="app030">View or edit Note categories</Xl8>
                                }
                                icon="fa-comment"
                                path="notecats"
                              ></NoteCats>
                              <Auxiliary
                                name={<Xl8 xid="app031">Kibana Dashboard</Xl8>}
                                desc={<Xl8 xid="app032">Go to the Kibana Dashboard</Xl8>}
                                icon="kibana"
                                path={window.location.origin + "/kibana"}
                                hasExternalLink={true}
                              ></Auxiliary>
                              <Auxiliary
                                name={<Xl8 xid="app033">Neo4j</Xl8>}
                                desc={<Xl8 xid="app034">Browse the Neo4j database</Xl8>}
                                path={window.location.origin + "/neo4j"}
                                icon="neo4j"
                                hasExternalLink={true}
                              ></Auxiliary>
                            </Admin>
                          </RoleAuthenticator>
                          {UNAUTHED}
                        </Home>
                      </RoleAuthenticator>
                    </Router>
                  </Authenticator>
                </Suspense>
              </div>
            </LiveEditProvider>
          </LookupProvider>
        </UserProvider>
      </React.StrictMode>
    );
  }
}
