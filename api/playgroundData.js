import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getPlaygrounds = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deletePlayground = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSinglePlayground = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createPlayground = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds.json`, {
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

const updatePlayground = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getPlaygroundsInNeighborhood = (firebaseKey) => new Promise((resolve, reject) => {
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

const favoritePlaygrounds = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds.json?orderBy="uid"&equalTo="${uid}"`, {
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

const visitedPlaygrounds = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const visited = Object.values(data).filter((item) => item.visited);
      resolve(visited);
    })
    .catch(reject);
});

// const booksOnSale = (uid) => new Promise((resolve, reject) => {
//   fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const onSale = Object.values(data).filter((item) => item.sale);
//       resolve(onSale);
//     })
//     .catch(reject);
// });

export {
  getPlaygrounds,
  createPlayground,
  favoritePlaygrounds,
  visitedPlaygrounds,
  // booksOnSale,
  deletePlayground,
  getSinglePlayground,
  updatePlayground,
  getPlaygroundsInNeighborhood,
};
