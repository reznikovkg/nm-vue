import Vector from "@/math/Vector";
import Matrix from "@/math/Matrix";
import { rotationXDeg, rotationYDeg, rotationZDeg, translation } from '@/scene/AffineTransform3D';
import Camera3D from "@/scene/Camera3D";

export function normalToPlane(ar, point) {
	const t = [
		[ - ar[0][0], - ar[0][1], - ar[0][2] ],
		[ ar[1][0] - ar[0][0], ar[1][1] - ar[0][1], ar[1][2] - ar[0][2] ],
		[ ar[2][0] - ar[0][0], ar[2][1] - ar[0][1], ar[2][2] - ar[0][2] ],
	];

	const t1 = [
		t[1][1] * t[2][2] - t[1][2] * t[2][1],
		t[1][2] * t[2][0] - t[1][0] * t[2][2],
		t[1][0] * t[2][1] - t[1][1] * t[2][0]
	];


	const x = t1[0];
	const y = t1[1];
	const z = t1[2];

	const f = t[0][0]*t1[0] + t[0][1]*t1[1] + t[0][2]*t1[2];
	// console.log(`${x}x+${y}y+${z}z+${f}=0`);

	const s = x*point[0] + y*point[1] + z*point[2] + f;


	const al = x*x + y*y + z*z;

	let j = -s/al;
	if (al === 0) {
		j = 999;
	}

	const poi = [
		point[0] + x*j,
		point[1] + y*j,
		point[2] + z*j,
	];


	return poi;
}

/**
 * Получение коорднат плоскости по 3-м точкам
 *
 * Возвращает x, y, z, f
 *
 * Xi + Yj + Zk + f = 0
 *
 * @param ar
 * @returns {number[]}
 */
export function getPlaneByMatrixOfPoints(ar) {
	const t = [
		[ - ar[0][0], - ar[0][1], - ar[0][2] ],
		[ ar[1][0] - ar[0][0], ar[1][1] - ar[0][1], ar[1][2] - ar[0][2] ],
		[ ar[2][0] - ar[0][0], ar[2][1] - ar[0][1], ar[2][2] - ar[0][2] ],
	];

	const t1 = VectorCombine(t[1], t[2]);

	const plane = [
		t1[0],
		t1[1],
		t1[2],
		t[0][0]*t1[0] + t[0][1]*t1[1] + t[0][2]*t1[2]
	];

	return plane
}


/**
 *
 * Плоскость (x, y, z, f)  = getPlaneByMatrixOfPoints(plane)
 *
 * @param plane
 * @param point
 * @returns {*[]}
 */
export function getProjectionToPlane(plane, point) {
	const x = plane[0];
	const y = plane[1];
	const z = plane[2];
	const f = plane[3];

	const s = x*point[0] + y*point[1] + z*point[2] + f;

	const al = x*x + y*y + z*z;

	let j = 9999;
	if (al >= 0.001) {
		j = -s/al;
	}

	const poi = [
		point[0] + x*j,
		point[1] + y*j,
		point[2] + z*j,
	];

	return poi;
}


/**
 * Векторное произведение
 *
 * @param a
 * @param b
 * @returns {number[]}
 */
export function VectorCombine(a, b) {
	return [
		a[1] * b[2] - a[2] * b[1],
		a[2] * b[0] - a[0] * b[2],
		a[0] * b[1] - a[1] * b[0]
	]
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

/**
 *
 * @param a = [ x, y, z ]
 * @param b = [ x, y, z ]
 */
export function cosDegVectors3(a, b) {
	const ab = a[0]*b[0]+a[1]*b[1]+a[2]*b[2];

	const sqrtA = Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);
	const sqrtB = Math.sqrt(b[0]*b[0]+b[1]*b[1]+b[2]*b[2]);

	return ab / (sqrtA*sqrtB);
}

