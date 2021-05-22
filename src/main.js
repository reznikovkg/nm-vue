import Vue from 'vue';
import App from './App';
import AtComponents from 'at-ui';
import 'at-ui-style';

Vue.config.productionTip = false;


Vue.use(AtComponents);

import VueTouch from 'vue-touch';
Vue.use(VueTouch, { name: 'v-touch' });


import store from './store';
import router from './router';
import { sync } from 'vuex-router-sync';
sync(store, router);

import SelectModel from "@/components/Elements/Forms/Elements/SelectModel";
Vue.component('SelectModel', SelectModel);

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
