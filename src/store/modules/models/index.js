import typesOfModels from "../../../models/typesOfModels";
import typesOfScene from "../../../scene/typesOfScene";
import Points from "../../../models/Points";

import base from "./includes/base";
import objectScene from "./includes/objectScene";
import kinematic from "./includes/kinematic";
import light from "./includes/light";
import sphere from "./includes/sphere";

const state = {
	models: [
		(new Points()).setDefaultParams(typesOfModels[typesOfScene.SCENE2D].points, typesOfScene.SCENE2D)
	],
	activeModel: null,

	buildCount: 0
};

const getters = {
	...base.getters,
	...objectScene.getters,
	...kinematic.getters,
	...light.getters,
	...sphere.getters,

	getLights:(state, getters, rootState) => {
		return state.models;
	},
	getChoiceTypeModel: (state, getters, rootState) => {
		return state.choiceTypeModel;
	},
	getFormOfModel: (state, getters, rootState) => {
		if (state.models[state.indexActiveModel].form) {
			return state.models[state.indexActiveModel].form.model;
		} else {
			return null
		}
	},
	getGuideOfModel: (state, getters, rootState) => {
		if (state.models[state.indexActiveModel].guide) {
			return state.models[state.indexActiveModel].guide.model;
		} else {
			return null
		}
	},
	getChildModel: (state, getters, rootState) => {
		return state.models[state.indexActiveModel].childModel;
		// if (state.models[state.indexActiveModel].childModel) {
		// } else {
		// 	return null
		// }
	},
};

const mutations = {
	...base.mutations,
	...objectScene.mutations,
	...kinematic.mutations,
	...light.mutations,
	...sphere.mutations,

	/**
	 * STATUS: DONE
	 *
	 * @param state
	 * @param point
	 */
	addPointToActiveModel(state, point) {
		state.activeModel.addPoint(
			point.x,
			point.y
		);
	},
	setChoiceTypeModel(state, t) {
		state.choiceTypeModel = t;
	},

	setGuideOfModel(state, model) {
		state.models[state.indexActiveModel].setGuide(model);
	},
	setFormOfModel(state, model) {
		state.models[state.indexActiveModel].setForm(model);
	},
	setChildModel(state, model) {
		state.models[state.indexActiveModel].setChildModel(model);
	},
	applyToModel(state, at) {
		state.activeModel.apply(at);
	},


	setPointsOfModel(state, points) {
		state.activeModel.setPoints(points);
	},


	removePointInModel(state, index) {
		state.activeModel.removePoint(index);
	},

	setCountOfPoints(state, count) {
		if (count <= 500)
		state.models[state.indexActiveModel].setCountPoints(count);
	},




};

const actions = {
	...base.actions,
	...objectScene.actions,
	...kinematic.actions,
	...light.actions,
	...sphere.actions,

	/**
	 * STATUS: DONE
	 *
	 * @param commit
	 * @param state
	 * @param rootState
	 * @param dispatch
	 * @param e
	 */
	createModel({ commit, state, rootState, dispatch }, classObject) {
		//TODO write default params of models to model
		let model = new classObject.class();
		model.setDefaultParams(classObject, rootState.scene.type);
		commit('addModel', model);
		dispatch('scene/reRender', null, { root: true });
		return model
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
	setActiveModel ({ commit, state }, model) {
		commit('setActiveModel', model)
	},


	setGuideOfModel({ commit, dispatch }, model) {
		commit('setGuideOfModel', model);
		dispatch('scene/reRender', null, { root: true });
	},
	setFormOfModel({ commit, dispatch }, model) {
		commit('setFormOfModel', model);
		dispatch('scene/reRender', null, { root: true });
	},
	setChildModel({ commit, dispatch }, model) {
		commit('setChildModel', model);
		commit('resetIndexActiveModel');
	},

	setPointsOfModel({ commit, dispatch }, points) {
		commit('setPointsOfModel', points);
		dispatch('scene/reRender', null, { root: true });
	},

	applyToModel({ state, commit, dispatch }, at) {
		if (state.activeModel) commit('applyToModel', at);
		dispatch('scene/reRender', null, { root: true });
	},


	removePointInModel({commit, dispatch}, index) {
		commit('removePointInModel', index);
		dispatch('scene/reRender', null, { root: true });
	},

	setCountOfPoints({commit, dispatch}, index) {
		commit('setCountOfPoints', index);
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
