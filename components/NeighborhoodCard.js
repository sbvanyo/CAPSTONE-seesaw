/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleNeighborhood } from '../api/neighborhoodData';
import { deleteNeighborhoodPlaygrounds } from '../api/mergedData';

function NeighborhoodCard({ neighborhoodObj, onUpdate }) {
  const deleteThisNeighborhood = () => {
    if (window.confirm(`Delete ${neighborhoodObj.name}?`)) {
      deleteSingleNeighborhood(neighborhoodObj.firebaseKey).then(deleteNeighborhoodPlaygrounds(neighborhoodObj.firebaseKey)).then(() => onUpdate());
    }
  };

  return (
    <Card className="neighborhoodCard">
      <Card.Body>
        <div id="neighborhoodBody">
          {/* <Card.Img variant="top" src={neighborhoodObj.image} style={{ height: '50px', width: 'auto' }} /> */}
          <Card.Title className="cardTitle">{neighborhoodObj.name}</Card.Title>
          {/* <p className="card-text bold">{neighborhoodObj.favorite && <span>💛 i love this neighborhood<br /></span> }</p> */}
          <div id="neighborhoodBtnGroup">
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
          </div>
        </div>
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
