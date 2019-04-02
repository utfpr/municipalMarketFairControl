import FeiranteScreen from '../screens/Feirante';
import FeiraScreen from '../screens/Feira';
import AvisosScreen from '../screens/Avisos';
import SupervisoresScreen from '../screens/Supervisores';
import RelatoriosScreen from '../screens/Relatorios';
import MapeamentoScreen from '../screens/Mapeamento';
import LoginScreen from '../screens/Login';

export default [
    {
        path: '/login',
        exact: true,
        hidden: true,
        component: LoginScreen,
        key: 'login',
    },
    {
        path: '/',
        exact: true,
        private: true,
        component: FeiraScreen,
        icon: 'shop',
        key: 'feira',
        label: 'Feira',
    },
    {
        path: '/supervisores',
        exact: true,
        private: true,
        component: SupervisoresScreen,
        icon: 'user',
        key: 'supervisores',
        label: 'Supervisores',
    },
    {
        path: '/feirante',
        exact: true,
        private: true,
        component: FeiranteScreen,
        icon: 'team',
        key: 'feirante',
        label: 'Feirantes',
    },
    {
        path: '/relatorios',
        exact: true,
        private: true,
        component: RelatoriosScreen,
        icon: 'read',
        key: 'relatorios',
        label: 'Relatórios',
    },
    {
        path: '/mapeamento',
        exact: true,
        private: true,
        component: MapeamentoScreen,
        icon: 'table',
        key: 'mapeamento',
        label: 'Mapeamento',
    },
    {
        path: '/avisos',
        exact: true,
        private: true,
        component: AvisosScreen,
        icon: 'info-circle',
        key: 'avisos',
        label: 'Avisos',
    },
];
