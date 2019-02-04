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

        <div class="openNav">
            <at-button type="primary" size="large" icon="icon-settings" circle @click="clickOpenNav"></at-button>
        </div>

        <div class="nav-scene" v-if="openNav">
            <div class="head-nav">
                <h4>CG-VUE</h4>
            </div>
            <at-tabs>
                <at-tab-pane label="Nav" name="nav">
                    <div class="tab-pad">
                        <div class="row">
                            <at-button
                                    v-for="item in nav"
                                    :key="item.title"
                                    :icon="item.icon"
                                    :class="{ 'at-btn--primary': item.status}"
                                    @click="choiseNav(item.title)"
                                    circle></at-button>
                        </div>
                    </div>
                </at-tab-pane>
                <at-tab-pane label="Grid" name="grid">
                    <div class="tab-pad">
                        <div class="row no-gutter">
                            <at-checkbox v-model="camera3D.grid.axiss" label="Shenzhen">Axis</at-checkbox>
                        </div>
                        <div class="row no-gutter">
                            <at-checkbox v-model="camera3D.grid.grid" label="Shenzhen">Grid</at-checkbox>
                        </div>
                        <div class="row no-gutter">
                            <at-checkbox v-model="camera3D.grid.serifs" label="Shenzhen">Serifs</at-checkbox>
                        </div>
                        <p>Step serifs: <i @click="camera3D.grid.serifsStep--" class="icon icon-minus"></i> {{ camera3D.grid.serifsStep }} <i @click="camera3D.grid.serifsStep++" class="icon icon-plus"></i></p>
                        <at-slider v-model="camera3D.grid.serifsStep" :step="1" :min="1" :max="1000"></at-slider>
                        <p>Size serifs: <i @click="camera3D.grid.serifsSize--" class="icon icon-minus"></i> {{ camera3D.grid.serifsSize }} <i @click="camera3D.grid.serifsSize++" class="icon icon-plus"></i></p>
                        <at-slider v-model="camera3D.grid.serifsSize" :step="1" :min="2" :max="100"></at-slider>
                    </div>
                </at-tab-pane>
                <at-tab-pane label="Plot" name="plot">
                    <div class="tab-pad">
                        <h3>Function</h3>
                        <div class="row no-gutter">
                            <at-checkbox v-model="plot.fun" label="Shenzhen">Show</at-checkbox>
                        </div>

                        <h3>Points</h3>
                        <div class="row no-gutter">
                            <at-checkbox v-model="plot.points" label="Shenzhen">Show</at-checkbox>
                        </div>

                        <p>Step points: {{ points.minStep }}</p>
                        <at-slider v-model="points.minStep" :step="0.5" :min="1" :max="100"></at-slider>
                        <div class="row no-gutter">
                            <at-button type="primary" @click="clearPoints">Remove points</at-button>
                        </div>
                        <div class="row">
                            <div class="row-fix-width">
                                <p>x</p>
                                <p v-for="item in points.x">{{ item }}</p>
                            </div>
                            <div class="row-fix-width">
                                <p>y</p>
                                <p v-for="item in points.y">{{ item }}</p>
                            </div>
                            <div class="row-fix-width">
                                <p>h</p>
                                <p v-for="item in points.h">{{ item }}</p>
                            </div>
                        </div>
                    </div>
                </at-tab-pane>
            </at-tabs>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Scena3D",
        data () {
            return {
                camera3D: {
                    field: {
                        width: 0,
                        height: 0
                    },
                },
                model3D: {},
                points: {},
                nav: {
                    moveCenter: {
                        status: true,
                        title: 'moveCenter',
                        icon: 'icon-move'
                    },
                    addPoint: {
                        status: false,
                        title: 'addPoint',
                        icon: 'icon-plus-circle'
                    },
                    addComboPoints: {
                        status: false,
                        title: 'addComboPoints',
                        icon: 'icon-trending-up'
                    },
                },
                openNav: false,

                plot: {
                    // fun: false,
                    // spline: false,
                    points: true,
                    // polynom: false
                },
                // spline: {
                //     isActive: false,
                //     spline: null
                // },
                // polynom: {
                //     isActive: false,
                //     polynom: null
                // }
            }
        },
        computed: {
            canvas: function () {
                return document.getElementById("canvas-scene");
            }
        },
        mounted: function () {
            this.camera3D = new Camera3D();
            this.camera3D.setCanvas(this.canvas);

            this.model3D = new Model3D();


            this.points = new Points([1,2,3,4], [1,0,1,0], [0,0,0,0]);

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
                        this.points.AT3D_Scaling(1.1, 1.1, 1.1); break;
                    }
                    case 81: {
                        this.points.AT3D_Scaling(0.9, 0.9, 0.9); break;
                    }
                    case 33: {
                        this.points.AT3D_Translation(0, 0, -0.5); break;
                    }
                    case 34: {
                        this.points.AT3D_Translation(0, 0, 0.5); break;
                    }
                    case 37: {
                        this.points.AT3D_Translation(-0.5, 0, 0); break;
                    }
                    case 38: {
                        this.points.AT3D_Translation(0, 0.5, 0); break;
                    }
                    case 39: {
                        this.points.AT3D_Translation(0.5, 0, 0); break;
                    }
                    case 40: {
                        this.points.AT3D_Translation(0, -0.5, 0); break;
                    }
                    case 98: {
                        this.points.AT3D_RotationXDeg(Math.PI / 18); break;
                    }
                    case 104: {
                        this.points.AT3D_RotationXDeg(-Math.PI / 18); break;
                    }
                    case 100: {
                        this.points.AT3D_RotationYDeg(Math.PI / 18); break;
                    }
                    case 102: {
                        this.points.AT3D_RotationYDeg(-Math.PI / 18); break;
                    }
                    case 103: {
                        this.points.AT3D_RotationZDeg(Math.PI / 18); break;
                    }
                    case 105: {
                        this.points.AT3D_RotationZDeg(-Math.PI / 18); break;
                    }
                }
            },

            /**
             * Rebuild canvas
             *
             * Status: Optional
             */
            reBuild: function () {
                this.camera3D.clear();
                this.camera3D.axisPlot();

                // this.plotFun();
                // this.plotSpline();
                this.plotPoints();
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

                if (this.nav.addPoint.status) {
                    this.addPoint(e);
                }

                if (this.nav.addComboPoints.status) {
                    this.addComboPointsStart(e);
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

                if (this.nav.addComboPoints.status) {
                    this.addComboPointsDrag(e);
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

                if (this.nav.addComboPoints.status) {
                    this.addComboPointsStop();
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


            // /**
            //  * Combo-adding points (start method)
            //  *
            //  * Status: Done *
            //  */
            // addComboPointsStart: function (e) {
            //     this.points.clear();
            //
            //     this.points.combo = true;
            //
            //     this.spline.isActive = false;
            //     this.polynom.isActive = false;
            //     this.plot.spline = false;
            //     this.plot.polynom = false;
            //
            //     this.points.addPoint(
            //         this.camera2D.ScreenToWorldX(e.clientX),
            //         this.camera2D.ScreenToWorldY(e.clientY)
            //     );
            // },
            //
            // /**
            //  * Combo-adding points (drag method)
            //  *
            //  * Status: Done *
            //  */
            // addComboPointsDrag: function (e) {
            //     if (!this.points.combo) {
            //         return;
            //     }
            //     if (this.points.x[this.points.x.length-1] + this.points.minH > this.camera2D.ScreenToWorldX(e.clientX) ) {
            //         return;
            //     }
            //
            //     this.points.addPoint(
            //         this.camera2D.ScreenToWorldX(e.clientX),
            //         this.camera2D.ScreenToWorldY(e.clientY)
            //     );
            // },
            //
            // /**
            //  * Combo-adding points (stop method)
            //  *
            //  * Status: Done *
            //  */
            // addComboPointsStop: function () {
            //     this.points.combo = false;
            //
            //     if ((this.spline.isActive)&&(this.plot.spline)) {
            //         this.setSpline();
            //     }
            //
            //     if ((this.polynom.isActive)&&(this.plot.polynom)) {
            //         this.setPNewton();
            //     }
            // },
            //
            // /**
            //  * Add point for nav
            //  *
            //  * Status: Optional
            //  */
            // addPoint: function (e) {
            //     if (this.points.x[this.points.x.length-1] + this.points.minH > this.camera2D.ScreenToWorldX(e.clientX) ) {
            //         return;
            //     }
            //
            //     this.points.addPoint(
            //         this.camera2D.ScreenToWorldX(e.clientX),
            //         this.camera2D.ScreenToWorldY(e.clientY)
            //     );
            //
            //     if ((this.spline.isActive)&&(this.plot.spline)) {
            //         this.setSpline();
            //     }
            //
            //     if ((this.polynom.isActive)&&(this.plot.polynom)) {
            //         this.setPNewton();
            //     }
            // },























            clearPoints: function () {
                this.points.clear();
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

                // console.log(this.camera3D.worldToProjectF(true));
                this.model3D.project(this.camera3D.worldToProjectF(true), true);

                for (var i = 1; i < this.points.x.length; i++) {
                    this.camera3D.moveTo(this.model3D.getProjectX(i-1), this.model3D.getProjectY(i-1));
                    this.camera3D.lineTo(this.model3D.getProjectX(i), this.model3D.getProjectY(i));
                }


                // var s = Math.abs(
                //     this.camera2D.ScreenToWorldY(0) -
                //     this.camera2D.ScreenToWorldY(this.camera2D.grid.serifsSize)
                // );
                //
                // for (var i = 0; i < this.points.x.length; i++) {
                //
                //     this.camera2D.moveTo(this.points.x[i]+(s/2), this.points.y[i]-(s/2));
                //     this.camera2D.lineTo(this.points.x[i]-(s/2), this.points.y[i]+(s/2));
                //
                //
                //     this.camera2D.moveTo(this.points.x[i]+(s/2), this.points.y[i]+(s/2));
                //     this.camera2D.lineTo(this.points.x[i]-(s/2), this.points.y[i]-(s/2));
                //
                // }

                ctx.stroke();
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
            }
        }
    }
</script>

<style lang="less">
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

        & .openNav {
            position: fixed;
            right: 10px;
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
        border-left: 1px solid #5782d1;
        box-shadow: 0 0 5px #5782d1;
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
