class Points {

    constructor(x = [], y = [], z = []) {
        this.x = x;
        this.y = y;
        this.z = z;

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
        for (var i = 0; i < this.x.length - 1; i++) {
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

    /**
     * Affine transform rotation of points 2D
     *
     * @param deg
     * @constructor
     *
     * Status: done
     */
    AT2D_RotationDeg(deg) {
        var matr = AT2D_RotationDeg(deg).compWith(new Matrix([
            this.x,
            this.y,
            this.identity.cells
        ]), true);

        this.x = matr.getStrFirst();
        this.y = matr.getStrSecond();
    }

    /**
     * Affine transform translation of points 2D
     *
     * @param x
     * @param y
     * @constructor
     *
     * Status: done
     */
    AT2D_Translation(x,y) {
        var matr = AT2D_Translation(x,y).compWith(new Matrix([
            this.x,
            this.y,
            this.identity.cells
        ]), true);

        this.x = matr.getStrFirst();
        this.y = matr.getStrSecond();
    }

    /**
     * Affine transform scaling of points 2D
     *
     * @param kx
     * @param ky
     * @constructor
     *
     * Status: done
     */
    AT2D_Scaling(kx,ky) {
        var matr = AT2D_Scaling(kx,ky).compWith(new Matrix([
            this.x,
            this.y,
            this.identity.cells
        ]), true);

        this.x = matr.getStrFirst();
        this.y = matr.getStrSecond();
    }




    /**
     * Affine transform translation of points 3D
     *
     * @param x
     * @param y
     * @param z
     * @constructor
     *
     * Status: done
     */
    AT3D_Translation(x,y,z) {
        var matr = AT3D_Translation(x,y,z).compWith(new Matrix([
            this.x,
            this.y,
            this.z,
            this.identity.cells
        ]), true);

        this.x = matr.getStrFirst();
        this.y = matr.getStrSecond();
        this.z = matr.getStrThird();
    }

    /**
     * Affine transform scaling of points 3D
     *
     * @param kx
     * @param ky
     * @param kz
     * @constructor
     *
     * Status: done
     */
    AT3D_Scaling(kx,ky,kz) {
        var matr = AT3D_Scaling(kx,ky,kz).compWith(new Matrix([
            this.x,
            this.y,
            this.z,
            this.identity.cells
        ]), true);

        this.x = matr.getStrFirst();
        this.y = matr.getStrSecond();
        this.z = matr.getStrThird();
    }

    /**
     * Affine transform rotation by X asis of points 3D
     *
     * @param phi
     * @constructor
     *
     * Status: done
     */
    AT3D_RotationXDeg(phi) {
        var matr = AT3D_RotationXDeg(phi).compWith(new Matrix([
            this.x,
            this.y,
            this.z,
            this.identity.cells
        ]), true);

        this.x = matr.getStrFirst();
        this.y = matr.getStrSecond();
        this.z = matr.getStrThird();
    }

    /**
     * Affine transform rotation by X asis of points 3D
     *
     * @param phi
     * @constructor
     *
     * Status: done
     */
    AT3D_RotationYDeg(phi) {
        var matr = AT3D_RotationYDeg(phi).compWith(new Matrix([
            this.x,
            this.y,
            this.z,
            this.identity.cells
        ]), true);

        this.x = matr.getStrFirst();
        this.y = matr.getStrSecond();
        this.z = matr.getStrThird();
    }

    /**
     * Affine transform rotation by X asis of points 3D
     *
     * @param phi
     * @constructor
     *
     * Status: done
     */
    AT3D_RotationZDeg(phi) {
        var matr = AT3D_RotationZDeg(phi).compWith(new Matrix([
            this.x,
            this.y,
            this.z,
            this.identity.cells
        ]), true);

        this.x = matr.getStrFirst();
        this.y = matr.getStrSecond();
        this.z = matr.getStrThird();
    }
}
