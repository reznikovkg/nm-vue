import Matrix from './../../math/Matrix';
import * as AT3D from './../../scene/AffineTransform3D';
import typesOfScene from "../../scene/typesOfScene";
import BaseModel from "./../BaseModel";

export default class ObjectScene extends BaseModel {
	constructor(model) {
		super(model);

		this.name = "Object";
		this.code = "object";
		this.type = typesOfScene.SCENE3D;
	}

	setModel(model) {
		this.model = model;
		this.countPoints = model.getCountPoints();
		this.setAccumulationAP();
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

	applyToAt(at) {
		this.accumulationAP.compWithLeft(at);
		this.setMatrixOfPoints();
	}

	setMatrixOfPoints() {
		this.matrixResult = new Matrix();
		this.matrixResult.AllocateCells(this.accumulationAP.getStrNum(), this.model.getMatrixOfPoints().getColNum());

		return this.matrixResult.sumWith(this.accumulationAP.compWith(this.model.getMatrixOfPoints(), true));
	}

	getMatrixOfPoints() {
		//console.log(this.accumulationAP.compWith(this.model.getMatrixOfPoints(), true));
		// return this.accumulationAP.compWith(this.model.getMatrixOfPoints(), true);
		return this.matrixResult;
	}

	render() {
		if (!this.show) {
			return;
		}
	}

}
