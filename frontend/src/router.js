import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';

import MenuSupervisor from './views/supervisor/MenuSupervisor.vue';
import Feira from './views/supervisor/Feira.vue';
import Supervisor from './views/supervisor/Supervisor.vue';
import Feirante from './views/supervisor/Feirante.vue';
import Categoria from './views/supervisor/Categoria.vue';
import Mapeamento from './views/supervisor/Mapeamento.vue';
import Aviso from './views/supervisor/Aviso.vue';
import Relatorio from './views/supervisor/Relatorio.vue';

import MenuFeirante from './views/feirante/MenuFeirante.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        login: true,
      },
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
        {
          path: 'aviso',
          component: Aviso,
        },
        {
          path: 'relatorio',
          component: Relatorio,
        },
      ],
    },
    {
      path: '/categoria',
      name: 'categoria',
      component: Categoria,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const login = to.matched.some(record => record.meta.login);
  if (login) {
    next();
  } else if (!localStorage.getItem('token')) {
    next('/login');
  } else {
    next();
  }
});

export default router;
