import React, { useContext, useRef, useState, useEffect } from "react";
import { Link } from "@reach/router";
import { navigate, useLocation } from "@reach/router";
import { UserContext } from "../../context/user/UserContext";
import { LiveEditContext } from "../../context/translation/LiveEditContext";
import RoleAuthenticator from "../../context/roleAuthenticator/RoleAuthenticator";
import { ACTION, FULLPATH_TO, ROLE } from "../../utils/constants";
import { hasData } from "../../utils/utils";
import Xl8 from "../../components/xl8/Xl8";
import Toast from "../toast/Toast";
import ChangePasswordModal from "../../pages/admin/manageUsers/changePasswordModal/ChangePasswordModal";

import wcoLogo from "../../images/WCO_GTAS_header_brand.png";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  InputGroup
} from "react-bootstrap";
import "./Header.scss";

const Header = () => {
  const { getUserState, userAction } = useContext(UserContext);
  const { getLiveEditState, action } = useContext(LiveEditContext);
  const [currentLang] = useState(window.navigator.language);

  const [isEdit, setIsEdit] = useState(getLiveEditState().isEdit);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState();
  const [showTost, setShowToast] = useState(false);

  const PASSWORD_CHANGE_CONFIRMATION = (
    <Xl8 xid="head007">Your password has been changed!</Xl8>
  );
  const PASSWORD_CHANGE_CONFIRMATION_HEADER = <Xl8 xid="head008">Change Password</Xl8>;

  const searchInputRef = useRef();

  const user = getUserState();
  const currentPath = useLocation();

  const logout = () => {
    action({ type: "read" });
    userAction({ type: "logoff" });

    navigate(FULLPATH_TO.LOGIN);
  };

  // allow a 'false' logout for admins translating pages outside the authed/loggedin bundle
  const pseudoLogout = () => {
    navigate(FULLPATH_TO.LOGIN);
  };

  if (user === undefined) logout();

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

  const handleSearchSubmit = () => {
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

  useEffect(() => {
    const editstate = getLiveEditState();
    setIsEdit(editstate.isEdit);
  }, []);

  return (
    <>
      <Navbar sticky="top" expand="md" className="header-navbar" variant="dark">
        <Navbar.Brand className="header-navbar-brand">
          <RoleAuthenticator roles={[ROLE.ADMIN, ROLE.FLIGHTVWR]} alt={<></>}>
            <Link to="flights" onClick={() => clickTab(htab.FLIGHT)}>
              <img src={wcoLogo} alt="WCO logo" />
            </Link>
          </RoleAuthenticator>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" ref={toggleRef} />
        <Navbar.Collapse>
          <Nav variant="tabs" className="left-nav">
            <Nav.Link
              as={Link}
              to="flights"
              className={`${getActiveClass(htab.FLIGHT)}`}
              onClick={() => clickTab(htab.FLIGHT)}
            >
              <Xl8 xid="head001">Flights</Xl8>
            </Nav.Link>
            <RoleAuthenticator roles={[ROLE.ADMIN, ROLE.PAXVWR]} alt={<></>}>
              <Nav.Link
                as={Link}
                to="vetting"
                className={`${getActiveClass(htab.VETTING)}`}
                onClick={() => clickTab(htab.VETTING)}
              >
                <Xl8 xid="head002">Vetting</Xl8>
              </Nav.Link>
            </RoleAuthenticator>
            <Nav.Link
              as={Link}
              to="poe"
              className={`future ${getActiveClass(htab.POE)} optional`}
              onClick={() => clickTab(htab.POE)}
            >
              <Xl8 xid="head007">POE</Xl8>
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="tools"
              className={`${getActiveClass(htab.TOOLS)}`}
              onClick={() => clickTab(htab.TOOLS)}
            >
              <Xl8 xid="head004">Tools</Xl8>
            </Nav.Link>
            <RoleAuthenticator roles={[ROLE.ADMIN]} alt={<></>}>
              <Nav.Link
                as={Link}
                to="admin"
                className={`${getActiveClass(htab.ADMIN)}`}
                onClick={() => clickTab(htab.ADMIN)}
              >
                <Xl8 xid="head003">Admin</Xl8>
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="langEditor"
                className={`${getActiveClass(htab.LANG)} optional`}
                onClick={() => clickTab(htab.LANG)}
              >
                <i className="fa fa-language mx-sm-1 language-icon"></i>
                {currentLang}
              </Nav.Link>
            </RoleAuthenticator>
          </Nav>
          <Nav className="ml-auto">
            <Form inline>
              <InputGroup>
                <FormControl type="text" ref={searchInputRef} className="search-150" />
                <InputGroup.Append>
                  <Button variant="light" onClick={handleSearchSubmit}>
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
