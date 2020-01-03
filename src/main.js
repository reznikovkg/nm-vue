import Vue from 'vue';
import App from './App';
import router from './router';
import AtComponents from 'at-ui';
import 'at-ui-style';

Vue.config.productionTip = false;

import store from './store';

Vue.use(AtComponents);

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
