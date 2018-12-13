import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyDl-AYd0vY00wQcbVuWzzswzEvII41rhqE',
  authDomain: 'todo-9c204.firebaseapp.com',
  databaseURL: 'https://todo-9c204.firebaseio.com',
  projectId: 'todo-9c204',
  storageBucket: '',
  messagingSenderId: '643699755820'
}

const firebaseApp = firebase.initializeApp(config)
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp.firestore()
