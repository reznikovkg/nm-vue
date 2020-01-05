import Points from './../view/Points';
import Spline from './../nm/Spline';
import pNewton from './../nm/pNewton';
import Matrix from './../math/Matrix';
import * as AT3D from './../../consts/view/AffineTransform3D';

export default class KinematicModel {

    constructor(guide = null, form = null) {
        this.show = false;

        this.name = "Kinematic";
        this.code = "kinematic";

        this.guide = guide;
        this.form = form;

        this.guideNumberPoints = 10;
        this.formNumberPoints = 10;

        this.guidePoints = null;
        this.guidePointsInit = null;

        this.formPoints = null;
        this.formPointsInit = null;

        this.matrixPoints = [];
        this.matrixPointsProject = [];

        this.at = 'identity';
        this.atCustom = AT3D.identity();

        this.guideAT3D = true;
        this.formAT3D = true;

    }

    setGuide(guide) {
        this.guide = guide;
    }

    setForm(form) {
        this.form = form;
    }

    setPoints() {
        /**
         * Направляющая основана на точках
         */
        if (this.guide instanceof Points) {
            this.guidePointsInit = this.guide;
        }

        /**
         * Образуюущая основана на точках
         */
        if (this.form instanceof Points) {
            this.formPointsInit = this.form;
        }

        /**
         * Направляющая основана на сплайне
         */
        if (this.guide instanceof Spline) {
            let start = this.guide.x[0];
            let finish = this.guide.x[this.guide.x.length-1];

            let step = (finish-start)/(this.guideNumberPoints-1);

            this.guidePointsInit = new Points();

            for (let i = start; i < finish; i+=step) {
                this.guidePointsInit.addPoint(i, this.guide.pointSpline(i));
            }
        }

        /**
         * Образуюущая основана на сплайне
         */
        if (this.form instanceof Spline) {
            let start = this.form.x[0];
            let finish = this.form.x[this.form.x.length-1];

            let step = (finish-start)/(this.formNumberPoints-1);

            this.formPointsInit = new Points();

            for (let i = start; i < finish; i+=step) {
                this.formPointsInit.addPoint(i, this.form.pointSpline(i));
            }
        }

        /**
         * Направляющая основана на полиноме Ньютона
         */
        if (this.guide instanceof pNewton) {
            let start = this.guide.start;
            let finish = this.guide.finish;

            let step = (finish-start)/(this.guideNumberPoints-1);

            this.guidePointsInit = new Points();

            for (let i = start; i < finish; i+=step) {
                this.guidePointsInit.addPoint(i, this.guide.pointPolynom(i));
            }
        }
        /**
         * Образуюущая основана на полиноме Ньютона
         */
        if (this.form instanceof pNewton) {
            let start = this.form.start;
            let finish = this.form.finish;

            let step = (finish-start)/(this.formNumberPoints-1);

            this.formPointsInit = new Points();

            for (let i = start; i < finish; i+=step) {
                this.formPointsInit.addPoint(i, this.form.pointPolynom(i));
            }
        }

        if (this.guide === "rotation") {
            this.guidePointsInit = new Points();

            for (let i = 0; i <= this.guideNumberPoints; i++) {
                this.guidePointsInit.addPoint(0, 0);
            }
        }

        this.defATForm();
        this.defATGuide();
    }

    defATForm() {
        let t = new Points();
        t.copy(this.formPointsInit);
        t.applyAT3D( AT3D.rotationYDeg(Math.PI/2));
        t.applyAT3D( AT3D.translation(
            -t.x[0],
            -t.y[0],
            -t.z[0]
            ));
        this.formPoints = t;
    }

    defATGuide() {
        let k = new Points();
        k.copy(this.guidePointsInit);
        k.applyAT3D( AT3D.translation(
            -k.x[0],
            -k.y[0],
            -k.z[0]
        ));
        this.guidePoints = k;
    }

