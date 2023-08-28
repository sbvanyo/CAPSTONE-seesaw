import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { pavedTrailFilter } from '../../api/filterData';
import { useAuth } from '../../utils/context/authContext';

function FilterPavedTrail({ setPlaygrounds }) {
  // Get user ID via useAuth hook
  const { user } = useAuth();
  // Make API call to get all the playgrounds
  const getPavedTrailPlaygrounds = async () => {
    const filteredPlaygrounds = await pavedTrailFilter(user.uid);
    setPlaygrounds(filteredPlaygrounds);
  };

  // Make API call to get all the paved trail playgrounds on component render
  useEffect(() => {
    getPavedTrailPlaygrounds();
  }, []);

  return null;
}

export default FilterPavedTrail;

FilterPavedTrail.propTypes = {
  setPlaygrounds: PropTypes.func.isRequired,
};
