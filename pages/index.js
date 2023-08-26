// import { signOut } from '../utils/auth'; // TODO: COMMENT IN FOR AUTH
import { useEffect, useState } from 'react';
import { getPlaygrounds } from '../api/playgroundData';
import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import PlaygroundCard from '../components/PlaygroundCard';
import SearchBar from '../components/SearchBar';

function Home() {
  // Set a state for playgrounds
  const [playgrounds, setPlaygrounds] = useState([]);
  // Get user ID via useAuth hook
  const { user } = useAuth();
  // Make API call to get all the playgrounds
  const getAllThePlaygrounds = () => {
    getPlaygrounds(user.uid).then(setPlaygrounds);
  };

  // Make API call to get all the books on component render
  useEffect(() => {
    getAllThePlaygrounds();
  }, []);

  const filterResult = (query) => {
    if (!query) {
      getAllThePlaygrounds();
    } else {
      const filter = playgrounds.filter((playground) => playground.name.toLowerCase().includes(query) || playground.address.toLowerCase().includes(query));
      setPlaygrounds(filter);
    }
  };

  return (
    <div className="text-center my-4">

      <h1>Hello {user.displayName}! </h1>

      <SearchBar onKeyUp={(query) => filterResult(query)} />

      <div className="d-flex flex-wrap">
        {/* Map over playgrounds here using PlaygroundCard component. Returns a PlaygroundCard component for every item mapped over */}
        {playgrounds.map((playground) => (
          <PlaygroundCard key={playground.firebaseKey} playgroundObj={playground} onUpdate={getAllThePlaygrounds} />
        ))}
      </div>

    </div>

  );
}

export default Home;
