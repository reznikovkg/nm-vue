export const getters = {

};


export const mutations = {
	setRadius(state, data) {
		state.activeModel.setRadius(data);
	},
	setSegments(state, data) {
		state.activeModel.setSegments(data);
	},
	setIntervals(state, data) {
		state.activeModel.setIntervals(data);
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
