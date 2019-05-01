import FeiranteScreen from '../screens/Feirante';
import FeiraScreen from '../screens/Feira';
import AvisosScreen from '../screens/Avisos';
import SupervisoresScreen from '../screens/Supervisores';
import RelatoriosScreen from '../screens/Relatorios';
import MapeamentoScreen from '../screens/Mapeamento';
import CategoriasScreen from '../screens/Categorias';
import RelatorioPage from '../screens/Relatorios/RelatorioPage';
import LoginScreen from '../screens/Login';
import ConfirmacaoFeirante from '../screens/ConfirmacaoFeirante';

const FEIRANTE = 'feirante';
const SUPERVISOR = 'supervisor';
const ADMINISTRADOR = 'administrador';

export default [
    {
        path: '/',
        exact: true,
        hidden: true,
        public: true,
        component: LoginScreen,
        key: 'login',
        permissions: [SUPERVISOR, ADMINISTRADOR],
    },
    {
        path: '/supervisor',
        exact: true,
        component: FeiraScreen,
        icon: 'shop',
        key: 'feira',
        label: 'Feira',
        permissions: [SUPERVISOR, ADMINISTRADOR],
    },
    {
        path: '/supervisor/supervisores',
        exact: true,
        component: SupervisoresScreen,
        icon: 'user',
        key: 'supervisores',
        label: 'Supervisores',
        permissions: [ADMINISTRADOR],
    },
    {
        path: '/supervisor/feirante',
        exact: true,
        component: FeiranteScreen,
        icon: 'team',
        key: 'feirante',
        label: 'Feirantes',
        permissions: [SUPERVISOR, ADMINISTRADOR],
    },
    {
        path: '/supervisor/categorias',
        exact: true,
        component: CategoriasScreen,
        icon: 'tags',
        key: 'categorias',
        label: 'Categorias',
        permissions: [SUPERVISOR, ADMINISTRADOR],
    },
    {
        path: '/supervisor/relatorios',
        exact: true,
        component: RelatoriosScreen,
        icon: 'read',
        key: 'relatorios',
        label: 'Relatórios',
        permissions: [SUPERVISOR, ADMINISTRADOR],
    },
    {
        path: '/supervisor/relatorios/:data',
        exact: true,
        hidden: true,
        component: RelatorioPage,
        icon: 'read',
        key: 'relatoriopage',
        label: 'Relatórios',
        permissions: [SUPERVISOR, ADMINISTRADOR],
    },
    {
        path: '/supervisor/mapeamento',
        exact: true,
        component: MapeamentoScreen,
        icon: 'table',
        key: 'mapeamento',
        label: 'Mapeamento',
        permissions: [SUPERVISOR, ADMINISTRADOR],
    },
    {
        path: '/supervisor/avisos',
        exact: true,
        component: AvisosScreen,
        icon: 'info-circle',
        key: 'avisos',
        label: 'Avisos',
        permissions: [SUPERVISOR, ADMINISTRADOR],
    },
    {
        path: '/feirante',
        exact: true,
        hidden: true,
        component: ConfirmacaoFeirante,
        icon: 'check',
        key: 'confirmacao',
        label: 'Confirmação',
        permissions: [FEIRANTE],
    },
    {
        path: '/feirante/relatorio',
        exact: true,
        hidden: true,
        component: ConfirmacaoFeirante,
        icon: 'table',
        key: 'relatorio',
        label: 'Relatório',
        permissions: [FEIRANTE],
    },
];
