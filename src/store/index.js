import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import scene2d from './modules/scene2d';
import scene3d from './modules/scene3d';
import cache from './modules/cache';

export default new Vuex.Store({
	modules: {
		cache,
		scene2d,
		scene3d
	}
});