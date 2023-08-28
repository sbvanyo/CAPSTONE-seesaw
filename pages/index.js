// import { signOut } from '../utils/auth'; // TODO: COMMENT IN FOR AUTH
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getPlaygrounds } from '../api/playgroundData';
import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import PlaygroundCard from '../components/PlaygroundCard';
import SearchBar from '../components/SearchBar';
import FilterCommCenter from '../components/filters/FilterCommCenter';
import FilterHiking from '../components/filters/FilterHiking';
import FilterIndoor from '../components/filters/FilterIndoor';
import FilterLibrary from '../components/filters/FilterLibrary';
import FilterPavedTrail from '../components/filters/FilterPavedTrail';
import FilterPavilion from '../components/filters/FilterPavilion';
import FilterSandbox from '../components/filters/FilterSandbox';
import FilterWater from '../components/filters/FilterWater';

function Home() {
  // Set a state for playgrounds - 'playgrounds' holds the initial playgrounds array
  const [playgrounds, setPlaygrounds] = useState([]);
  // 'originalPlaygrounds' holds the original, unfiltered array of all playgrounds
  const [originalPlaygrounds, setOriginalPlaygrounds] = useState([]);

  // Set a state for filters - false by default, to be toggled
  const [showCommCenterFilter, setShowCommCenterFilter] = useState(false);
  const [showHikingFilter, setShowHikingFilter] = useState(false);
  const [showIndoorFilter, setShowIndoorFilter] = useState(false);
  const [showLibraryFilter, setShowLibraryFilter] = useState(false);
  const [showPavedTrailFilter, setShowPavedTrailFilter] = useState(false);
  const [showPavilionFilter, setShowPavilionFilter] = useState(false);
  const [showSandboxFilter, setShowSandboxFilter] = useState(false);
  const [showWaterFilter, setShowWaterFilter] = useState(false);

  // Get user ID via useAuth hook
  const { user } = useAuth();

  // Make API call to fetch and render all the playgrounds
  const getAllThePlaygrounds = () => {
    getPlaygrounds(user.uid).then(setPlaygrounds);
  };

  // Make API call to get all the playgrounds on component render
  useEffect(() => {
    getPlaygrounds(user.uid).then((allPlaygrounds) => {
      setOriginalPlaygrounds(allPlaygrounds);
      setPlaygrounds(allPlaygrounds);
    });
  }, []);

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

  // SEARCH BAR FILTER
  const filterResult = (query) => {
    if (!query) {
      getAllThePlaygrounds();
    } else {
      const filter = playgrounds.filter((playground) => playground.name.toLowerCase().includes(query) || playground.address.toLowerCase().includes(query) || playground.city.toLowerCase().includes(query) || playground.hot_tip.toLowerCase().includes(query) || playground.zip.toLowerCase().includes(query));

      setPlaygrounds(filter);
    }
  };

  return (
    <div className="text-center my-4">

      <h1>Hello {user.displayName}! </h1>

      <SearchBar onKeyUp={(query) => filterResult(query)} />

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

      <div className="d-flex flex-wrap">
        {/* Map over playgrounds here using PlaygroundCard component. Returns a PlaygroundCard component for every item mapped over */}
        {playgrounds.map((playground) => (
          <PlaygroundCard key={playground.firebaseKey} playgroundObj={playground} />
        ))}
      </div>

    </div>

  );
}

export default Home;
