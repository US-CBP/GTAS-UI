import React, { Suspense } from "react";
import { Router, Redirect, navigate } from "@reach/router";
import IdleTimer from "react-idle-timer";
import loadable from "@loadable/component";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";

// import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";
// import Loading from "./components/loading/Loading";

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
const ChangePassword = loadable(() =>
  import(
    /* webpackChunkName: "admin" */ "./pages/admin/manageUsers/changePassword/ChangePassword"
  )
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
                        alt={UNAUTHED}
                        roles={[
                          ROLE.ADMIN,
                          ROLE.PAXVWR,
                          ROLE.RULEMGR,
                          ROLE.CASEMGR,
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
                          <Flights path="flights"></Flights>
                          <FlightPax path="flightpax/:id"></FlightPax>
                          <PriorityVetting path="vetting"></PriorityVetting>
                          <Tools path="tools">
                            <Rules
                              name={<Xl8 xid="app001">Rules</Xl8>}
                              desc={
                                <Xl8 xid="app002">
                                  View or edit rules for generating hits
                                </Xl8>
                              }
                              path="rules"
                              icon="fa-address-book-o"
                            ></Rules>
                            <Rules name="Rules" path="rules/:mode" hideTile></Rules>
                            <Queries
                              name={<Xl8 xid="app003">Queries</Xl8>}
                              desc={
                                <Xl8 xid="app004">
                                  View or edit queries of system data
                                </Xl8>
                              }
                              path="queries"
                              icon="fa-search"
                            ></Queries>
                            <QRDetails path="qrdetails" hideTile></QRDetails>
                            <Watchlist
                              name={<Xl8 xid="app005">Watchlist</Xl8>}
                              desc={
                                <Xl8 xid="app006">
                                  View or add passenger and document watchlists
                                </Xl8>
                              }
                              path="watchlist"
                              icon="fa-user-secret"
                            ></Watchlist>
                            <Watchlist
                              path="watchlist/:mode"
                              name="Watchlist"
                              hideTile
                            ></Watchlist>
                            <About
                              name={<Xl8 xid="app007">About</Xl8>}
                              desc={
                                <Xl8 xid="app008">View system information details</Xl8>
                              }
                              path="about"
                              icon="fa-info-circle"
                            ></About>
                          </Tools>
                          <ChangePassword path="user/change-password"></ChangePassword>
                          <Search path="search/:searchParam"></Search>
                          <ChangePassword path="user/change-password/:userId"></ChangePassword>
                          <SeatChart path="seat-chart/:flightId/:paxId/:currentPaxSeat"></SeatChart>
                          <RoleAuthenticator
                            path="langEditor"
                            alt={UNAUTHED}
                            roles={[ROLE.ADMIN]}
                          >
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
                                name={<Xl8 xid="app018">File Download</Xl8>}
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
                                icon="fa-line-chart"
                                path="https://localhost:5601/login?next=%2F"
                                hasExternalLink={true}
                              ></Auxiliary>
                              <Auxiliary
                                name={<Xl8 xid="app033">Neo4j</Xl8>}
                                desc={<Xl8 xid="app034">Browse the Neo4j database</Xl8>}
                                path="http://localhost:7474/browser/"
                                icon="fa-database"
                                hasExternalLink={true}
                              ></Auxiliary>
                            </Admin>
                          </RoleAuthenticator>
                          <PaxDetail path="paxDetail/:flightId/:paxId">
                            <Summary path="summary" default></Summary>
                            <APIS path="apis"></APIS>
                            <PNR path="pnr"></PNR>
                            <FlightHistory path="flighthistory"></FlightHistory>
                            <LinkAnalysis path="linkanalysis"></LinkAnalysis>
                            <UploadAttachment path="uploadattachment"></UploadAttachment>
                          </PaxDetail>
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
