import React from "react";
import {
  Button,
  Container,
  Dropdown,
  Nav,
  Navbar,
  NavDropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import './navBoard.scss';
import accountIcon from '../../image/person.svg'

function NavBoard() {
  return (
    <Navbar >
      <Container>
        <Nav>
          <Button variant="secondary">
            <NavDropdown title="Board" variant="light">
              <Dropdown.Item>abc</Dropdown.Item>
              <Dropdown.Item>abc</Dropdown.Item>
              <Dropdown.Item>abc</Dropdown.Item>
            </NavDropdown>
          </Button>
          <Button variant="secondary" className="ms-2">
            My board
          </Button>
        </Nav>
        <Nav className="nav-board-col"></Nav>
        <Nav>
        <Button variant="secondary" className="ms-2">
            Trello Wordspace
          </Button>
        </Nav>
        <Nav className="nav-board-col"></Nav>
        <Nav className="accounts">

        <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-bottom">
            Day la username
        </Tooltip>}>

            <Button className='btn-account'>
                <img src={accountIcon} alt="account icon"/>
            </Button>
        </OverlayTrigger>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBoard;
