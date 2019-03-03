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
                <div v-if="tabs.plot.status" class="nav-tab">

                    <at-button type="primary" @click="plotPointsFromRoot">From root points</at-button>
                    <hr>
                    <h3>Model</h3>
                    <div class="btn-group">
                        <at-button v-if="!model3D.model3D" type="primary" size="small" @click="createModel3D">Create</at-button>
                        <!--<at-button v-if="model3D.model3D" type="primary" size="small" @click="removeKinematicModel">Remove</at-button>-->
                    </div>
                    <div v-if="model3D.model3D">
                        <div>
                            <at-checkbox v-model="plot.model3D" label="Shenzhen" :disabled="model3D.isActive">Show</at-checkbox>
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
                            <at-checkbox v-model="plot.kinematicModel" label="Shenzhen" :disabled="!kinematicModel.isActive">Show</at-checkbox>
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
                    root: {
                        status: false,
                        title: 'Root',
                        icon: 'icon-home'
                    },
                },
                openNav: false,
                firstLoad: false,

                plot: {
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
                        this.model3D.model3D.applyProject(
                            AT3D_Scaling(1.1, 1.1, 1.1),
                            this.camera3D.worldToProjectF(true)
                        ); break;
                    }
                    case 81: {
                        this.model3D.model3D.applyProject(
                            AT3D_Scaling(0.9, 0.9, 0.9),
                            this.camera3D.worldToProjectF(true)
                        ); break;
                    }
                    case 33: {
                        this.model3D.model3D.applyProject(
                            AT3D_Translation(0, 0, -0.5),
                            this.camera3D.worldToProjectF(true)
                        ); break;
                    }
                    case 34: {
                        this.model3D.model3D.applyProject(
                            AT3D_Translation(0, 0, 0.5),
                            this.camera3D.worldToProjectF(true)
                        ); break;
                    }
                    case 37: {
                        this.model3D.model3D.applyProject(
                            AT3D_Translation(-0.5, 0, 0),
                            this.camera3D.worldToProjectF(true)
                        ); break;
                    }
                    case 38: {
                        this.model3D.model3D.applyProject(
                            AT3D_Translation(0, 0.5, 0),
                            this.camera3D.worldToProjectF(true)
                        ); break;
                    }
                    case 39: {
                        this.model3D.model3D.applyProject(
                            AT3D_Translation(0.5, 0, 0),
                            this.camera3D.worldToProjectF(true)
                        ); break;
                    }
                    case 40: {
                        this.model3D.model3D.applyProject(
                            AT3D_Translation(0, -0.5, 0),
                            this.camera3D.worldToProjectF(true)
                        ); break;
                    }
                    case 98: {
                        this.model3D.model3D.applyProject(
                            AT3D_RotationXDeg(Math.PI / 18),
                            this.camera3D.worldToProjectF(true)
                        ); break;
                    }
                    case 104: {
                        this.model3D.model3D.applyProject(
                            AT3D_RotationXDeg(-Math.PI / 18),
                            this.camera3D.worldToProjectF(true)
                        ); break;
                    }
                    case 100: {
                        this.model3D.model3D.applyProject(
                            AT3D_RotationYDeg(Math.PI / 18),
                            this.camera3D.worldToProjectF(true)
                        ); break;
                    }
                    case 102: {
                        this.model3D.model3D.applyProject(
                            AT3D_RotationYDeg(-Math.PI / 18),
                            this.camera3D.worldToProjectF(true)
                        ); break;
                    }
                    case 103: {
                        this.model3D.model3D.applyProject(
                            AT3D_RotationZDeg(Math.PI / 18),
                            this.camera3D.worldToProjectF(true)
                        ); break;
                    }
                    case 105: {
                        this.model3D.model3D.applyProject(
                            AT3D_RotationZDeg(-Math.PI / 18),
                            this.camera3D.worldToProjectF(true)
                        ); break;
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
            },

            /**
             * Rebuild canvas
             *
             * Status: Optional
             */
            reBuild: function () {
                this.camera3D.clear();
                // this.axisPlot3D();

                // this.plotFun();
                // this.plotSpline();
                this.plotModel3D();
                this.kinematicModelPlotDefault();
                // this.plotPoints();
                // this.plotPNewton();
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

                // if (this.nav.addPoint.status) {
                //     this.addPoint(e);
                // }
                //
                // if (this.nav.addComboPoints.status) {
                //     this.addComboPointsStart(e);
                // }
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

                // if (this.nav.addComboPoints.status) {
                //     this.addComboPointsDrag(e);
                // }
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

                // if (this.nav.addComboPoints.status) {
                //     this.addComboPointsStop();
                // }
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
                this.kinematicModel.kinematicModel.setGuide(this.$root.points[this.kinematicModel.selectGuide]);
                this.kinematicModel.kinematicModel.setForm(this.$root.points[this.kinematicModel.selectForm]);

                this.kinematicModel.kinematicModel.setPointsDefault();
            },
            kinematicModelPlotDefault: function () {

                if (!this.plot.kinematicModel) {
                    return;
                }

                var ctx = this.canvas.getContext("2d");
                ctx.beginPath();
                ctx.strokeStyle = '#7e0700';

                ctx.setLineDash([]);
                ctx.lineWidth = 3;


                this.kinematicModel.kinematicModel.project(this.camera3D.worldToProjectF(true));

                for (var i = 1; i < this.kinematicModel.kinematicModel.matrixPointsProject.length; i++) {
                    for (var j = 1; j < this.kinematicModel.kinematicModel.guide.x.length; j++) {
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
                            this.kinematicModel.kinematicModel.matrixPointsProject[i-1].getProjectX(i),
                            this.kinematicModel.kinematicModel.matrixPointsProject[i-1].getProjectY(i)
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
                if (!this.plot.points) {
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
                if (!this.plot.model3D) {
                    return;
                }

                var ctx = this.canvas.getContext("2d");
                ctx.beginPath();
                ctx.strokeStyle = '#107e00';

                ctx.setLineDash([]);
                ctx.lineWidth = 3;


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
                this.plot.model3D = true;
                this.model3D.model3D.project(this.camera3D.worldToProjectF(true));
            },
            removeModel3D: function () {
                this.plot.model3D = false;
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
            plot: {
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
            model3D: {
                handler: function () {
                    this.reBuild();
                },
                deep: true
            },
            kinematicModel: {
                handler: function () {
                    this.reBuild();
                },
                deep: true
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
