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
        this.vN = new Vector([0,0,1]);

        this.d = 10;

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
                [0, 0, (-1.0)/this.d, 1]
            ]);
        } else {
            this.viewToProject = new Matrix([
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, (-1.0)/this.d, 1]
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
        // console.log(this.camera3D.worldToProjectF(true));
        // for (var i = 1; i < 2; i++) {
        //     this.moveTo(this.axis3D.x.getProjectX(i-1), this.axis3D.x.getProjectY(i-1));
        //     this.lineTo(this.axis3D.x.getProjectX(i), this.axis3D.x.getProjectY(i));
        // }
        let ctx = this.canvas.getContext("2d");


        let axis3D = {
            x: new Model3D(),
            y: new Model3D(),
            z: new Model3D()
        };

        axis3D.x.setVertices(new Matrix([[1,0],[0,0],[0,0],[1,1]]));
        axis3D.y.setVertices(new Matrix([[0,0],[1,0],[0,0],[1,1]]));
        axis3D.z.setVertices(new Matrix([[0,0],[0,0],[1,0],[1,1]]));

        /**
         * axis X
         * @type {CanvasRenderingContext2D | WebGLRenderingContext}
         */
        ctx.beginPath();
        ctx.strokeStyle = '#1c137e';
        ctx.setLineDash([]);
        ctx.lineWidth = 2;
        axis3D.x.project(this.worldToProjectF(true), true);
        for (var i = 1; i < 2; i++) {
            this.moveTo(axis3D.x.getProjectX(i-1), axis3D.x.getProjectY(i-1));
            this.lineTo(axis3D.x.getProjectX(i), axis3D.x.getProjectY(i));
        }
        ctx.stroke();
        /**
         * axis Y
         * @type {CanvasRenderingContext2D | WebGLRenderingContext}
         */
        ctx.beginPath();
        ctx.strokeStyle = '#0aaa00';
        ctx.setLineDash([]);
        ctx.lineWidth = 2;
        axis3D.y.project(this.worldToProjectF(true), true);
        for (let i = 1; i < 2; i++) {
            this.moveTo(axis3D.y.getProjectX(i-1), axis3D.y.getProjectY(i-1));
            this.lineTo(axis3D.y.getProjectX(i), axis3D.y.getProjectY(i));
        }
        ctx.stroke();
        /**
         * axis Z
         * @type {CanvasRenderingContext2D | WebGLRenderingContext}
         */
        ctx.beginPath();
        ctx.strokeStyle = '#cb0006';
        ctx.setLineDash([]);
        ctx.lineWidth = 2;
        axis3D.z.project(this.worldToProjectF(true), true);
        for (let i = 1; i < 2; i++) {
            this.moveTo(axis3D.z.getProjectX(i-1), axis3D.z.getProjectY(i-1));
            this.lineTo(axis3D.z.getProjectX(i), axis3D.z.getProjectY(i));
        }
        ctx.stroke();
    }

}
