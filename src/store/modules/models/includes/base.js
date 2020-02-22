export const getters = {
	getModels: (state, getters, rootState) => {
		return state.models;
	},
	getActiveModel: (state, getters, rootState) => {
		return state.activeModel;
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
		state.activeModel = model;
	},
	removeModel(state, model) {
		state.models.splice(
			state.models.findIndex((item) => (item.hash === model.hash)),
			1
		);
	},
	setActiveModel(state, model) {
		state.activeModel = model;
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
		state.build++;
	},
	setTitleOfModel(state, params) {
		params.model.setTitle(params.title);
	},
};

export const actions = {
	toggleShowModel({ commit, dispatch }, model) {
		commit('toggleShowModel', model);
		dispatch('scene/reRender', null, { root: true });
	},


	toggleShowModelByHash({ commit, dispatch }, index) {
		commit('toggleShowModelByHash', index);
		dispatch('scene/reRender', null, { root: true });
	},

	removeModel({ commit, dispatch }, model) {
		commit('removeModel', model);
		dispatch('scene/reRender', null, { root: true });
	},
	setTitleOfModel({ commit, dispatch }, model) {
		commit('setTitleOfModel', model);
		commit('reBuildModels');
	},
};

export default {
	getters,
	mutations,
	actions
}
