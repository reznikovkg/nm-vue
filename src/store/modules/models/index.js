import typesOfModels from "../../../consts/typesOfModels";

const state = {
	models: [],
	indexActiveModel: 0,
	choiceTypeModel: null,
};

const getters = {
	getModels: (state, getters, rootState) => {
		return state.models;
	},
	getChoiceTypeModel: (state, getters, rootState) => {
		return state.choiceType;
	},
	getIndexActiveModel: (state, getters, rootState) => {
		return state.choiceTypeModel;
	},
	getActiveModel: (state, getters, rootState) => {
		return state.models[state.indexActiveModel];
	},
};

const mutations = {
	addModel(state, model) {
		state.models.push(model);
	},
	removeModel(state, index) {
		state.models.splice(index, 1);
	},
	activeModelAddPoint(state, e) {
		state.models[state.activeModel].addPoint(
			state.camera.ScreenToWorldX(e.clientX),
			state.camera.ScreenToWorldY(e.clientY)
		);
	},
	setChoiceTypeModel(state, t) {
		state.choiceTypeModel = t;
	},
	createModel(state, classType) {
		state.indexActiveModel = state.models.length;
	},
	setIndexActiveModel(state, index) {
		state.indexActiveModel = index;
	}
};

const actions = {
	addModel ({ commit, state }, model) {
		commit('addModel', model);
		commit('reRender');
	},
	setChoiceTypeModel({ commit, state }, t) {
		commit('setChoiceTypeModel', t);
	},
	removeModel({ commit, state }, index) {
		commit('removeModel', index);
		commit('reRender');
	},
	setActiveModel ({ commit, state }, index) {
		commit('setActiveModel', index)
	},
	choiceNavigation ({ commit, state }, title) {
		commit('choiceNavigation', title)
	},
	setSizeCanvas ({ commit, state }, size = null) {
		commit('setSizeCanvas', size)
	},
	render ({ commit, state }) {
		commit('clear');
		commit('render');
	},
	reRender ({ commit, state }) {
		commit('reRender');
	},
	mouseDown ({ commit, state }, e) {
		commit('mouseDown');
		if (state.navigation.moveCenter.status) {
			commit('cameraDragToStart', e);
		}

		if (state.navigation.addPoint.status) {
			commit('activeModelAddPoint', e);
		}

		if (state.navigation.addComboPoints.status) {
			commit('activeModelAddComboPointsStart', e);
		}
		commit('reRender');
	},
	mouseDrag ({ commit, state }, e) {
		commit('mouseDrag');
		if (state.navigation.moveCenter.status) {
			commit('cameraDragTo', e);
		}

		if (state.navigation.addComboPoints.status) {
			commit('activeModelAddComboPointsDrag', e);
		}
		commit('reRender');
	},
	mouseUp ({ commit, state }, e) {
		commit('mouseUp');
		if (state.navigation.moveCenter.status) {
			commit('cameraDragToStop', e);
		}

		if (state.navigation.addComboPoints.status) {
			commit('activeModelAddComboPointsStop', e);
		}
		commit('reRender');
	},
	setChoiceType({ commit, state }, t) {
		commit('setChoiceType', t);
	},
	mouseWheel ({ commit, state }, e) {
		commit('mouseWheel');
		commit('cameraWheelSize', e);
		commit('reRender');
	},
	createModel({ commit, state }, e) {
		commit('createModel');
		commit('addModel', new typesOfModels['models' + '2D'][state.choiceTypeModel].class());
		commit('scene2d/reRender', state.models, { root: true });
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
