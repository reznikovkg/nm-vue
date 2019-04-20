<template>
    <div class="component-scene-3d">
        <div class="scena-3d">
            <canvas id="canvas-scene" :width="camera3D.field.width" :height="camera3D.field.height"
                @wheel="canvasWheel"
                @mousedown="canvasMouseDown"
                @mousemove="canvasMouseDrag"
                @mouseup="canvasMouseUp"
            ></canvas>
        </div>

        <div
                v-if="!firstLoad"
                class="loadscene"
                @click="firstLoadScene">
            <p><b>Load</b></p>
        </div>

        <div class="openScene2D">
            <at-button type="primary" size="large" icon="icon-square" circle @click="clickScene2D"></at-button>
        </div>

        <div class="openNav">
            <at-button type="primary" size="large" icon="icon-settings" circle @click="clickOpenNav"></at-button>
        </div>

        <div class="nav-scene" v-if="openNav">
            <div class="nav-head">
                <h4>CG-VUE</h4>
            </div>
            <div class="nav-tabs-head">
                <at-button
                        v-for="item in tabs"
                        :key="item.title"
                        :icon="item.icon"
                        :class="{ 'at-btn--primary': item.status}"
                        @click="choiseTab(item.title)"
                        size="smaller">{{ item.title }}</at-button>
            </div>
            <div class="nav-tabs-body">
                <div v-if="tabs.nav.status" class="nav-tab">
                    <at-button
                            v-for="item in nav"
                            :key="item.title"
                            :icon="item.icon"
                            :class="{ 'at-btn--primary': item.status}"
                            @click="choiseNav(item.title)"
                            circle></at-button>
                </div>
                <div v-if="tabs.camera.status" class="nav-tab">

                    <p>Long:
                        <i @click="camera3D.d--" class="icon icon-minus"></i>
                        {{ camera3D.d }}
                        <i @click="camera3D.d++" class="icon icon-plus"></i>
                    </p>
                    <input-float-type v-model="camera3D.d"></input-float-type>
                </div>
                <div v-if="tabs.plot.status" class="nav-tab">

                    <at-button type="primary" @click="plotPointsFromRoot">From root points</at-button>
                    <hr>
                    <h3>Model</h3>
                    <div class="btn-group">
                        <at-button v-if="!model3D.model3D" type="primary" size="small" @click="createModel3D">Create</at-button>
                        <at-button v-if="model3D.model3D" type="primary" size="small" @click="removeModel3D">Remove</at-button>
                        <!--<at-button v-if="model3D.model3D" type="primary" size="small" @click="removeKinematicModel">Remove</at-button>-->
                    </div>
                    <div v-if="model3D.model3D">
                        <div>
                            <at-checkbox v-model="show.model3D" label="Shenzhen" :disabled="!model3D.isActive">Show</at-checkbox>
                        </div>

                        <!--<div class="rowFlex">-->
                            <!--<div class="row-fix-width" style="width: 80px">-->
                                <!--<p>Guide</p>-->
                                <!--<at-select v-model="kinematicModel.selectGuide" :placeholder="'Guide'">-->
                                    <!--<at-option v-for="(val, index) in $root.points" :value="index" :key="index">{{ index }}</at-option>-->
                                <!--</at-select>-->
                            <!--</div>-->
                            <!--<div class="row-fix-width" style="width: 80px">-->
                                <!--<p>Form</p>-->
                                <!--<at-select v-model="kinematicModel.selectForm" :placeholder="'Form'">-->
                                    <!--<at-option v-for="(val, index) in $root.points" :value="index" :key="index">{{ index }}</at-option>-->
                                <!--</at-select>-->
                            <!--</div>-->
                            <!--<div class="row-fix-width">-->
                                <!--<p>Action</p>-->
                                <!--<at-button type="primary" size="small" @click="setKitematicGuideForm">Set</at-button>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="btn-group">-->
                            <!--<at-button type="primary" size="small" @click="kinematicModelPlotDefault">Plot default</at-button>-->
                        <!--</div>-->
                    </div>
                    <hr>
                    <h3>Kinematic model</h3>
                    <div class="btn-group">
                        <at-button v-if="!kinematicModel.kinematicModel" type="primary" size="small" @click="createKinematicModel">Create</at-button>
                        <at-button v-if="kinematicModel.kinematicModel" type="primary" size="small" @click="removeKinematicModel">Remove</at-button>
                    </div>
                    <div v-if="kinematicModel.kinematicModel">
                        <div>
                            <at-checkbox v-model="show.kinematicModel" label="Shenzhen" :disabled="!kinematicModel.isActive">Show</at-checkbox>
                        </div>

                        <div class="rowFlex">
                            <div class="row-fix-width" style="width: 80px">
                                <p>Guide</p>
                                <at-select v-model="kinematicModel.selectGuide" :placeholder="'Guide'">
                                    <at-option v-for="(val, index) in $root.points" :value="index" :key="index">{{ index }}</at-option>
                                </at-select>
                            </div>
                            <div class="row-fix-width" style="width: 80px">
                                <p>Form</p>
                                <at-select v-model="kinematicModel.selectForm" :placeholder="'Form'">
                                    <at-option v-for="(val, index) in $root.points" :value="index" :key="index">{{ index }}</at-option>
                                </at-select>
                            </div>
                            <div class="row-fix-width">
                                <p>Action</p>
                                <at-button type="primary" size="small" @click="setKitematicGuideForm">Set</at-button>
                            </div>
                        </div>
                        <div class="btn-group">
                            <at-button type="primary" size="small" @click="kinematicModelPlotDefault">Plot default</at-button>
                        </div>
                        <div>
                            <at-checkbox v-model="kinematicModel.kinematicModel.formAT3D" label="Shenzhen" :disabled="!kinematicModel.isActive">Form TRANSFORM</at-checkbox>
                        </div>
                        <div>
                            <at-checkbox v-model="kinematicModel.kinematicModel.guideAT3D" label="Shenzhen" :disabled="!kinematicModel.isActive">Guide TRANSFORM</at-checkbox>
                        </div>
                    </div>
                    <hr>
                </div>
                <div v-if="tabs.root.status" class="nav-tab">
                    <root-points></root-points>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import RootPoints from "./RootPoints";
    import InputFloatType from "./Elements/input-float-type";

    import * as AT3D from './../consts/view/AffineTransform3D';

    import Points from './../classes/view/Points';

    import Matrix from './../classes/math/Matrix';
    import Camera3D from './../classes/view/Camera3D';
    import Model3D from './../classes/view/Model3D';

    import KinematicModel from './../classes/view/KinematicModel';

    export default {
        name: "Scena3D",
        components: {InputFloatType, RootPoints},
        data () {
            return {
                camera3D: {
                    field: {
                        width: 0,
                        height: 0
                    },
                },

                axis3D: {
                    x: new Model3D(),
                    y: new Model3D(),
                    z: new Model3D()
                },

                points: {},
                nav: {
                    moveCenter: {
                        status: true,
                        title: 'moveCenter',
                        icon: 'icon-move'
                    },
                    moveCamera: {
                        status: false,
                        title: 'moveCamera',
                        icon: 'icon-video'
                    },
                },
                tabs: {
                    nav: {
                        status: true,
                        title: 'Nav',
                        icon: 'icon-move'
                    },
                    plot: {
                        status: false,
                        title: 'Plot',
                        icon: 'icon-map'
                    },
                    camera: {
                        status: false,
                        title: 'Camera',
                        icon: 'icon-video'
                    },
                    root: {
                        status: false,
                        title: 'Root',
                        icon: 'icon-home'
                    },
                },
                openNav: false,
                firstLoad: false,

                show: {
                    kinematicModel: false,
                    points: false,
                    model3D: false
                },
                model3D: {
                    isActive: false,
                    model3D: null,
                },
                kinematicModel: {
                    isActive: false,
                    kinematicModel: null,

                    showFormGuide: true,
                    showModel: true,

                    selectGuide: null,
                    selectForm: null,
                },
            }
        },
        computed: {
            canvas: function () {
                return document.getElementById("canvas-scene");
            }
        },
        mounted: function () {
            this.camera3D = new Camera3D(this.canvas);
            this.camera3D.setCanvas(this.canvas);


            this.axis3D.x.setVertices(new Matrix([[1,0],[0,0],[0,0],[1,1]]));
            this.axis3D.y.setVertices(new Matrix([[0,0],[1,0],[0,0],[1,1]]));
            this.axis3D.z.setVertices(new Matrix([[0,0],[0,0],[1,0],[1,1]]));


            //this.points = new Points([1,2,3,4], [1,0,1,0], [0,0,0,0]);
            this.points = new Points([0,5,2.5,2.5,5,0,2.5,2.5,0], [0,0,0,3,0,0,0,3,0], [0,0,-2.5,-1.5,0,0,-2.5,-1.5,0]);

            this.reBuild();

        },
        created: function() {
            document.addEventListener('keydown', this.keyPress, false);
            document.addEventListener('keypress', this.keyPress, false);
        },
        destroyed: function() {
            document.removeEventListener('keydown', this.keyPress, false);
            document.removeEventListener('keypress', this.keyPress, false);
        },
        methods: {
            /**
             * Open/Close nav by clic
             *
             * Status: Done
             */
            clickOpenNav: function () {
                this.openNav = !this.openNav;
            },


            clickScene2D: function () {
                this.$router.push({ name: 'scene2d' });
            },

            /**
             * Choise navigation canvas
             *
             * Status: Done
             */
            choiseNav: function(title){
                var nav = this.nav;
                for (let item in nav) {
                    if (this.nav[`${item}`].title === title) {
                        this.nav[`${item}`].status = true;
                    } else {
                        this.nav[`${item}`].status = false;
                    }
                }
            },

            /**
             * Choise navigation canvas
             *
             * Status: Done
             */
            choiseTab: function(title){
                var tabs = this.tabs;
                for (let item in tabs) {
                    if (this.tabs[`${item}`].title === title) {
                        this.tabs[`${item}`].status = true;
                    } else {
                        this.tabs[`${item}`].status = false;
                    }
                }
            },

            firstLoadScene: function () {
                this.reBuild();
                this.firstLoad = true;
            },

            /**
             * Key press to action
             *
             * Status: Process
             */
            keyPress: function(evt) {
                switch (evt.keyCode) {
                    // case 82: {
                    //     this.points.AT2D_RotationDeg(Math.PI / 18); break;
                    // }
                    case 87: {
                        if (this.model3D.isActive) {
                            this.model3D.model3D.apply(
                                AT3D.scaling(1.1, 1.1, 1.1)
                            );
                        }

                        if (this.kinematicModel.isActive) {
                            this.kinematicModel.kinematicModel.apply(
                                AT3D.scaling(1.1, 1.1, 1.1)
                            );
                        }

                        break;
                    }
                    case 81: {
                        if (this.model3D.isActive) {
                            this.model3D.model3D.apply(
                                AT3D.scaling(0.9, 0.9, 0.9)
                            );
                        }

                        if (this.kinematicModel.isActive) {
                            this.kinematicModel.kinematicModel.apply(
                                AT3D.scaling(0.9, 0.9, 0.9)
                            );
                        }

                        break;
                    }
                    case 33: {
                        if (this.model3D.isActive) {
                            this.model3D.model3D.apply(
                                AT3D.translation(0, 0, -0.5)
                            );
                        }

                        if (this.kinematicModel.isActive) {
                            this.kinematicModel.kinematicModel.apply(
                                AT3D.translation(0, 0, -0.5)
                            );
                        }

                        break;
                    }
                    case 34: {
                        if (this.model3D.isActive) {
                            this.model3D.model3D.apply(
                                AT3D.translation(0, 0, 0.5)
                            );
                        }

                        if (this.kinematicModel.isActive) {
                            this.kinematicModel.kinematicModel.apply(
                                AT3D.translation(0, 0, 0.5)
                            );
                        }

                        break;
                    }
                    case 37: {
                        if (this.model3D.isActive) {
                            this.model3D.model3D.apply(
                                AT3D.translation(-0.5, 0, 0)
                            );
                        }

                        if (this.kinematicModel.isActive) {
                            this.kinematicModel.kinematicModel.apply(
                                AT3D.translation(-0.5, 0, 0)
                            );
                        }

                        break;
                    }
                    case 38: {
                        if (this.model3D.isActive) {
                            this.model3D.model3D.apply(
                                AT3D.translation(0, 0.5, 0)
                            );
                        }

                        if (this.kinematicModel.isActive) {
                            this.kinematicModel.kinematicModel.apply(
                                AT3D.translation(0, 0.5, 0)
                            );
                        }

                        break;
                    }
                    case 39: {
                        if (this.model3D.isActive) {
                            this.model3D.model3D.apply(
                                AT3D.translation(0.5, 0, 0)
                            );
                        }

                        if (this.kinematicModel.isActive) {
                            this.kinematicModel.kinematicModel.apply(
                                AT3D.translation(0.5, 0, 0)
                            );
                        }

                        break;
                    }
                    case 40: {
                        if (this.model3D.isActive) {
                            this.model3D.model3D.apply(
                                AT3D.translation(0, -0.5, 0)
                            );
                        }

                        if (this.kinematicModel.isActive) {
                            this.kinematicModel.kinematicModel.apply(
                                AT3D.translation(0, -0.5, 0)
                            );
                        }

                        break;
                    }
                    case 98: {
                        if (this.model3D.isActive) {
                            this.model3D.model3D.apply(
                                AT3D.rotationXDeg(Math.PI / 18)
                            );
                        }

                        if (this.kinematicModel.isActive) {
                            this.kinematicModel.kinematicModel.apply(
                                AT3D.rotationXDeg(Math.PI / 18)
                            );
                        }

                        break;
                    }
                    case 104: {
                        if (this.model3D.isActive) {
                            this.model3D.model3D.apply(
                                AT3D.rotationXDeg(-Math.PI / 18)
                            );
                        }

                        if (this.kinematicModel.isActive) {
                            this.kinematicModel.kinematicModel.apply(
                                AT3D.rotationXDeg(-Math.PI / 18)
                            );
                        }

                        break;
                    }
                    case 100: {
                        if (this.model3D.isActive) {
                            this.model3D.model3D.apply(
                                AT3D.rotationYDeg(Math.PI / 18)
                            );
                        }

                        if (this.kinematicModel.isActive) {
                            this.kinematicModel.kinematicModel.apply(
                                AT3D.rotationYDeg(Math.PI / 18)
                            );
                        }

                        break;
                    }
                    case 102: {
                        if (this.model3D.isActive) {
                            this.model3D.model3D.apply(
                                AT3D.rotationYDeg(-Math.PI / 18)
                            );
                        }

                        if (this.kinematicModel.isActive) {
                            this.kinematicModel.kinematicModel.apply(
                                AT3D.rotationYDeg(-Math.PI / 18)
                            );
                        }

                        break;
                    }
                    case 103: {
                        if (this.model3D.isActive) {
                            this.model3D.model3D.apply(
                                AT3D.rotationZDeg(Math.PI / 18)
                            );
                        }

                        if (this.kinematicModel.isActive) {
                            this.kinematicModel.kinematicModel.apply(
                                AT3D.rotationZDeg(Math.PI / 18)
                            );
                        }

                        break;
                    }
                    case 105: {
                        if (this.model3D.isActive) {
                            this.model3D.model3D.apply(
                                AT3D.rotationZDeg(-Math.PI / 18)
                            );
                        }

                        if (this.kinematicModel.isActive) {
                            this.kinematicModel.kinematicModel.apply(
                                AT3D.rotationZDeg(-Math.PI / 18)
                            );
                        }

                        break;
                    }
                    // case 106: {
                    //     this.camera3D.vN.cells[0]+=1;
                    //     this.camera3D.updateCamera();
                    //
                    //     break;
                    // }
                    // case 111: {
                    //     this.camera3D.vN.cells[1]+=1;
                    //     this.camera3D.updateCamera();
                    //
                    //     break;
                    // }
                    // case 109: {
                    //     this.camera3D.vN.cells[2]+=1;
                    //     this.camera3D.updateCamera();
                    //
                    //     break;
                    // }
                }
                this.reBuild();
            },

            /**
             * Rebuild canvas
             *
             * Status: Optional
             */
            reBuild: function () {
                this.camera3D.clear();
                this.axisPlot3D();

                this.plotModel3D();
                this.kinematicModelPlotDefault();
                // this.plotPoints();
            },

            /**
             * Mouse canvas down
             *
             * Status: Optional
             */
            canvasMouseDown(e) {
                if (this.nav.moveCenter.status) {
                    this.camera3D.dragToStart(e);
                }

                if (this.nav.moveCamera.status) {
                    this.camera3D.moveCameraStart(e);
                }
            },

            /**
             * Mouse canvas drag
             *
             * Status: Optional
             */
            canvasMouseDrag: function (e) {
                if (this.nav.moveCenter.status) {
                    this.camera3D.dragTo(e);
                }

                if (this.nav.moveCamera.status) {
                    this.camera3D.moveCameraGo(e);
                }
            },

            /**
             * Mouse canvas up
             *
             * Status: Optional
             */
            canvasMouseUp: function () {
                if (this.nav.moveCenter.status) {
                    this.camera3D.dragToStop();
                }

                if (this.nav.moveCamera.status) {
                    this.camera3D.moveCameraStop();
                }
            },

            /**
             * Mouse canvas wheel
             *
             * Status: Optional
             */
            canvasWheel: function (e) {
                this.camera3D.wheelSize(e);
            },

            /**
             * Plot axis model
             *
             * Status: Process
             */
            axisPlot3D: function () {
                // console.log(this.camera3D.worldToProjectF(true));

                // for (var i = 1; i < 2; i++) {
                //     this.moveTo(this.axis3D.x.getProjectX(i-1), this.axis3D.x.getProjectY(i-1));
                //     this.lineTo(this.axis3D.x.getProjectX(i), this.axis3D.x.getProjectY(i));
                // }


                var ctx = this.canvas.getContext("2d");

                /**
                 * axis X
                 * @type {CanvasRenderingContext2D | WebGLRenderingContext}
                 */
                ctx.beginPath();
                ctx.strokeStyle = '#1c137e';
                ctx.setLineDash([]);
                ctx.lineWidth = 2;
                this.axis3D.x.project(this.camera3D.worldToProjectF(true), true);

                for (var i = 1; i < 2; i++) {
                    this.camera3D.moveTo(this.axis3D.x.getProjectX(i-1), this.axis3D.x.getProjectY(i-1));
                    this.camera3D.lineTo(this.axis3D.x.getProjectX(i), this.axis3D.x.getProjectY(i));
                }
                ctx.stroke();


                /**
                 * axis Y
                 * @type {CanvasRenderingContext2D | WebGLRenderingContext}
                 */
                ctx.beginPath();
                ctx.strokeStyle = '#0aaa00';
                ctx.setLineDash([]);
                ctx.lineWidth = 2;
                this.axis3D.y.project(this.camera3D.worldToProjectF(true), true);

                for (var i = 1; i < 2; i++) {
                    this.camera3D.moveTo(this.axis3D.y.getProjectX(i-1), this.axis3D.y.getProjectY(i-1));
                    this.camera3D.lineTo(this.axis3D.y.getProjectX(i), this.axis3D.y.getProjectY(i));
                }
                ctx.stroke();

                /**
                 * axis Z
                 * @type {CanvasRenderingContext2D | WebGLRenderingContext}
                 */
                ctx.beginPath();
                ctx.strokeStyle = '#cb0006';
                ctx.setLineDash([]);
                ctx.lineWidth = 2;
                this.axis3D.z.project(this.camera3D.worldToProjectF(true), true);

                for (var i = 1; i < 2; i++) {
                    this.camera3D.moveTo(this.axis3D.z.getProjectX(i-1), this.axis3D.z.getProjectY(i-1));
                    this.camera3D.lineTo(this.axis3D.z.getProjectX(i), this.axis3D.z.getProjectY(i));
                }
                ctx.stroke();
            },













            createKinematicModel: function () {
                this.kinematicModel.kinematicModel = new KinematicModel();
            },
            removeKinematicModel: function () {
                this.kinematicModel.kinematicModel = null;
            },
            setKitematicGuideForm: function () {
                this.kinematicModel.kinematicModel.setForm(this.$root.points[this.kinematicModel.selectForm]);
                this.kinematicModel.kinematicModel.setGuide(this.$root.points[this.kinematicModel.selectGuide]);

                this.kinematicModel.kinematicModel.setPointsDefault();
                this.kinematicModel.isActive = true;
            },
            kinematicModelPlotDefault: function () {

                if (!this.show.kinematicModel) {
                    return;
                }

                var ctx = this.canvas.getContext("2d");
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(0,0,0,0.7)';

                ctx.setLineDash([]);
                ctx.lineWidth = 3;


                this.kinematicModel.kinematicModel.project(this.camera3D.worldToProjectF(true));

                if (this.kinematicModel.showModel) {
                    for (let i = 1; i < this.kinematicModel.kinematicModel.matrixPointsProject.length; i++) {
                        for (let j = 1; j <= this.kinematicModel.kinematicModel.form.x.length; j++) {
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

                        let j = this.kinematicModel.kinematicModel.form.x.length - 1;

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
                    for (let j = 1; j <= this.kinematicModel.kinematicModel.form.x.length; j++) {
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
                ctx.strokeStyle = '#3bef34';

                if (this.kinematicModel.showFormGuide) {
                    for (let j = 0; j < this.kinematicModel.kinematicModel.form.x.length - 1; j++) {
                        this.camera3D.moveTo(
                            this.kinematicModel.kinematicModel.matrixFormProject.getProjectX(j),
                            this.kinematicModel.kinematicModel.matrixFormProject.getProjectY(j)
                        );
                        this.camera3D.lineTo(
                            this.kinematicModel.kinematicModel.matrixFormProject.getProjectX(j+1),
                            this.kinematicModel.kinematicModel.matrixFormProject.getProjectY(j+1)
                        );
                    }
                }

                ctx.stroke();

                ctx.beginPath();

                ctx.setLineDash([]);
                ctx.lineWidth = 3;
                ctx.strokeStyle = '#ef8700';

                if (this.kinematicModel.showFormGuide) {
                    for (let j = 0; j < this.kinematicModel.kinematicModel.guide.x.length - 1; j++) {
                        this.camera3D.moveTo(
                            this.kinematicModel.kinematicModel.matrixGuideProject.getProjectX(j),
                            this.kinematicModel.kinematicModel.matrixGuideProject.getProjectY(j)
                        );
                        this.camera3D.lineTo(
                            this.kinematicModel.kinematicModel.matrixGuideProject.getProjectX(j+1),
                            this.kinematicModel.kinematicModel.matrixGuideProject.getProjectY(j+1)
                        );
                    }
                }

                ctx.stroke();
            },






            clearPoints: function () {
                this.points.clear();
            },

            clearPointsRoot: function () {
                this.$root.points = [];
            },

            plotPoints: function () {
                if (!this.show.points) {
                    return;
                }

                var ctx = this.canvas.getContext("2d");
                ctx.beginPath();
                ctx.strokeStyle = '#107e00';

                ctx.setLineDash([]);
                ctx.lineWidth = 3;

                this.model3D.setVertices(new Matrix([
                    this.points.x,
                    this.points.y,
                    this.points.z,
                    this.points.identity.cells
                ]));

                // this.model3D.project(this.camera3D.worldToProjectF(true));

                for (var i = 1; i < this.points.x.length; i++) {
                    this.camera3D.moveTo(this.model3D.getProjectX(i-1), this.model3D.getProjectY(i-1));
                    this.camera3D.lineTo(this.model3D.getProjectX(i), this.model3D.getProjectY(i));
                }

                ctx.stroke();
            },

            plotModel3D: function () {
                if (!this.show.model3D) {
                    return;
                }

                var ctx = this.canvas.getContext("2d");
                ctx.beginPath();
                ctx.strokeStyle = '#107e00';

                ctx.setLineDash([]);
                ctx.lineWidth = 3;

                this.model3D.model3D.project(this.camera3D.worldToProjectF(true));

                for (var i = 1; i < this.model3D.model3D.getVerticesLength(); i++) {
                    this.camera3D.moveTo(this.model3D.model3D.getProjectX(i-1), this.model3D.model3D.getProjectY(i-1));
                    this.camera3D.lineTo(this.model3D.model3D.getProjectX(i), this.model3D.model3D.getProjectY(i));
                }

                ctx.stroke();
            },

            createModel3D: function () {
                this.model3D.model3D = new Model3D();
                this.model3D.model3D.setVertices(new Matrix([
                    this.points.x,
                    this.points.y,
                    this.points.z,
                    this.points.identity.cells
                ]));
                this.model3D.isActive = true;
            },
            removeModel3D: function () {
                this.show.model3D = false;
                this.model3D.isActive = false;
                this.model3D.model3D = null;
            },


            plotPointsFromRoot: function () {
                this.points = this.$root.points[0];
            },



        },
        watch: {
            camera3D: {
                handler: function () {
                    this.reBuild();
                },
                deep: true
            },
            show: {
                handler: function () {
                    this.reBuild();
                },
                deep: true
            },
            points: {
                handler: function () {
                    this.points.setH();
                    this.reBuild();
                },
                deep: true
            },
            'model3D.isActive': {
                handler: function () {
                    this.reBuild();
                },
                deep: true
            },
            'kinematicModel.isActive': {
                handler: function () {
                    this.reBuild();
                },
                deep: true
            },
            'camera3D.d': {
                handler: function () {
                    this.camera3D.updateCamera();
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .component-scene-3d {
        & .scena-3d {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            & #canvas-scene {
                width: 100%;
            }

        }

        & .loadscene {
            position: absolute;
            background: #4f7de2;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            & p {
                color: #fff;
            }
        }

        & .openNav {
            position: fixed;
            right: 10px;
            top: 10px;
            z-index: 1000;
        }


        & .openScene2D {
            position: fixed;
            right: 60px;
            top: 10px;
            z-index: 1000;
        }
    }



    .fade-nav-enter, .fade-nav-leave-to {
        transform: translateX(300px);
        opacity: 0;
    }

    .nav-scene {
        position: absolute;
        right: 0;
        top: 0;
        width: 300px;
        height: 100%;
        background: #fff;
        border-left: 2px solid #6190e8;
        padding: 10px;
        transition: 0.3s;

        & .head-nav {
            & h4 {

                line-height: 40px;
                font-size: 24px;
                color: #6190e8;
            }
        }
        & .tab-pad {
            padding: 0 10px;
            & h3 {
                margin-top: 10px;
            }

            & .row {
                & .row-fix-width {
                    width: 50px;
                    overflow: hidden;
                    margin-right: 20px;
                }
            }
        }
    }
</style>