export function getMatrixToTransformPoint2D(oldParams, newParams) {
	let matrix = new Matrix();
	matrix.IdentityCells(4);

	const oldI = (oldParams.vT.scalarWith(oldParams.vN,true)).divWith(
		(oldParams.vT.scalarWith(oldParams.vN,true)).norma(),
		true
	).cells;

	const newI = (newParams.vT.scalarWith(newParams.vN,true)).divWith(
		(newParams.vT.scalarWith(newParams.vN,true)).norma(),
		true
	).cells;



	const oldV = [
		oldParams.vOv.cells[0],
		oldParams.vOv.cells[1],
		oldParams.vOv.cells[2],
	]
	const newV = [
		newParams.vOv.cells[0],
		newParams.vOv.cells[1],
		newParams.vOv.cells[2],
	]

	// const oldT = [
	// 	oldParams.vT.cells[0] - oldParams.vOv.cells[0],
	// 	oldParams.vT.cells[1] - oldParams.vOv.cells[1],
	// 	oldParams.vT.cells[2] - oldParams.vOv.cells[2],
	// ];
	//
	// const newT = [
	// 	newParams.vT.cells[0] - newParams.vOv.cells[0],
	// 	newParams.vT.cells[1] - newParams.vOv.cells[1],
	// 	newParams.vT.cells[2] - newParams.vOv.cells[2],
	// ];
	const oldN = [
		oldParams.vN.cells[0],
		oldParams.vN.cells[1],
		oldParams.vN.cells[2],
	];

	const newN = [
		newParams.vN.cells[0],
		newParams.vN.cells[1],
		newParams.vN.cells[2],
	];

	const oldT = [
		oldParams.vT.cells[0],
		oldParams.vT.cells[1],
		oldParams.vT.cells[2],
	];

	const newT = [
		newParams.vT.cells[0],
		newParams.vT.cells[1],
		newParams.vT.cells[2],
	];







	const cosT = cosDegVectors3(newT, oldT)
	const cosN = cosDegVectors3(newT, oldN)
	const cosI = cosDegVectors3(newT, oldI)


	// console.log(
	// 	"newT:", newT,
	// 	"\noldT:",oldT,
	// 	"\noldN:",oldN,
	// 	"\noldI:",oldI,
	//
	// 	"\n\ncosT:",cosT,
	// 	"\ncosN:",cosN,
	// 	"\ncosI:",cosI,
	//
	// );



	// let t = new Matrix([
	// 	[oldParams.vT.cells[0], oldParams.vN.cells[0]],
	// 	[oldParams.vT.cells[1], oldParams.vN.cells[1]],
	// 	[oldParams.vT.cells[2], oldParams.vN.cells[2]],
	// 	[1, 1]
	// ]);
	//
	//
	// t.compWithLeft(matrix)
	// console.dir("t:",t.cells)


	const phiX = cosDegVectors([
		oldT[1],
		oldT[2],
	], [
		newT[1],
		Math.sqrt(newT[0]*newT[0] + newT[2]*newT[2])
	]);
	const arcCosPhiX = Math.acos(phiX);

	// console.dir("t:",t.cells)
	matrix.compWithLeft(rotationXDeg(cosN >= 0 ? arcCosPhiX : -arcCosPhiX));

	// t.compWithLeft(rotationXDeg(cosN >= 0 ? arcCosPhiX : -arcCosPhiX))
	// console.dir("t:",t.cells)



	const phiY = cosDegVectors([
		oldT[0],
		(cosN >= 0 ? 1 : -1) * Math.sqrt(newT[0]*newT[0] + newT[2]*newT[2])
	], [
		newT[0],
		newT[2]
	]);
	const arcCosPhiY = Math.acos(phiY);

	matrix.compWithLeft(rotationYDeg(cosN >= 0 ? (
		cosI >= 0 ? arcCosPhiY : -arcCosPhiY
	) : (
		cosI >= 0 ? - arcCosPhiY : arcCosPhiY
	)
	));



	// t.compWithLeft(rotationYDeg(cosN >= 0 ? (
	// 		cosI >= 0 ? arcCosPhiY : -arcCosPhiY
	// 	) : (
	// 		cosI >= 0 ? -arcCosPhiY : arcCosPhiY
	// 	)
	// ))
	// console.dir("t:",t.cells, cosN >= 0 ? (
	// 		cosI >= 0 ? arcCosPhiY : -arcCosPhiY
	// 	) : (
	// 		cosI >= 0 ? -arcCosPhiY : arcCosPhiY
	// 	)
	// )





	// const phiY2 = cosDegVectors([
	// 	oldN[0],
	// 	oldN[2],
	// ], [
	// 	newN[0],
	// 	newN[2]
	// ]);
	// const arcCosPhiY2 = Math.acos(phiY2);
	//
	// matrix.compWithLeft(rotationYDeg(
	// 	cosI >= 0 ? -arcCosPhiY2 : arcCosPhiY2
	// ));
	//
	//
	//
	// t.compWithLeft(rotationYDeg(cosN >= 0 ? (
	// 		cosI >= 0 ? arcCosPhiY : -arcCosPhiY
	// 	) : (
	// 		cosI >= 0 ? -arcCosPhiY : arcCosPhiY
	// 	)
	// ))
	// console.dir("t:",t.cells, cosN >= 0 ? (
	// 		cosI >= 0 ? arcCosPhiY : -arcCosPhiY
	// 	) : (
	// 		cosI >= 0 ? -arcCosPhiY : arcCosPhiY
	// 	)
	// )


	matrix.compWithLeft(translation(
		oldV[0] - newV[0],
		oldV[1] - newV[1],
		oldV[2] - newV[2]
	));


	// t.compWithLeft(translation(
	// 	oldV[0] - newV[0],
	// 	oldV[1] - newV[1],
	// 	oldV[2] - newV[2]
	// ))
	// console.dir("t:",t.cells)
	//
	// console.log(
	// 	"matrix:", matrix,
	// 	"\nphiX:",phiX,
	// 	"\nphiY:",phiY,
	// 	"\nnewT:",newT,
	// 	"\noldT:",oldT,
	//
	// );
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
