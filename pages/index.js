// import { signOut } from '../utils/auth'; // TODO: COMMENT IN FOR AUTH
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getPlaygrounds } from '../api/playgroundData';
import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import PlaygroundCard from '../components/PlaygroundCard';
import SearchBar from '../components/SearchBar';
// import FilterBar from '../components/FilterBar';
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
  // console.warn(typeof setPlaygrounds);
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
  // State to keep track of which filter is currently active
  const [activeFilter, setActiveFilter] = useState('');

  // Get user ID via useAuth hook
  const { user } = useAuth();

  // Make API call to fetch and render all the playgrounds
  const getAllThePlaygrounds = () => {
    getPlaygrounds(user.uid).then(setPlaygrounds);
  };

  // Initializes 'playgrounds' and 'originalPlaygrounds' state variables. Make API call ('getPlaygrounds') to get all the playgrounds on component render and pass the fetched data ('allPlaygrounds') to .then() method as an argument. This full, unfiltered list is stored in state variable 'originalPlaygrounds' via its setter function ('setOriginalPlaygrounds'). Same with 'setPlaygrounds' below, but this one will be filtered/modified. The empty dependency array passed as a second argument means that this code will only run once after initial render.
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
      // Resets the active filter
      setActiveFilter('');
    } else {
      // Sets active filter to commCenter
      setActiveFilter('commCenter');
    }
    setShowCommCenterFilter(!showCommCenterFilter);
  };

  const toggleHikingFilter = () => {
    if (showHikingFilter) {
      setPlaygrounds(originalPlaygrounds);
      setActiveFilter('');
    } else {
      setActiveFilter('hiking');
    }
    setShowHikingFilter(!showHikingFilter);
  };

  const toggleIndoorFilter = () => {
    if (showIndoorFilter) {
      setPlaygrounds(originalPlaygrounds);
      setActiveFilter('');
    } else {
      setActiveFilter('indoor');
    }
    setShowIndoorFilter(!showIndoorFilter);
  };

  const toggleLibraryFilter = () => {
    if (showLibraryFilter) {
      setPlaygrounds(originalPlaygrounds);
      setActiveFilter('');
    } else {
      setActiveFilter('library');
    }
    setShowLibraryFilter(!showLibraryFilter);
  };

  const togglePavedTrailFilter = () => {
    if (showPavedTrailFilter) {
      setPlaygrounds(originalPlaygrounds);
      setActiveFilter('');
    } else {
      setActiveFilter('pavedTrail');
    }
    setShowPavedTrailFilter(!showPavedTrailFilter);
  };

  const togglePavilionFilter = () => {
    if (showPavilionFilter) {
      setPlaygrounds(originalPlaygrounds);
      setActiveFilter('');
    } else {
      setActiveFilter('pavilion');
    }
    setShowPavilionFilter(!showPavilionFilter);
  };

  const toggleSandboxFilter = () => {
    if (showSandboxFilter) {
      setPlaygrounds(originalPlaygrounds);
      setActiveFilter('');
    } else {
      setActiveFilter('sandbox');
    }
    setShowSandboxFilter(!showSandboxFilter);
  };

  const toggleWaterFilter = () => {
    if (showWaterFilter) {
      setPlaygrounds(originalPlaygrounds);
      setActiveFilter('');
    } else {
      setActiveFilter('water');
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

      <h4 id="hello">hi {user.displayName}! </h4>
      <h1 id="title">find a playground</h1>
      <div id="searchContainer">
        <SearchBar onKeyUp={(query) => filterResult(query)} />
      </div>

      <Button onClick={toggleCommCenterFilter} className="filterButton" style={{ backgroundColor: activeFilter === 'commCenter' ? '#5FB0F1' : 'tomato' }}>
        community center
        {/* Toggles 'showFilter' state to conditionally render 'FilterSandbox' component. -'&&' will render whatever is to the right if the condition on the left evaluates to true. setPlaygrounds setter function is passed to FilterSandbox component, which updates the 'playgrounds' array when it is called, replacing the existing array with the filtered one */}
        {showCommCenterFilter && <FilterCommCenter setPlaygrounds={setPlaygrounds} />}
      </Button>

      <Button onClick={toggleHikingFilter} className="filterButton" style={{ backgroundColor: activeFilter === 'hiking' ? '#5FB0F1' : 'tomato' }}>
        hiking
        {showHikingFilter && <FilterHiking setPlaygrounds={setPlaygrounds} />}
      </Button>

      <Button onClick={toggleIndoorFilter} className="filterButton" style={{ backgroundColor: activeFilter === 'indoor' ? '#5FB0F1' : 'tomato' }}>
        indoor
        {showIndoorFilter && <FilterIndoor setPlaygrounds={setPlaygrounds} />}
      </Button>

      <Button onClick={toggleLibraryFilter} className="filterButton" style={{ backgroundColor: activeFilter === 'library' ? '#5FB0F1' : 'tomato' }}>
        library
        {showLibraryFilter && <FilterLibrary setPlaygrounds={setPlaygrounds} />}
      </Button>

      <Button onClick={togglePavedTrailFilter} className="filterButton" style={{ backgroundColor: activeFilter === 'pavedTrail' ? '#5FB0F1' : 'tomato' }}>
        paved trail
        {showPavedTrailFilter && <FilterPavedTrail setPlaygrounds={setPlaygrounds} />}
      </Button>

      <Button onClick={togglePavilionFilter} className="filterButton" style={{ backgroundColor: activeFilter === 'pavilion' ? '#5FB0F1' : 'tomato' }}>
        picnic pavilion
        {showPavilionFilter && <FilterPavilion setPlaygrounds={setPlaygrounds} />}
      </Button>

      <Button onClick={toggleSandboxFilter} className="filterButton" style={{ backgroundColor: activeFilter === 'sandbox' ? '#5FB0F1' : 'tomato' }}>
        sandbox
        {showSandboxFilter && <FilterSandbox setPlaygrounds={setPlaygrounds} />}
      </Button>

      <Button onClick={toggleWaterFilter} className="filterButton" style={{ backgroundColor: activeFilter === 'water' ? '#5FB0F1' : 'tomato' }}>
        water play
        {showWaterFilter && <FilterWater setPlaygrounds={setPlaygrounds} />}

      </Button>
      <div className="cardContainer">
        {/* Map over playgrounds array and return a PlaygroundCard for every item mapped over */}
        {playgrounds.map((playground) => (
          <PlaygroundCard key={playground.firebaseKey} playgroundObj={playground} onUpdate={getAllThePlaygrounds} />
        ))}
      </div>
      {/* </div> */}

    </div>

  );
}

export default Home;
