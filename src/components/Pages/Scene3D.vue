<template>
    <div class="component-scene-3d">
        <div class="scena-3d">
            <canvas ref="canvas"/>
<!--                @wheel="canvasWheel"-->
<!--                @mousedown="canvasMouseDown"-->
<!--                @mousemove="canvasMouseDrag"-->
<!--                @mouseup="canvasMouseUp"-->
<!--            />-->
        </div>

<!--        <div-->
<!--            v-if="!firstLoad"-->
<!--            class="loadscene"-->
<!--            @click="firstLoadScene">-->
<!--            <p><b>Load</b></p>-->
<!--        </div>-->

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
                    <at-button type="primary" @click="createNewModel" v-if="!choiseTypePlot">Create new model</at-button>
                    <at-button type="error" @click="cancelCreateNewModel" v-if="choiseTypePlot">Cancel</at-button>

                    <at-select v-if="choiseTypePlot" v-model="typePlotSelect" :placeholder="'Type plot'">
                        <at-option v-for="(type, index) in typesPlot" :value="index" :key="index">{{ type.name }}</at-option>
                    </at-select>

                    <component v-if="typePlotSelect" :is="typesPlot[typePlotSelect].componentForm"/>


                    <div>Models</div>
                    <div>
                        <p v-for="(model,index) in getModels" :key="index">{{ model.name }}</p>
                    </div>
                </div>
                <div v-if="tabs.root.status" class="nav-tab">
                    <root-points></root-points>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import RootPoints from "./../RootData";
    import InputFloatType from "./../Elements/input-float-type";

    import * as AT3D from './../../consts/view/AffineTransform3D';

    import Points from './../../classes/view/Points';

    import Matrix from './../../classes/math/Matrix';
    import Camera3D from './../../classes/view/Camera3D';
    import Model3D from './../../classes/view/Model3D';

    import KinematicModel from './../../classes/view/KinematicModel';

    import KinematicForm from './../../components/Forms/Scene3D/Kinematic';

    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "Scena3D",
        components: {
        	InputFloatType,
            RootPoints,
			KinematicForm
        },
        data () {
            return {
                fields: {
                    width: 0,
                    height: 0
                },

                // axis3D: {
                //     x: new Model3D(),
                //     y: new Model3D(),
                //     z: new Model3D()
                // },

                // points: {},
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
                // firstLoad: false,

                // show: {
                //     kinematicModel: false,
                //     points: false,
                //     model3D: false
                // },
                // model3D: {
                //     isActive: false,
                //     model3D: null,
                // },
                // kinematicModel: {
                //     isActive: false,
                //     kinematicModel: null,
                //
                //     showFormGuide: true,
                //     showModel: true,
                //
                //     selectGuide: null,
                //     selectForm: null,
                //     selectAT: null
                // },
                typesPlot: {
                	kinematic: {
                		componentForm: KinematicForm,
						name: 'Kinematic'
                    }
                },
                typePlotSelect: null,
				choiseTypePlot: false
            }
        },
        computed: {
        	...mapGetters('scene3d', [
        		'getCamera',
				'getModels'
            ]),
            canvas: function () {
                return this.$refs.canvas;
            }
        },
        mounted: function () {
			this.$nextTick(() => {
				this.fields = {
					width: document.body.clientWidth,
					height: document.body.clientHeight
				};
				this.initCamera(this.$refs.canvas);
				this.render();
			})
		},
        // created: function() {
        //     document.addEventListener('keydown', this.keyPress, false);
        //     document.addEventListener('keypress', this.keyPress, false);
        // },
        // destroyed: function() {
        //     document.removeEventListener('keydown', this.keyPress, false);
        //     document.removeEventListener('keypress', this.keyPress, false);
        // },
        methods: {
        	...mapActions('scene3d', [
                'initCamera',
                'render'
            ]),
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
            // axisPlot3D: function () {
            //
            //     // for (var i = 1; i < 2; i++) {
            //     //     this.moveTo(this.axis3D.x.getProjectX(i-1), this.axis3D.x.getProjectY(i-1));
            //     //     this.lineTo(this.axis3D.x.getProjectX(i), this.axis3D.x.getProjectY(i));
            //     // }
            //
            //
            //     var ctx = this.canvas.getContext("2d");
            //
            //     /**
            //      * axis X
            //      * @type {CanvasRenderingContext2D | WebGLRenderingContext}
            //      */
            //     ctx.beginPath();
            //     ctx.strokeStyle = '#1c137e';
            //     ctx.setLineDash([]);
            //     ctx.lineWidth = 2;
            //     this.axis3D.x.project(this.camera3D.worldToProjectF(true), true);
            //
            //     for (var i = 1; i < 2; i++) {
            //         this.camera3D.moveTo(this.axis3D.x.getProjectX(i-1), this.axis3D.x.getProjectY(i-1));
            //         this.camera3D.lineTo(this.axis3D.x.getProjectX(i), this.axis3D.x.getProjectY(i));
            //     }
            //     ctx.stroke();
            //
            //
            //     /**
            //      * axis Y
            //      * @type {CanvasRenderingContext2D | WebGLRenderingContext}
            //      */
            //     ctx.beginPath();
            //     ctx.strokeStyle = '#0aaa00';
            //     ctx.setLineDash([]);
            //     ctx.lineWidth = 2;
            //     this.axis3D.y.project(this.camera3D.worldToProjectF(true), true);
            //
            //     for (var i = 1; i < 2; i++) {
            //         this.camera3D.moveTo(this.axis3D.y.getProjectX(i-1), this.axis3D.y.getProjectY(i-1));
            //         this.camera3D.lineTo(this.axis3D.y.getProjectX(i), this.axis3D.y.getProjectY(i));
            //     }
            //     ctx.stroke();
            //
            //     /**
            //      * axis Z
            //      * @type {CanvasRenderingContext2D | WebGLRenderingContext}
            //      */
            //     ctx.beginPath();
            //     ctx.strokeStyle = '#cb0006';
            //     ctx.setLineDash([]);
            //     ctx.lineWidth = 2;
            //     this.axis3D.z.project(this.camera3D.worldToProjectF(true), true);
            //
            //     for (var i = 1; i < 2; i++) {
            //         this.camera3D.moveTo(this.axis3D.z.getProjectX(i-1), this.axis3D.z.getProjectY(i-1));
            //         this.camera3D.lineTo(this.axis3D.z.getProjectX(i), this.axis3D.z.getProjectY(i));
            //     }
            //     ctx.stroke();
            // },






			createNewModel: function () {
                this.choiseTypePlot = true;
            },
			cancelCreateNewModel: function () {
				this.choiseTypePlot = false;
			},






            createKinematicModel: function () {
                this.kinematicModel.kinematicModel = new KinematicModel();
            },
            removeKinematicModel: function () {
                this.kinematicModel.kinematicModel = null;
                this.kinematicModel.isActive = false;
            },
            setKitematicGuideForm: function () {
                if (this.kinematicModel.selectForm.indexOf("points") >= 0) {
                    this.kinematicModel.kinematicModel.setForm(
                        this.$root.points[
                            Number(this.kinematicModel.selectForm.substring(6))
                            ]
                    );
                }

                if (this.kinematicModel.selectGuide.indexOf("points") >= 0) {
                    this.kinematicModel.kinematicModel.setGuide(
                        this.$root.points[
                            Number(this.kinematicModel.selectGuide.substring(6))
                            ]
                    );
                }

                if (this.kinematicModel.selectForm.indexOf("spline") >= 0) {
                    this.kinematicModel.kinematicModel.setForm(
                        this.$root.spline[
                            Number(this.kinematicModel.selectForm.substring(6))
                            ]
                    );
                }

                if (this.kinematicModel.selectGuide.indexOf("spline") >= 0) {
                    this.kinematicModel.kinematicModel.setGuide(
                        this.$root.spline[
                            Number(this.kinematicModel.selectGuide.substring(6))
                            ]
                    );
                }


                if (this.kinematicModel.selectForm.indexOf("pNewton") >= 0) {
                    this.kinematicModel.kinematicModel.setForm(
                        this.$root.pNewton[
                            Number(this.kinematicModel.selectForm.substring(7))
                            ]
                    );
                }

                if (this.kinematicModel.selectGuide.indexOf("pNewton") >= 0) {
                    this.kinematicModel.kinematicModel.setGuide(
                        this.$root.pNewton[
                            Number(this.kinematicModel.selectGuide.substring(7))
                            ]
                    );
                }

                if (this.kinematicModel.selectGuide === "rotation") {
                    this.kinematicModel.kinematicModel.setGuide(
                        "rotation"
                    );
                }

                this.kinematicModel.kinematicModel.setAT(
                    this.kinematicModel.selectAT
                );

                this.kinematicModel.kinematicModel.setPoints();
            },

            plotDefaulttKitematic: function () {
                this.kinematicModel.kinematicModel.plotDefault();
                this.kinematicModel.isActive = true;

                this.kinematicModelPlotDefault();
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
            // camera3D: {
            //     handler: function () {
            //         this.reBuild();
            //     },
            //     deep: true
            // },
            // show: {
            //     handler: function () {
            //         this.reBuild();
            //     },
            //     deep: true
            // },
            // points: {
            //     handler: function () {
            //         this.points.setH();
            //         this.reBuild();
            //     },
            //     deep: true
            // },
            // 'model3D.isActive': {
            //     handler: function () {
            //         this.reBuild();
            //     },
            //     deep: true
            // },
            // 'kinematicModel.isActive': {
            //     handler: function () {
            //         this.reBuild();
            //     },
            //     deep: true
            // },
            // 'camera3D.d': {
            //     handler: function () {
            //         this.camera3D.updateCamera();
            //     }
            // }
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
