import React from 'react';
import User from '../components/User';
import Favorites from '../components/Favorites';

export default function Profile() {
  return (
    <>
      <User />
      <h3>i love these playgrounds the most:</h3>
      <Favorites />
    </>
  );
}
