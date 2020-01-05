import Camera2D from './../../../classes/view/Camera2D';
import Camera3D from './../../../classes/view/Camera2D';

import { mutation } from "../../interaction";

import typesOfModels from "../../../consts/typesOfModels";

const state = {
	camera: null
};

const getters = {
	getCamera: (state, getters, rootState) => {
		return state.camera;
	}
};

const mutations = {
	...mutation,
	initScene(state, data) {
		if (data.type === '2D') {
			state.camera = new Camera2D(data.canvas);
		} else if (data.type === '3D') {
			state.camera = new Camera3D(data.canvas);
		}
	},
	clear(state) {
		state.camera.clear();
	},
	reRender(state, models) {
		state.camera.reRender(models);
	},







	render(state, models) {
		state.camera.render(models);
	},
	setSizeCanvas(state, size) {
		state.camera.setSizeCanvas(size);
	},
	cameraDragToStart(state, e) {
		state.camera.dragToStart(e);
	},
	cameraDragTo(state, e) {
		state.camera.dragTo(e);
	},
	cameraDragToStop(state, e) {
		state.camera.dragToStop(e);
	},
	cameraWheelSize(state, e) {
		state.camera.wheelSize(e);
	},
	choiceNavigation (state, title) {
		for (let item in state.navigation) {
			if (state.navigation[item].title === title) {
				state.navigation[item].status = true;
			} else {
				state.navigation[item].status = false;
			}
		}
	},
};

const actions = {
	initScene ({ commit, state }, data) {
		commit('initScene', data)
	},
	mouseDown ({ commit, state }, e) {
		commit('mouseDown');
		// if (state.navigation.moveCenter.status) {
		// 	commit('cameraDragToStart', e);
		// }
		//
		// if (state.navigation.addPoint.status) {
		// 	commit('activeModelAddPoint', e);
		// }
		//
		// if (state.navigation.addComboPoints.status) {
		// 	commit('activeModelAddComboPointsStart', e);
		// }
		// commit('reRender');
	},
	mouseDrag ({ commit, state }, e) {
		commit('mouseDrag');
		// if (state.navigation.moveCenter.status) {
		// 	commit('cameraDragTo', e);
		// }
		//
		// if (state.navigation.addComboPoints.status) {
		// 	commit('activeModelAddComboPointsDrag', e);
		// }
		// commit('reRender');
	},
	mouseUp ({ commit, state }, e) {
		commit('mouseUp');
		// if (state.navigation.moveCenter.status) {
		// 	commit('cameraDragToStop', e);
		// }
		//
		// if (state.navigation.addComboPoints.status) {
		// 	commit('activeModelAddComboPointsStop', e);
		// }
		// commit('reRender');
	},
	mouseWheel ({ commit, state }, e) {
		commit('mouseWheel');
		commit('cameraWheelSize', e);
		commit('reRender');
	},









	addModel ({ commit, state }, model) {
		commit('addModel', model);
		commit('reRender');
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
	render ({ commit, state, rootState }) {
		commit('clear');
		commit('render', rootState.models.models);
	},
	reRender ({ commit, state, rootState }) {
		commit('reRender', rootState.models.models);
	},
	createModel({ commit, state }, e) {
		commit('createModel');
		commit('addModel', new typesOfModels['models' + '2d'][state.choiceType].class());
		commit('reRender');
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
