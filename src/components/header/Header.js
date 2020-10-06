import React, { useContext, useRef, useState, useEffect } from "react";
import { Link } from "@reach/router";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  InputGroup
} from "react-bootstrap";
import { navigate, useLocation } from "@reach/router";
import { UserContext } from "../../context/user/UserContext";
import { LiveEditContext } from "../../context/translation/LiveEditContext";
import RoleAuthenticator from "../../context/roleAuthenticator/RoleAuthenticator";
import { ROLE } from "../../utils/constants";
import { hasData } from "../../utils/utils";
import "./Header.scss";
import wcoLogo from "../../images/WCO_GTAS_header_brand.png";
import Xl8 from "../../components/xl8/Xl8";

const Header = () => {
  const { getUserState, userAction } = useContext(UserContext);
  const { getLiveEditState, action } = useContext(LiveEditContext);
  const [currentLang] = useState(window.navigator.language);

  const [isEdit, setIsEdit] = useState(getLiveEditState().isEdit);

  const searchInputRef = useRef();

  const user = getUserState();
  const currentPath = useLocation();

  const logout = () => {
    userAction({ type: "logoff" });

    navigate("/login");
  };

  if (user === undefined) logout();

  const userFullName = user?.fullName || "";

  const htab = {
    DASH: "/gtas/dashboard",
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

  useEffect(() => {
    const editstate = getLiveEditState();
    setIsEdit(editstate.isEdit);
  }, []);

  return (
    <Navbar sticky="top" expand="md" className="header-navbar" variant="light">
      <Navbar.Brand className="header-navbar-brand">
        <Link to="flights" onClick={() => clickTab(htab.FLIGHT)}>
          <img src={wcoLogo} />
        </Link>
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
          <Nav.Link
            as={Link}
            to="vetting"
            className={`${getActiveClass(htab.VETTING)}`}
            onClick={() => clickTab(htab.VETTING)}
          >
            <Xl8 xid="head002">Vetting</Xl8>
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="tools"
            className={`${getActiveClass(htab.TOOLS)}`}
            onClick={() => clickTab(htab.TOOLS)}
          >
            <Xl8 xid="head004">Tools</Xl8>
          </Nav.Link>
          <RoleAuthenticator alt={<></>} roles={[ROLE.ADMIN]}>
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
              <i className="fa fa-language mx-sm-1"></i>
              {currentLang}
            </Nav.Link>
          </RoleAuthenticator>
        </Nav>
        <Nav className="ml-auto">
          <Form inline>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Search"
                ref={searchInputRef}
                className="search-150"
              />
              <InputGroup.Append>
                <Button variant="light" onClick={handleSearchSubmit}>
                  <i className="fa fa-search"></i>
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
          <NavDropdown title={userFullName} id="basic-nav-dropdown" className="right">
            <NavDropdown.Item
              as={Link}
              to={"user/change-password"}
              onClick={() => clickTab("")}
            >
              {<Xl8 xid="head005">Change password</Xl8>}
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="#" onClick={logout}>
              {<Xl8 xid="head006">Logout</Xl8>}
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
