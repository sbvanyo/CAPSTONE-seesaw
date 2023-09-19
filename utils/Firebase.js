// Import the functions you need from the SDKs you need
import { firebase } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAx-8BoJrj_ZGB6oD97A8JMxMfWsaFlMwI',
  authDomain: 'seesaw-970b6.firebaseapp.com',
  databaseURL: 'https://seesaw-970b6-default-rtdb.firebaseio.com',
  projectId: 'seesaw-970b6',
  storageBucket: 'seesaw-970b6.appspot.com',
  messagingSenderId: '462457964748',
  appId: '1:462457964748:web:4d4fbd7095e892fa0ada69',
  measurementId: 'G-220KSQBTSF',
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export default const storage = getStorage(app);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();

export default { storage };
