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
    formEdit = KinematicForm

    constructor() {
        super();
        this.animateModel = true;

        this.at = 'identity';
        this.atCustom = AT3D.identity();

        this.guideAT3D = true;
        this.formAT3D = true;
        this.type = TypeModelsByScene.SCENE_3D

        this.guideMappingCountSteps = 0;
        this.guideMapping = null;
        this.guideMappingSteps = [];
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

    setGuideMappingCountSteps(cS) {
        this.guideMappingCountSteps = cS;
    }
    setGuideMapping(gM) {
        this.guideMapping = gM;
    }
    getGuideMapping() {
        return this.guideMapping
    }


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

        let isGuideMapping = false;
        if (this.guideMappingCountSteps > 1) {
            this.guideMappingSteps = this.guideMapping.mapping(this.guideMappingCountSteps)
            isGuideMapping = true
        }


        this.form.setMatrixOfPoints();
        let _form = this.form;
        if (camera.animateMode) {
            _form = new ObjectScene();
            _form.setChildModel(this.form)
            _form.apply(this.getAnimateFrameAT(camera))
        }

        this.guide.setMatrixOfPoints();
        let _guide = this.guide;
        if (camera.animateMode) {
            _guide = new ObjectScene();
            _guide.setChildModel(this.guide)
            _guide.apply(this.getAnimateFrameAT(camera))
        }

        if (isGuideMapping) {
            // _form.applyToAt(AT3D.translation(
            //   - _form.getMatrixOfPoints().getStrFirst()[0],
            //   - _form.getMatrixOfPoints().getStrSecond()[0],
            //   - _form.getMatrixOfPoints().getStrThird()[0],
            // ));
        } else {
            _form.applyToAt(AT3D.translation(
              - _form.getMatrixOfPoints().getStrFirst()[0] + _guide.getMatrixOfPoints().getStrFirst()[0],
              - _form.getMatrixOfPoints().getStrSecond()[0] + _guide.getMatrixOfPoints().getStrSecond()[0],
              - _form.getMatrixOfPoints().getStrThird()[0] + _guide.getMatrixOfPoints().getStrThird()[0],
            ));
        }

        let matForm = new Matrix();
        matForm.setMatrixForce(_form.getMatrixOfPoints());

        let backStepMathForm = new Matrix();
        backStepMathForm.setMatrixForce(matForm);


        const limitSteps = isGuideMapping ? this.guideMappingCountSteps : _guide.getMatrixOfPoints().getStrFirst().length


        for (let i = 0; i < limitSteps; i++) {

            backStepMathForm.setMatrixForce(matForm)
            if (isGuideMapping) {
                matForm = new Matrix();
                matForm.setMatrixForce(_form.getMatrixOfPoints());
                matForm.compWithLeft(this.guideMappingSteps[i]);
            } else {
                matForm.compWithLeft(AT3D.translation(
                  _guide.getMatrixOfPoints().getStrFirst()[i + 1] - _guide.getMatrixOfPoints().getStrFirst()[i],
                  _guide.getMatrixOfPoints().getStrSecond()[i + 1] - _guide.getMatrixOfPoints().getStrSecond()[i],
                  _guide.getMatrixOfPoints().getStrThird()[i + 1] - _guide.getMatrixOfPoints().getStrThird()[i],
                ));
            }

            for (let j = 0; j < matForm.getStrFirst().length - 1; j++) {

                // if (j + 1 < matForm.getStrFirst().length) {

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

                    polygon[0].push([
                        backStepMathForm.getStrFirst()[j + 1],
                        backStepMathForm.getStrSecond()[j + 1],
                        backStepMathForm.getStrThird()[j + 1]
                    ]);
                    polygon[0].push([
                        backStepMathForm.getStrFirst()[j],
                        backStepMathForm.getStrSecond()[j],
                        backStepMathForm.getStrThird()[j]
                    ]);

                    camera.addPolygon(polygon[0], this.color);

                    // if (i + 1 < matForm.getStrFirst().length) {
                        // polygon[0].push([
                        //     matForm.getStrFirst()[j + 1] + _guide.getMatrixOfPoints().getStrFirst()[i + 1] - _guide.getMatrixOfPoints().getStrFirst()[i],
                        //     matForm.getStrSecond()[j + 1] + _guide.getMatrixOfPoints().getStrSecond()[i + 1] - _guide.getMatrixOfPoints().getStrSecond()[i],
                        //     matForm.getStrThird()[j + 1] + _guide.getMatrixOfPoints().getStrThird()[i + 1] - _guide.getMatrixOfPoints().getStrThird()[i]
                        // ]);
                        // polygon[0].push([
                        //     matForm.getStrFirst()[j] + _guide.getMatrixOfPoints().getStrFirst()[i + 1] - _guide.getMatrixOfPoints().getStrFirst()[i],
                        //     matForm.getStrSecond()[j] + _guide.getMatrixOfPoints().getStrSecond()[i + 1] - _guide.getMatrixOfPoints().getStrSecond()[i],
                        //     matForm.getStrThird()[j] + _guide.getMatrixOfPoints().getStrThird()[i + 1] - _guide.getMatrixOfPoints().getStrThird()[i]
                        // ]);
                    // }
                // }
            }

            // backStepMathForm.setMatrixForce(matForm)
            // if (this.guideMappingCountSteps > 1) {
            //     matForm.compWithLeft(this.guideMappingSteps[i]);
            // } else {
            //     matForm.compWithLeft(AT3D.translation(
            //       _guide.getMatrixOfPoints().getStrFirst()[i + 1] - _guide.getMatrixOfPoints().getStrFirst()[i],
            //       _guide.getMatrixOfPoints().getStrSecond()[i + 1] - _guide.getMatrixOfPoints().getStrSecond()[i],
            //       _guide.getMatrixOfPoints().getStrThird()[i + 1] - _guide.getMatrixOfPoints().getStrThird()[i],
            //     ));
            // }
        }
    }
}
