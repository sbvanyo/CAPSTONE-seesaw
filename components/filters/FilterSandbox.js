import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { sandboxFilter } from '../../api/filterData';
import { useAuth } from '../../utils/context/authContext';

function FilterSandbox({ setPlaygrounds }) {
  // Get user ID via useAuth hook
  const { user } = useAuth();
  // Make API call to get all the playgrounds
  const getSandboxPlaygrounds = async () => {
    const filteredPlaygrounds = await sandboxFilter(user.uid);
    setPlaygrounds(filteredPlaygrounds);
  };

  // Make API call to get all the sandbox playgrounds on component render
  useEffect(() => {
    getSandboxPlaygrounds();
  }, []);

  return null;
}

export default FilterSandbox;

FilterSandbox.propTypes = {
  setPlaygrounds: PropTypes.func.isRequired,
};
