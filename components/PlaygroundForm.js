import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getNeighborhoods } from '../api/neighborhoodData';
import { createPlayground, updatePlayground } from '../api/playgroundData';

const initialState = {
  name: '',
  image: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  hot_tip: '',
  visited: false,
  favorite: false,
  paved_trail: false,
  pavilion: false,
  library: false,
  comm_center: false,
  water: false,
  indoor: false,
  sandbox: false,
  hiking: false,
};

function PlaygroundForm({ playgroundObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getNeighborhoods(user.uid).then(setNeighborhoods);

    if (playgroundObj.firebaseKey) setFormInput(playgroundObj);
  }, [playgroundObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playgroundObj.firebaseKey) {
      updatePlayground(formInput).then(() => router.push(`/playground/${playgroundObj.firebaseKey}`));
    } else {
      // Spread syntax unpacks state object (formInput) and allows us to add uid to it
      const payload = { ...formInput, uid: user.uid };
      createPlayground(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePlayground(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{playgroundObj.firebaseKey ? 'update' : 'create'} playground</h2>

      {/* NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="playground name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter playground name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Playground Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Upload an image"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* STREET ADDRESS INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Street Address" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter street address"
          name="address"
          value={formInput.address}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* CITY INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="City" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter city"
          name="city"
          value={formInput.city}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* STATE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="State" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter state"
          name="state"
          value={formInput.state}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* ZIP CODE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Zip Code" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter zip code"
          name="zip"
          value={formInput.zip}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* NEIGHBORHOOD SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Neighborhood">
        <Form.Select
          aria-label="Neighborhood"
          name="neighborhood_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.neighborhood_id}
          required
        >
          <option value="">Select a Neighborhood</option>
          {
            neighborhoods.map((neighborhood) => (
              <option
                key={neighborhood.firebaseKey}
                value={neighborhood.firebaseKey}
              >
                {neighborhood.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* HOT TIP TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Hot Tip" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Hot Tip"
          style={{ height: '100px' }}
          name="hot_tip"
          value={formInput.hot_tip}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="visited"
        name="visited"
        label="Visited?"
        checked={formInput.visited}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            visited: e.target.checked,
          }));
        }}
      />

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
      <Button type="submit">{playgroundObj.firebaseKey ? 'update' : 'create'} playground</Button>
    </Form>
  );
}

PlaygroundForm.propTypes = {
  playgroundObj: PropTypes.shape({
    address: PropTypes.string,
    city: PropTypes.string,
    comm_center: PropTypes.bool,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
    hiking: PropTypes.bool,
    hot_tip: PropTypes.string,
    image: PropTypes.string,
    indoor: PropTypes.bool,
    latlng: PropTypes.string,
    library: PropTypes.bool,
    name: PropTypes.string,
    neighborhood: PropTypes.string,
    neighborhood_id: PropTypes.string,
    paved_trail: PropTypes.bool,
    pavilion: PropTypes.bool,
    sandbox: PropTypes.bool,
    state: PropTypes.string,
    uid: PropTypes.string,
    visited: PropTypes.bool,
    water: PropTypes.bool,
    zip: PropTypes.string,
  }),
};

PlaygroundForm.defaultProps = {
  playgroundObj: initialState,
};

export default PlaygroundForm;
