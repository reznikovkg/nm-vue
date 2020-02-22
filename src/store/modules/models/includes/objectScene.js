export const getters = {

};

export const mutations = {
	setChildModelByHash(state, data) {
		state.models.find((item) => (item.hash === data.hash)).setChildModel(data.model);
	},
};

export const actions = {
	setChildModelByHash({commit, dispatch}, data) {
		commit('setChildModelByHash', data);

		commit('reBuildModels');
	},
};

export default {
	getters,
	mutations,
	actions
}