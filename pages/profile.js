import React from 'react';
import User from '../components/User';
import Favorites from '../components/Favorites';
import Visited from '../components/Visited';

export default function Profile() {
  return (
    <>
      <div id="visitedContainer">
        <User />
        <Visited />
      </div>
      <hr />
      <h3 id="loveArrayText">i love these playgrounds the most:</h3>
      <Favorites />
    </>
  );
}
