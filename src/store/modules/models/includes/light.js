export const getters = {

};


export const mutations = {
	setCLight(state, data) {
		state.activeModel.setCLight(data);
	},
	setCDark(state, data) {
		state.activeModel.setCDark(data);
	},
	setPower(state, data) {
		state.activeModel.setPower(data);
	},
};

export const actions = {
	setCLight({commit, dispatch}, data) {
		commit('setCLight', data);

		commit('reBuildModels');
	},
	setCDark({commit, dispatch}, data) {
		commit('setCDark', data);

		commit('reBuildModels');
	},
	setPower({commit, dispatch}, data) {
		commit('setPower', data);

		commit('reBuildModels');
	},
};


export default {
	getters,
	mutations,
	actions
}
