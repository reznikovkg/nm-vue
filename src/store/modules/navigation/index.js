import Camera from './../../../classes/view/Camera2D'
import { mutations as mutationsOfInteraction } from "../../interaction";

import typesOfModels from "../../../consts/typesOfModels";
import typesOfScene from "../../../consts/typesOfScene";

const state = {
	mainMenuShow: false,
	navigation: {
		"2d": {
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
		},
		"3d": {

		}
	},

};

const getters = {
	/**
	 * STATUS: DONE
	 *
	 * @param state
	 * @returns {boolean}
	 */
	getMainMenuShow: (state) => {
		return state.mainMenuShow;
	},
	/**
	 * STATUS: DONE
	 *
	 * @param state
	 * @param getters
	 * @param rootState
	 * @returns {*}
	 */
	getNavigation: (state, getters, rootState) => {
		return state.navigation[rootState.scene.type];
	},
};

const mutations = {
	...mutationsOfInteraction,
	/**
	 * STATUS: DONE
	 *
	 * @param state
	 */
	inverseMainMenuShow(state) {
		state.mainMenuShow = !state.mainMenuShow;
	},
	/**
	 * STATUS: DONE
	 *
	 * @param state
	 * @param data
	 */
	choiceNavigation (state, data) {
		for (let item in state.navigation[data.type]) {
			if (state.navigation[data.type][item].title === data.title) {
				state.navigation[data.type][item].status = true;
			} else {
				state.navigation[data.type][item].status = false;
			}
		}
	},
};

const actions = {
	/**
	 * STATUS: DONE
	 *
	 * @param commit
	 */
	inverseMainMenuShow ({ commit }) {
		commit('inverseMainMenuShow');
	},
	/**
	 * STATUS: DONE
	 *
	 * @param commit
	 * @param rootState
	 * @param title
	 */
	choiceNavigation ({ commit, rootState }, title) {
		commit('choiceNavigation', {
			title: title,
			type: rootState.scene.type
		});
	},






	mouseDown ({ commit, state, rootState, dispatch }, e) {
		commit('mouseDown');
		if (state.navigation[typesOfScene.SCENE2D].moveCenter.status) {
			dispatch('scene/cameraDragToStart', e, { root: true });
		}

		if (state.navigation[typesOfScene.SCENE2D].addPoint.status) {
			dispatch('models/addPointToActiveModel', e, { root: true });
		}

		// if (state.navigation.addComboPoints.status) {
		// 	commit('activeModelAddComboPointsStart', e);
		// }
	},
	mouseDrag ({ commit, state, rootState, dispatch }, e) {
		commit('mouseDrag');
		if (state.navigation[typesOfScene.SCENE2D].moveCenter.status) {
			dispatch('scene/cameraDragTo', e, { root: true });
		}

		// if (state.navigation.addComboPoints.status) {
		// 	commit('activeModelAddComboPointsDrag', e);
		// }
	},
	mouseUp ({ commit, state, rootState, dispatch }, e) {
		commit('mouseUp');
		if (state.navigation[typesOfScene.SCENE2D].moveCenter.status) {
			dispatch('scene/cameraDragToStop', e, { root: true });
		}

		// if (state.navigation.addComboPoints.status) {
		// 	commit('activeModelAddComboPointsStop', e);
		// }
	},
	mouseWheel ({ commit, state, dispatch }, e) {
		commit('mouseWheel');
		dispatch('scene/cameraWheelSize', e, { root: true });
	},










};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
