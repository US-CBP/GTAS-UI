// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useContext, useRef, useState } from "react";
import { Link } from "@reach/router";
import { navigate, useLocation } from "@reach/router";
import RoleAuthenticator from "../../context/roleAuthenticator/RoleAuthenticator";
import Toast from "../toast/Toast";
import ChangePasswordModal from "../../pages/admin/manageUsers/changePasswordModal/ChangePasswordModal";
import { UserContext } from "../../context/user/UserContext";
import { LiveEditContext } from "../../context/translation/LiveEditContext";
import { ACTION, FULLPATH_TO, ROLE } from "../../utils/constants";
import { hasData } from "../../utils/utils";
import Xl8 from "../../components/xl8/Xl8";

import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  InputGroup
} from "react-bootstrap";
import wcoLogo from "../../images/WCO_GTAS_header_brand_sm.png";
import "./Header.scss";

const Header = () => {
  const { getUserState, userAction } = useContext(UserContext);
  const { action } = useContext(LiveEditContext);
  const user = getUserState();

  const logout = () => {
    action({ type: "read" });
    userAction({ type: "logoff" });

    navigate(FULLPATH_TO.LOGIN);
  };

  if (user === undefined) logout();

  const [currentLang] = useState(window.navigator.language.split("-")[0]);

  const [showChangePasswordModal, setShowChangePasswordModal] = useState();
  const [showTost, setShowToast] = useState(false);

  const PASSWORD_CHANGE_CONFIRMATION = (
    <Xl8 xid="head007">Your password has been changed!</Xl8>
  );
  const PASSWORD_CHANGE_CONFIRMATION_HEADER = <Xl8 xid="head008">Change Password</Xl8>;

  const searchInputRef = useRef();

  const currentPath = useLocation();

  // allow a 'false' logout for admins translating pages outside the authed/loggedin bundle
  // const pseudoLogout = () => {
  //   navigate(FULLPATH_TO.LOGIN);
  // };

  const userFullName = user?.fullName || "";

  const htab = {
    DASH: "/gtas/dashboard",
    POE: "/gtas/poe",
    FLIGHT: "/gtas/flights",
    VETTING: "/gtas/vetting",
    TOOLS: "/gtas/tools",
    LANG: "/gtas/langEditor",
    ADMIN: "/gtas/admin"
  };

  const toggleRef = useRef();

  const clickTab = tabName => {
    if (toggleRef.current.clientHeight > 0) {
      toggleRef.current.click();
    }
  };

  const getActiveClass = tabName => {
    return currentPath.pathname.startsWith(tabName) ? "active-tab" : "";
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    const searchParam = searchInputRef.current.value;
    if (hasData(searchParam)) {
      navigate(`/gtas/search/${searchParam}`);
    }
  };

  const changePasswordCallback = status => {
    setShowChangePasswordModal(false);

    if (status !== ACTION.CANCEL) {
      setShowToast(true);
    }
  };

  return (
    <>
      <Navbar sticky="top" expand="md" className="header-navbar" variant="dark">
        <Navbar.Brand className="header-navbar-brand margin-top-0">
          <RoleAuthenticator roles={[ROLE.ADMIN, ROLE.FLIGHTVWR]} alt={<></>}>
            <Link to="flights" onClick={() => clickTab(htab.FLIGHT)}>
              <img src={wcoLogo} alt="WCO logo" />
            </Link>
          </RoleAuthenticator>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" ref={toggleRef} />
        <Navbar.Collapse className="header-height">
          <Nav variant="tabs" className="left-nav">
            <Nav.Link
              as={Link}
              to="flights"
              className={`${getActiveClass(htab.FLIGHT)} nav-tab`}
              onClick={() => clickTab(htab.FLIGHT)}
            >
              <Xl8 xid="head001">Flights</Xl8>
            </Nav.Link>
            <RoleAuthenticator roles={[ROLE.ADMIN, ROLE.PAXVWR]} alt={<></>}>
              <Nav.Link
                as={Link}
                to="vetting"
                className={`${getActiveClass(htab.VETTING)} nav-tab`}
                onClick={() => clickTab(htab.VETTING)}
              >
                <Xl8 xid="head002">Vetting</Xl8>
              </Nav.Link>
            </RoleAuthenticator>
            <Nav.Link
              as={Link}
              to="poe"
              className={`${getActiveClass(htab.POE)} nav-tab`}
              onClick={() => clickTab(htab.POE)}
            >
              <Xl8 xid="head007">POE</Xl8>
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="tools"
              className={`${getActiveClass(htab.TOOLS)} nav-tab`}
              onClick={() => clickTab(htab.TOOLS)}
            >
              <Xl8 xid="head004">Tools</Xl8>
            </Nav.Link>
            <RoleAuthenticator roles={[ROLE.ADMIN]} alt={<></>}>
              <Nav.Link
                as={Link}
                to="admin"
                className={`${getActiveClass(htab.ADMIN)} nav-tab`}
                onClick={() => clickTab(htab.ADMIN)}
              >
                <Xl8 xid="head003">Admin</Xl8>
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="langEditor"
                className={`${getActiveClass(htab.LANG)} optional nav-tab`}
                onClick={() => clickTab(htab.LANG)}
              >
                <i className="fa fa-language language-icon"></i>
                {currentLang}
              </Nav.Link>
            </RoleAuthenticator>
          </Nav>
          <Nav className="ml-auto">
            <Form inline className="header-search" onSubmit={handleSearchSubmit}>
              <InputGroup>
                <FormControl type="text" ref={searchInputRef} className="search-150" />
                <InputGroup.Append>
                  <Button variant="light" type="submit">
                    <i className="fa fa-search"></i>
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
            <NavDropdown title={userFullName} id="basic-nav-dropdown" className="right">
              <NavDropdown.Item onClick={() => setShowChangePasswordModal(true)}>
                {<Xl8 xid="head005">Change password</Xl8>}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>
                {<Xl8 xid="head006">Logout</Xl8>}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <ChangePasswordModal
        show={showChangePasswordModal}
        onHide={() => setShowChangePasswordModal(false)}
        callback={changePasswordCallback}
      />
      <Toast
        onClose={() => setShowToast(false)}
        show={showTost}
        header={PASSWORD_CHANGE_CONFIRMATION_HEADER}
        body={PASSWORD_CHANGE_CONFIRMATION}
        variant={"success"}
      />
    </>
  );
};

export default Header;
