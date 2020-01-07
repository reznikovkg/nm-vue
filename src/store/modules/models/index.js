import typesOfModels from "../../../consts/typesOfModels";
import typesOfScene from "../../../consts/typesOfScene";

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
		return state.choiceTypeModel;
	},
	getIndexActiveModel: (state, getters, rootState) => {
		return state.indexActiveModel;
	},
	getActiveModel: (state, getters, rootState) => {
		return state.models[state.indexActiveModel];
	},
};

const mutations = {
	/**
	 * STATUS: DONE
	 *
	 * @param state
	 * @param model
	 */
	addModel(state, model) {
		state.models.push(model);
		state.indexActiveModel = state.models.length - 1;
	},
	/**
	 * STATUS: DONE
	 *
	 * @param state
	 * @param point
	 */
	addPointToActiveModel(state, point) {
		state.models[state.indexActiveModel].addPoint(
			point.x,
			point.y
		);
	},
	removeModel(state, index) {
		state.models.splice(index, 1);
	},
	setIndexActiveModel(state, index) {
		state.indexActiveModel = index;
	},
	setChoiceTypeModel(state, t) {
		state.choiceTypeModel = t;
	},


















};

const actions = {
	/**
	 * STATUS: DONE
	 *
	 * @param commit
	 * @param state
	 * @param rootState
	 * @param dispatch
	 * @param e
	 */
	createModel({ commit, state, rootState, dispatch }, e) {
		commit('addModel', new typesOfModels[rootState.scene.type][state.choiceTypeModel].class());
		dispatch('scene/reRender', null, { root: true });
	},
	/**
	 * STATUS: DONE
	 *
	 * @param commit
	 * @param rootState
	 * @param dispatch
	 * @param e
	 */
	addPointToActiveModel({ commit, rootState, dispatch }, e) {
		commit('addPointToActiveModel', {
			x: rootState.scene.camera.ScreenToWorldX(e.clientX),
			y: rootState.scene.camera.ScreenToWorldY(e.clientY)
		});
		dispatch('scene/reRender', null, { root: true });
	},
	setChoiceTypeModel({ commit, state }, typeModel) {
		commit('setChoiceTypeModel', typeModel);
	},
	setIndexActiveModel ({ commit, state }, index) {
		commit('setIndexActiveModel', index)
	},
	removeModel({ commit, dispatch }, index) {
		commit('removeModel', index);
		dispatch('scene/reRender', null, { root: true });
	},
























};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
