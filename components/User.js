import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import Link from 'next/link';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function User({ userObj }) {
  const { user } = useAuth();
  console.warn(userObj);

  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={user.photoURL} alt={user.displayName} style={{ height: 'auto' }} />
        <Card.Body>
          <Card.Title>{user.displayName}</Card.Title>
          <Card.Text>Email: {user.email}</Card.Text>
          <Card.Text>Last Login: {user.metadata.lastSignInTime}</Card.Text>
          <Button variant="danger" onClick={signOut} className="m-2">
            SIGN OUT
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

User.propTypes = {
  userObj: ({
    image: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    lastSignInTime: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default User;
