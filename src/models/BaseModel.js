import { genHash } from '@/functions/functions';
import typesOfScene from "../scene/typesOfScene";
import typesOfModels from "./typesOfModels";
import Matrix from "@/math/Matrix";

import { scaling as ScalingAT3D } from './../scene/AffineTransform3D';

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

		this.animateModel = false;
		this.animation = {
			name: 'pulse',
			frames:[
				new ScalingAT3D(1,1,1),
				new ScalingAT3D(1.2,1.2,1.2),
				new ScalingAT3D(1.4,1.4,1.4),
				new ScalingAT3D(1.6,1.6,1.6),
				new ScalingAT3D(1.8,1.8,1.8),
				new ScalingAT3D(2,2,2),
				new ScalingAT3D(1.8,1.8,1.8),
				new ScalingAT3D(1.6,1.6,1.6),
				new ScalingAT3D(1.4,1.4,1.4),
				new ScalingAT3D(1.2,1.2,1.2),
				new ScalingAT3D(1,1,1),
			]
		}

		this.commonFields = true
	}

	render() {
		if (this.show) {
			// TODO logic

			return true;
		}

		return false
	}

	getAnimateFrameAT(camera) {
		if (camera.animateMode) {
			const frameNumber = Math.round(this.animation.frames.length * (camera.animateActiveFrame / camera.animateFramerate))

			return this.animation.frames[frameNumber >= this.animation.frames.length ? this.animation.frames.length - 1 : frameNumber];
		}

		return false;
	}

	setAnimationOfModel(animate) {
		this.animation = animate
	}

	toggleShow() {
		this.show = !this.show;
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

	setTypeForce(type) {
		this.type = type

		return this;
	}
}
