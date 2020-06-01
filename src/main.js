import Vue from 'vue';
import App from './App.vue';
import router from './router';
import * as firebase from 'firebase';
import store from './store';

const {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
} = process.env;

Vue.config.productionTip = false;

const configOptions = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
};

firebase.initializeApp(configOptions);
firebase.auth().onAuthStateChanged(user => {
  store.dispatch('fetchUser', user);
});

let app = null;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});
