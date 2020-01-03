import Camera from './../../../classes/view/Camera2D'
import { mutation } from "../../interaction";

const state = {
	camera: null,
	models: [],
	activeModel: 0,
	navigation: {
		moveCenter: {
			status: true,
			title: 'moveCenter',
			icon: 'icon-move'
		},
		addPoint: {
			status: false,
			title: 'addPoint',
			icon: 'icon-plus-circle'
		},
		addComboPoints: {
			status: false,
			title: 'addComboPoints',
			icon: 'icon-trending-up'
		},
	}

};

const getters = {
	getModels: (state, getters, rootState) => {
		return state.models;
	},
	getCamera: (state, getters, rootState) => {
		return state.camera;
	},
};

const mutations = {
	...mutation,
	addModel(state, model) {
		state.models.push(model);
	},
	initCamera(state, canvas) {
		state.camera = new Camera(canvas);
	},
	clear(state) {
		state.camera.clear();
	},
	render(state) {
		state.camera.render(state.models);
	},
	reRender(state) {
		state.camera.reRender(state.models);
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
	activeModelAddPoint(state, e) {
		state.camera.dragToStart(e);
	},
	activeModelAddComboPointsStart(state, e) {
		state.camera.dragToStart(e);
	},
};

const actions = {
	addModel ({ commit, state }, model) {
		commit('addModel', model)
	},
	initCamera ({ commit, state }, canvas) {
		commit('initCamera', canvas)
	},
	setSizeCanvas ({ commit, state }, size = null) {
		commit('setSizeCanvas', size)
	},
	render ({ commit, state }) {
		commit('clear');
		commit('render');
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
	mouseWheel ({ commit, state }, e) {
		commit('mouseWheel');
		commit('cameraWheelSize', e);
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
