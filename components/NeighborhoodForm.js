import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { updateNeighborhood, createNeighborhood } from '../api/neighborhoodData';
// import { createBook, updateBook } from '../../api/bookData';

const initialState = {
  name: '',
  image: '',
  favorite: false,
};

function NeighborhoodForm({ neighborhoodObj }) {
  const [formInput, setFormInput] = useState(initialState);
  // const [authors, setAuthors] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (neighborhoodObj.firebaseKey) setFormInput(neighborhoodObj);
  }, [neighborhoodObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (neighborhoodObj.firebaseKey) {
      updateNeighborhood(formInput).then(() => router.push(`/neighborhood/${neighborhoodObj.firebaseKey}`));
    } else {
      // Spread syntax unpacks state object (formInput) and allows us to add uid to it
      const payload = { ...formInput, uid: user.uid };
      createNeighborhood(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateNeighborhood(patchPayload).then(() => {
          router.push('/neighborhood/neighborhoods');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{neighborhoodObj.firebaseKey ? 'update' : 'create'} neighborhood</h2>

      {/* NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Neighborhood Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter neighborhood name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Neighborhood Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{neighborhoodObj.firebaseKey ? 'update' : 'create'} neighborhood</Button>
    </Form>
  );
}

NeighborhoodForm.propTypes = {
  neighborhoodObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    favorite: PropTypes.bool,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

NeighborhoodForm.defaultProps = {
  neighborhoodObj: initialState,
};

export default NeighborhoodForm;
