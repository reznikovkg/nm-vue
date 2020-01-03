
const state = {
	points: [],
	spline: [],
	pNewton: []
};

const getters = {
	getPoints: (state) => {
		return state.points;
	},
	getSpline: (state) => {
		return state.spline;
	},
	getPNewton: (state) => {
		return state.pNewton;
	},
};

const mutations = {
	pushPoints(state, points) {
		state.points.push(points);
	},
	pushSpline(state, spline) {
		state.spline.push(spline);
	},
	pushPNewton(state, pNewton) {
		state.pNewton.push(pNewton);
	},
};

const actions = {
	pushPoints ({ commit, state }, points) {
		commit('pushPoints', points)
	},
	pushSpline ({ commit, state }, spline) {
		commit('pushSpline', spline)
	},
	pushPNewton ({ commit, state }, pNewton) {
		commit('pushPNewton', pNewton)
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
