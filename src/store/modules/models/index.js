import typesOfModels from "../../../models/typesOfModels";
import typesOfScene from "../../../scene/typesOfScene";
import Points from "../../../models/Points";
import Sphere from "../../../models/3d/Sphere";
import Light from "../../../models/3d/Light";

import base from "./includes/base";
import objectScene from "./includes/objectScene";
import kinematic from "./includes/kinematic";
import light from "./includes/light";
import sphere from "./includes/sphere";
import * as AT3D from "@/scene/AffineTransform3D";


const state = {
	models: [
		new Points().setTypeForce(typesOfScene.SCENE_2D),
		new Points().setTypeForce(typesOfScene.SCENE_3D),
		new Sphere(),
		new Light(),
	],
	activeModelHash: null,
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
		state.models.find(item => item.hash === state.activeModelHash).addPoint(
			point.x,
			point.y,
			point.z
		);
	},
	setChoiceTypeModel(state, t) {
		state.choiceTypeModel = t;
	},
	applyToModel(state, at) {
		state.models.find(item => item.hash === state.activeModelHash).apply(at);
	},
	setPointsOfModel(state, points) {
		state.models.find(item => item.hash === state.activeModelHash).setPoints(points);
	},
	removePointInModel(state, index) {
		state.models.find(item => item.hash === state.activeModelHash).removePoint(index);
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
	addPoint({ commit, rootState, dispatch }, point) {
		commit('addPointToActiveModel', point);
		dispatch('scene/reRender', null, { root: true });
	},
	setChoiceTypeModel({ commit, state }, typeModel) {
		commit('setChoiceTypeModel', typeModel);
	},
	setActiveModel ({ commit, state }, model) {
		commit('setActiveModel', model)
	},


	setChildModel({ commit, dispatch }, model) {
		commit('setChildModel', model);
		commit('resetIndexActiveModel');
	},

	setPointsOfModel({ commit, dispatch }, points) {
		commit('setPointsOfModel', points);
		dispatch('scene/reRender', null, { root: true });
	},

	applyToModel({ state, commit, dispatch, getters }, at) {
		if (getters.getActiveModel) commit('applyToModel', at);
		dispatch('scene/reRender', null, { root: true });
	},


	removePointInModel({commit, dispatch}, index) {
		commit('removePointInModel', index);
		dispatch('scene/reRender', null, { root: true });
	},



	activeModelAddComboPointsStart({ commit, rootState, dispatch }, e) {
		commit('addPointToActiveModel', {
			x: rootState.scene.camera.ScreenToWorldX(e.clientX),
			y: rootState.scene.camera.ScreenToWorldY(e.clientY)
		});
		dispatch('scene/reRender', null, { root: true });
	},

	activeModelAddComboPointsDrag({state, commit, rootState, dispatch }, e) {
		const model = state.models.find(item => item.hash === state.activeModelHash)
		const point = model.getLastPoint();

		const newPoint = {
			x: rootState.scene.camera.ScreenToWorldX(e.clientX),
			y: rootState.scene.camera.ScreenToWorldY(e.clientY)
		}

		if (newPoint.x - point.x > 1) {
			commit('addPointToActiveModel', newPoint);
			dispatch('scene/reRender', null, { root: true });
		}
	},


	activeModelAddComboPointsStop({ commit, rootState, dispatch }, e) {
		// commit('addPointToActiveModel', {
		// 	x: rootState.scene.camera.ScreenToWorldX(e.clientX),
		// 	y: rootState.scene.camera.ScreenToWorldY(e.clientY)
		// });
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
