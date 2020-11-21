import Vector from './../math/Vector';
import Matrix from './../math/Matrix';

import Camera2D from './Camera2D';
import * as AT3D from './AffineTransform3D';
import typesOfScene from "./typesOfScene";
import {getMatrixToTransformPoint2D} from "@/math/AnalitycGeometry";
import {fKernel, initGPU, VectorCombine,LengthFPTP} from "@/scene/fKernel";
import {GPU} from "gpu.js";

const defaultParamsCamera = {
    vOv: new Vector([0,0,0]),
    vT: new Vector([0,1,0]),
    vN: new Vector([0,0,1]),
    d: 100
}

export default class Camera3D extends Camera2D {

    constructor(canvas = null) {
        super(canvas);

        this.vOv = new Vector([0,0,0]);
        this.vT = new Vector([0,1,0]);
        this.vN = new Vector([0,0,1]);
        this.d = 100;

        this.updateCamera();

        this.moveCamera = {
            move: false,
            x: this.drag.x,
            y: this.drag.y

        }

        this.sizeOfPixel = 0.1;

        this.rayTracing = false;
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
        // const d1X = this.ScreenToWorldX(0);
        // const d1Y = this.ScreenToWorldY(0);
        //
        // const d2X = this.ScreenToWorldX(2);
        // const d2Y = this.ScreenToWorldY(0);
        //
        // this.sizeOfPixel = Math.sqrt((d2X-d1X) * (d2X-d1X) + (d2Y-d1Y) * (d2Y-d1Y));

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

    toggleRayTracing(_state = !this.rayTracing) {
        this.rayTracing = _state;
    }

    /**
     * Polygon [ point1, point2, ...]
     * Options []
     *
     * @param polygon
     * @param options
     */
    addPolygon(polygon, options) {
        if (polygon.length === 3) {
            polygon[3] = options;
            this.polygons[0].push(polygon)
        } else if (polygon.length === 4) {
            this.polygons[0].push([
                polygon[0],
                polygon[1],
                polygon[3],
                options
            ])
            this.polygons[0].push([
                polygon[1],
                polygon[2],
                polygon[3],
                options
            ])
        }
    }

    /**
     *
     * @param light
     */
    addLigth(light) {
        this.lights[0].push([
            light.getPosition(),
            light.cLight,
            light.cDark,
            [light.power, 0, 0]
        ]);
    }

    render(models = [], type = typesOfScene.SCENE2D, lights = null) {

        const d1X = this.ScreenToWorldX(0);
        const d1Y = this.ScreenToWorldY(0);

        const d2X = this.ScreenToWorldX(2);
        const d2Y = this.ScreenToWorldY(0);

        this.sizeOfPixel = Math.sqrt((d2X-d1X) * (d2X-d1X) + (d2Y-d1Y) * (d2Y-d1Y));


        this.polygons = [ [ ] ];
        this.lights = [ [ ] ];
        /*console.log(this.polygons)

        this.addPolygon([
            [-3,5,2],
            [3,5,2],
            [0,-5,-3],
        ], [1,0,0]);

        this.addPolygon([
            [-4,-5,2],
            [-5,-1,2],
            [4,3,-3],
        ], [0,0,1]);

        this.addPolygon([
            [5,-1,2],
            [4,-5,2],
            [-5,5,-3],
        ], [0,1,0]);*/

        // this.polygons[1] = [
        //   [
        //     [10, 0, 0],
        //     [1, 1, 1],
        //     [10]
        //   ]
        // ]

        const lightsF = models.filter((item) => (item.code === "light" && item.show));
        if (lightsF) lightsF.forEach((item) => { this.addLigth(item) })

        for (let i = 0; i < models.length; i++) {
            if (models[i].type === type) models[i].render(this);
        }

        // console.log(this.polygons)
        if (this.rayTracing)
        setTimeout(() => {
            const gpu = initGPU();
            // const gpu = new GPU();
            //
            // gpu.addFunction(VectorCombine, { argumentTypes: { a: 'Array(3)', b: 'Array(3)'}, returnType: 'Array(3)' });
            // gpu.addFunction(LengthFPTP);

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

                    positionOfCamera0: (this.vN.cells[0]*this.d - this.vOv.cells[0]),
                    positionOfCamera1: (this.vN.cells[1]*this.d - this.vOv.cells[1]),
                    positionOfCamera2: (this.vN.cells[2]*this.d - this.vOv.cells[2]),

                    centerX: this.center.x,
                    centerY: this.center.y,
                    scalePx: this.scale.px,
                    scalePy: this.scale.py,

                    countOfPolygons: this.polygons[0].length,

                    sizeOfPixel: this.sizeOfPixel
                })
                .setGraphical(true)
                .setOutput([this.canvas.width, this.canvas.height]);

            if (this.polygons[0].length) kernel(this.polygons, this.lights);
            this.ctx.drawImage(kernel.canvas, 0, 0);

        }, 1);
    }

    reRender(models = []) {
        if (!this.rayTracing) this.clear();
        if (!this.rayTracing) this.axisPlot3D();
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
