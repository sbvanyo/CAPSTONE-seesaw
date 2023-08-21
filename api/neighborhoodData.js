import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getNeighborhoods = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/neighborhoods.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createNeighborhood = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/neighborhoods.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleNeighborhood = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/neighborhoods/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleNeighborhood = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/neighborhoods/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateNeighborhood = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/neighborhoods/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getNeighborhoodPlaygrounds = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds.json?orderBy="neighborhood_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const favoriteNeighborhoods = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/neighborhoods.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const favorites = Object.values(data).filter((item) => item.favorite);
      resolve(favorites);
    })
    .catch(reject);
});

export {
  getNeighborhoods,
  createNeighborhood,
  getSingleNeighborhood,
  deleteSingleNeighborhood,
  updateNeighborhood,
  favoriteNeighborhoods,
  getNeighborhoodPlaygrounds,
};
