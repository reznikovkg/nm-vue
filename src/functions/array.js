export function getArrayWithAllocateCells(l, def = 0) {
	let ar = [];
	for (let i = 0; i < l; i++) {
		ar.push(def);
	}
	return ar;
}
