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

}
