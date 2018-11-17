import Vue from 'vue';
import Router from 'vue-router';
// import CrudSupervisor from './views/CrudSupervisor.vue';
// import TelaMapeamento from './views/TelaMapeamento.vue';
import Login from './views/Login.vue';
import Feirante from './views/Feirante.vue';
import Supervisor from './views/Supervisor.vue';

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
      path: '/feirante',
      name: 'feirante',
      component: Feirante,
    },
    {
      path: '/supervisor',
      name: 'supervisor',
      component: Supervisor,
    },
  ],
});
