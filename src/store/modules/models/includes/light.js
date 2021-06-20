export const getters = {

};


export const mutations = {
	setCLight(state, data) {
		state.models.find(item => item.hash === state.activeModelHash).setCLight(data);
	},
	setCDark(state, data) {
		state.models.find(item => item.hash === state.activeModelHash).setCDark(data);
	},
	setPower(state, data) {
		state.models.find(item => item.hash === state.activeModelHash).setPower(data);
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
