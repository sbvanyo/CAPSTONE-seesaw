/* eslint-disable react/require-default-props */
import { React, useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { HeartFill, Check } from 'react-bootstrap-icons';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import {
  addFavoritePlayground,
  removeFavoritePlayground,
  addVisitedPlayground,
  removeVisitedPlayground,
} from '../api/playgroundData';

function PlaygroundCard({ playgroundObj }) {
  const { user } = useAuth();
  // Initialize state for favorite and visited with initial state of false
  const [isFavorite, setIsFavorite] = useState(false);
  const [hasVisited, setHasVisited] = useState(false);

  // useEffect(() => {
  //   console.warn('Image URL:', playgroundObj.image);
  // }, [playgroundObj.image]);

  // If playgroundObj.favoritedBy exists, check if the array include's the active user's uid and set 'isFavorite' acccordingly. Re-runs anytime playgroundObj.favoritedBy or user.uid changes.
  useEffect(() => {
    if (playgroundObj.favoritedBy) {
      setIsFavorite(playgroundObj.favoritedBy.includes(user.uid));
    }
  }, [playgroundObj.favoritedBy, user.uid]);

  useEffect(() => {
    if (playgroundObj.visitedBy) {
      setHasVisited(playgroundObj.visitedBy.includes(user.uid));
    }
  }, [playgroundObj.visitedBy, user.uid]);

  // Toggles favorite on and off. Depending on current status of 'isFavorite', either calls removeFavoritePlayground or addFavoritePlayground (Promises that interact with Firebase to remove or add user's uid from favoritedBy array)
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoritePlayground(playgroundObj.firebaseKey, user.uid)
        .then(() => {
          setIsFavorite(false);
        })
        .catch((error) => {
          console.error('Error removing favorite:', error);
        });
    } else {
      addFavoritePlayground(playgroundObj.firebaseKey, user.uid)
        .then(() => {
          setIsFavorite(true);
        })
        .catch((error) => {
          console.error('Error adding favorite:', error);
        });
    }
  };

  const toggleVisited = () => {
    if (hasVisited) {
      removeVisitedPlayground(playgroundObj.firebaseKey, user.uid)
        .then(() => {
          setHasVisited(false);
        })
        .catch((error) => {
          console.error('Error removing visited:', error);
        });
    } else {
      addVisitedPlayground(playgroundObj.firebaseKey, user.uid)
        .then(() => {
          setHasVisited(true);
        })
        .catch((error) => {
          console.error('Error adding visited:', error);
        });
    }
  };

  return (
    <Card className="playgroundCard">
      <Link href={`/playground/${playgroundObj.firebaseKey}`} passHref>
        <Card.Img
          variant="top"
          src={playgroundObj.image}
          alt={playgroundObj.name}
          className="playgroundImage"
        />
      </Link>

      <HeartFill
        className={isFavorite ? 'heart-filled' : 'heart-empty'}
        onClick={toggleFavorite}
        onKeyDown={(e) => {
          if (e.key === ' ') {
            toggleFavorite();
          }
        }}
        // improves acessibility by indicating the pressed state
        aria-pressed={isFavorite ? 'true' : 'false'}
      />

      <Check
        className={hasVisited ? 'check-filled' : 'check-empty'}
        onClick={toggleVisited}
        onKeyDown={(e) => {
          if (e.key === ' ') {
            toggleFavorite();
          }
        }}
        aria-pressed={isFavorite ? 'true' : 'false'}
      />

      <Card.Body>
        <Card.Title className="cardTitle">{playgroundObj.name}</Card.Title>

        {/* <p>
          {playgroundObj.visitedBy.includes(user.uid) ? ' ✅ i\'ve been here! ' : ''}
          {playgroundObj.favoritedBy.includes(user.uid) ? '💛 i love this playground' : ''}
        </p> */}

        {/* DYNAMIC LINK TO VIEW THE playground DETAILS
        <Link href={`/playground/${playgroundObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2" id="viewBtn">VIEW</Button>
        </Link> */}
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
};

export default PlaygroundCard;
