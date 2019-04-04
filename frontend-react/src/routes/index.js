import FeiranteScreen from '../screens/Feirante';
import FeiraScreen from '../screens/Feira';
import AvisosScreen from '../screens/Avisos';
import SupervisoresScreen from '../screens/Supervisores';
import RelatoriosScreen from '../screens/Relatorios';
import MapeamentoScreen from '../screens/Mapeamento';
import CategoriasScreen from '../screens/Categorias';
import LoginScreen from '../screens/Login';

export default [
    {
        path: '/',
        exact: true,
        hidden: true,
        component: LoginScreen,
        key: 'login',
    },
    {
        path: '/supervisor',
        exact: true,
        private: true,
        component: FeiraScreen,
        icon: 'shop',
        key: 'feira',
        label: 'Feira',
    },
    {
        path: '/supervisor/supervisores',
        exact: true,
        private: true,
        component: SupervisoresScreen,
        icon: 'user',
        key: 'supervisores',
        label: 'Supervisores',
    },
    {
        path: '/supervisor/feirante',
        exact: true,
        private: true,
        component: FeiranteScreen,
        icon: 'team',
        key: 'feirante',
        label: 'Feirantes',
    },
    {
        path: '/supervisor/categorias',
        exact: true,
        private: true,
        component: CategoriasScreen,
        icon: 'tags',
        key: 'categorias',
        label: 'Categorias',
    },
    {
        path: '/supervisor/relatorios',
        exact: true,
        private: true,
        component: RelatoriosScreen,
        icon: 'read',
        key: 'relatorios',
        label: 'Relatórios',
    },
    {
        path: '/supervisor/mapeamento',
        exact: true,
        private: true,
        component: MapeamentoScreen,
        icon: 'table',
        key: 'mapeamento',
        label: 'Mapeamento',
    },
    {
        path: '/supervisor/avisos',
        exact: true,
        private: true,
        component: AvisosScreen,
        icon: 'info-circle',
        key: 'avisos',
        label: 'Avisos',
    },
];
