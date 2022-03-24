import React from "react";
import {
  Button,
  Container,
  Dropdown,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import './navApp.scss';

function Header() {
  return (
    <Navbar className='navbar-app' variant="dark">
      <Container>

        <Link to={"/home"} className='nav-logo'>
          <Navbar.Text as={"h2"} >LOGO</Navbar.Text>
        </Link>

        <Nav className="ms-2">

          <NavDropdown title="Wordspaces" id="wordspaces-dropdown">
            <Link to={"/"}>
              <Dropdown.ItemText>Wordspaces1</Dropdown.ItemText>
            </Link>
            <Link to={"/"}>
              <Dropdown.ItemText>Wordspaces1</Dropdown.ItemText>
            </Link>
            <Link to={"/"}>
              <Dropdown.ItemText>Wordspaces1</Dropdown.ItemText>
            </Link>
          </NavDropdown>
          <NavDropdown title="Recent" id="Recent-dropdown">
            <Link to={"/"}>
              <Dropdown.ItemText>Wordspaces1</Dropdown.ItemText>
            </Link>
            <Link to={"/"}>
              <Dropdown.ItemText>Wordspaces1</Dropdown.ItemText>
            </Link>
            <Link to={"/"}>
              <Dropdown.ItemText>Wordspaces1</Dropdown.ItemText>
            </Link>
          </NavDropdown>
          <NavDropdown title="Starred" id="Starred-dropdown">
            <Link to={"/"}>
              <Dropdown.ItemText>Wordspaces1</Dropdown.ItemText>
            </Link>
            <Link to={"/"}>
              <Dropdown.ItemText>Wordspaces1</Dropdown.ItemText>
            </Link>
            <Link to={"/"}>
              <Dropdown.ItemText>Wordspaces1</Dropdown.ItemText>
            </Link>
          </NavDropdown>
          <NavDropdown title="Template" id="Template-dropdown">
            <Link to={"/"}>
              <Dropdown.ItemText>Wordspaces1</Dropdown.ItemText>
            </Link>
            <Link to={"/"}>
              <Dropdown.ItemText>Wordspaces1</Dropdown.ItemText>
            </Link>
            <Link to={"/"}>
              <Dropdown.ItemText>Wordspaces1</Dropdown.ItemText>
            </Link>
          </NavDropdown>
          <Button variant="secondary">Create</Button>
        </Nav>
        <Nav className="nav-grow"></Nav>

        <Nav className="justify-content-end nav-right">
          <Form>
            <Form.Group>
              <Form.Control type={'text'} placeholder='Search' />
            </Form.Group>
          </Form>
          <Button variant="success" className="ms-2">&#xF431;</Button>
          <Button variant="success" className="ms-2">&#xF431;</Button>
          <Button variant="success" className="ms-2">&#xF431;</Button>
        </Nav>

      </Container>
    </Navbar>
  );
}

export default Header;
