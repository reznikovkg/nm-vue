export const getters = {

};

export const mutations = {
	setChildModelByHash(state, data) {
		state.models.find((item) => (item.hash === data.hash)).setChildModel(data.model);
	},
	setCountOfPoints(state, count) {
		state.models.find(item => item.hash === state.activeModelHash).setCountPoints(count);
	},
};

export const actions = {
	setChildModelByHash({commit, dispatch}, data) {
		commit('setChildModelByHash', data);

		commit('reBuildModels');
	},

	setCountOfPoints({commit, dispatch}, count) {
		commit('setCountOfPoints', count);
		dispatch('scene/reRender', null, { root: true });
	},
};

export default {
	getters,
	mutations,
	actions
}
