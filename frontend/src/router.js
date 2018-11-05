import Vue from 'vue';
import Router from 'vue-router';
import CrudFeirante from './views/CrudFeirante.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/crud',
      name: 'crud',
      component: CrudFeirante,
    },
  ],
});