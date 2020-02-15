export function randomInteger(min, max) {
	let rand = min + Math.random() * (max - min);
	return Math.round(rand);
}

export function genHash(length = 32) {
	let hash = "";
	const chars = "abcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < length; i++) {
		hash += chars[randomInteger(0, chars.length-1)]
	}

	return hash;
}