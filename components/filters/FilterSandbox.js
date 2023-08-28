import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { sandboxFilter } from '../../api/filterData';
import { useAuth } from '../../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
// import PlaygroundCard from '../PlaygroundCard';

function FilterSandbox({ setPlaygrounds }) {
  // Set a state for playgrounds
  // const [playgrounds, setPlaygrounds] = useState([]);
  // Get user ID via useAuth hook
  const { user } = useAuth();
  // Make API call to get all the playgrounds
  const getSandboxPlaygrounds = async () => {
    const filteredPlaygrounds = await sandboxFilter(user.uid);
    setPlaygrounds(filteredPlaygrounds);
  };

  // Make API call to get all the playgrounds on component render
  useEffect(() => {
    getSandboxPlaygrounds();
  }, []);

  return null;
  // (
  //   <div className="text-center my-4">
  //     <div className="d-flex flex-wrap">
  //       {/* Map over playgrounds here using PlaygroundCard component. Returns a PlaygroundCard component for every item mapped over */}
  //       {playgrounds.map((playground) => (
  //         <PlaygroundCard key={playground.firebaseKey} playgroundObj={playground} onUpdate={getSandboxPlaygrounds} />
  //       ))}
  //     </div>
  //   </div>
  // );
}

export default FilterSandbox;

FilterSandbox.propTypes = {
  setPlaygrounds: PropTypes.func.isRequired,
};
