export const getters = {
	getModels: (state, getters, rootState) => {
		return state.models;
	},
	getActiveModel: (state, getters, rootState) => {
		return state.models.find(item => item.hash === state.activeModelHash);
	},
	getModelByHash: (state) => {
		return (hash) => {
			return state.models.find((item) => (item.hash === hash))
		}
	}
};

export const mutations = {
	/**
	 * STATUS: DONE
	 *
	 * @param state
	 * @param model
	 */
	addModel(state, model) {
		state.models.push(model);
		state.activeModelHash = model.hash;
	},
	removeModel(state, model) {
		state.models.splice(
			state.models.findIndex((item) => (item.hash === model.hash)),
			1
		);
	},
	setActiveModel(state, model) {
		state.activeModelHash = model.hash;
	},
	toggleShowModel(state, model) {
		model.toggleShow();
	},
	toggleShowModelByHash(state, hash) {
		// if (state.models[index].inverseShow) {
		// 	state.models[index].inverseShow()
		// } else {
		// 	state.models[index].show = !state.models[index].show;
		// }
	},

	reBuildModels(state) {
		state.models = [...(state.models)];
		state.buildCount++;
	},
	setTitleOfModel(state, params) {
		params.model.setTitle(params.title);
	},
	setAnimationOfModel(state, animate) {
		state.models.find(item => item.hash === state.activeModelHash).setAnimationOfModel(animate);
	},
	setColor(state, c) {
		state.models.find(item => item.hash === state.activeModelHash).setColor(c);
	},
};

export const actions = {
	toggleShowModel({ commit, dispatch }, model) {
		commit('toggleShowModel', model);
		dispatch('reBuildModels');
	},


	toggleShowModelByHash({ commit, dispatch }, index) {
		commit('toggleShowModelByHash', index);
		dispatch('reBuildModels');
	},

	addModel({ commit, dispatch }, model) {
		commit('addModel', model);
		dispatch('reBuildModels');
	},

	removeModel({ commit, dispatch }, model) {
		commit('removeModel', model);
		dispatch('reBuildModels');
	},
	setTitleOfModel({ commit, dispatch }, model) {
		commit('setTitleOfModel', model);
		dispatch('reBuildModels');
	},
	setAnimationOfModel({ commit, dispatch }, params) {
		commit('setAnimationOfModel', params);
		dispatch('reBuildModels');
	},
	setColor({ commit, dispatch }, c) {
		commit('setColor', c);
		dispatch('reBuildModels');
	},
	reBuildModels({ commit, dispatch }) {
		commit('reBuildModels');
		dispatch('scene/reRender', null, { root: true });
	},
};

export default {
	getters,
	mutations,
	actions
}
