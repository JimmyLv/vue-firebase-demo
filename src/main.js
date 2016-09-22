import Vue from 'vue'
import VueFire from 'vuefire'
import Firebase from 'firebase'

// explicit installation required in module environments
Vue.use(VueFire)

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBbda4Ef8HwJ2Zh9grD_IcMKXP3uu3ik4Q',
  authDomain: 'vuefiredemo-581ec.firebaseapp.com',
  databaseURL: 'https://vuefiredemo-581ec.firebaseio.com',
  storageBucket: 'vuefiredemo-581ec.appspot.com',
}
const firebaseApp = Firebase.initializeApp(config)
const db = firebaseApp.database()
//
// db.ref().child('notes').set([
//   { text: 'Hello World!' },
//   { text: 'Hello World2!' },
//   { text: 'Hello World3!' },
// ])

import App from './App'

/* eslint-disable no-new */
const vm = new Vue({
  el: '#demo',
  components: { App },
  data: {
    note: 'Hello 么么哒😘!',
  },
  methods: {
    addNote() {
      if (this.note.trim()) {
        db.ref('notes').push({
          text: this.note,
        })
        this.note = ''
      }
    },
  },
  firebase: {
    // simple syntax, bind as an array by default
    anArray: db.ref('notes'),
    // can also bind to a query
    // anArray: db.ref('url/to/my/collection').limitToLast(25)
    // full syntax
    anObject: {
      source: db.ref('notes'),
      // optionally bind as an object
      asObject: true,
      // optionally provide the cancelCallback
      cancelCallback() {
      },
    },
  },
})


db.ref().child('notes').on('value', (snapshot) => {
  const notes = snapshot.val()
  console.log('notes', notes)
})

// add an item to the array
vm.$firebaseRefs.anArray.push(
  { text: `Hello! 欢迎回到聊天室。${JSON.stringify(db.ref('notes').once())}` }
)

