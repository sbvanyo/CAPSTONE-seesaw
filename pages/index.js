import { Button } from 'react-bootstrap'; // TODO: COMMENT IN FOR AUTH
// import { signOut } from '../utils/auth'; // TODO: COMMENT IN FOR AUTH
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPlaygrounds } from '../api/playgroundData';
import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import PlaygroundCard from '../components/PlaygroundCard';

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

  return (
    <div className="text-center my-4">

      <h1>Hello {user.displayName}! </h1>

      <Link href="/playground/new" passHref>
        <Button>Add A Playground</Button>
      </Link>
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
