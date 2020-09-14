import Vector from "@/math/Vector";
import Matrix from "@/math/Matrix";
import { rotationXDeg, rotationYDeg, rotationZDeg } from '@/scene/AffineTransform3D';
import Camera3D from "@/scene/Camera3D";

export function normalToPlane(ar, point) {
	let t = [
		[ - ar[0][0], - ar[0][1], - ar[0][2] ],
		[ ar[1][0] - ar[0][0], ar[1][1] - ar[0][1], ar[1][2] - ar[0][2] ],
		[ ar[2][0] - ar[0][0], ar[2][1] - ar[0][1], ar[2][2] - ar[0][2] ],
	];

	let t1 = [
		t[1][1] * t[2][2] - t[1][2] * t[2][1],
		t[1][2] * t[2][0] - t[1][0] * t[2][2],
		t[1][0] * t[2][1] - t[1][1] * t[2][0]
	];


	let x = t1[0];
	let y = t1[1];
	let z = t1[2];

	let f = t[0][0]*t1[0] + t[0][1]*t1[1] + t[0][2]*t1[2];
	// console.log(`${x}x+${y}y+${z}z+${f}=0`);

	let s = x*point[0] + y*point[1] + z*point[2] + f;


	let al = x*x + y*y + z*z;

	let j = -s/al;
	if (al === 0) {
		j = 999;
	}

	let poi = [
		point[0] + x*j,
		point[1] + y*j,
		point[2] + z*j,
	];


	return poi;
}

/**
 *
 * @param a = [ x, y ]
 * @param b = [ x, y ]
 */
export function cosDegVectors(a, b) {
	const ab = a[0]*b[0]+a[1]*b[1];

	const sqrtA = Math.sqrt(a[0]*a[0]+a[1]*a[1]);
	const sqrtB = Math.sqrt(b[0]*b[0]+b[1]*b[1]);

	return ab / (sqrtA*sqrtB);
}


export function getMatrixToTransformPoint2D(oldParams, newParams) {
	const oldT = [
		oldParams.vT.cells[0] - oldParams.vOv.cells[0],
		oldParams.vT.cells[1] - oldParams.vOv.cells[1],
		oldParams.vT.cells[2] - oldParams.vOv.cells[2],
	];

	const newT = [
		newParams.vT.cells[0] - newParams.vOv.cells[0],
		newParams.vT.cells[1] - newParams.vOv.cells[1],
		newParams.vT.cells[2] - newParams.vOv.cells[2],
	];

	const phi1 = cosDegVectors([
		newT[1],
		newT[2]
	], [
		oldT[1],
		oldT[2]
	]);

	const phi2 = cosDegVectors([
		newT[0],
		newT[1]
	], [
		oldT[0],
		oldT[1]
	]);

	const phi3 = cosDegVectors([
		newT[0],
		newT[2]
	], [
		oldT[0],
		oldT[2]
	]);

	const matrix = new Matrix();
	matrix.IdentityCells(4);

	matrix.compWithLeft(rotationXDeg(Math.acos(phi1)));
	matrix.compWithLeft(rotationZDeg(Math.acos(phi2)));
	matrix.compWithLeft(rotationYDeg(Math.acos(phi3)));

	return matrix;
}


export function getWorldPoint(x, y) {
	const cam = new Camera3D();
	const t = {
		x: cam.ScreenToWorldX(0),
		y: cam.ScreenToWorldY(0)
	}

	return t;
}
