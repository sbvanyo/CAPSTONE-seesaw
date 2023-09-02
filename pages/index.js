// import { signOut } from '../utils/auth'; // TODO: COMMENT IN FOR AUTH
import { React, useEffect, useState } from 'react';
import { getPlaygrounds } from '../api/playgroundData';
import { useAuth } from '../utils/context/authContext';
import PlaygroundCard from '../components/PlaygroundCard';
import SearchBar from '../components/SearchBar';
import Filter from '../components/FilterBar';

function Home() {
  // Set a state for playgrounds - 'playgrounds' holds the initial playgrounds array
  const [playgrounds, setPlaygrounds] = useState([]);
  // 'originalPlaygrounds' holds the original, unfiltered array of all playgrounds
  const [originalPlaygrounds, setOriginalPlaygrounds] = useState([]);
  // Get user ID via useAuth hook
  const { user } = useAuth();

  // Make API call to fetch and render all the playgrounds
  const getAllThePlaygrounds = () => {
    getPlaygrounds(user.uid).then((allPlaygrounds) => {
      setOriginalPlaygrounds(allPlaygrounds);
      setPlaygrounds(allPlaygrounds);
    });
  };

  // Initializes 'playgrounds' and 'originalPlaygrounds' state variables. Make API call ('getPlaygrounds') to get all the playgrounds on component render and pass the fetched data ('allPlaygrounds') to .then() method as an argument. This full, unfiltered list is stored in state variable 'originalPlaygrounds' via its setter function ('setOriginalPlaygrounds'). Same with 'setPlaygrounds' below, but this one will be filtered/modified. The empty dependency array passed as a second argument means that this code will only run once after initial render.
  useEffect(() => {
    getPlaygrounds(user.uid).then((allPlaygrounds) => {
      setOriginalPlaygrounds(allPlaygrounds);
      setPlaygrounds(allPlaygrounds);
    });
  }, []);

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
      <h1 className="title">find a playground</h1>
      <div id="searchContainer">
        <SearchBar onKeyUp={(query) => filterResult(query)} />
      </div>

      <h5>or start your search here:</h5>

      <Filter setPlaygrounds={setPlaygrounds} originalPlaygrounds={originalPlaygrounds} />

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
