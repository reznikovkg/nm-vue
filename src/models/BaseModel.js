import { genHash } from '@/functions/functions';
import typesOfScene from "../scene/typesOfScene";
import typesOfModels from "./typesOfModels";
import Matrix from "@/math/Matrix";

import { scaling as ScalingAT3D } from './../scene/AffineTransform3D';
import {Animations} from "@/scene/Animations";

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
		this.animation = Animations[0];
		this.animationFramesCount = 5;
		this.animationFramesParam = 5;


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
		this.buildAnimation()
	}

	buildAnimation() {
		console.log('build')
		if (this.animation.buildFrames) {
			let v = this.animationFramesParam;
			if (typeof this.animationFramesParam !== 'number') {
				const PI = this.animationFramesParam.indexOf('p') >= 0;
				const val = this.animationFramesParam.replace('p','');
				if (val.indexOf('/') >= 0) {
					let r = val.split('/').map(item => parseFloat(item))
					v = r[0]/r[1]
				} else {
					v = parseFloat(val)
				}
				v = v * ( PI ? Math.PI : 1);
			}
			this.animation = {
				...this.animation,
				frames: this.animation.buildFrames(this.animationFramesCount, v)
			}
		}
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

	getColorRGB() {
		return `rgb(${this.color[0] * 255},${this.color[1] * 255},${this.color[2] * 255})`
	}

	setAnimationFramesCount(afc) {
		this.animationFramesCount = afc
		this.buildAnimation()
	}
	setAnimationFramesParam(afp) {
		this.animationFramesParam = afp
		this.buildAnimation()
	}
}
