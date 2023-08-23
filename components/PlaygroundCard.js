import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deletePlayground } from '../api/playgroundData';

function PlaygroundCard({ playgroundObj, onUpdate }) {
  console.warn(playgroundObj);
  const deleteThisPlayground = () => {
    if (window.confirm(`Delete ${playgroundObj.name}?`)) {
      deletePlayground(playgroundObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={playgroundObj.image} alt={playgroundObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{playgroundObj.name}</Card.Title>
        <p className="card-text bold">{playgroundObj.visited && <span>✅ i&apos;ve been here!<br /></span> }</p>
        {/* DYNAMIC LINK TO VIEW THE playground DETAILS  */}
        <Link href={`/playground/${playgroundObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE playground DETAILS  */}
        <Link href={`/playground/edit/${playgroundObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisPlayground} className="m-2">
          DELETE
        </Button>
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
    water: PropTypes.bool,
    zip: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlaygroundCard;
