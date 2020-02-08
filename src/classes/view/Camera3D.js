import Vector from './../math/Vector';
import Matrix from './../math/Matrix';

import Model3D from './../models/Model3D';

import Camera2D from './Camera2D';
import * as AT3D from './../../consts/view/AffineTransform3D';
import typesOfScene from "../../consts/typesOfScene";

export default class Camera3D extends Camera2D {

    constructor(canvas = null) {
        super(canvas);

        this.vOv = new Vector([0,0,0]);
        this.vT = new Vector([0,1,0]);
        this.vN = new Vector([-1,1,1]);

        this.d = 30;

        this.updateCamera();

        this.moveCamera = {
            move: false,
            x: this.drag.x,
            y: this.drag.y

        }
    }



    worldToViewF(isReturn = false) {
        if (isReturn) {
            return new Matrix([
                [this.vI.cells[0], this.vI.cells[1], this.vI.cells[2], (this.vI.compWith(this.vOv))*(-1)],
                [this.vJ.cells[0], this.vJ.cells[1], this.vJ.cells[2], (this.vJ.compWith(this.vOv))*(-1)],
                [this.vK.cells[0], this.vK.cells[1], this.vK.cells[2], (this.vK.compWith(this.vOv))*(-1)],
                [0, 0, 0, 1]
            ]);
        } else {
            this.worldToView = new Matrix([
                [this.vI.cells[0], this.vI.cells[1], this.vI.cells[2], (this.vI.compWith(this.vOv))*(-1)],
                [this.vJ.cells[0], this.vJ.cells[1], this.vJ.cells[2], (this.vJ.compWith(this.vOv))*(-1)],
                [this.vK.cells[0], this.vK.cells[1], this.vK.cells[2], (this.vK.compWith(this.vOv))*(-1)],
                [0, 0, 0, 1]
            ]);
        }
    }

    viewToProjectF(isReturn = false) {
        if (isReturn) {
            return new Matrix([
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, (1.0)/this.d, 1]
            ]);
        } else {
            this.viewToProject = new Matrix([
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, (1.0)/this.d, 1]
            ]);
        }
    }

    worldToProjectF(isReturn = false) {
        if (isReturn) {
            return this.viewToProject.compWith(this.worldToView, true);
        } else {
            this.worldToProject = this.viewToProject.compWith(this.worldToView, true);
        }
    }

    updateCamera() {
        this.worldToView = null;
        this.viewToProject = null;
        this.worldToProject = null;

        this.vK = this.vN.divWith(this.vN.norma(), true);
        this.vI = (this.vT.scalarWith(this.vN,true)).divWith((this.vT.scalarWith(this.vN,true)).norma(), true);
        this.vJ = this.vK.scalarWith(this.vI,true);

        this.worldToViewF();
        this.viewToProjectF();
        this.worldToProjectF();
    }

    moveCameraStart(e) {
        this.moveCamera.move = true;

        let x = e.clientX;
        let y = e.clientY;
        this.moveCamera.y = y;
        this.moveCamera.x = x;
    }

    moveCameraGo(e) {
        if (this.moveCamera.move) {

            let n = this.vN.cells;
            let t = this.vT.cells;
            let mat = new Matrix([
                [ n[0], t[0] ],
                [ n[1], t[1] ],
                [ n[2], t[2] ],
                [ 1, 1 ]
            ]);

            let x = e.clientX;
            let y = e.clientY;

            let ch = 10;
            let deg = Math.PI / 24;

            if ( y - ch > this.moveCamera.y || y + ch < this.moveCamera.y) {

                if (y > this.moveCamera.y) {
                    mat = AT3D.rotationXDeg( -deg ).compWith(mat, true);
                } else {
                    mat = AT3D.rotationXDeg( deg ).compWith(mat, true);
                }

                this.moveCamera.y = y;
            }

            if ( x - ch > this.moveCamera.x || x + ch < this.moveCamera.x) {

                if ( x > this.moveCamera.x ) {
                    mat = AT3D.rotationYDeg( -deg ).compWith(mat, true);
                } else {
                    mat = AT3D.rotationYDeg( deg ).compWith(mat, true);
                }

                this.moveCamera.x = x;
            }


            /**
             * Get updated camera vectors
             * @type {boolean|*|*}
             */
            this.vN.cells = mat.getColFirst();
            this.vT.cells = mat.getColSecond();


            this.updateCamera();
        }
    }

    moveCameraStop() {
        this.moveCamera.move = false;
        this.updateCamera();
    }


    reRender(models = []) {
        this.clear();
        this.axisPlot3D();
        this.render(models, typesOfScene.SCENE3D);
    }

    axisPlot3D () {
        /**
         * axis X
         * @type {CanvasRenderingContext2D | WebGLRenderingContext}
         */
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#1c137e';
        this.ctx.setLineDash([]);
        this.ctx.lineWidth = 2;
        this.moveTo(0,0,0);
        this.lineTo(1,0,0);
        this.ctx.stroke();
        /**
         * axis Y
         * @type {CanvasRenderingContext2D | WebGLRenderingContext}
         */
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#0aaa00';
        this.ctx.setLineDash([]);
        this.ctx.lineWidth = 2;
        this.moveTo(0,0,0);
        this.lineTo(0,1,0);
        this.ctx.stroke();
        /**
         * axis Z
         * @type {CanvasRenderingContext2D | WebGLRenderingContext}
         */
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#cb0006';
        this.ctx.setLineDash([]);
        this.ctx.lineWidth = 2;
        this.moveTo(0,0,0);
        this.lineTo(0,0,1);
        this.ctx.stroke();
    }

    moveTo(x, y, z) {
        let t = new Matrix([[x], [y], [z], [1]]);
        t.setArray(this.worldToProjectF(true).compWith(t,true).cells);
        super.moveTo(t.getProjectX(0),t.getProjectY(0));
    }

    lineTo(x, y, z) {
        let t = new Matrix([[x], [y], [z], [1]]);
        t.setArray(this.worldToProjectF(true).compWith(t,true).cells);
        super.lineTo(t.getProjectX(0),t.getProjectY(0));
    }

    getCoord(x, y, z) {
        let t = new Matrix([[x], [y], [z], [1]]);
        t.setArray(this.worldToProjectF(true).compWith(t,true).cells);
        return super.getCoord(t.getProjectX(0),t.getProjectY(0));
    }
}
