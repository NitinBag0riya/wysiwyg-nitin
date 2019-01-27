var Rebase = require('re-base');
var firebase = require('firebase');
var app = firebase.initializeApp({
  apiKey: "xxxxxx",
  authDomain: "xxxxxx",
  databaseURL: "xxxxxxx",
  projectId: "xxxxxxx",
  storageBucket: "xxxxxxxxx",
  messagingSenderId: "xxxxxxxxx"
});

var base = Rebase.createClass(app.database());

export default base;
