import React from "react";
import {
  Container, Row, Col, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

import {HashRouter, Link} from 'react-router-dom'

const Header = () => (
  <header>
  <HashRouter>
    <Navbar fixed="top" color="light" light expand="xs" className="border-bottom border-gray bg-white" style={{ height: 80 }}>

      <Container>
        <Row noGutters className="position-relative w-100 align-items-center">

          <Col className="d-none d-lg-flex justify-content-start">
            <Nav className="mrx-auto" navbar>

              <NavItem className="d-flex align-items-center">

              </NavItem>

              <NavItem className="d-flex align-items-center">
                <Link to='/'>Projects</Link>
              </NavItem>
              <NavItem className="d-flex align-items-center">
                /<Link to='/todo'>TODO</Link>
              </NavItem>
              <NavItem className="d-flex align-items-center">
                /<Link to='/users'>Users</Link>
              </NavItem>
              {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}

              <UncontrolledDropdown className="d-flex align-items-center" nav inNavbar>
                <DropdownToggle className="font-weight-bold" nav caret>Fuck</DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem className="font-weight-bold text-secondary text-uppercase" header disabled>Fuck React</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>All</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

            </Nav>
          </Col>

          <Col className="d-flex justify-content-xs-start justify-content-lg-center">
            <NavbarBrand className="d-inline-block p-0" href="/" style={{ width: 80 }}>

            </NavbarBrand>
          </Col>

        </Row>
      </Container>

    </Navbar>
    <Row className="mt-5">
    </Row>
    </HashRouter>
  </header>
);

export default Header;