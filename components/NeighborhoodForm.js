import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { updateNeighborhood, createNeighborhood } from '../api/neighborhoodData';

const initialState = {
  name: '',
  image: '',
  favorite: false,
};

function NeighborhoodForm({ neighborhoodObj }) {
  const [formInput, setFormInput] = useState(initialState);
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
      <FloatingLabel controlId="floatingInput1" label="neighborhood name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="enter neighborhood name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="neighborhood image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit" className="submitBtn">{neighborhoodObj.firebaseKey ? 'update' : 'create'} neighborhood</Button>
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
