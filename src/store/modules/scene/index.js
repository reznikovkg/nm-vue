import Camera2D from './../../../scene/Camera2D';
import Camera3D from './../../../scene/Camera3D';


import typesOfModels from "./../../../models/typesOfModels";
import typesOfScene from "./../../../scene/typesOfScene";

const state = {
	camera: null,
	type: null,

	build: 0
};

const getters = {
	/**
	 * STATUS: DONE
	 *
	 * @param state
	 * @returns {null|Camera2D}
	 */
	getCamera: (state) => {
		return state.camera;
	},
	getTypeScene: (state) => {
		return state.type;
	},
	getModeCameraRayTracing: (state) => {
		return state.camera.rayTracing;
	},
};

const mutations = {
	/**
	 * STATUS: DONE
	 *
	 * @param state
	 * @param data
	 */
	initScene(state, data) {
		state.type = data.type;
		if (data.type === typesOfScene.SCENE2D) {
			state.camera = new Camera2D(data.canvas);
		} else if (data.type === typesOfScene.SCENE3D) {
			state.camera = new Camera3D(data.canvas);
		}
	},
	/**
	 * STATUS: DONE
	 *
	 * @param state
	 */
	clear(state) {
		state.camera.clear();
	},
	/**
	 * STATUS: DONE
	 *
	 * @param state
	 * @param models
	 */
	render(state, models) {
		state.camera.render(models);
	},
	reRender(state, models) {
		state.camera.reRender(models);
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
	applyToCamera(state, at) {
		state.camera.apply(at);
	},
	cameraToggleRayTracing(state, _state) {
		state.camera.toggleRayTracing(_state);
	},
	reBuildCamera(state) {
		state.build++;
	}
};

const actions = {
	initScene ({ commit, state, dispatch }, data) {
		commit('initScene', data);
		dispatch('reRender');
	},
	setSizeCanvas ({ commit, state }, size = null) {
		commit('setSizeCanvas', size)
	},
	render ({ commit, state, rootState }, models) {
		commit('clear');
		commit('render', models);
	},
	reRender ({ commit, rootState }) {
		commit('reRender', rootState.models.models);
	},
	cameraDragToStart ({ commit, dispatch }, e) {
		commit('cameraDragToStart', e);
	},
	cameraDragTo ({ commit, state, dispatch }, e) {
		if (state.camera.drag.status) {
			commit('cameraDragTo', e);
			dispatch('reRender');
		}
	},
	cameraDragToStop ({ commit, dispatch }, e) {
		if (state.camera.drag.status) {
			commit('cameraDragToStop', e);
			dispatch('reRender');
		}
	},
	cameraWheelSize ({ commit, dispatch }, e) {
		commit('cameraWheelSize', e);
		dispatch('reRender');
	},
	applyToCamera({ commit, dispatch, rootGetters }, at) {
		if (rootGetters['navigation/getNavigation'].moveCamera.status) {
			commit('applyToCamera', at);
			commit('reBuildCamera');
			dispatch('reRender');
		}
	},
	cameraToggleRayTracing ({ commit, dispatch }, _state) {
		commit('cameraToggleRayTracing', _state);
		dispatch('reRender');
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
