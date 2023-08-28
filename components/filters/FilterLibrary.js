import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { libraryFilter } from '../../api/filterData';
import { useAuth } from '../../utils/context/authContext';

function FilterLibrary({ setPlaygrounds }) {
  // Get user ID via useAuth hook
  const { user } = useAuth();
  // Make API call to get all the playgrounds
  const getLibraryPlaygrounds = async () => {
    const filteredPlaygrounds = await libraryFilter(user.uid);
    setPlaygrounds(filteredPlaygrounds);
  };

  // Make API call to get all the library playgrounds on component render
  useEffect(() => {
    getLibraryPlaygrounds();
  }, []);

  return null;
}

export default FilterLibrary;

FilterLibrary.propTypes = {
  setPlaygrounds: PropTypes.func.isRequired,
};
