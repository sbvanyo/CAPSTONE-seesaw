import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '80vw',
        marginRight: '40%',
        marginLeft: '10%',
      }}
    >
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/seesaw-970b6.appspot.com/o/images%2Fsee.saw_large.gif?alt=media&token=54e6de6d-2269-4ecc-899a-fc2da4a71d64"
        style={{
          width: '60vw',
          alignSelf: 'center',
        }}
      />
      <Button type="button" size="lg" className="copy-btn" onClick={signIn} style={{ backgroundColor: 'tomato', border: 'none', padding: '23px' }}>
        let&apos;s play!
      </Button>
    </div>
  );
}

export default Signin;
