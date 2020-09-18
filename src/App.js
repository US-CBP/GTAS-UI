import React, { Suspense } from "react";
import { Router, Redirect, navigate } from "@reach/router";
import IdleTimer from "react-idle-timer";
import loadable from "@loadable/component";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";

// import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";
// import Loading from "./components/loading/Loading";

import Xid from "./components/xid/Xid";

import Authenticator from "./context/authenticator/Authenticator";
import RoleAuthenticator from "./context/roleAuthenticator/RoleAuthenticator";
import UserProvider from "./context/user/UserContext";
import LookupProvider from "./context/data/LookupContext";

import { ROLE, TIME } from "./utils/constants";

//login bundle
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import ResetPassword from "./pages/login/ResetPassword";
import ForgotPassword from "./pages/login/ForgotPassword";

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
const Page404 = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/page404/Page404")
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
const Airports = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/codeEditor/airport/Airports")
);
const Carriers = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/codeEditor/carrier/Carriers")
);
const Countries = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/codeEditor/country/Countries")
);
const LoaderStats = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/loaderStats/LoaderStats")
);
const Settings = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/settings/Settings")
);
const WatchlistCats = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/watchlistCats/WatchlistCats")
);
const NoteTypeCats = loadable(() =>
  import(/* webpackChunkName: "admin" */ "./pages/admin/noteTypeCats/NoteTypeCats")
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
            <Router>
              <Redirect from="/" to="/login" noThrow />
              <Login path="/login"></Login>
              <SignUp path="/signup"></SignUp>
              <ResetPassword path="/reset-password/:username/:resetToken"></ResetPassword>
              <ForgotPassword path="/forgot-password"></ForgotPassword>
            </Router>
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
                    <PageUnauthorized path="pageUnauthorized"></PageUnauthorized>
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
                        ROLE.QRYMGR
                      ]}
                    >
                      <Redirect from="/" to="/gtas" noThrow />
                      <Home path="/gtas">
                        <Page404 default></Page404>
                        <Redirect from="/gtas" to="/gtas/flights" noThrow />
                        <Dashboard path="dashboard"></Dashboard>
                        <Flights path="flights"></Flights>
                        <FlightPax path="flightpax/:id"></FlightPax>
                        <PriorityVetting path="vetting"></PriorityVetting>
                        <Tools path="tools">
                          <Rules
                            name={<Xid xid="7">Rules</Xid>}
                            desc={
                              <Xid xid="7">View or edit rules for generating hits</Xid>
                            }
                            path="rules"
                            icon="fa-address-book-o"
                          ></Rules>
                          <Rules name="Rules" path="rules/:mode" hideTile></Rules>
                          <Queries
                            name={<Xid xid="7">Queries</Xid>}
                            desc={<Xid xid="7">View or edit queries of system data</Xid>}
                            path="queries"
                            icon="fa-search"
                          ></Queries>
                          <QRDetails path="qrdetails" hideTile></QRDetails>
                          <Watchlist
                            name={<Xid xid="7">Watchlist</Xid>}
                            desc={
                              <Xid xid="7">
                                View or add passenger and document watchlists
                              </Xid>
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
                            name={<Xid xid="7">About</Xid>}
                            desc={<Xid xid="7">View system information details</Xid>}
                            path="about"
                            icon="fa-info-circle"
                          ></About>
                        </Tools>
                        <ChangePassword path="user/change-password"></ChangePassword>
                        <Search path="search/:searchParam"></Search>
                        <ChangePassword path="user/change-password/:userId"></ChangePassword>
                        <SeatChart path="seat-chart/:flightId/:paxId/:currentPaxSeat"></SeatChart>
                        <RoleAuthenticator
                          path="admin"
                          alt={UNAUTHED}
                          roles={[ROLE.ADMIN]}
                        >
                          <Admin path="/">
                            <ManageUser
                              name={<Xid xid="7">Manage Users</Xid>}
                              path="manageusers"
                              desc={
                                <Xid xid="7">Manage user profiles and privileges</Xid>
                              }
                              icon="fa-users"
                            ></ManageUser>
                            <SignUpRequests
                              name={<Xid xid="7">Sign Up Requests</Xid>}
                              desc={<Xid xid="7">Manage system access requests</Xid>}
                              icon="fa-user-plus"
                              path="signuprequests"
                            ></SignUpRequests>
                            <AuditLog
                              name={<Xid xid="7">Audit Log</Xid>}
                              desc={<Xid xid="7">View the system audit log</Xid>}
                              path="auditlog"
                              icon="fa-question-circle"
                            ></AuditLog>
                            <ErrorLog
                              name={<Xid xid="7">Error Log</Xid>}
                              desc={<Xid xid="7">View the system error log</Xid>}
                              path="errorlog"
                              icon="fa-exclamation-triangle"
                            ></ErrorLog>
                            <Settings
                              name={<Xid xid="7">Settings</Xid>}
                              desc={<Xid xid="7">View or edit system settings</Xid>}
                              path="settings"
                              icon="fa-toggle-on"
                            ></Settings>
                            <FileDownload
                              name={<Xid xid="7">File Download</Xid>}
                              desc={<Xid xid="7">Download system log files</Xid>}
                              icon="fa-download"
                              path="filedownload"
                            ></FileDownload>
                            <CodeEditor
                              name={<Xid xid="7">Code Editor</Xid>}
                              desc={
                                <Xid xid="7">
                                  View or edit Airport, Carrier, and Country codes
                                </Xid>
                              }
                              icon="fa-list-ul"
                              path="codeeditor"
                              startTab="countries"
                            >
                              <Countries
                                name={<Xid xid="7">Countries</Xid>}
                                path="countries"
                              ></Countries>
                              <Airports
                                name={<Xid xid="7">Airports</Xid>}
                                path="airports"
                              ></Airports>
                              <Carriers
                                name={<Xid xid="7">Carriers</Xid>}
                                path="carriers"
                              ></Carriers>
                            </CodeEditor>
                            <LoaderStats
                              name={<Xid xid="7">Loader Statistics</Xid>}
                              desc={
                                <Xid xid="7">View current message loading statistics</Xid>
                              }
                              icon="fa-bar-chart"
                              path="loaderstats"
                            ></LoaderStats>
                            <WatchlistCats
                              name={<Xid xid="7">Watchlist Categories</Xid>}
                              desc={<Xid xid="7">View or edit Watchlist categories</Xid>}
                              icon="fa-user-secret"
                              path="watchlistcats"
                            ></WatchlistCats>
                            <NoteTypeCats
                              name={<Xid xid="7">Note Type Categories</Xid>}
                              desc={<Xid xid="7">View or edit Note Type categories</Xid>}
                              icon="fa-comment"
                              path="notetypecats"
                            ></NoteTypeCats>
                            <Auxiliary
                              name={<Xid xid="7">Kibana Dashboard</Xid>}
                              desc={<Xid xid="7">Go to the Kibana Dashboard</Xid>}
                              icon="fa-line-chart"
                              path="https://localhost:5601/login?next=%2F"
                              hasExternalLink={true}
                            ></Auxiliary>
                            <Auxiliary
                              name={<Xid xid="7">Neo4j</Xid>}
                              desc={<Xid xid="7">Browse the Neo4j database</Xid>}
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
                        <PageUnauthorized path="pageUnauthorized"></PageUnauthorized>
                      </Home>
                    </RoleAuthenticator>
                  </Router>
                </Authenticator>
              </Suspense>
            </div>
          </LookupProvider>
        </UserProvider>
      </React.StrictMode>
    );
  }
}
