import Matrix from './../../math/Matrix';
import typesOfScene from "../../scene/typesOfScene";
import BaseModel from "./../BaseModel";
import * as AT3D from './../../scene/AffineTransform3D';

export default class Sphere extends BaseModel {
    constructor() {
        super();

        this.position = new Matrix([[3],[3],[3],[1]]);

        this.radius = 10;
        this.segments = 4;
        this.intervals = 4;
    }

    apply(at) {
        this.pivotPosition.compWithLeft(at);
    }

    render(camera) {
        if (!this.show) {
            return;
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

        console.log(matForm)
        const degSegments = 2 * Math.PI/this.segments;
        for (let i = 0; i <= this.segments; i++) {
            const oldMatForm = new Matrix();
            oldMatForm.setMatrixForce(matForm);
            matForm.compWithLeft(AT3D.rotationYDeg(degSegments));

            const matP1 = new Matrix();
            matP1.setMatrixForce(oldMatForm);
            matP1.compWithLeft(AT3D.translation(
                this.pivotPosition.cells[0][0],
                this.pivotPosition.cells[1][0],
                this.pivotPosition.cells[2][0],
            ));

            const matP2 = new Matrix();
            matP2.setMatrixForce(matForm);
            matP2.compWithLeft(AT3D.translation(
                this.pivotPosition.cells[0][0],
                this.pivotPosition.cells[1][0],
                this.pivotPosition.cells[2][0],
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

        console.log(camera.polygons)
    }


    getPosition() {
        return [
            this.position.cells[0][0],
            this.position.cells[1][0],
            this.position.cells[2][0],
        ]
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
