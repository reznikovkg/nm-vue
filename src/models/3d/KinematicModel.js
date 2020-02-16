import Matrix from './../../math/Matrix';
import * as AT3D from './../../scene/AffineTransform3D';

import typesOfScene from "./../../scene/typesOfScene";

import ObjectScene from './ObjectScene';
import { normalToPlane } from "../../math/AnalitycGeometry";
import BaseModel from "./../BaseModel";

export default class KinematicModel extends BaseModel {

    constructor() {
        super();

        this.at = 'identity';
        this.atCustom = AT3D.identity();

        this.guideAT3D = true;
        this.formAT3D = true;
    }

    setGuide(model) {
        this.guide = new ObjectScene();
        this.guide.setModel(model);
    }

    setForm(model) {
        this.form = new ObjectScene();
        this.form.setModel(model);
        this.form.applyToAt(AT3D.rotationYDeg(Math.PI / 2));
    }

    // setPoints() {
    //     /**
    //      * Направляющая основана на точках
    //      */
    //     if (this.guide instanceof Points) {
    //         this.guidePointsInit = this.guide;
    //     }
    //
    //     /**
    //      * Образуюущая основана на точках
    //      */
    //     if (this.form instanceof Points) {
    //         this.formPointsInit = this.form;
    //     }
    //
    //     /**
    //      * Направляющая основана на сплайне
    //      */
    //     if (this.guide instanceof Spline) {
    //         let start = this.guide.x[0];
    //         let finish = this.guide.x[this.guide.x.length-1];
    //
    //         let step = (finish-start)/(this.guideNumberPoints-1);
    //
    //         this.guidePointsInit = new Points();
    //
    //         for (let i = start; i < finish; i+=step) {
    //             this.guidePointsInit.addPoint(i, this.guide.pointSpline(i));
    //         }
    //     }
    //
    //     /**
    //      * Образуюущая основана на сплайне
    //      */
    //     if (this.form instanceof Spline) {
    //         let start = this.form.x[0];
    //         let finish = this.form.x[this.form.x.length-1];
    //
    //         let step = (finish-start)/(this.formNumberPoints-1);
    //
    //         this.formPointsInit = new Points();
    //
    //         for (let i = start; i < finish; i+=step) {
    //             this.formPointsInit.addPoint(i, this.form.pointSpline(i));
    //         }
    //     }
    //
    //     /**
    //      * Направляющая основана на полиноме Ньютона
    //      */
    //     if (this.guide instanceof pNewton) {
    //         let start = this.guide.start;
    //         let finish = this.guide.finish;
    //
    //         let step = (finish-start)/(this.guideNumberPoints-1);
    //
    //         this.guidePointsInit = new Points();
    //
    //         for (let i = start; i < finish; i+=step) {
    //             this.guidePointsInit.addPoint(i, this.guide.pointPolynom(i));
    //         }
    //     }
    //     /**
    //      * Образуюущая основана на полиноме Ньютона
    //      */
    //     if (this.form instanceof pNewton) {
    //         let start = this.form.start;
    //         let finish = this.form.finish;
    //
    //         let step = (finish-start)/(this.formNumberPoints-1);
    //
    //         this.formPointsInit = new Points();
    //
    //         for (let i = start; i < finish; i+=step) {
    //             this.formPointsInit.addPoint(i, this.form.pointPolynom(i));
    //         }
    //     }
    //
    //     if (this.guide === "rotation") {
    //         this.guidePointsInit = new Points();
    //
    //         for (let i = 0; i <= this.guideNumberPoints; i++) {
    //             this.guidePointsInit.addPoint(0, 0);
    //         }
    //     }
    //
    //     this.defATForm();
    //     this.defATGuide();
    // }

    // defATForm() {
    //     let t = new Points();
    //     t.copy(this.formPointsInit);
    //     t.applyAT3D( AT3D.translation(
    //         -t.x[0],
    //         -t.y[0],
    //         -t.z[0]
    //         ));
    //     this.formPoints = t;
    // }
    //
    // defATGuide() {
    //     let k = new Points();
    //     k.copy(this.guidePointsInit);
    //     k.applyAT3D( AT3D.translation(
    //         -k.x[0],
    //         -k.y[0],
    //         -k.z[0]
    //     ));
    //     this.guidePoints = k;
    // }

