import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { waterFilter } from '../../api/filterData';
import { useAuth } from '../../utils/context/authContext';

function FilterWater({ setPlaygrounds }) {
  // Get user ID via useAuth hook
  const { user } = useAuth();
  // Make API call to get all the playgrounds
  const getWaterPlaygrounds = async () => {
    const filteredPlaygrounds = await waterFilter(user.uid);
    setPlaygrounds(filteredPlaygrounds);
  };

  // Make API call to get all the water playgrounds on component render
  useEffect(() => {
    getWaterPlaygrounds();
  }, []);

  return null;
}

export default FilterWater;

FilterWater.propTypes = {
  setPlaygrounds: PropTypes.func.isRequired,
};
