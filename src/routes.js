import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Retro from './views/nav1/Retro.vue'
import Socket from './views/nav1/Socket'
import Action from './views/nav1/Action'
import Echarts from './views/nav1/Defect'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/socket',
        component: Socket,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/retro', component: Retro, name: 'Retro' },
            { path: '/action', component: Action, name: 'Action' },
            {path: '/charts', component: Echarts, name: 'Echarts'}
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;