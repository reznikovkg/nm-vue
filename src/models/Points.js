import BaseModel from "./BaseModel";
import Matrix from './../math/Matrix';
import typesOfScene from "./../scene/typesOfScene";
import typesOfModels from "./../models/typesOfModels";
import { getArrayWithAllocateCells } from "./../functions/array";

export default class Points extends BaseModel {
    constructor(
        // x = [], y = [], z = []
        x= [1,2,3,4,5],
        y= [1,0,1,0,1],
        z= [0,0,0,0,0]
    ) {
        super();

        this.x = x;
        this.y = y;
        this.z = z;
        this.identity = getArrayWithAllocateCells(this.x.length, 1);

        this.h = [];

        this.combo = false;
        this.minH = 1;

        this.setH();
    }

    /**
     * Set array H
     */
    setH() {
        this.h = [];
        for (let i = 0; i < this.x.length - 1; i++) {
            this.h[i] = this.x[i+1] - this.x[i];
        }
    }

    sortByX() {

    }

    /**
     * Add point
     *
     * @param x
     * @param y
     * @param z
     *
     * Status: Done
     */
    addPoint(x = 0, y = 0, z = 0) {
        this.x.push(x);
        this.y.push(y);
        this.z.push(z);
        this.identity.push(1);

        if (this.x.length > 1) {
            this.h.push(this.x[this.x.length-1]-this.x[this.x.length-2]);
        }
    }

    /**
     * Add point to first place
     *
     * @param x
     * @param y
     * @param z
     *
     * Status: Done
     */
    unshiftPoint(x = 0, y = 0, z = 0) {
        this.x.unshift(x);
        this.y.unshift(y);
        this.z.unshift(z);
        this.identity.push(1);

        if (this.x.length > 1) {
            this.h.unshift(this.x[1]-this.x[0]);
        }
    }

    clear() {
        this.x = [];
        this.y = [];
        this.z = [];
        this.identity = [];
        this.h = [];
    }

    /**
     *
     * @param t
     */
    copy(t) {
        const l = t.x.length;

        for (let i = 0; i < l; i++) {
            this.x.push(t.x[i]);
            this.y.push(t.y[i]);
            this.z.push(t.z[i]);
            this.identity.push(t.identity.cells[i]);//!!!!!WARNING
        }

        const lH = t.h.length;

        for (let i = 0; i < lH; i++) {
            this.h.push(t.h[i]);
        }
    }

    applyAT2D(at) {
        let matr = at.compWith(new Matrix([
            this.x,
            this.y,
            this.identity
        ]), true);

        this.x = matr.getStrFirst();
        this.y = matr.getStrSecond();
    }

    applyAT3D(at) {
        let matr = at.compWith(new Matrix([
            this.x,
            this.y,
            this.z,
            this.identity
        ]), true);

        this.x = matr.getStrFirst();
        this.y = matr.getStrSecond();
        this.z = matr.getStrThird();
    }

    addAll( x = 0, y = 0, z = 0 ){
        for (let i = 0; i < this.x.length; i++) {
            this.x[i] +=x;
            this.y[i] +=y;
            this.z[i] +=z;
        }
    }

    apply( at ){
        if (this.type === typesOfScene.SCENE2D) {
            this.applyAT2D(at);
        } else if (this.type === typesOfScene.SCENE3D) {
            this.applyAT3D(at);
        }
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
        let s = Math.abs(
            camera.ScreenToWorldY(0) -
            camera.ScreenToWorldY(camera.grid.serifsSize)
        );
        if (this.type === typesOfScene.SCENE2D) {
            for (let i = 0; i < this.x.length; i++) {
                camera.moveTo(this.x[i]+(s/2), this.y[i]-(s/2));
                camera.lineTo(this.x[i]-(s/2), this.y[i]+(s/2));
                camera.moveTo(this.x[i]+(s/2), this.y[i]+(s/2));
                camera.lineTo(this.x[i]-(s/2), this.y[i]-(s/2));
            }
        } else if (this.type === typesOfScene.SCENE3D) {
            for (let i = 0; i < this.x.length; i++) {
                camera.moveTo(this.x[i]+(s/2), this.y[i], this.z[i]);
                camera.lineTo(this.x[i]-(s/2), this.y[i], this.z[i]);

                camera.moveTo(this.x[i], this.y[i]+(s/2), this.z[i]);
                camera.lineTo(this.x[i], this.y[i]-(s/2), this.z[i]);

                camera.moveTo(this.x[i], this.y[i], this.z[i]+(s/2));
                camera.lineTo(this.x[i], this.y[i], this.z[i]-(s/2));
            }
        }
        ctx.stroke();
    }

    getCountPoints() {
        return this.x.length;
    }
    getMatrixOfPoints() {
        return new Matrix([
            this.x,
            this.y,
            this.z,
            this.identity
        ])
    }

    removePoint(index) {
        this.x.splice(index, 1);
        this.y.splice(index, 1);
        this.z.splice(index, 1);
        this.setH();
    }
}
