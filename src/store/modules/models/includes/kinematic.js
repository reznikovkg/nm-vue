export const getters = {

};


export const mutations = {
	setGuideByHash(state, data) {
		state.models.find((item) => (item.hash === data.hash)).setGuide(data.model);
	},
	setFormByHash(state, data) {
		console.log(data)
		state.models.find((item) => (item.hash === data.hash)).setForm(data.model);
	},
};

export const actions = {
	setGuideByHash({commit, dispatch}, data) {
		commit('setGuideByHash', data);

		commit('reBuildModels');
	},
	setFormByHash({commit, dispatch}, data) {
		commit('setFormByHash', data);

		commit('reBuildModels');
	},
};


export default {
	getters,
	mutations,
	actions
}
