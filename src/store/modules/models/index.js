import typesOfModels from "../../../models/typesOfModels";
import typesOfScene from "../../../scene/typesOfScene";
import Points from "../../../models/Points";

const state = {
	models: [
		(new Points()).setDefaultParams(typesOfModels[typesOfScene.SCENE2D].points, typesOfScene.SCENE2D)
	],
	indexActiveModel: 0,
	choiceTypeModel: null,
};

const getters = {
	getModels: (state, getters, rootState) => {
		return state.models;
	},
	getLights:(state, getters, rootState) => {
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
		console.log(state.models[state.indexActiveModel])
		return state.models[state.indexActiveModel].childModel;
		// if (state.models[state.indexActiveModel].childModel) {
		// } else {
		// 	return null
		// }
	},
	getPointsOfModel: (state, getters, rootState) => {
		return state.models[state.indexActiveModel].points;
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
	showModel(state, index) {
		if (state.models[index].inverseShow) {
			state.models[index].inverseShow()
		} else {
			state.models[index].show = !state.models[index].show;
		}
	},
	setIndexActiveModel(state, index) {
		state.indexActiveModel = index;
	},
	setChoiceTypeModel(state, t) {
		state.choiceTypeModel = t;
	},

	setGuideOfModel(state, model) {
		console.log(state.models[state.indexActiveModel])
		state.models[state.indexActiveModel].setGuide(model);
	},
	setFormOfModel(state, model) {
		state.models[state.indexActiveModel].setForm(model);
	},
	setChildModel(state, model) {
		state.models[state.indexActiveModel].setChildModel(model);
	},
	applyToModel(state, at) {
		state.models[state.indexActiveModel].apply(at);
	},


	setPointsOfModel(state, points) {
		state.models[state.indexActiveModel].setPoints(points);
	},


	removePointInModel(state, index) {
		state.models[state.indexActiveModel].removePoint(index);
	},

	setCountOfPoints(state, count) {
		state.models[state.indexActiveModel].setCountPoints(count);
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
		//TODO write default params of models to model
		let model = new typesOfModels[rootState.scene.type][state.choiceTypeModel].class();
		model.setDefaultParams(typesOfModels[rootState.scene.type][state.choiceTypeModel], rootState.scene.type);
		commit('addModel', model);
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
		dispatch('scene/reRender', null, { root: true });
	},

	setPointsOfModel({ commit, dispatch }, points) {
		commit('setPointsOfModel', points);
		dispatch('scene/reRender', null, { root: true });
	},


	showModel({ commit, dispatch }, index) {
		commit('showModel', index);
		dispatch('scene/reRender', null, { root: true });
	},

	applyToModel({ commit, dispatch }, at) {
		commit('applyToModel', at);
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
