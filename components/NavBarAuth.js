/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  return (
    <Navbar collapseOnSelect expand="lg" id="navbar">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand id="logo">see.saw</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            {/* <Button variant="primary">add a playground</Button> */}
            <Link passHref href="/playground/new">
              <Button>add a playground</Button>
            </Link>
            <Link passHref href="/">
              <Nav.Link>home</Nav.Link>
            </Link>
            <Link passHref href="/neighborhood/neighborhoods">
              <Nav.Link>neighborhoods</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link>my profile</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
