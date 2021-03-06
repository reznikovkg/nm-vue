import Matrix from './../../math/Matrix';
import typesOfScene from "../../scene/typesOfScene";
import BaseModel from "./../BaseModel";
import * as AT3D from './../../scene/AffineTransform3D';
import {TypeModelsByScene} from "@/models/typesOfModels";
import SphereForm from './../../components/Elements/Forms/Models3D/Sphere';

export const CODE = 'sphere'
export const NAME = 'Sphere'

export default class Sphere extends BaseModel {
    code = CODE
    name = NAME
    formEdit = SphereForm

    constructor() {
        super();

        this.radius = 10;
        this.segments = 4;
        this.intervals = 4;
        this.type = TypeModelsByScene.SCENE_3D;
        this.animateModel = true;
    }

    apply(at) {
        this.pivotPosition.compWithLeft(at);
    }

    render(camera) {
        if (!this.show) {
            return;
        }

        console.log(this.hash, this.animation)

        let matrixResult = this.pivotPosition;

        if (camera.animateMode) {
            matrixResult = new Matrix();
            matrixResult.AllocateCells(this.pivotPosition.getStrNum(), this.pivotPosition.getColNum())
            matrixResult.sumWith(this.pivotPosition);
            matrixResult.compWithLeft(this.getAnimateFrameAT(camera))
        }

        const matForm = new Matrix([
            [0],
            [this.radius],
            [0],
            [1],
        ]);

        const matF = new Matrix();
        matF.setMatrixForce(matForm);

        const degIntervals = Math.PI/this.intervals;
        for (let i = 0; i <= this.intervals; i++) {
            matF.compWithLeft(AT3D.rotationZDeg(degIntervals));
            matForm.addPoint(
                matF.cells[0][0],
                matF.cells[1][0],
                matF.cells[2][0],
            )
        }

        const degSegments = 2 * Math.PI/this.segments;
        for (let i = 0; i <= this.segments; i++) {
            const oldMatForm = new Matrix();
            oldMatForm.setMatrixForce(matForm);
            matForm.compWithLeft(AT3D.rotationYDeg(degSegments));

            const matP1 = new Matrix();
            matP1.setMatrixForce(oldMatForm);
            matP1.compWithLeft(AT3D.translation(
              matrixResult.cells[0][0],
              matrixResult.cells[1][0],
              matrixResult.cells[2][0],
            ));

            const matP2 = new Matrix();
            matP2.setMatrixForce(matForm);
            matP2.compWithLeft(AT3D.translation(
              matrixResult.cells[0][0],
              matrixResult.cells[1][0],
              matrixResult.cells[2][0],
            ));

            for (let j = 0; j < matP1.getColNum() - 1; j++) {
                const polygon = [[],[]]
                polygon[0].push([
                    matP1.cells[0][j],
                    matP1.cells[1][j],
                    matP1.cells[2][j],
                ]);
                polygon[0].push([
                    matP2.cells[0][j],
                    matP2.cells[1][j],
                    matP2.cells[2][j],
                ]);
                polygon[0].push([
                    matP2.cells[0][j+1],
                    matP2.cells[1][j+1],
                    matP2.cells[2][j+1],
                ]);
                polygon[0].push([
                    matP1.cells[0][j+1],
                    matP1.cells[1][j+1],
                    matP1.cells[2][j+1],
                ]);
                camera.addPolygon(polygon[0], this.color);
            }


        }
    }


    setRadius(v) {
        this.radius = v;
    }
    setIntervals(v) {
        this.intervals = v;
    }
    setSegments(v) {
        this.segments = v;
    }
}
