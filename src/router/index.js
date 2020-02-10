import Vue from 'vue';
import Router from 'vue-router';

import Homepage from '@/components/Pages/Homepage';

import Scene2D from '../components/Pages/Scene2D';
import Scene3D from '../components/Pages/Scene3D';
import Documentation from '../components/Pages/Documentation';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'Homepage',
            component: Homepage
        },
        {
            path: '/scene2d',
            name: 'Scene2D',
            component: Scene2D
        },
        {
            path: '/scene3d',
            name: 'Scene3D',
            component: Scene3D
        },
        {
            path: '/documentation',
            name: 'Documentation',
            component: Documentation
        }
    ]
})
