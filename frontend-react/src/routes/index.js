import HomeScreen from '../screens/HomeScreen';

export default [
    {
        path: '/',
        exact: true,
        component: HomeScreen,
        icon: 'home',
        key: 'home',
        label: 'Home',
    },
    {
        path: '/user',
        exact: true,
        hidden: true,
        component: HomeScreen,
        icon: 'user',
        key: 'usuario',
        label: 'Usuário',
    },
];
