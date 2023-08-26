import React from 'react';
import User from '../components/User';
import Favorites from '../components/Favorites';
import Visited from '../components/Visited';

export default function Profile() {
  return (
    <>
      <User />
      <h3>visited playgrounds:</h3>
      <Visited />
      <h3>i love these playgrounds the most:</h3>
      <Favorites />
    </>
  );
}
