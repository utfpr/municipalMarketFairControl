import Vue from 'vue';
import 'ant-design-vue/dist/antd.css';

import { notification } from 'ant-design-vue';

Vue.prototype.$notification = notification;

const Ant = require('ant-design-vue');

// alguns exemplos
Vue.use(Ant.Tag);
Vue.use(Ant.Button);
Vue.use(Ant.Checkbox);
Vue.use(Ant.Menu);
Vue.use(Ant.Table);
Vue.use(Ant.Input);
Vue.use(Ant.Form);
Vue.use(Ant.Icon);
Vue.use(Ant.Row);
Vue.use(Ant.Col);
Vue.use(Ant.Radio);
Vue.use(Ant.Card);
