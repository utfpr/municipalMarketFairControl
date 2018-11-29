import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Login2 from './views/About.vue';

import MenuSupervisor from './views/supervisor/MenuSupervisor.vue';
import Feira from './views/supervisor/Feira.vue';
import Supervisor from './views/supervisor/Supervisor.vue';
import Feirante from './views/supervisor/Feirante.vue';
import Categoria from './views/supervisor/Categoria.vue';
import Mapeamento from './views/supervisor/Mapeamento.vue';

import MenuFeirante from './views/feirante/MenuFeirante.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/login2',
      name: 'login2',
      component: Login2,
    },
    {
      path: '/feirante',
      name: 'feirante',
      component: MenuFeirante,
    },
    {
      path: '/supervisor',
      name: 'supervisor',
      component: MenuSupervisor,
      children: [
        {
          path: '',
          component: Feira,
        },
        {
          path: 'supervisores',
          component: Supervisor,
        },
        {
          path: 'feirantes',
          component: Feirante,
        },
        {
          path: 'categorias',
          component: Categoria,
        },
        {
          path: 'mapeamento',
          component: Mapeamento,
        },
      ],
    },
  ],
});
