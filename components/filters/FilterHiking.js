import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { hikingFilter } from '../../api/filterData';
import { useAuth } from '../../utils/context/authContext';

function FilterHiking({ setPlaygrounds }) {
  // Get user ID via useAuth hook
  const { user } = useAuth();
  // Make API call to get all the playgrounds
  const getHikingPlaygrounds = async () => {
    const filteredPlaygrounds = await hikingFilter(user.uid);
    setPlaygrounds(filteredPlaygrounds);
  };

  // Make API call to get all the hiking playgrounds on component render
  useEffect(() => {
    getHikingPlaygrounds();
  }, []);

  return null;
}

export default FilterHiking;

FilterHiking.propTypes = {
  setPlaygrounds: PropTypes.func.isRequired,
};
