
import Points from "./Points";

// 2D
import Spline from "./2d/Spline";

import pNewton from "./2d/pNewton";

// 3D
import Kinematic from "./3d/KinematicModel";

import Light from "./3d/Light";

import ObjectScene from "./3d/ObjectScene";

import Sphere from "./3d/Sphere";

export const models2d = {
	points: {
		class: Points,
	},
	spline: {
		class: Spline,
	},
	pnewton: {
		class: pNewton,
	}
};

export const models3d = {
	points: {
		class: Points,
	},
	kinematic: {
		class: Kinematic,
	},
	object: {
		class: ObjectScene,
	},
	light: {
		class: Light,
	},
	sphere: {
		class: Sphere,
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
