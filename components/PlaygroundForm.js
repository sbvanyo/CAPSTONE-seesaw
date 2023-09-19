/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button, Image } from 'react-bootstrap';
import firebase from 'firebase/app';
import 'firebase/storage';
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
  visitedBy: [],
  favorite: false,
  favoritedBy: [],
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
  const [imageUpload, setImageUpload] = useState(null);

  const router = useRouter();
  const { user } = useAuth();

  const storage = firebase.storage();
  const storageRef = storage.ref();

  useEffect(() => {
    console.warn('imageUpload state:', imageUpload);
  }, [imageUpload]);

  useEffect(() => {
    getNeighborhoods(user.uid).then(setNeighborhoods);

    if (playgroundObj.firebaseKey) {
      if (playgroundObj.uid === user.uid) {
        setFormInput(playgroundObj);
      } else {
        setFormInput((prevState) => ({
          ...playgroundObj,
          uid: prevState.uid,
        }));
      }
    }
  }, [playgroundObj, user]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];
      console.warn('selected file:', file);
      if (file) { // checks if a file is selected\
        setFormInput((prevState) => ({
          ...prevState,
          image: file,
        }));

        const fileRef = storageRef.child(`images/${file.name}`);
        const uploadTask = fileRef.put(file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.warn(`Upload is ${progress}% done`); // Debugging step 2
          },
          (error) => {
            console.warn(error);
          },
          () => {
            fileRef.getDownloadURL().then((url) => {
              console.warn('download url:', url);
              setImageUpload(url);
              setFormInput((prevState) => ({
                ...prevState,
                image: url,
              }));
              console.warn('imageUpload state after setting:', imageUpload, url);
            }).catch((error) => {
              console.warn('failed to get download url:', error);
            });
          },
        );
      }
    } else {
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormInput = {
      ...formInput,
      image: imageUpload,
    };

    if (playgroundObj.firebaseKey) {
      // Update the playground object
      await updatePlayground(updatedFormInput).then(() => router.push(`/playground/${playgroundObj.firebaseKey}`));
    } else {
      // Create a new playground
      const payload = {
        ...formInput,
        uid: user.uid,
      };
      createPlayground(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePlayground(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  // const uploadImage = () => {
  //   if (imageUpload == null) return;
  // };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="formTitle">{playgroundObj.firebaseKey ? 'update' : 'create'} a playground</h2>
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
      <FloatingLabel controlId="floatingInput2" label="playground image" className="mb-3">
        <Form.Control
          type="file"
          placeholder="upload an image"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />
        {/* <Button
          onClick={uploadImage}
          onChange={(e) => {
            setImageUpload(e.target.files[0]);
          }}
        >upload
        </Button> */}
      </FloatingLabel>
      {imageUpload && <Image src={imageUpload} alt="preview" width="200" />}

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
      <div id="featuresContainer">
        <h5 id="featuresTitle">FEATURES</h5>
        <hr />
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

          <Form.Check
            className="text-white mb-3"
            type="checkbox"
            id="indoor"
            name="indoor"
            label="indoor"
            checked={formInput.indoor}
            onChange={(e) => {
              setFormInput((prevState) => ({
                ...prevState,
                indoor: e.target.checked,
              }));
            }}
          />
        </div>
      </div>

      <br />

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
    favoritedBy: PropTypes.array,
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
    visitedBy: PropTypes.array,
    water: PropTypes.bool,
    zip: PropTypes.string,
  }),
};

PlaygroundForm.defaultProps = {
  playgroundObj: initialState,
};

export default PlaygroundForm;
