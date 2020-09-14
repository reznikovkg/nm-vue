import Vector from './../math/Vector';
import Matrix from './../math/Matrix';

import Camera2D from './Camera2D';
import * as AT3D from './AffineTransform3D';
import typesOfScene from "./typesOfScene";
import {GPU} from "gpu.js";
import {getMatrixToTransformPoint2D} from "@/math/AnalitycGeometry";
import fKernel from "@/scene/fKernel";

const defaultParamsCamera = {
    vOv: new Vector([0,0,0]),
    vT: new Vector([0,1,0]),
    vN: new Vector([-1,1,1]),
    d: 30
}

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

    render(models = [], type = typesOfScene.SCENE2D, lights = null) {
        this.polygons = [1];
        lights = models.find((item) => (item.code === "light" && item.show));
        for (let i = 0; i < models.length; i++) {
            if (models[i].type === type) models[i].render(this, lights);
        }

        setTimeout(() => {
            const gpu = new GPU();

            // function fKernel(_polygons, _polygonsLength) {
            //     const matrixTransform00 = this.constants.matrixTransform00;
            //     const matrixTransform10 = this.constants.matrixTransform10;
            //     const matrixTransform20 = this.constants.matrixTransform20;
            //
            //     const matrixTransform01 = this.constants.matrixTransform01;
            //     const matrixTransform11 = this.constants.matrixTransform11;
            //     const matrixTransform21 = this.constants.matrixTransform21;
            //
            //
            //     const positionOfCamera0 = this.constants.positionOfCamera0;
            //     const positionOfCamera1 = this.constants.positionOfCamera1;
            //     const positionOfCamera2 = this.constants.positionOfCamera2;
            //
            //     const centerX = this.constants.centerX;
            //     const centerY = this.constants.centerY;
            //     const scalePx = this.constants.scalePx;
            //     const scalePy = this.constants.scalePy;
            //
            //     const coordsX =  (this.thread.x - centerX + 0.5) / scalePx;
            //     const coordsY =  -( this.thread.y - centerY + 0.5) / scalePy;
            //     const coordsZ = 0;
            //
            //     /**
            //      * вектор направления луча от камеры в пиксель экрана
            //      * @type {number[]}
            //      */
            //     const ray = [
            //         matrixTransform00*coordsX + matrixTransform01*coordsY - positionOfCamera0,
            //         matrixTransform10*coordsX + matrixTransform11*coordsY - positionOfCamera1,
            //         matrixTransform20*coordsX + matrixTransform21*coordsY - positionOfCamera2,
            //         1
            //     ];
            //
            //
            //     let colorNow = [
            //         255,
            //         255,
            //         255,
            //     ];
            //
            //     let distance = 99999;
            //
            //     //цикл по полигонам
            //     for (let k = 0; k < _polygonsLength; k++) {
            //
            //         const point1 = _polygons[k][0][0];
            //         const point2 = _polygons[k][0][1];
            //
            //         //найти плоскость по точкам полигона
            //
            //         //найти точку пересечения ray и плоскости
            //
            //         //проверить точку на принадлежность полигону
            //
            //         //если принадлежит
            //         if (true) {
            //
            //             //вычислить расстояние от точки до камеры
            //             //если меньше чем distance то заменить на цвет полигона и новое расстояние
            //         }
            //     }
            //
            //
            //     this.color(
            //         (this.thread.x > 255) ? 1 : this.thread.x/255,
            //         (this.thread.y > 255) ? 1 : this.thread.y/255,
            //         0);
            // }


            const matrixTransform = getMatrixToTransformPoint2D(
                defaultParamsCamera,
                this
            ).cells;

            const kernel = gpu.createKernel(fKernel)
                .setConstants({
                    matrixTransform00: matrixTransform[0][0],
                    matrixTransform10: matrixTransform[1][0],
                    matrixTransform20: matrixTransform[2][0],

                    matrixTransform01: matrixTransform[0][1],
                    matrixTransform11: matrixTransform[1][1],
                    matrixTransform21: matrixTransform[2][1],

                    positionOfCamera0: (this.vN.cells[0] - this.vOv.cells[0])*this.d,
                    positionOfCamera1: (this.vN.cells[1] - this.vOv.cells[1])*this.d,
                    positionOfCamera2: (this.vN.cells[2] - this.vOv.cells[2])*this.d,

                    centerX: this.center.x,
                    centerY: this.center.y,
                    scalePx: this.scale.px,
                    scalePy: this.scale.py,
                })
                .setGraphical(true)
                .setOutput([this.canvas.width, this.canvas.height]);

            if (this.polygons.length) kernel(this.polygons, this.polygons.length);

            // const out = document.body;
            // out.appendChild(kernel.canvas);
            this.ctx.drawImage(kernel.canvas, 0, 0);

            console.log('DOne')
        }, 1);
    }

    reRender(models = []) {

        console.log(this.vN)
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

    apply(at) {

        let mat = new Matrix([
            [ this.vN.cells[0] ],
            [ this.vN.cells[1] ],
            [ this.vN.cells[2] ],
            [1],
        ]);

        mat.compWithLeft(at);

        this.vN.cells[0] = mat.cells[0][0];
        this.vN.cells[1] = mat.cells[1][0];
        this.vN.cells[2] = mat.cells[2][0];

        this.updateCamera();
    }




}
