import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    auth: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'Not Found',
    component: NotFound
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.auth);
  const currentUser = firebase.auth().currentUser;
  if (requiresAuth && !currentUser) {
    next('/login');
  } else {
    next();
  }
});

export default router;
