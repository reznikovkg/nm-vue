import { genHash } from './../functions/functions';

export default class BaseModel {
	constructor() {
		this.show = false;
		this.hash = genHash();
	}

	toggleShow() {
		this.show = !this.show;
	}
}
