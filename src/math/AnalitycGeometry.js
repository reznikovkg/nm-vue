
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

	let poi = [
		point[0] + x*j,
		point[1] + y*j,
		point[2] + z*j,
	];


	return poi;
}