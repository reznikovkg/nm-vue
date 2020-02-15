
import Points from "./Points";
import PointsForm from './../components/Elements/Forms/Points';

// 2D
import Spline from "./2d/Spline";
import SplineForm from './../components/Elements/Forms/Models2D/Spline';

import pNewton from "./2d/pNewton";
import pNewtonForm from './../components/Elements/Forms/Models2D/pNewton';

// 3D
import Kinematic from "./3d/KinematicModel";
import KinematicForm from './../components/Elements/Forms/Models3D/Kinematic';

import Light from "./3d/Light";
import LightForm from './../components/Elements/Forms/Models3D/Light';

import ObjectScene from "./3d/ObjectScene";
import ObjectSceneForm from './../components/Elements/Forms/Models3D/ObjectScene';


export const models2d = {
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

export const models3d = {
	points: {
		code: 'points',
		name: 'Points',
		class: Points,
		form: PointsForm
	},
	kinematic: {
		code: 'kinematic',
		name: 'Kinematic',
		class: Kinematic,
		form: KinematicForm
	},
	object: {
		code: 'object',
		name: 'Object',
		class: ObjectScene,
		form: ObjectSceneForm
	},
	light: {
		code: 'light',
		name: 'light',
		class: Light,
		form: LightForm
	},
};

export default {
	"2d": models2d,
	"3d": models3d
}