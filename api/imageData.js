import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getImages = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/images.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteImage = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/images/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSingleImage = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/images/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createImage = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/images.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getImages,
  deleteImage,
  getSingleImage,
  createImage,
};
