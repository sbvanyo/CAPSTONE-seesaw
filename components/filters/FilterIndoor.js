import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { indoorFilter } from '../../api/filterData';
import { useAuth } from '../../utils/context/authContext';

function FilterIndoor({ setPlaygrounds }) {
  // Get user ID via useAuth hook
  const { user } = useAuth();
  // Make API call to get all the playgrounds
  const getIndoorPlaygrounds = async () => {
    const filteredPlaygrounds = await indoorFilter(user.uid);
    setPlaygrounds(filteredPlaygrounds);
  };

  // Make API call to get all the indoor playgrounds on component render
  useEffect(() => {
    getIndoorPlaygrounds();
  }, []);

  return null;
}

export default FilterIndoor;

FilterIndoor.propTypes = {
  setPlaygrounds: PropTypes.func.isRequired,
};
