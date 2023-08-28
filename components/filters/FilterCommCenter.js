import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { commCenterFilter } from '../../api/filterData';
import { useAuth } from '../../utils/context/authContext';

function FilterCommCenter({ setPlaygrounds }) {
  // Get user ID via useAuth hook
  const { user } = useAuth();
  // Make API call to get all the playgrounds
  // async: function will return a Promise
  // await: pause execution of function here until Promise is settled (resolved or rejected)
  // Once Promise is fulfilled, its value is assigned to 'filteredPlaygrounds', which is passed into 'setPlaygrounds' (passed as a prop to this component over in index.js) which then updates the 'playgrounds' state with the filtered array.
  const getCommCenterPlaygrounds = async () => {
    const filteredPlaygrounds = await commCenterFilter(user.uid);
    setPlaygrounds(filteredPlaygrounds);
  };

  // Make API call to get all the playgrounds on component render
  useEffect(() => {
    getCommCenterPlaygrounds();
  }, []);

  return null;
}

export default FilterCommCenter;

FilterCommCenter.propTypes = {
  setPlaygrounds: PropTypes.func.isRequired,
};
