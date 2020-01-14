import Camera from './../../../classes/view/Camera2D'
import { mutations as mutationsOfInteraction } from "../../interaction";

import typesOfModels from "../../../consts/typesOfModels";
import typesOfScene from "../../../consts/typesOfScene";

import * as AT3D from './../../../consts/view/AffineTransform3D';
import * as AT2D from './../../../consts/view/AffineTransform2D';

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
			moveCenter: {
				status: true,
				title: 'moveCenter',
				icon: 'icon-move'
			},
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


	keyDown ({ commit, state, dispatch }, e) {
		commit('keyDown', e.keyCode);

	},
	keyPress ({ commit, state, dispatch, rootState }, e) {
		commit('keyPress', e.keyCode);


		if (rootState.scene.type === typesOfScene.SCENE3D) {
			switch (e.keyCode) {
				case 98: {
					dispatch('models/applyToModel', AT3D.rotationXDeg(Math.PI / 18), {root: true});
					break;
				}
				case 100: {
					dispatch('models/applyToModel', AT3D.rotationYDeg(-Math.PI / 18), {root: true});
					break;
				}
				case 102: {
					dispatch('models/applyToModel', AT3D.rotationYDeg(Math.PI / 18), {root: true});
					break;
				}
				case 104: {
					dispatch('models/applyToModel', AT3D.rotationXDeg(-Math.PI / 18), {root: true});
					break;
				}
				default: {
					break
				}
			}
		} else if (rootState.scene.type === typesOfScene.SCENE2D) {
			switch (e.keyCode) {
				case 37: {
					dispatch('models/applyToModel', AT2D.translation(-1, 0), {root: true});
					break;
				}
				case 38: {
					dispatch('models/applyToModel', AT2D.translation(0, 1), {root: true});
					break;
				}
				case 39: {
					dispatch('models/applyToModel', AT2D.translation(1, 0), {root: true});
					break;
				}
				case 40: {
					dispatch('models/applyToModel', AT2D.translation(0, -1), {root: true});
					break;
				}
				default: {
					break
				}
			}
		}

	},






};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