    plotDefault() {
        this.matrixPoints = [];

        for (let i = 0; i < this.guidePoints.x.length; i++) {
            let TTT = new Points();
            TTT.copy(this.formPoints);
            TTT.applyAT3D(this.atF(i));
            TTT.addAll(
                this.guidePoints.x[i]-this.guidePoints.x[0],
                this.guidePoints.y[i]-this.guidePoints.y[0],
                this.guidePoints.z[i]-this.guidePoints.z[0]
            );

            let pointsStep = new Matrix([
                TTT.x,
                TTT.y,
                TTT.z,
                TTT.identity.cells
            ]);
            this.matrixPoints.push(pointsStep);
        }

        this.matrixGuide = new Matrix([
            this.guidePoints.x,
            this.guidePoints.y,
            this.guidePoints.z,
            this.guidePoints.identity.cells
        ]);

        this.matrixForm = new Matrix([
            this.formPoints.x,
            this.formPoints.y,
            this.formPoints.z,
            this.formPoints.identity.cells
        ]);
    }

    setAT(at) {
        this.at = at;
    }

    atF (p) {
        let y = (Math.PI*2)/(this.guideNumberPoints);

        if (this.at === "identity") {
            return AT3D.identity();
        }

        if (this.at === "custom") {
            return this.atCustom;
        }

        if (this.at === "rotationXDeg") {
            return AT3D.rotationXDeg(y*p);
        }

        if (this.at === "rotationYDeg") {
            return AT3D.rotationYDeg(y*p);
        }

        if (this.at === "rotationZDeg") {
            return AT3D.rotationZDeg(y*p);
        }
    }















    // setPointsDefault () {
    //     this.matrixGuide = new Matrix([
    //         this.guide.x,
    //         this.guide.y,
    //         this.guide.z,
    //         this.guide.identity.cells
    //     ]);
    //
    //     this.matrixForm = new Matrix([
    //         this.form.x,
    //         this.form.y,
    //         this.form.z,
    //         this.form.identity.cells
    //     ]);
    //
    //     this.matrixPoints = [];
    //
    //     let pointsStep = new Matrix([
    //         this.form.x,
    //         this.form.y,
    //         this.form.z,
    //         this.form.identity.cells
    //     ]);
    //
    //     this.matrixPoints.push(pointsStep);
    //
    //     for (let i = 0; i < this.guide.x.length - 1; i++) {
    //         pointsStep = AT3D.translation(
    //             this.guide.x[i+1] - this.guide.x[i],
    //             this.guide.y[i+1] - this.guide.y[i],
    //             this.guide.z[i+1] - this.guide.z[i],
    //         ).compWith(pointsStep, true);
    //         this.matrixPoints.push(pointsStep);
    //     }
    // }


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
        if (this.formAT3D) {
            this.formPoints.applyAT3D(at);
        }

        if (this.guideAT3D) {
            this.guidePoints.applyAT3D(at);
        }

