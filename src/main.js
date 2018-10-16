import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import AtComponents from 'at-ui';
import 'at-ui-style';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(AtComponents);


import Spline from './vuex/Spline'
import tMatrix from './vuex/tMatrix'

const store = new Vuex.Store({
    modules: {
        spline: Spline,
        tMatrix: tMatrix
    }
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