    // plotDefault() {
    //     this.matrixPoints = [];
    //
    //     for (let i = 0; i < this.guidePoints.x.length; i++) {
    //         let TTT = new Points();
    //         TTT.copy(this.formPoints);
    //         TTT.applyAT3D(this.atF(i));
    //         TTT.addAll(
    //             this.guidePoints.x[i]-this.guidePoints.x[0],
    //             this.guidePoints.y[i]-this.guidePoints.y[0],
    //             this.guidePoints.z[i]-this.guidePoints.z[0]
    //         );
    //
    //         let pointsStep = new Matrix([
    //             TTT.x,
    //             TTT.y,
    //             TTT.z,
    //             TTT.identity.cells
    //         ]);
    //         this.matrixPoints.push(pointsStep);
    //     }
    //
    //     this.matrixGuide = new Matrix([
    //         this.guidePoints.x,
    //         this.guidePoints.y,
    //         this.guidePoints.z,
    //         this.guidePoints.identity.cells
    //     ]);
    //
    //     this.matrixForm = new Matrix([
    //         this.formPoints.x,
    //         this.formPoints.y,
    //         this.formPoints.z,
    //         this.formPoints.identity.cells
    //     ]);
    // }

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

    /**
     * !
     * @param at
     */
    apply(at) {
        if (this.formAT3D) {
            this.form.applyToAt(at);
        }

        if (this.guideAT3D) {
            this.guide.applyToAt(at);
        }

        // if ( !this.formAT3D && !this.guideAT3D ) {
        //     for (let i = 0; i < this.matrixPoints.length; i++) {
        //         this.matrixPoints[i] = at.compWith(this.matrixPoints[i], true);
        //     }
        // }
    }


