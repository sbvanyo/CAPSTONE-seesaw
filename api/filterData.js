import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const commCenterFilter = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const commCenter = Object.values(data).filter((item) => item.comm_center);
      resolve(commCenter);
    })
    .catch(reject);
});

const hikingFilter = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const hiking = Object.values(data).filter((item) => item.hiking);
      resolve(hiking);
    })
    .catch(reject);
});

const indoorFilter = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const indoor = Object.values(data).filter((item) => item.indoor);
      resolve(indoor);
    })
    .catch(reject);
});

const libraryFilter = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const library = Object.values(data).filter((item) => item.library);
      resolve(library);
    })
    .catch(reject);
});

const pavedTrailFilter = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const pavedTrail = Object.values(data).filter((item) => item.paved_trail);
      resolve(pavedTrail);
    })
    .catch(reject);
});

const pavilionFilter = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const pavilion = Object.values(data).filter((item) => item.pavilion);
      resolve(pavilion);
    })
    .catch(reject);
});

const sandboxFilter = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const sandbox = Object.values(data).filter((item) => item.sandbox);
      resolve(sandbox);
    })
    .catch(reject);
});

const waterFilter = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playgrounds.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const water = Object.values(data).filter((item) => item.water);
      resolve(water);
    })
    .catch(reject);
});

export {
  commCenterFilter,
  hikingFilter,
  indoorFilter,
  libraryFilter,
  pavedTrailFilter,
  pavilionFilter,
  sandboxFilter,
  waterFilter,
};
