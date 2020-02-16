import Matrix from './../../math/Matrix';
import * as AT3D from './../../scene/AffineTransform3D';
import typesOfScene from "../../scene/typesOfScene";
import BaseModel from "./../BaseModel";

export default class ObjectScene extends BaseModel {
	constructor(model) {
		super(model);
	}

	setChildModel(model) {
		console.log(11, model)
		this.childModel = model;
		this.countPoints = model.getCountPoints();
		this.setAccumulationAP();
		this.setMatrixOfPoints();
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
		console.log(this.countPoints)
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

		let ctx = camera.canvas.getContext("2d");
		ctx.beginPath();
		ctx.strokeStyle = '#107e00';
		ctx.setLineDash([]);
		ctx.lineWidth = 3;
		console.log(this.type)
		// if (this.type === typesOfScene.SCENE2D) {
		// 	for (let i = 0; i < this.x.length; i++) {
		// 		camera.moveTo(this.x[i]+(s/2), this.y[i]-(s/2));
		// 		camera.lineTo(this.x[i]-(s/2), this.y[i]+(s/2));
		// 		camera.moveTo(this.x[i]+(s/2), this.y[i]+(s/2));
		// 		camera.lineTo(this.x[i]-(s/2), this.y[i]-(s/2));
		// 	}
		// } else if (this.type === typesOfScene.SCENE3D) {
			camera.moveTo(this.matrixResult.getStrFirst()[0], this.matrixResult.getStrSecond()[0], this.matrixResult.getStrThird()[0]);
			for (let i = 0; i < this.matrixResult.getStrFirst().length; i++) {
				camera.lineTo(this.matrixResult.getStrFirst()[i], this.matrixResult.getStrSecond()[i], this.matrixResult.getStrThird()[i]);
			}
		// }
		ctx.stroke();

	}

}
