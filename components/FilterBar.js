import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { filterPlaygrounds } from '../api/playgroundData';

// Filter() takes 2 props, defined in index.html, giving this function access to use and manipulate those pieces
function Filter({ setPlaygrounds, originalPlaygrounds }) {
  // initialize state for filter with initial value of null (no filter)
  const [filter, setFilter] = useState(null);

  const handleFilterClick = (filterType) => {
    // Toggles filter on and off:
    // - Checks to see if the current state of 'filter' is equal to the name of the filter being passed in on the clicked button.
    // - If so, 'filter' is reset to a null state and the original, full array of playgrounds is passed into the 'setPlaygrounds' setter function (in index.html), setting 'playgrounds' to the original array (toggles off). Otherwise, 'setFilter' sets 'filter' to the filter type being passed in on the button (toggles on).
    if (filter === filterType) {
      setFilter(null);
      setPlaygrounds(originalPlaygrounds);
    } else {
      setFilter(filterType);
    }
  };

  // Runs everytime 'user', 'filter', or 'setPlaygrounds' changes. If 'filter' is not null, calls the 'filterPlaygrounds' Promise and passes in the current state of 'filter'. This fetches the relevant  filtered array of playgrounds, then sets 'playgrounds' to the fetched data.
  useEffect(() => {
    if (filter !== null) {
      filterPlaygrounds(filter).then((data) => {
        setPlaygrounds(data);
      });
    }
  }, [filter, setPlaygrounds]);

  return (
    <>
      {/* Wrapping 'handleFilterClick' in an anonymous function delays its execution until the button is clicked. Without the anon function, it would run as soon as the Button rendered.  */}
      <div id="filterBar">
        <Button onClick={() => handleFilterClick('comm_center')} className="filterButton" style={{ backgroundColor: filter === 'comm_center' ? '#5FB0F1' : 'tomato' }}>
          community center
        </Button>

        <Button onClick={() => handleFilterClick('hiking')} className="filterButton" style={{ backgroundColor: filter === 'hiking' ? '#5FB0F1' : 'tomato' }}>
          hiking
        </Button>

        <Button onClick={() => handleFilterClick('indoor')} className="filterButton" style={{ backgroundColor: filter === 'indoor' ? '#5FB0F1' : 'tomato' }}>
          indoor
        </Button>

        <Button onClick={() => handleFilterClick('library')} className="filterButton" style={{ backgroundColor: filter === 'library' ? '#5FB0F1' : 'tomato' }}>
          library
        </Button>

        <Button onClick={() => handleFilterClick('paved_trail')} className="filterButton" style={{ backgroundColor: filter === 'paved_trail' ? '#5FB0F1' : 'tomato' }}>
          paved trail
        </Button>

        <Button onClick={() => handleFilterClick('pavilion')} className="filterButton" style={{ backgroundColor: filter === 'pavilion' ? '#5FB0F1' : 'tomato' }}>
          picnic pavilion
        </Button>

        <Button onClick={() => handleFilterClick('sandbox')} className="filterButton" style={{ backgroundColor: filter === 'sandbox' ? '#5FB0F1' : 'tomato' }}>
          sandbox
        </Button>

        <Button onClick={() => handleFilterClick('water')} className="filterButton" style={{ backgroundColor: filter === 'water' ? '#5FB0F1' : 'tomato' }}>
          water play
        </Button>
      </div>
    </>
  );
}

export default Filter;

Filter.propTypes = {
  setPlaygrounds: PropTypes.func.isRequired,
  originalPlaygrounds: PropTypes.arrayOf(
    PropTypes.shape({
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
    }),
  ).isRequired,
};
