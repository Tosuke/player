import * as firebase from 'firebase-admin'

if (firebase.apps.length === 0) {
  firebase.initializeApp()
}

export default firebase