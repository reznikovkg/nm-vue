import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Pages/Homepage'

import Scene2D from '../components/Pages/Scene2D'
import Scene3D from '../components/Pages/Scene3D'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: '/nm-vue/',
    routes: [
        {
            path: '/',
            name: 'Homepage',
            component: Homepage
        },
        {
            path: '/scene2d',
            name: 'scene2d',
            component: Scene2D
        },
        {
            path: '/scene3d',
            name: 'scene3d',
            component: Scene3D
        }
    ]
})
