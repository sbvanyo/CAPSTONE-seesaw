/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  return (
    <Navbar collapseOnSelect expand="lg" id="navbar">
      <Container id="navItemContainer">
        <Link passHref href="/">
          <Navbar.Brand id="logo">
            <Image src="https://firebasestorage.googleapis.com/v0/b/seesaw-970b6.appspot.com/o/images%2Fsee.saw.gif?alt=media&token=7e2efe04-a5f3-4d3a-9460-ca7351f3213e" style={{ width: '100%', marginBottom: '0' }} />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" id="navLinkContainer">
            <Link passHref href="/playground/new">
              <Button id="addPlaygroundBtn">add a playground</Button>
            </Link>
            <Link passHref href="/">
              <Nav.Link>home</Nav.Link>
            </Link>
            <Link passHref href="/neighborhood/neighborhoods">
              <Nav.Link>neighborhoods</Nav.Link>
            </Link>
            <Link passHref href="/playgroundmap">
              <Nav.Link>play map</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link>my profile</Nav.Link>
            </Link>
            <Button variant="danger" id="signOutBtn" onClick={signOut}>sign out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
