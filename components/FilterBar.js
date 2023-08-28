import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import FilterCommCenter from './filters/FilterCommCenter';
import FilterHiking from './filters/FilterHiking';
import FilterIndoor from './filters/FilterIndoor';
import FilterLibrary from './filters/FilterLibrary';
import FilterPavedTrail from './filters/FilterPavedTrail';
import FilterPavilion from './filters/FilterPavilion';
import FilterSandbox from './filters/FilterSandbox';
import FilterWater from './filters/FilterWater';

export default function FilterBar({ setPlaygrounds, originalPlaygrounds }) {
  // Set a state for filters - false by default, to be toggled between true and false. State variables control whether filter components imported above (FilterWater, etc) should be rendered or not.
  const [showCommCenterFilter, setShowCommCenterFilter] = useState(false);
  const [showHikingFilter, setShowHikingFilter] = useState(false);
  const [showIndoorFilter, setShowIndoorFilter] = useState(false);
  const [showLibraryFilter, setShowLibraryFilter] = useState(false);
  const [showPavedTrailFilter, setShowPavedTrailFilter] = useState(false);
  const [showPavilionFilter, setShowPavilionFilter] = useState(false);
  const [showSandboxFilter, setShowSandboxFilter] = useState(false);
  const [showWaterFilter, setShowWaterFilter] = useState(false);

  // Toggle filters
  const toggleCommCenterFilter = () => {
    if (showCommCenterFilter) {
      setPlaygrounds(originalPlaygrounds);
    }
    setShowCommCenterFilter(!showCommCenterFilter);
  };

  const toggleHikingFilter = () => {
    if (showHikingFilter) {
      setPlaygrounds(originalPlaygrounds);
    }
    setShowHikingFilter(!showHikingFilter);
  };

  const toggleIndoorFilter = () => {
    if (showIndoorFilter) {
      setPlaygrounds(originalPlaygrounds);
    }
    setShowIndoorFilter(!showIndoorFilter);
  };

  const toggleLibraryFilter = () => {
    if (showLibraryFilter) {
      setPlaygrounds(originalPlaygrounds);
    }
    setShowLibraryFilter(!showLibraryFilter);
  };

  const togglePavedTrailFilter = () => {
    if (showPavedTrailFilter) {
      setPlaygrounds(originalPlaygrounds);
    }
    setShowPavedTrailFilter(!showPavedTrailFilter);
  };

  const togglePavilionFilter = () => {
    if (showPavilionFilter) {
      setPlaygrounds(originalPlaygrounds);
    }
    setShowPavilionFilter(!showPavilionFilter);
  };

  const toggleSandboxFilter = () => {
    if (showSandboxFilter) {
      setPlaygrounds(originalPlaygrounds);
    }
    setShowSandboxFilter(!showSandboxFilter);
  };

  const toggleWaterFilter = () => {
    if (showWaterFilter) {
      setPlaygrounds(originalPlaygrounds);
    }
    setShowWaterFilter(!showWaterFilter);
  };

  return (
    <>
      <Button onClick={toggleCommCenterFilter} className="filterButton">
        {/* Conditionally render text to button based on whether or not filter is on */}
        {showCommCenterFilter ? 'remove comm center filter' : 'apply comm center filter'}
        {/* Toggles 'showFilter' state to conditionally render 'FilterSandbox' component. -'&&' will render whatever is to the right if the condition on the left evaluates to true. setPlaygrounds setter function is passed to FilterSandbox component, which updates the 'playgrounds' array when it is called, replacing the existing array with the filtered one */}
        {showCommCenterFilter && <FilterCommCenter setPlaygrounds={setPlaygrounds} />}
      </Button>

      <Button onClick={toggleHikingFilter} className="filterButton">
        {showHikingFilter ? 'remove hiking filter' : 'apply hiking filter'}
        {showHikingFilter && <FilterHiking setPlaygrounds={setPlaygrounds} />}
      </Button>

      <Button onClick={toggleIndoorFilter} className="filterButton">
        {showIndoorFilter ? 'remove indoor filter' : 'apply indoor filter'}
        {showIndoorFilter && <FilterIndoor setPlaygrounds={setPlaygrounds} />}
      </Button>

      <Button onClick={toggleLibraryFilter} className="filterButton">
        {showLibraryFilter ? 'remove library filter' : 'apply library filter'}
        {showLibraryFilter && <FilterLibrary setPlaygrounds={setPlaygrounds} />}
      </Button>

      <Button onClick={togglePavedTrailFilter} className="filterButton">
        {showPavedTrailFilter ? 'remove paved trail filter' : 'apply paved trail filter'}
        {showPavedTrailFilter && <FilterPavedTrail setPlaygrounds={setPlaygrounds} />}
      </Button>

      <Button onClick={togglePavilionFilter} className="filterButton">
        {showPavilionFilter ? 'remove pavilion filter' : 'apply pavilion filter'}
        {showPavilionFilter && <FilterPavilion setPlaygrounds={setPlaygrounds} />}
      </Button>

      <Button onClick={toggleSandboxFilter} className="filterButton">
        {showSandboxFilter ? 'remove sandbox filter' : 'apply sandbox filter'}
        {showSandboxFilter && <FilterSandbox setPlaygrounds={setPlaygrounds} />}
      </Button>

      <Button onClick={toggleWaterFilter} className="filterButton">
        {showWaterFilter ? 'remove water filter' : 'apply water filter'}
        {showWaterFilter && <FilterWater setPlaygrounds={setPlaygrounds} />}
      </Button>
    </>
  );
}

FilterBar.propTypes = {
  setPlaygrounds: PropTypes.func.isRequired,
  originalPlaygrounds: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
};
