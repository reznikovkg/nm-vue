import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import navigation from './modules/navigation';
import models from './modules/models';
import scene from './modules/scene';

export default new Vuex.Store({
	modules: {
		navigation,
		models,
		scene
	}
});