        if ( !this.formAT3D && !this.guideAT3D ) {
            for (let i = 0; i < this.matrixPoints.length; i++) {
                this.matrixPoints[i] = at.compWith(this.matrixPoints[i], true);
            }
        }
    }


    project(pr) {
        if ( this.formAT3D || this.guideAT3D ) {
            this.plotDefault();
        }

        // this.matrixGuideProject = new Matrix();
        // this.matrixGuideProject.setArray( pr.compWith(this.matrixGuide, true).cells );
        //
        // this.matrixFormProject = new Matrix();
        // this.matrixFormProject.setArray( pr.compWith(this.matrixForm, true).cells );

        for (let i = 0; i < this.matrixPoints.length; i++) {
            this.matrixPointsProject[i] = new Matrix();
            this.matrixPointsProject[i].setArray( pr.compWith(this.matrixPoints[i], true).cells );
        }
    }





    render(scene) {

        if (!this.show) {
            return;
        }

        let ctx = scene.canvas.getContext("2d");

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(57,57,57,0.7)';

        ctx.setLineDash([]);
        ctx.lineWidth = 3;


        this.project(this.camera3D.worldToProjectF(true));

        if (this.kinematicModel.showModel) {
            for (let i = 1; i < this.kinematicModel.kinematicModel.matrixPointsProject.length; i++) {
                for (let j = 1; j <= this.kinematicModel.kinematicModel.formPoints.x.length; j++) {
                    this.camera3D.moveTo(
                        this.kinematicModel.kinematicModel.matrixPointsProject[i-1].getProjectX(j-1),
                        this.kinematicModel.kinematicModel.matrixPointsProject[i-1].getProjectY(j-1)
                    );
                    this.camera3D.lineTo(
                        this.kinematicModel.kinematicModel.matrixPointsProject[i].getProjectX(j-1),
                        this.kinematicModel.kinematicModel.matrixPointsProject[i].getProjectY(j-1)
                    );

                    this.camera3D.moveTo(
                        this.kinematicModel.kinematicModel.matrixPointsProject[i-1].getProjectX(j-1),
                        this.kinematicModel.kinematicModel.matrixPointsProject[i-1].getProjectY(j-1)
                    );
                    this.camera3D.lineTo(
                        this.kinematicModel.kinematicModel.matrixPointsProject[i-1].getProjectX(j),
                        this.kinematicModel.kinematicModel.matrixPointsProject[i-1].getProjectY(j)
                    );
                }

                let j = this.kinematicModel.kinematicModel.formPoints.x.length - 1;

                this.camera3D.moveTo(
                    this.kinematicModel.kinematicModel.matrixPointsProject[i-1].getProjectX(j),
                    this.kinematicModel.kinematicModel.matrixPointsProject[i-1].getProjectY(j)
                );
                this.camera3D.lineTo(
                    this.kinematicModel.kinematicModel.matrixPointsProject[i].getProjectX(j),
                    this.kinematicModel.kinematicModel.matrixPointsProject[i].getProjectY(j)
                );
            }

            let i = this.kinematicModel.kinematicModel.matrixPointsProject.length - 1;
            for (let j = 1; j <= this.kinematicModel.kinematicModel.formPoints.x.length; j++) {
                this.camera3D.moveTo(
                    this.kinematicModel.kinematicModel.matrixPointsProject[i].getProjectX(j-1),
                    this.kinematicModel.kinematicModel.matrixPointsProject[i].getProjectY(j-1)
                );
                this.camera3D.lineTo(
                    this.kinematicModel.kinematicModel.matrixPointsProject[i].getProjectX(j),
                    this.kinematicModel.kinematicModel.matrixPointsProject[i].getProjectY(j)
                );
            }
        }

        ctx.stroke();

        ctx.beginPath();

        ctx.setLineDash([]);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#1700a4';

        if (this.kinematicModel.showFormGuide) {
            for (let i = 0; i < this.kinematicModel.kinematicModel.matrixPointsProject[0].getColNum() - 1; i++) {
                this.camera3D.moveTo(
                    this.kinematicModel.kinematicModel.matrixPointsProject[0].getProjectX(i),
                    this.kinematicModel.kinematicModel.matrixPointsProject[0].getProjectY(i)
                );
                this.camera3D.lineTo(
                    this.kinematicModel.kinematicModel.matrixPointsProject[0].getProjectX(i+1),
                    this.kinematicModel.kinematicModel.matrixPointsProject[0].getProjectY(i+1)
                );
            }
        }

        ctx.stroke();

        ctx.beginPath();

        ctx.setLineDash([]);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#9c0011';

        if (this.kinematicModel.showFormGuide) {
            for (let i = 0; i < this.kinematicModel.kinematicModel.matrixPointsProject.length - 1; i++) {
                this.camera3D.moveTo(
                    this.kinematicModel.kinematicModel.matrixPointsProject[i].getProjectX(0),
                    this.kinematicModel.kinematicModel.matrixPointsProject[i].getProjectY(0)
                );
                this.camera3D.lineTo(
                    this.kinematicModel.kinematicModel.matrixPointsProject[i+1].getProjectX(0),
                    this.kinematicModel.kinematicModel.matrixPointsProject[i+1].getProjectY(0)
                );
            }
        }

        ctx.stroke();



    }
}
