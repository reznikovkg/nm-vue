import Camera from './../../../classes/view/Camera2D'
import { mutation } from "../../interaction";

import typesOfModels from "../../../consts/typesOfModels";

const state = {
	mainMenuShow: false,
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
	getMainMenuShow: (state, getters, rootState) => {
		return state.mainMenuShow;
	},
	getNavigation: (state, getters, rootState) => {
		return state.navigation;
	},
};

const mutations = {
	inverseMainMenuShow(state, model) {
		state.mainMenuShow = !state.mainMenuShow;
	}
};

const actions = {
	inverseMainMenuShow ({ commit, state }) {
		commit('inverseMainMenuShow');
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
