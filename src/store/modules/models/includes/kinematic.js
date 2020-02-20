export const getters = {

};


export const mutations = {
	setGuideByHash(state, data) {
		state.models.find((item) => (item.hash === data.hash)).setGuide(data.model);
	},
	setFormByHash(state, data) {
		state.models.find((item) => (item.hash === data.hash)).setForm(data.model);
	},
};

export const actions = {
	setGuideByHash({commit, dispatch}, data) {
		commit('setGuideByHash', data);

		commit('resetIndexActiveModel');
	},
	setFormByHash({commit, dispatch}, data) {
		commit('setFormByHash', data);

		commit('resetIndexActiveModel');
	},
};


export default {
	getters,
	mutations,
	actions
}