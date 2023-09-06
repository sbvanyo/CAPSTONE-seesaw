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

    if (playgroundObj.firebaseKey) {
      if (playgroundObj.uid === user.uid) {
        setFormInput(playgroundObj);
      } else {
        setFormInput((prevState) => ({
          ...playgroundObj,
          visited: false,
          favorite: false,
          uid: prevState.uid,
        }));
      }
    }
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
      <hr />

      {/* NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="playground name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="enter playground name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="playground image url" className="mb-3">
        <Form.Control
          type="url"
          placeholder="upload an image"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* STREET ADDRESS INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="street address" className="mb-3">
        <Form.Control
          type="text"
          placeholder="enter street address"
          name="address"
          value={formInput.address}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* CITY INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="city" className="mb-3">
        <Form.Control
          type="text"
          placeholder="enter city"
          name="city"
          value={formInput.city}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* STATE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="state" className="mb-3">
        <Form.Control
          type="text"
          placeholder="enter state"
          name="state"
          value={formInput.state}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* ZIP CODE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="zip code" className="mb-3">
        <Form.Control
          type="text"
          placeholder="enter zip code"
          name="zip"
          value={formInput.zip}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* NEIGHBORHOOD SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="neighborhood" className="mb-3">
        <Form.Select
          aria-label="neighborhood"
          name="neighborhood_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.neighborhood_id}
          required
        >
          <option value="">select a neighborhood</option>
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
      <FloatingLabel controlId="floatingTextarea" label="HOT TIP (what to know before you go...)" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="HOT TIP"
          style={{ height: '100px' }}
          name="hot_tip"
          value={formInput.hot_tip}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <br />

      {/* FEATURES CHECKBOXES */}
      <h5 id="featuresTitle">FEATURES</h5>
      <div id="checkboxGroup">
        <Form.Check
          className="text-white mb-3"
          type="checkbox"
          id="paved_trail"
          name="paved_trail"
          label="paved trail"
          checked={formInput.paved_trail}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              paved_trail: e.target.checked,
            }));
          }}
        />

        <Form.Check
          className="text-white mb-3"
          type="checkbox"
          id="hiking"
          name="hiking"
          label="hiking"
          checked={formInput.hiking}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              hiking: e.target.checked,
            }));
          }}
        />

        <Form.Check
          className="text-white mb-3"
          type="checkbox"
          id="pavilion"
          name="pavilion"
          label="picnic pavilion"
          checked={formInput.pavilion}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              pavilion: e.target.checked,
            }));
          }}
        />

        <Form.Check
          className="text-white mb-3"
          type="checkbox"
          id="water"
          name="water"
          label="water play"
          checked={formInput.water}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              water: e.target.checked,
            }));
          }}
        />

        <Form.Check
          className="text-white mb-3"
          type="checkbox"
          id="sandbox"
          name="sandbox"
          label="sandbox"
          checked={formInput.sandbox}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              sandbox: e.target.checked,
            }));
          }}
        />

        <Form.Check
          className="text-white mb-3"
          type="checkbox"
          id="library"
          name="library"
          label="next to a library"
          checked={formInput.library}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              library: e.target.checked,
            }));
          }}
        />

        <Form.Check
          className="text-white mb-3"
          type="checkbox"
          id="comm_center"
          name="comm_center"
          label="next to a community center"
          checked={formInput.comm_center}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              comm_center: e.target.checked,
            }));
          }}
        />
      </div>

      <br />

      {/* VISITED + FAVORITE TOGGLES */}
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
      <Button type="submit" className="submitBtn">{playgroundObj.firebaseKey ? 'update' : 'create'} playground</Button>
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
