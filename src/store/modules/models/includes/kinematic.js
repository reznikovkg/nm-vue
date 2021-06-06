export const getters = {

};


export const mutations = {
	setGuideByHash(state, data) {
		state.models.find((item) => (item.hash === data.hash)).setGuide(data.model);
	},
	setFormByHash(state, data) {
		state.models.find((item) => (item.hash === data.hash)).setForm(data.model);
	},
	setGuideMappingByHash(state, data) {
		state.models.find((item) => (item.hash === data.hash)).setGuideMapping(data.guideMapping);
	},
	setGuideMappingCountStepsByHash(state, data) {
		state.models.find((item) => (item.hash === data.hash)).setGuideMappingCountSteps(data.guideMappingCountSteps);
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

	setGuideMappingByHash({commit, dispatch}, data) {
		commit('setGuideMappingByHash', data);
		commit('reBuildModels');
	},
	setGuideMappingCountStepsByHash({commit, dispatch}, data) {
		commit('setGuideMappingCountStepsByHash', data);
		commit('reBuildModels');
	},
};


export default {
	getters,
	mutations,
	actions
}
