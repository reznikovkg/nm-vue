
import Points, { CODE as CODE_POINTS, NAME as NAME_POINTS } from "./Points";

// 2D
import Spline, { CODE as CODE_SPLINE, NAME as NAME_SPLINE } from "./2d/Spline";

import pNewton, { CODE as CODE_PNEWTON, NAME as NAME_PNEWTON } from "./2d/pNewton";

// 3D
import Kinematic, { CODE as CODE_KINEMATIC, NAME as NAME_KINEMATIC } from "./3d/KinematicModel";

import Light, { CODE as CODE_LIGHT, NAME as NAME_LIGHT } from "./3d/Light";

import ObjectScene, { CODE as CODE_OBJECT, NAME as NAME_OBJECT } from "./3d/ObjectScene";

import Sphere, { CODE as CODE_SPHERE, NAME as NAME_SPHERE } from "./3d/Sphere";

export const models2d = {
	points: {
		class: Points,
		code: CODE_POINTS,
		name: NAME_POINTS
	},
	spline: {
		class: Spline,
		code: CODE_SPLINE,
		name: NAME_SPLINE
	},
	pnewton: {
		class: pNewton,
		code: CODE_PNEWTON,
		name: NAME_PNEWTON
	}
};

export const models3d = {
	points: {
		class: Points,
		name: NAME_POINTS,
		code: CODE_POINTS,
	},
	kinematic: {
		class: Kinematic,
		name: NAME_KINEMATIC,
		code: CODE_KINEMATIC,
	},
	object: {
		class: ObjectScene,
		name: NAME_OBJECT,
		code: CODE_OBJECT,
	},
	light: {
		class: Light,
		name: NAME_LIGHT,
		code: CODE_LIGHT,
	},
	sphere: {
		class: Sphere,
		name: NAME_SPHERE,
		code: CODE_SPHERE,
	},
};

export const TypeModelsByScene = {
	SCENE_2D: "SCENE_2D",
	SCENE_3D: "SCENE_3D",
}

export default {
	SCENE_2D: models2d,
	SCENE_3D: models3d
}