    render(camera, light = null) {
        if (!this.show) {
            return;
        }

        let pointli;
        if (light) {
            pointli = [
                light.position.cells[0][0],
                light.position.cells[1][0],
                light.position.cells[2][0],
            ]
        } else {
            pointli = [0, 10, 0];
        }
        console.log(light,pointli)

        let ctx = camera.canvas.getContext("2d");

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(57,57,57,0.7)';

        ctx.setLineDash([]);
        ctx.lineWidth = 3;

        //###
        // var formRender = this.form.getMatrixOfPoints();
        // const guideRender = this.guide.getMatrixOfPoints();
        // new Matrix();
        // formRender.setArray(this.accumulationForm.compWith(new Matrix([
        //     this.form.x,
        //     this.form.y,
        //     this.form.z,
        //     this.form.identity.cells
        // ]), true, true).cells);


        // let guideRender = new Matrix();
        // guideRender.setArray(this.accumulationGuide.compWith(new Matrix([
        //     this.guide.x,
        //     this.guide.y,
        //     this.guide.z,
        //     this.guide.identity.cells
        // ]), true).cells);


        this.form.setMatrixOfPoints();
        this.guide.setMatrixOfPoints();
        this.form.applyToAt(AT3D.translation(
            - this.form.getMatrixOfPoints().getStrFirst()[0]
            + this.guide.getMatrixOfPoints().getStrFirst()[0],
            - this.form.getMatrixOfPoints().getStrSecond()[0]
            + this.guide.getMatrixOfPoints().getStrSecond()[0],
            - this.form.getMatrixOfPoints().getStrThird()[0]
            + this.guide.getMatrixOfPoints().getStrThird()[0],
        ));

        let matForm = new Matrix();
        matForm.setMatrixForce(this.form.getMatrixOfPoints());



        for (let i = 0; i < this.guide.getMatrixOfPoints().getStrFirst().length; i++) {
            for (let j = 0; j < matForm.getStrFirst().length ; j++ ) {

                if (j + 1 < matForm.getStrFirst().length ) {

                    ctx.beginPath();
                    ctx.fillStyle = "red";
                    camera.moveTo(
                        matForm.getStrFirst()[j],
                        matForm.getStrSecond()[j],
                        matForm.getStrThird()[j]
                    );
                    camera.lineTo(
                        matForm.getStrFirst()[j + 1],
                        matForm.getStrSecond()[j + 1],
                        matForm.getStrThird()[j + 1]
                    );

                    if (i + 1 < matForm.getStrFirst().length ) {
                        camera.lineTo(
                            matForm.getStrFirst()[j+1] + this.guide.getMatrixOfPoints().getStrFirst()[i+1] - this.guide.getMatrixOfPoints().getStrFirst()[i],
                            matForm.getStrSecond()[j+1] + this.guide.getMatrixOfPoints().getStrSecond()[i+1] - this.guide.getMatrixOfPoints().getStrSecond()[i],
                            matForm.getStrThird()[j+1] + this.guide.getMatrixOfPoints().getStrThird()[i+1] - this.guide.getMatrixOfPoints().getStrThird()[i]
                        );
                        camera.lineTo(
                            matForm.getStrFirst()[j] + this.guide.getMatrixOfPoints().getStrFirst()[i+1] - this.guide.getMatrixOfPoints().getStrFirst()[i],
                            matForm.getStrSecond()[j] + this.guide.getMatrixOfPoints().getStrSecond()[i+1] - this.guide.getMatrixOfPoints().getStrSecond()[i],
                            matForm.getStrThird()[j] + this.guide.getMatrixOfPoints().getStrThird()[i+1] - this.guide.getMatrixOfPoints().getStrThird()[i]
                        );



                        let point = normalToPlane([
                            [
                                matForm.getStrFirst()[j],
                                matForm.getStrSecond()[j],
                                matForm.getStrThird()[j]
                            ], [
                                matForm.getStrFirst()[j + 1],
                                matForm.getStrSecond()[j + 1],
                                matForm.getStrThird()[j + 1]
                            ], [
                                matForm.getStrFirst()[j] + this.guide.getMatrixOfPoints().getStrFirst()[i + 1] - this.guide.getMatrixOfPoints().getStrFirst()[i],
                                matForm.getStrSecond()[j] + this.guide.getMatrixOfPoints().getStrSecond()[i + 1] - this.guide.getMatrixOfPoints().getStrSecond()[i],
                                matForm.getStrThird()[j] + this.guide.getMatrixOfPoints().getStrThird()[i + 1] - this.guide.getMatrixOfPoints().getStrThird()[i]
                            ]

                        ], pointli)

                        let r = camera.getCoord(point[0],point[1],point[2]);
                        let gradient = ctx.createRadialGradient(r[0], r[1], 1000, r[0], r[1],10);
                        gradient.addColorStop(0, "blue");
                        gradient.addColorStop(1, "white");

                        ctx.fillStyle = gradient;
                        ctx.fill();
                        ctx.beginPath();

                    }
                }

                camera.moveTo(
                    matForm.getStrFirst()[j],
                    matForm.getStrSecond()[j],
                    matForm.getStrThird()[j]
                );
                camera.lineTo(
                    matForm.getStrFirst()[j] + this.guide.getMatrixOfPoints().getStrFirst()[i+1] - this.guide.getMatrixOfPoints().getStrFirst()[i],
                    matForm.getStrSecond()[j] + this.guide.getMatrixOfPoints().getStrSecond()[i+1] - this.guide.getMatrixOfPoints().getStrSecond()[i],
                    matForm.getStrThird()[j] + this.guide.getMatrixOfPoints().getStrThird()[i+1] - this.guide.getMatrixOfPoints().getStrThird()[i]
                );
            }

            matForm.compWithLeft(AT3D.translation(
                this.guide.getMatrixOfPoints().getStrFirst()[i + 1] - this.guide.getMatrixOfPoints().getStrFirst()[i],
                this.guide.getMatrixOfPoints().getStrSecond()[i + 1] - this.guide.getMatrixOfPoints().getStrSecond()[i],
                this.guide.getMatrixOfPoints().getStrThird()[i + 1] - this.guide.getMatrixOfPoints().getStrThird()[i],
            ));
        }

        ctx.beginPath();
        for (let j = 0; j < matForm.getStrFirst().length ; j++ ) {

            camera.moveTo(
                matForm.getStrFirst()[j],
                matForm.getStrSecond()[j],
                matForm.getStrThird()[j]
            );
            camera.lineTo(
                matForm.getStrFirst()[j + 1],
                matForm.getStrSecond()[j + 1],
                matForm.getStrThird()[j + 1]
            );
        }
        ctx.stroke();

    }
}
