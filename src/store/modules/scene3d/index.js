import Camera from './../../../classes/view/Camera3D'

const state = {
	camera: null,
	models: []

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
	}
};

const actions = {
	addModel ({ commit, state }, model) {
		commit('addModel', model)
	},
	initCamera ({ commit, state }, canvas) {
		commit('initCamera', canvas)
	},
	render ({ commit, state }) {
		commit('clear');
		commit('render');
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
