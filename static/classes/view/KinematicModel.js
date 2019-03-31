class KinematicModel {

    constructor(guide = null, form = null) {
        /**
         * Main direction, line of motion
         */
        this.guide = guide;
        this.guideAT3D = false;
        this.matrixGuide = [];
        this.matrixGuideProject = [];

        /**
         * Forming, moveable form
         */
        this.form = form;
        this.formAT3D = false;
        this.matrixForm = [];
        this.matrixFormProject = [];

        this.matrixPoints = [];
        this.matrixPointsProject = [];
    }

    setGuide(guide) {
        this.guide = new Points();
        this.guide.copy(guide);
        this.guideAT3D = true;

        this.guide.AT3D_Translation(-this.guide.x[0],-this.guide.y[0],-this.guide.z[0]);
        this.guide.AT3D_Translation(this.form.x[0],this.form.y[0],this.form.z[0]);
    }

    setForm(form) {
        this.form = new Points();
        this.form.copy(form);
        this.formAT3D = true;

        this.form.AT3D_RotationYDeg(Math.PI/2);
    }

    setPointsDefault () {
        this.matrixGuide = new Matrix([
            this.guide.x,
            this.guide.y,
            this.guide.z,
            this.guide.identity.cells
        ]);

        this.matrixForm = new Matrix([
            this.form.x,
            this.form.y,
            this.form.z,
            this.form.identity.cells
        ]);

        this.matrixPoints = [];

        let pointsStep = new Matrix([
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


    apply(at) {
        if (this.formAT3D || this.guideAT3D) {
            if (this.formAT3D) {
                this.form.applyAT3D(at);
            }

            if (this.guideAT3D) {
                this.guide.applyAT3D(at);
            }

            this.setPointsDefault();
            return;
        }


        for (let i = 0; i < this.matrixPoints.length; i++) {
            this.matrixPoints[i] = at.compWith(this.matrixPoints[i], true);
        }
    }


    project(pr) {
        this.matrixGuideProject = new Matrix();
        this.matrixGuideProject.setArray( pr.compWith(this.matrixGuide, true).cells );

        this.matrixFormProject = new Matrix();
        this.matrixFormProject.setArray( pr.compWith(this.matrixForm, true).cells );

        for (let i = 0; i < this.matrixPoints.length; i++) {
            this.matrixPointsProject[i] = new Matrix();
            this.matrixPointsProject[i].setArray( pr.compWith(this.matrixPoints[i], true).cells );
        }
    }

    applyProject(at,pr) {
        for (let i = 0; i < this.matrixPoints.length; i++) {
            console.log(at);
        }
    }
}
