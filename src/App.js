import React, { Suspense } from "react";
import { Router, Redirect, navigate } from "@reach/router";
import IdleTimer from "react-idle-timer";
import loadable from "@loadable/component";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";

import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";
import Loading from "./components/loading/Loading";

import Authenticator from "./context/authenticator/Authenticator";
import RoleAuthenticator from "./context/roleAuthenticator/RoleAuthenticator";
import UserProvider from "./context/user/UserContext";

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
const Neo4J = loadable(() =>
  import(/* webpackChunkName: "authed" */ "./pages/tools/neo4J/Neo4J")
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
                      <Flights path="flights"></Flights>
                      <FlightPax path="flightpax/:id"></FlightPax>
                      <PriorityVetting path="vetting"></PriorityVetting>
                      <Dashboard path="dashboard"></Dashboard>
                      <Rules path="tools/rules"></Rules>
                      <Rules path="tools/rules/:mode"></Rules>
                      <Queries path="tools/queries"></Queries>
                      <QRDetails path="tools/qrdetails"></QRDetails>
                      <Neo4J path="tools/neo4j"></Neo4J>
                      <Redirect from="tools/watchlist" to="pax" noThrow />
                      <Watchlist path="tools/watchlist/:mode"></Watchlist>
                      <About path="tools/about"></About>
                      <ChangePassword path="user/change-password"></ChangePassword>
                      <ChangePassword path="user/change-password/:userId"></ChangePassword>
                      <SeatChart path="seat-chart/:flightId/:paxId/:currentPaxSeat"></SeatChart>
                      <RoleAuthenticator path="admin" alt={UNAUTHED} roles={[ROLE.ADMIN]}>
                        <Admin path="/">
                          <ManageUser name="Manage Users" path="manageusers"></ManageUser>
                          <AuditLog name="Audit Log" path="auditlog"></AuditLog>
                          <ErrorLog name="Error Log" path="errorlog"></ErrorLog>
                          <Settings name="Settings" path="settings"></Settings>
                          <FileDownload
                            name="File Download"
                            path="filedownload"
                          ></FileDownload>
                          <CodeEditor
                            name="Code Editor"
                            path="/codeeditor"
                            startTab="countries"
                          >
                            <Countries name="Countries" path="countries"></Countries>
                            <Airports name="Airports" path="airports"></Airports>
                            <Carriers name="Carriers" path="carriers"></Carriers>
                          </CodeEditor>
                          <LoaderStats
                            name="Loader Statistics"
                            path="loaderstats"
                          ></LoaderStats>
                          <WatchlistCats
                            name="Watchlist Categories"
                            path="watchlistcats"
                          ></WatchlistCats>
                          <NoteTypeCats
                            name="Note Type Categories"
                            path="notetypecats"
                          ></NoteTypeCats>
                          <SignUpRequests
                            name="Sign Up Request"
                            path="signuprequests"
                          ></SignUpRequests>
                        </Admin>
                      </RoleAuthenticator>
                      <PaxDetail path="paxDetail/:flightId/:paxId">
                        <Summary path="summary" default></Summary>
                        <APIS path="apis"></APIS>
                        <PNR path="pnr"></PNR>
                        <FlightHistory path="flighthistory"></FlightHistory>
                        <LinkAnalysis path="linkanalysis"></LinkAnalysis>
                      </PaxDetail>
                      <PageUnauthorized path="pageUnauthorized"></PageUnauthorized>
                    </Home>
                  </RoleAuthenticator>
                </Router>
              </Authenticator>
            </Suspense>
          </div>
        </UserProvider>
      </React.StrictMode>
    );
  }
}
