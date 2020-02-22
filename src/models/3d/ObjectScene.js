import Matrix from './../../math/Matrix';
import * as AT3D from './../../scene/AffineTransform3D';
import typesOfScene from "../../scene/typesOfScene";
import BaseModel from "./../BaseModel";

export default class ObjectScene extends BaseModel {
	constructor(model) {
		super(model);
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
		if (!this.show) {
			return;
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
			camera.moveTo(this.matrixResult.getStrFirst()[0], this.matrixResult.getStrSecond()[0], this.matrixResult.getStrThird()[0]);
			for (let i = 0; i < this.matrixResult.getStrFirst().length - 1; i++) {
				camera.lineTo(this.matrixResult.getStrFirst()[i], this.matrixResult.getStrSecond()[i], this.matrixResult.getStrThird()[i]);
			}
		// }
		ctx.stroke();



		ctx.beginPath();
		ctx.strokeStyle = '#7e000d';
		ctx.setLineDash([]);
		ctx.lineWidth = 3;
		camera.moveTo(
			this.matrixResult.getStrFirst()[this.matrixResult.getStrFirst().length - 2],
			this.matrixResult.getStrSecond()[this.matrixResult.getStrFirst().length - 2],
			this.matrixResult.getStrThird()[this.matrixResult.getStrFirst().length - 2]
		);
		camera.lineTo(
			this.matrixResult.getStrFirst()[this.matrixResult.getStrFirst().length - 1],
			this.matrixResult.getStrSecond()[this.matrixResult.getStrFirst().length - 1],
			this.matrixResult.getStrThird()[this.matrixResult.getStrFirst().length - 1]
		);
		ctx.stroke();
	}

}
