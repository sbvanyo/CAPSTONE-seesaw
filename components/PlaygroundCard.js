/* eslint-disable react/require-default-props */
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
// import { deletePlayground } from '../api/playgroundData';
function PlaygroundCard({ playgroundObj }) {
  const { user } = useAuth();

  return (
    <Card className="playgroundCard">
      <Card.Img variant="top" src={playgroundObj.image} alt={playgroundObj.name} className="playgroundImage" />
      <Card.Body>
        <Card.Title className="cardTitle">{playgroundObj.name}</Card.Title>

        <p>
          {playgroundObj.visitedBy.includes(user.uid) ? ' ✅ i\'ve been here! ' : ''}
          {playgroundObj.favoritedBy.includes(user.uid) ? '💛 i love this playground' : ''}
        </p>

        {/* DYNAMIC LINK TO VIEW THE playground DETAILS  */}
        <Link href={`/playground/${playgroundObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2" id="viewBtn">VIEW</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

PlaygroundCard.propTypes = {
  playgroundObj: PropTypes.shape({
    address: PropTypes.string,
    city: PropTypes.string,
    comm_center: PropTypes.bool,
    favorite: PropTypes.bool,
    favoritedBy: PropTypes.arrayOf(PropTypes.string),
    firebaseKey: PropTypes.string,
    hiking: PropTypes.bool,
    hot_tip: PropTypes.string,
    image: PropTypes.string,
    indoor: PropTypes.bool,
    latlng: PropTypes.string,
    library: PropTypes.bool,
    name: PropTypes.string,
    neighborhood: PropTypes.string,
    neighborhood_id: PropTypes.string,
    paved_trail: PropTypes.bool,
    pavilion: PropTypes.bool,
    sandbox: PropTypes.bool,
    state: PropTypes.string,
    uid: PropTypes.string,
    visited: PropTypes.bool,
    visitedBy: PropTypes.arrayOf(PropTypes.string),
    water: PropTypes.bool,
    zip: PropTypes.string,
  }).isRequired,
  // onUpdate: PropTypes.func,
};

export default PlaygroundCard;

// PlaygroundCard.defaultProps = {
//   onUpdate: PropTypes.func,
// };
