import { getNeighborhoodPlaygrounds, getSingleNeighborhood, deleteSingleNeighborhood } from './neighborhoodData';
import { getSinglePlayground, deletePlayground } from './playgroundData';

const viewPlaygroundDetails = (playgroundFirebaseKey) => new Promise((resolve, reject) => {
  getSinglePlayground(playgroundFirebaseKey)
    .then((playgroundObject) => {
      console.warn(playgroundObject);
      getSingleNeighborhood(playgroundObject.neighborhood_id)
        .then((neighborhoodObject) => {
          resolve({ neighborhoodObject, ...playgroundObject });
        });
    }).catch((error) => reject(error));
});

const viewNeighborhoodDetails = (neighborhoodFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleNeighborhood(neighborhoodFirebaseKey), getNeighborhoodPlaygrounds(neighborhoodFirebaseKey)])
    .then(([neighborhoodObject, neighborhoodPlaygroundsArray]) => {
      resolve({ ...neighborhoodObject, playgrounds: neighborhoodPlaygroundsArray });
    }).catch((error) => reject(error));
});

const deleteNeighborhoodPlaygrounds = (neighborhoodId) => new Promise((resolve, reject) => {
  getNeighborhoodPlaygrounds(neighborhoodId).then((playgroundsArray) => {
    // console.warn(playgroundsArray, 'Neighborhood Playgrounds');
    const deletePlaygroundPromises = playgroundsArray.map((playground) => deletePlayground(playground.firebaseKey));

    Promise.all(deletePlaygroundPromises).then(() => {
      deleteSingleNeighborhood(neighborhoodId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewPlaygroundDetails, viewNeighborhoodDetails, deleteNeighborhoodPlaygrounds };
