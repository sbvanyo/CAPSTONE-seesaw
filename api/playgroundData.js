import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getPlaygrounds = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds.json`, {
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
  if (!payload.visitedBy || payload.visitedBy.length === 0) {
    // eslint-disable-next-line no-param-reassign
    payload.visitedBy = '';
  }
  if (!payload.favoritedBy || payload.favoritedBy.length === 0) {
    // eslint-disable-next-line no-param-reassign
    payload.favoritedBy = '';
  }

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
  fetch(`${endpoint}/playgrounds.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const playgrounds = Object.values(data);
      const favorites = playgrounds.filter((playground) => playground.favoritedBy && playground.favoritedBy.includes(uid));
      resolve(favorites);
    })
    .catch(reject);
});

const addFavoritePlayground = (firebaseKey, uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds/${firebaseKey}.json`)
    .then((response) => response.json())
    .then((data) => {
      const favoritedBy = data.favoritedBy || [];
      if (!favoritedBy.includes(uid)) {
        favoritedBy.push(uid);
      }
      return fetch(`${endpoint}/playgrounds/${firebaseKey}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ favoritedBy }),
      });
    })
    .then(() => resolve())
    .catch(reject);
});

const removeFavoritePlayground = (firebaseKey, uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds/${firebaseKey}.json`)
    .then((response) => response.json())
    .then((data) => {
      let favoritedBy = data.favoritedBy || [];
      favoritedBy = favoritedBy.filter((id) => id !== uid);
      return fetch(`${endpoint}/playgrounds/${firebaseKey}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ favoritedBy }),
      });
    })
    .then(() => resolve())
    .catch(reject);
});

const visitedPlaygrounds = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const playgrounds = Object.values(data);
      const visited = playgrounds.filter((playground) => playground.visitedBy && playground.visitedBy.includes(uid));
      resolve(visited);
    })
    .catch(reject);
});

const addVisitedPlayground = (firebaseKey, uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds/${firebaseKey}.json`)
    .then((response) => response.json())
    .then((data) => {
      const visitedBy = data.visitedBy || [];
      if (!visitedBy.includes(uid)) {
        visitedBy.push(uid);
      }
      return fetch(`${endpoint}/playgrounds/${firebaseKey}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ visitedBy }),
      });
    })
    .then(() => resolve())
    .catch(reject);
});

const removeVisitedPlayground = (firebaseKey, uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds/${firebaseKey}.json`)
    .then((response) => response.json())
    .then((data) => {
      let visitedBy = data.visitedBy || [];
      visitedBy = visitedBy.filter((id) => id !== uid);
      return fetch(`${endpoint}/playgrounds/${firebaseKey}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ visitedBy }),
      });
    })
    .then(() => resolve())
    .catch(reject);
});

// const favoritePlaygrounds = (uid) => new Promise((resolve, reject) => {
//   fetch(`${endpoint}/playgrounds.json?orderBy="uid"&equalTo="${uid}"`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const favorites = Object.values(data).filter((item) => item.favorite);
//       resolve(favorites);
//     })
//     .catch(reject);
// });

// const visitedPlaygrounds = (uid) => new Promise((resolve, reject) => {
//   fetch(`${endpoint}/playgrounds.json?orderBy="uid"&equalTo="${uid}"`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const visited = Object.values(data).filter((item) => item.visited);
//       resolve(visited);
//     })
//     .catch(reject);
// });

const filterPlaygrounds = (filterType) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const filteredData = Object.values(data).filter((item) => item[filterType]);
      resolve(filteredData);
    })
    .catch(reject);
});

export {
  getPlaygrounds,
  createPlayground,
  favoritePlaygrounds,
  visitedPlaygrounds,
  deletePlayground,
  getSinglePlayground,
  updatePlayground,
  getPlaygroundsInNeighborhood,
  filterPlaygrounds,
  addFavoritePlayground,
  removeFavoritePlayground,
  addVisitedPlayground,
  removeVisitedPlayground,
};
