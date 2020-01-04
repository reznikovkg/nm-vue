import Vector from './../math/Vector';
import Matrix from './../math/Matrix';

export default class Points {

    constructor(
        // x = [], y = [], z = []

                   x= [1,2,3,4],
                y = [1,0,1,0],
                z= [0,0,0,0]) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.name = "Points";
        this.code = "points";

        this.show = true;

        this.identity = new Vector();
        this.identity.IdentityCells(this.x.length);

        this.h = [];

        this.combo = false;
        this.minH = 1;

        this.setH();
    }

    /**
     * Set array H
     */
    setH() {
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
        this.identity.cells.push(1);

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
        this.identity.cells.push(1);

        if (this.x.length > 1) {
            this.h.unshift(this.x[1]-this.x[0]);
        }
    }

    clear() {
        this.x = [];
        this.y = [];
        this.z = [];
        this.identity.cells = [];
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
            this.identity.cells.push(t.identity.cells[i]);
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
            this.identity.cells
        ]), true);

        this.x = matr.getStrFirst();
        this.y = matr.getStrSecond();
    }

    applyAT3D(at) {
        let matr = at.compWith(new Matrix([
            this.x,
            this.y,
            this.z,
            this.identity.cells
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
        for (let i = 0; i < this.x.length; i++) {
            camera.moveTo(this.x[i]+(s/2), this.y[i]-(s/2));
            camera.lineTo(this.x[i]-(s/2), this.y[i]+(s/2));
            camera.moveTo(this.x[i]+(s/2), this.y[i]+(s/2));
            camera.lineTo(this.x[i]-(s/2), this.y[i]-(s/2));
        }
        ctx.stroke();
    }
}
