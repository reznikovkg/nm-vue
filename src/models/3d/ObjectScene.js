import Matrix from './../../math/Matrix';
import * as AT3D from './../../scene/AffineTransform3D';
import typesOfScene from "../../scene/typesOfScene";
import BaseModel from "./../BaseModel";

export default class ObjectScene extends BaseModel {
	constructor() {
		super();
		this.animateModel = true;
	}

	setChildModel(model) {
		this.childModel = model;
		this.countPoints = model.getCountPoints();
		this.setAccumulationAP();
		this.setMatrixOfPoints();
	}

	getCountPoints() {
		return this.countPoints;
	}

	setCountPoints(val) {
		this.countPoints = val;
		this.setMatrixOfPoints()
	}

	setAccumulationAP(at = null) {
		if (at) {
			this.accumulationAP = at;
		} else {
			this.accumulationAP = AT3D.identity();
			// if (this.model.type === typesOfScene.SCENE3D) {
			// 	this.accumulationAP = AT3D.identity();
			// } else {
			// 	this.accumulationAP = AT2D.identity();
			// }
		}
	}

	apply(at) {
		this.accumulationAP.compWithLeft(at);
		this.setMatrixOfPoints();
	}

	applyToAt(at) {
		this.accumulationAP.compWithLeft(at);
		this.setMatrixOfPoints();
	}

	setMatrixOfPoints() {
		this.matrixResult = new Matrix();
		this.matrixResult.AllocateCells(this.accumulationAP.getStrNum(), this.childModel.getMatrixOfPoints(this.countPoints).getColNum());

		return this.matrixResult.sumWith(this.accumulationAP.compWith(this.childModel.getMatrixOfPoints(this.countPoints), true));
	}

	getMatrixOfPoints() {
		//console.log(this.accumulationAP.compWith(this.model.getMatrixOfPoints(), true));
		// return this.accumulationAP.compWith(this.model.getMatrixOfPoints(), true);
		return this.matrixResult;
	}

	render(camera) {
		if (!super.render()) {
			return;
		}

		let matrixResult = this.matrixResult;

		if (camera.animateMode) {
			matrixResult = new Matrix();
			matrixResult.AllocateCells(this.accumulationAP.getStrNum(), this.childModel.getMatrixOfPoints(this.countPoints).getColNum())
			matrixResult.sumWith(this.matrixResult);
			matrixResult.compWithLeft(this.getAnimateFrameAT(camera))
		}

		if (this.countPoints < 1) {
			return;
		}

		let ctx = camera.canvas.getContext("2d");
		ctx.beginPath();
		ctx.strokeStyle = '#107e00';
		ctx.setLineDash([]);
		ctx.lineWidth = 3;
		// if (this.type === typesOfScene.SCENE2D) {
		// 	for (let i = 0; i < this.x.length; i++) {
		// 		camera.moveTo(this.x[i]+(s/2), this.y[i]-(s/2));
		// 		camera.lineTo(this.x[i]-(s/2), this.y[i]+(s/2));
		// 		camera.moveTo(this.x[i]+(s/2), this.y[i]+(s/2));
		// 		camera.lineTo(this.x[i]-(s/2), this.y[i]-(s/2));
		// 	}
		// } else if (this.type === typesOfScene.SCENE3D) {
		camera.moveTo(matrixResult.getStrFirst()[0], matrixResult.getStrSecond()[0], matrixResult.getStrThird()[0]);
		for (let i = 0; i < matrixResult.getStrFirst().length - 1; i++) {
			camera.lineTo(matrixResult.getStrFirst()[i], matrixResult.getStrSecond()[i], matrixResult.getStrThird()[i]);
		}
		// }
		ctx.stroke();



		ctx.beginPath();
		ctx.strokeStyle = '#7e000d';
		ctx.setLineDash([]);
		ctx.lineWidth = 3;
		camera.moveTo(
			matrixResult.getStrFirst()[matrixResult.getStrFirst().length - 2],
			matrixResult.getStrSecond()[matrixResult.getStrFirst().length - 2],
			matrixResult.getStrThird()[matrixResult.getStrFirst().length - 2]
		);
		camera.lineTo(
			matrixResult.getStrFirst()[matrixResult.getStrFirst().length - 1],
			matrixResult.getStrSecond()[matrixResult.getStrFirst().length - 1],
			matrixResult.getStrThird()[matrixResult.getStrFirst().length - 1]
		);
		ctx.stroke();
	}

}
