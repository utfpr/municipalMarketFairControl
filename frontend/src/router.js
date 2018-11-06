import Vue from 'vue';
import Router from 'vue-router';
import CrudSupervisor from './views/CrudSupervisor.vue';
import Categoria from './views/Categoria.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/crud',
      name: 'crud',
      component: CrudSupervisor,
    },
    {
      path: '/categoria',
      name: 'categoria',
      component: Categoria,
    },
  ],
});
