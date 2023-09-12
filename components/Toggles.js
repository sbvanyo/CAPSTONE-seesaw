// import { React, useState, useEffect } from 'react';
// import { useAuth } from '../utils/context/authContext';
// import { addFavoritePlayground, removeFavoritePlayground } from '../api/playgroundData';

// function ToggleFavorite({ playgroundObj }) {
//   const [isFavorite, setIsFavorite] = useState(false);
//   const user = useAuth();

//   useEffect(() => {
//     setIsFavorite(playgroundObj.favoritedBy.includes(user.uid));
//   }, [playgroundObj.favoritedBy, user.uid]);

//   const togglefave = () => {
//     if (isFavorite) {
//       removeFavoritePlayground(playgroundObj.firebaseKey, user.uid)
//         .then(() => {
//           setIsFavorite(false);
//         })
//         .catch((error) => {
//           console.error('Error removing favorite:', error);
//         });
//     } else {
//       addFavoritePlayground(playgroundObj.firebaseKey, user.uid)
//         .then(() => {
//           setIsFavorite(true);
//         })
//         .catch((error) => {
//           console.error('Error adding favorite:', error);
//         });
//     }
//   };
// }

// export default ToggleFavorite;
