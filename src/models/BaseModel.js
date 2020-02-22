import { genHash } from './../functions/functions';
import typesOfScene from "../scene/typesOfScene";
import typesOfModels from "./typesOfModels";

export default class BaseModel {
	constructor() {
		this.show = false;
		this.title = null;
		this.hash = genHash();
	}

	toggleShow() {
		this.show = !this.show;
	}

	setDefaultParams(params, type) {
		this.type = type;
		this.name = params.name;
		this.code = params.code;

		return this;
	}

	setTitle(title) {
		this.title = title;
	}
	getTitle() {
		if (this.title) {
			return this.title
		} else {
			return `${ this.name } (${ this.hash })`;
		}
	}
}
