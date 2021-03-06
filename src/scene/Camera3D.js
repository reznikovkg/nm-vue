import Vector from './../math/Vector';
import Matrix from './../math/Matrix';

import Camera2D from './Camera2D';
import * as AT3D from './AffineTransform3D';
import typesOfScene from "./typesOfScene";
import {getMatrixToTransformPoint2D} from "@/math/AnalitycGeometry";
import {VectorCombine,LengthFPTP} from "@/scene/fKernel";
import {GPU} from "gpu.js";
import lodash from 'lodash'

import Light, { CODE as Light_CODE } from "@/models/3d/Light";

import RayTracing from './render/RayTracing';

export const defaultParamsCamera = {
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

        // this.sizeOfPixel = 100.01;

        this.rayTracing = false;

        this.animateMode = false;
        this.animateModeInterval = null;
        this.animateFramerate = 192;
        this.animateActiveFrame = 0;

        this.timeRendering = 0
        this.timeRenderingLog = []

        this.reRender = lodash.throttle(this.reRender, 1000/this.animateFramerate)
    }

    destroy() {
        clearInterval(this.animateModeInterval)
        this.animateModeInterval = null;
        this.isRender = false;
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
        this.vI = (this.vT.scalarWith(this.vN,true)).divWith(
          (this.vT.scalarWith(this.vN,true)).norma(),
          true
        );
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
            let ov = this.vOv.cells;
            let mat = new Matrix([
                [ n[0], t[0], ov[0] ],
                [ n[1], t[1], ov[1] ],
                [ n[2], t[2], ov[2] ],
                [ 1, 1, 1 ]
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

    setDbyE(e) {
        let k = 1;
        if (e.deltaY < 0) { k = 1.1; } else { k = 0.9; }

        if (this.d * k > 0) {
            this.d *= k;
        }

        if ((this.scale.px * k > 0) && (this.scale.py * k > 0)) {
            this.scale.px *= k;
            this.scale.py *= k;
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

    render(models = [], type = typesOfScene.SCENE_3D, lights = null) {
        this.timeRendering = new Date().getTime();
        const d1X = this.ScreenToWorldX(0);
        const d1Y = this.ScreenToWorldY(0);

        const d2X = this.ScreenToWorldX(0.5);
        const d2Y = this.ScreenToWorldY(0);

        this.sizeOfPixel = Math.sqrt((d2X-d1X) * (d2X-d1X) + (d2Y-d1Y) * (d2Y-d1Y));


        this.polygons = [ [ ] ];
        this.lights = [ [ ] ];

        const lightsF = models.filter((item) => (item.code === Light_CODE && item.show));
        if (lightsF) lightsF.forEach((item) => { this.addLigth(item) })

        for (let i = 0; i < models.length; i++) {
            if (models[i].type === type) models[i].render(this);
        }

        // console.log(this.polygons)
        try {
            if (this.rayTracing) {
                RayTracing.call(this)
            } else {

            }
        } catch (e) {
            console.log(e);
            alert('ACCESS NOT PROVIDED FOR WEBGL');
            this.destroy()
        }
    }

    reRender(models = []) {
        if (this.isRender) return;

        if (!this.rayTracing) this.clear();
        if (!this.rayTracing) this.axisPlot3D();
        this.render(models, typesOfScene.SCENE_3D);
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
        this.ctx.closePath();
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
        this.ctx.closePath();
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
        this.ctx.closePath();
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


    // ANIMATIONS
    toggleAnimateMode(_state = !this.animateMode, models = []) {
        this.animateMode = _state;
        if (this.animateMode) {
            this.animateModeInterval = setInterval(() => {
                this.nextFrame();
                this.reRender(models);
            }, 1000/this.animateFramerate)
        } else {
            clearInterval(this.animateModeInterval)
            this.animateModeInterval = null;
        }
    }

    nextFrame() {
        this.animateActiveFrame++;
        if (this.animateActiveFrame >= this.animateFramerate) this.animateActiveFrame = 0;
    }


}
