export const getters = {

};


export const mutations = {
	setRadius(state, data) {
		state.models.find(item => item.hash === state.activeModelHash).setRadius(data);
	},
	setSegments(state, data) {
		state.models.find(item => item.hash === state.activeModelHash).setSegments(data);
	},
	setIntervals(state, data) {
		state.models.find(item => item.hash === state.activeModelHash).setIntervals(data);
	},
};

export const actions = {
	setRadius({commit, dispatch}, data) {
		commit('setRadius', data);

		commit('reBuildModels');
	},
	setSegments({commit, dispatch}, data) {
		commit('setSegments', data);

		commit('reBuildModels');
	},
	setIntervals({commit, dispatch}, data) {
		commit('setIntervals', data);

		commit('reBuildModels');
	},
};


export default {
	getters,
	mutations,
	actions
}
