import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { pavilionFilter } from '../../api/filterData';
import { useAuth } from '../../utils/context/authContext';

function FilterPavilion({ setPlaygrounds }) {
  // Get user ID via useAuth hook
  const { user } = useAuth();
  // Make API call to get all the playgrounds
  const getPavilionPlaygrounds = async () => {
    const filteredPlaygrounds = await pavilionFilter(user.uid);
    setPlaygrounds(filteredPlaygrounds);
  };

  // Make API call to get all the pavilion playgrounds on component render
  useEffect(() => {
    getPavilionPlaygrounds();
  }, []);

  return null;
}

export default FilterPavilion;

FilterPavilion.propTypes = {
  setPlaygrounds: PropTypes.func.isRequired,
};
