import Camera from './../../../scene/Camera2D'
import { mutations as mutationsOfInteraction } from "./interaction";

import typesOfModels, {TypeModelsByScene} from "./../../../models/typesOfModels";
import typesOfScene from "./../../../scene/typesOfScene";

import * as AT3D from './../../../scene/AffineTransform3D';
import * as AT2D from './../../../scene/AffineTransform2D';

const state = {
	mainMenuShow: false,
	navigation: {
		SCENE_2D: {
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
		SCENE_3D: {
			moveCenter: {
				status: true,
				title: 'moveCenter',
				icon: 'icon-move'
			},
			moveCamera: {
				status: false,
				title: 'moveCamera',
				icon: 'icon-video'
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
		if (rootState.scene.type === typesOfScene.SCENE_2D) {
			if (state.navigation[typesOfScene.SCENE_2D].moveCenter.status) {
				dispatch('scene/cameraDragToStart', e, { root: true });
			}

			if (state.navigation[typesOfScene.SCENE_2D].addPoint.status) {
				dispatch('models/addPointToActiveModel', e, { root: true });
			}

			if (state.navigation[typesOfScene.SCENE_2D].addComboPoints.status) {
				dispatch('models/activeModelAddComboPointsStart', e, { root: true });
			}
		} else if (rootState.scene.type === typesOfScene.SCENE_3D) {
			if (state.navigation[typesOfScene.SCENE_2D].moveCenter.status) {
				dispatch('scene/cameraMoveCameraStart', e, { root: true });
			}
		}
	},
	mouseDrag ({ commit, state, rootState, dispatch }, e) {
		commit('mouseDrag');
		if (rootState.scene.type === typesOfScene.SCENE_2D) {
			if (state.navigation[typesOfScene.SCENE_2D].moveCenter.status) {
				dispatch('scene/cameraDragTo', e, {root: true});
			}

			if (state.navigation[typesOfScene.SCENE_2D].addComboPoints.status) {
				dispatch('models/activeModelAddComboPointsDrag', e, { root: true });
			}
		} else if (rootState.scene.type === typesOfScene.SCENE_3D) {
			if (state.navigation[typesOfScene.SCENE_3D].moveCenter.status) {
				dispatch('scene/cameraMoveCameraGo', e, {root: true});
			}
		}
	},
	mouseUp ({ commit, state, rootState, dispatch }, e) {
		commit('mouseUp');
		if (rootState.scene.type === typesOfScene.SCENE_2D) {
			if (state.navigation[typesOfScene.SCENE_2D].moveCenter.status) {
				dispatch('scene/cameraDragToStop', e, {root: true});
			}

			if (state.navigation[typesOfScene.SCENE_2D].addComboPoints.status) {
				dispatch('models/activeModelAddComboPointsStop', e, { root: true });
			}
		} else if (rootState.scene.type === typesOfScene.SCENE_3D) {
			if (state.navigation[typesOfScene.SCENE_3D].moveCenter.status) {
				dispatch('scene/cameraMoveCameraStop', e, {root: true});
			}
		}
	},
	mouseWheel ({ commit, state, dispatch, rootState }, e) {
		commit('mouseWheel');

		if (rootState.scene.type === typesOfScene.SCENE_2D) {
			dispatch('scene/cameraWheelSize', e, { root: true });
		} else if (rootState.scene.type === typesOfScene.SCENE_3D) {
			dispatch('scene/cameraChangeD', e, { root: true });
		}
	},


	keyDown ({ commit, state, dispatch }, e) {
		commit('keyDown', e.keyCode);

	},
	keyPress ({ commit, state, dispatch, rootState }, e) {
		commit('keyPress', e.keyCode);

		if (rootState.scene.type === typesOfScene.SCENE_3D) {
			const deg = Math.PI / 36;
			switch (e.keyCode) {
				case 98: {
					dispatch('models/applyToModel', AT3D.rotationXDeg(deg), {root: true});
					dispatch('scene/applyToCamera', AT3D.rotationXDeg(deg), {root: true});
					break;
				}
				case 100: {
					dispatch('models/applyToModel', AT3D.rotationYDeg(-deg), {root: true});
					dispatch('scene/applyToCamera', AT3D.rotationYDeg(-deg), {root: true});
					break;
				}
				case 102: {
					dispatch('models/applyToModel', AT3D.rotationYDeg(deg), {root: true});
					dispatch('scene/applyToCamera', AT3D.rotationYDeg(deg), {root: true});
					break;
				}
				case 104: {
					dispatch('models/applyToModel', AT3D.rotationXDeg(-deg), {root: true});
					dispatch('scene/applyToCamera', AT3D.rotationXDeg(-deg), {root: true});
					break;
				}


				case 37: {
					dispatch('models/applyToModel', AT3D.translation(-1, 0,0), {root: true});
					break;
				}
				case 38: {
					dispatch('models/applyToModel', AT3D.translation(0, 1,0), {root: true});
					break;
				}
				case 39: {
					dispatch('models/applyToModel', AT3D.translation(1, 0,0), {root: true});
					break;
				}
				case 40: {
					dispatch('models/applyToModel', AT3D.translation(0, -1,0), {root: true});
					break;
				}
				case 33: {
					dispatch('models/applyToModel', AT3D.translation(0, 0,-1), {root: true});
					break;
				}
				case 34: {
					dispatch('models/applyToModel', AT3D.translation(0, 0,1), {root: true});
					break;
				}

				default: {
					break
				}
			}
		} else if (rootState.scene.type === typesOfScene.SCENE_2D) {
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
