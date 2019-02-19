import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyCsfPTKJ16yYxKNo7X79ouxIn7YQe2H-bY',
  authDomain: 'ipark-2997b.firebaseapp.com',
  databaseURL: 'https://ipark-2997b.firebaseio.com',
  projectId: 'ipark-2997b',
  storageBucket: 'ipark-2997b.appspot.com',
  messagingSenderId: '670632380239'
}

const firebaseApp = firebase.initializeApp(config)
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp.firestore()
