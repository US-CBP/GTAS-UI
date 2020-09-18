import React, { useContext, useRef } from "react";
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
import RoleAuthenticator from "../../context/roleAuthenticator/RoleAuthenticator";
import { ROLE } from "../../utils/constants";
import { hasData } from "../../utils/utils";
import "./Header.scss";
import wcoLogo from "../../images/WCO_GTAS_header_brand.svg";
import Xid from "../../components/xid/Xid";

const Header = () => {
  const { getUserState, userAction } = useContext(UserContext);
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
    ADMIN: "/gtas/admin"
  };

  const toggleRef = useRef();

  const clickTab = tabName => {
    if (toggleRef.current.clientHeight > 0) {
      toggleRef.current.click();
    }
  };

  const getActiveClass = tabName => {
    return currentPath.pathname.startsWith(tabName) ? "active-tab foo" : "foo";
  };

  const handleSearchSubmit = () => {
    const searchParam = searchInputRef.current.value;
    if (hasData(searchParam)) {
      navigate(`/gtas/search/${searchParam}`);
    }
  };

  return (
    <Navbar sticky="top" expand="md" className="header-navbar" variant="light">
      <Navbar.Brand className="header-navbar-brand">
        <Link to="dashboard" onClick={() => clickTab(htab.DASH)}>
          <img src={wcoLogo} />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" ref={toggleRef} />
      <Navbar.Collapse>
        <Nav variant="tabs" className="left-nav">
          <Nav.Link
            as={Link}
            to="dashboard"
            className={`${getActiveClass(htab.DASH)}`}
            onClick={() => clickTab(htab.DASH)}
          >
            <Xid xid="10">Dashboard</Xid>
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="flights"
            className={`${getActiveClass(htab.FLIGHT)}`}
            onClick={() => clickTab(htab.FLIGHT)}
          >
            Flights
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="vetting"
            className={`${getActiveClass(htab.VETTING)}`}
            onClick={() => clickTab(htab.VETTING)}
          >
            Vetting
          </Nav.Link>
          <RoleAuthenticator alt={<></>} roles={[ROLE.ADMIN]}>
            <Nav.Link
              as={Link}
              to="admin"
              className={`${getActiveClass(htab.ADMIN)}`}
              onClick={() => clickTab(htab.ADMIN)}
            >
              Admin
            </Nav.Link>
          </RoleAuthenticator>
          <Nav.Link
            as={Link}
            to="tools"
            className={`${getActiveClass(htab.TOOLS)}`}
            onClick={() => clickTab(htab.TOOLS)}
          >
            Tools
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Form inline>
            <InputGroup>
              <FormControl type="text" placeholder="Search" ref={searchInputRef} />
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
              Change Password
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="#" onClick={logout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
