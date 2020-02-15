import Matrix from './../math/Matrix';
import * as AT3D from './../../consts/view/AffineTransform3D';
import * as AT2D from './../../consts/view/AffineTransform2D';
import typesOfModels from "../../consts/typesOfModels";
import typesOfScene from "../../consts/typesOfScene";

export default class ObjectScene {
	constructor(model) {
		console.log(model)
		this.setModel(model);
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


}
