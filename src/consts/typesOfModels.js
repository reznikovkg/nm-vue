// 2D
import Points from "../classes/view/Points";
import PointsForm from '../components/Forms/Scene2D/Points';

import Spline from "../classes/nm/Spline";
import SplineForm from '../components/Forms/Scene2D/Spline';

import pNewton from "../classes/nm/pNewton";

// 3D
import Kinematic from "../classes/view/KinematicModel";
import KinematicForm from '../components/Forms/Scene3D/Kinematic';


export const models2D = {
	points: {
		code: 'points',
		name: 'Points',
		class: Points,
		form: PointsForm
	},
	spline: {
		code: 'spline',
		name: 'Spline',
		class: Spline,
		form: SplineForm
	},
	pNewton: {
		name: 'pNewton',
		class: pNewton
	}
};

export const models3D = {
	kinematic: {
		code: 'kinematic',
		name: 'Kinematic',
		class: Kinematic,
		form: KinematicForm
	},
};

export default {
	models2D,
	models3D
}