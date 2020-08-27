import React, { useContext, useState, useRef } from "react";
import { Link } from "@reach/router";
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { navigate, useLocation } from "@reach/router";
import { UserContext } from "../../context/user/UserContext";
import RoleAuthenticator from "../../context/roleAuthenticator/RoleAuthenticator";
import { ROLE } from "../../utils/constants";
import "./Header.scss";
import wcoLogo from "../../images/WCO_GTAS_header_brand.svg";

const Header = () => {
  const { getUserState, userAction } = useContext(UserContext);

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
    return currentPath.pathname.startsWith(tabName) ? "active-tab" : "";
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
            Dashboard
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
        <Nav className="navbar-search">
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Nav>
        <Nav variant="tabs" className="ml-auto">
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
