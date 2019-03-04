class KinematicModel {

    constructor(guide = null, form = null) {
        /**
         * Main direction, line of motion
         */
        this.guide = guide;
        /**
         * Forming, moveable form
         */
        this.form = form;

        this.matrixPoints = [];
        this.matrixPointsProject = [];
    }

    setGuide(guide) {
        this.guide = new Points();
        this.guide.copy(guide);
    }

    setForm(form) {
        this.form = new Points();
        this.form.copy(form);
    }

    setPointsDefault () {
        this.form.AT3D_RotationYDeg(Math.PI/2);

        var pointsStep = new Matrix([
            this.form.x,
            this.form.y,
            this.form.z,
            this.form.identity.cells
        ]);
        this.matrixPoints.push(pointsStep);

        for (let i = 0; i < this.guide.x.length - 1; i++) {
            pointsStep = AT3D_Translation(
                this.guide.x[i+1] - this.guide.x[i],
                this.guide.y[i+1] - this.guide.y[i],
                this.guide.z[i+1] - this.guide.z[i],
            ).compWith(pointsStep, true);
            this.matrixPoints.push(pointsStep);
        }
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




    project(pr) {
        for (let i = 0; i < this.matrixPoints.length; i++) {
            this.matrixPointsProject[i] = new Matrix();
            this.matrixPointsProject[i].setArray( pr.compWith(this.matrixPoints[i], true).cells );
        }
    }

    applyProject(at,pr) {
        for (let i = 0; i < this.matrixPoints.length; i++) {
            console.log(at);
            this.matrixPoints[i] = at.compWith(this.matrixPoints[i], true);
            this.matrixPoints[i] = pr.compWith(this.matrixPoints[i], true);
            this.matrixPointsProject[i] = new Matrix();
            this.matrixPointsProject[i].setArray( this.matrixPoints[i].cells );
        }
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
