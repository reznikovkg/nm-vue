import { genHash } from '@/functions/functions';
import typesOfScene from "../scene/typesOfScene";
import typesOfModels from "./typesOfModels";
import Matrix from "@/math/Matrix";

export default class BaseModel {
	constructor() {
		this.show = false;
		this.title = null;
		this.hash = genHash();

		this.pivotPosition = new Matrix([
			[0],
			[0],
			[0],
			[1]
		]);

		this.pivotOrientation = new Matrix([
			[1, 0, 0],
			[0, 1, 0],
			[0, 0, 1],
			[1, 1, 1]
		]);

		this.color = [
			0.5,0.5,0.5
		]
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


	setColor(v) {
		this.color = v;
	}

	alignByPivot() {
		this.pivotPosition.compWithLeft(at);
	}
}
