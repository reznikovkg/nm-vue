import Matrix from './../../math/Matrix';
import * as AT3D from './../../scene/AffineTransform3D';

import typesOfScene from "./../../scene/typesOfScene";
import TypesOfModels, {TypeModelsByScene} from "./../../models/typesOfModels";

import ObjectScene from './ObjectScene';
import {normalToPlane} from "../../math/AnalitycGeometry";
import BaseModel from "./../BaseModel";
import KinematicForm from './../../components/Elements/Forms/Models3D/Kinematic';

export default class KinematicModel extends BaseModel {
    code = 'kinematic'
    name = 'Kinematic'
    form = KinematicForm

    constructor() {
        super();
        this.animateModel = true;

        this.at = 'identity';
        this.atCustom = AT3D.identity();

        this.guideAT3D = true;
        this.formAT3D = true;
        this.type = TypeModelsByScene.SCENE_3D
    }

    setGuide(model) {
        let ob = new ObjectScene();
        ob.type = typesOfScene.SCENE_3D;
        ob.setChildModel(model);
        this.guide = ob;
        // this.guide = new ObjectScene();
        // this.guide.setModel(model);
    }

    getGuide() {
        return this.guide ? this.guide.childModel : null;
    }

    setForm(model) {
        let ob = new ObjectScene();
        ob.type = typesOfScene.SCENE_3D;
        ob.setChildModel(model);
        this.form = ob;
        // this.form = new ObjectScene();
        // this.form.setModel(model);
        // this.form.applyToAt(AT3D.rotationYDeg(Math.PI / 2));
    }

    getForm() {
        return this.form ? this.form.childModel: null;
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

    atF(p) {
        let y = (Math.PI * 2) / (this.guideNumberPoints);

        if (this.at === "identity") {
            return AT3D.identity();
        }

        if (this.at === "custom") {
            return this.atCustom;
        }

        if (this.at === "rotationXDeg") {
            return AT3D.rotationXDeg(y * p);
        }

        if (this.at === "rotationYDeg") {
            return AT3D.rotationYDeg(y * p);
        }

        if (this.at === "rotationZDeg") {
            return AT3D.rotationZDeg(y * p);
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

    }


    render(camera) {
        if (!super.render()) {
            return;
        }

        this.form.setMatrixOfPoints();
        this.guide.setMatrixOfPoints();

        let _form = this.form;
        let _guide = this.guide;

        if (camera.animateMode) {
            _form = new ObjectScene();
            _form.setChildModel(this.form)
            _form.apply(this.getAnimateFrameAT(camera))

            _guide = new ObjectScene();
            _guide.setChildModel(this.guide)
            _guide.apply(this.getAnimateFrameAT(camera))
        }

        _form.applyToAt(AT3D.translation(
            -_form.getMatrixOfPoints().getStrFirst()[0]
            + _guide.getMatrixOfPoints().getStrFirst()[0],
            -_form.getMatrixOfPoints().getStrSecond()[0]
            + _guide.getMatrixOfPoints().getStrSecond()[0],
            -_form.getMatrixOfPoints().getStrThird()[0]
            + _guide.getMatrixOfPoints().getStrThird()[0],
        ));

        let matForm = new Matrix();
        matForm.setMatrixForce(_form.getMatrixOfPoints());


        for (let i = 0; i < _guide.getMatrixOfPoints().getStrFirst().length; i++) {
            for (let j = 0; j < matForm.getStrFirst().length; j++) {

                if (j + 1 < matForm.getStrFirst().length) {

                    const polygon = [[],[]];
                    polygon[0].push([
                        matForm.getStrFirst()[j],
                        matForm.getStrSecond()[j],
                        matForm.getStrThird()[j]
                    ]);
                    polygon[0].push([
                        matForm.getStrFirst()[j + 1],
                        matForm.getStrSecond()[j + 1],
                        matForm.getStrThird()[j + 1]
                    ]);

                    if (i + 1 < matForm.getStrFirst().length) {
                        polygon[0].push([
                            matForm.getStrFirst()[j + 1] + _guide.getMatrixOfPoints().getStrFirst()[i + 1] - _guide.getMatrixOfPoints().getStrFirst()[i],
                            matForm.getStrSecond()[j + 1] + _guide.getMatrixOfPoints().getStrSecond()[i + 1] - _guide.getMatrixOfPoints().getStrSecond()[i],
                            matForm.getStrThird()[j + 1] + _guide.getMatrixOfPoints().getStrThird()[i + 1] - _guide.getMatrixOfPoints().getStrThird()[i]
                        ]);
                        polygon[0].push([
                            matForm.getStrFirst()[j] + _guide.getMatrixOfPoints().getStrFirst()[i + 1] - _guide.getMatrixOfPoints().getStrFirst()[i],
                            matForm.getStrSecond()[j] + _guide.getMatrixOfPoints().getStrSecond()[i + 1] - _guide.getMatrixOfPoints().getStrSecond()[i],
                            matForm.getStrThird()[j] + _guide.getMatrixOfPoints().getStrThird()[i + 1] - _guide.getMatrixOfPoints().getStrThird()[i]
                        ]);

                        camera.addPolygon(polygon[0], this.color);

                    }
                }
            }

            matForm.compWithLeft(AT3D.translation(
                _guide.getMatrixOfPoints().getStrFirst()[i + 1] - _guide.getMatrixOfPoints().getStrFirst()[i],
                _guide.getMatrixOfPoints().getStrSecond()[i + 1] - _guide.getMatrixOfPoints().getStrSecond()[i],
                _guide.getMatrixOfPoints().getStrThird()[i + 1] - _guide.getMatrixOfPoints().getStrThird()[i],
            ));
        }


    }
}
