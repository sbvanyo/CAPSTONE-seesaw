/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleNeighborhood } from '../api/neighborhoodData';
import { deleteNeighborhoodPlaygrounds } from '../api/mergedData';

function NeighborhoodCard({ neighborhoodObj, onUpdate }) {
  console.warn(neighborhoodObj);
  const deleteThisNeighborhood = () => {
    if (window.confirm(`Delete ${neighborhoodObj.name}?`)) {
      deleteSingleNeighborhood(neighborhoodObj.firebaseKey).then(deleteNeighborhoodPlaygrounds(neighborhoodObj.firebaseKey)).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={neighborhoodObj.image} alt={neighborhoodObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{neighborhoodObj.name}</Card.Title>
        <p className="card-text bold">{neighborhoodObj.favorite && <span>💛 i love this neighborhood<br /></span> }</p>
        {/* DYNAMIC LINK TO VIEW THE NEIGHBORHOOD DETAILS  */}
        <Link href={`/neighborhood/${neighborhoodObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE NEIGHBORHOOD DETAILS  */}
        <Link href={`/neighborhood/edit/${neighborhoodObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisNeighborhood} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

NeighborhoodCard.propTypes = {
  neighborhoodObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default NeighborhoodCard;
