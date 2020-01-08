// 2D
import Points from "../classes/models/Points";
import PointsForm from './../components/Elements/Forms/Models2D/Points';

import Spline from "../classes/nm/Spline";
import SplineForm from './../components/Elements/Forms/Models2D/Spline';

import pNewton from "../classes/nm/pNewton";
import pNewtonForm from './../components/Elements/Forms/Models2D/pNewton';

// 3D
import Kinematic from "../classes/models/KinematicModel";
import KinematicForm from './../components/Elements/Forms/Models3D/Kinematic';


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
	pnewton: {
		name: 'pNewton',
		code: 'pnewton',
		class: pNewton,
		form: pNewtonForm
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
	"2d": models2D,
	"3d": models3D
}