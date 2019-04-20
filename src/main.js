import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import AtComponents from 'at-ui';
import 'at-ui-style';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(AtComponents);

const store = new Vuex.Store({
    modules: {

    }
});

new Vue({
    el: '#app',
        data () {
            return {
                points:[]
            }
        },
    router,
    store,
    components: { App },
    template: '<App/>'
});
