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

// Fetches data about a specific playground from Firebase, and updates that playground's 'favoritedBy' array to include current user if not already included
const addFavoritePlayground = (firebaseKey, uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds/${firebaseKey}.json`)
    .then((response) => response.json())
    // Processes the data fetched from the server: favoritedBy variable takes on value of returned data, defaulting to empty array if nothing is returned.
    .then((data) => {
      const favoritedBy = data.favoritedBy || [];
      // Checks if active user's uid is already in favoritedBy array, and if it's not, adds it.
      if (!favoritedBy.includes(uid)) {
        favoritedBy.push(uid);
      }
      // Anoter fetch request to update the favoritedBy array with the new list including user's uid
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

const getPlaygroundImages = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/images.json?orderBy="playground_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
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
  getPlaygroundImages,
};
