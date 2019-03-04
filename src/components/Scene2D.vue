<template>
    <div class="component-scene-2d">
        <div class="scena-2d">
            <canvas id="canvas-scene" :width="camera2D.field.width" :height="camera2D.field.height"
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

        <div class="openScene3D">
            <at-button type="primary" size="large" icon="icon-box" circle @click="clickScene3D"></at-button>
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
                <div v-if="tabs.grid.status" class="nav-tab">
                    <at-checkbox v-model="camera2D.grid.axiss" label="Shenzhen">Axis</at-checkbox>
                    <at-checkbox v-model="camera2D.grid.grid" label="Shenzhen">Grid</at-checkbox>
                    <at-checkbox v-model="camera2D.grid.serifs" label="Shenzhen">Serifs</at-checkbox>


                    <p>Step serifs:
                        <i @click="camera2D.grid.serifsStep--" class="icon icon-minus"></i>
                        {{ camera2D.grid.serifsStep }}
                        <i @click="camera2D.grid.serifsStep++" class="icon icon-plus"></i>
                    </p>
                    <input-float-type v-model="camera2D.grid.serifsStep"></input-float-type>
                    <!--<at-slider v-model="camera2D.grid.serifsStep" :step="1" :min="1" :max="1000"></at-slider>-->

                    <p>Size serifs:
                        <i @click="camera2D.grid.serifsSize--" class="icon icon-minus"></i>
                        {{ camera2D.grid.serifsSize }}
                        <i @click="camera2D.grid.serifsSize++" class="icon icon-plus"></i>
                    </p>
                    <input-float-type v-model="camera2D.grid.serifsSize"></input-float-type>
                </div>
                <div v-if="tabs.plot.status" class="nav-tab">
                    <h3>Function</h3>
                    <at-checkbox v-model="show.fun" label="Shenzhen">Show</at-checkbox>
                    <hr>
                    <h3>Spline</h3>
                    <at-checkbox v-model="show.spline" label="Shenzhen" :disabled="!spline.isActive">Show</at-checkbox>

                    <div class="btn-group">
                        <at-button type="primary" size="small" @click="setSpline">Update spline</at-button>
                        <at-button type="primary" size="small" @click="setPointsToRootFromSpline">Add points to root from spline</at-button>
                    </div>
                    <hr>
                    <h3>Newton</h3>
                    <at-checkbox v-model="show.polynom" label="Shenzhen" :disabled="!polynom.isActive">Show</at-checkbox>
                    <div class="btn-group">
                        <at-button type="primary" size="small" @click="setPNewton">Update polynom</at-button>
                    </div>
                    <hr>
                    <h3>Points</h3>
                    <at-checkbox v-model="show.points" label="Shenzhen">Show</at-checkbox>
                    <p>Step points: {{ points.minStep }}</p>
                    <input-float-type v-model="points.minStep"></input-float-type>
                    <div class="btn-group">
                        <at-button type="primary" size="small" @click="clearPoints">Remove points</at-button>
                        <at-button type="primary" size="small" @click="clearPointsRoot">Remove points ROOT</at-button>
                        <at-button type="primary" size="small" @click="addPointsToRoot">Add points to root</at-button>
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
                <div v-if="tabs.root.status" class="nav-tab">
                    <root-points></root-points>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import InputFloatType from "./Elements/input-float-type";
    import RootPoints from "./RootPoints";
    export default {
        name: "Scena2D",
        components: {RootPoints, InputFloatType},
        data () {
            return {
                /**
                 * First load scene
                 */
                firstLoad: false,

                /**
                 * Camera
                 */
                camera2D: {
                    field: {
                        width: 0,
                        height: 0
                    },
                },

                /**
                 * Menu
                 */
                openNav: false,

                /**
                 * Menu tabs
                 */
                tabs: {
                    nav: {
                        status: true,
                        title: 'Nav',
                        icon: 'icon-move'
                    },
                    grid: {
                        status: false,
                        title: 'Grid',
                        icon: 'icon-grid'
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

                /**
                 * Navigation
                 * Nav actions
                 */
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


                show: {
                    fun: false,
                    spline: false,
                    points: true,
                    polynom: false
                },

                hToRoot: 0.1,
                points: {

                },
                spline: {
                    isActive: false,
                    spline: null
                },
                polynom: {
                    isActive: false,
                    polynom: null
                }
            }
        },
        computed: {
            canvas: function () {
                return document.getElementById("canvas-scene");
            }
        },
        mounted: function () {
            this.camera2D = new Camera2D(this.canvas);

            this.points = new Points([1,2,3,4], [1,0,1,0],[0,0,0,0]);

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

            clickScene3D: function () {
                this.$router.push({ name: 'scene3d' });
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
                    case 82: {
                        this.points.AT2D_RotationDeg(Math.PI / 18); break;
                    }
                    case 87: {
                        this.points.AT2D_Scaling(1.1, 1.1); break;
                    }
                    case 81: {
                        this.points.AT2D_Scaling(0.9, 0.9); break;
                    }
                    case 37: {
                        this.points.AT2D_Translation(-0.5,0); break;
                    }
                    case 38: {
                        this.points.AT2D_Translation(0,0.5); break;
                    }
                    case 39: {
                        this.points.AT2D_Translation(0.5,0); break;
                    }
                    case 40: {
                        this.points.AT2D_Translation(0,-0.5); break;
                    }
                }
            },

            /**
             * Rebuild canvas
             *
             * Status: Optional
             */
            reBuild: function () {
                this.camera2D.clear();
                this.camera2D.axisPlot();

                this.plotFun();
                this.plotSpline();
                this.plotPoints();
                this.plotPNewton();
            },

            /**
             * Mouse canvas down
             *
             * Status: Optional
             */
            canvasMouseDown(e) {
                if (this.nav.moveCenter.status) {
                    this.camera2D.dragToStart(e);
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
                    this.camera2D.dragTo(e);
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
                    this.camera2D.dragToStop();
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
                this.camera2D.wheelSize(e);
            },


            /**
             * Combo-adding points (start method)
             *
             * Status: Done *
             */
            addComboPointsStart: function (e) {
                this.points.clear();

                this.points.combo = true;

                this.spline.isActive = false;
                this.polynom.isActive = false;
                this.show.spline = false;
                this.show.polynom = false;

                this.points.addPoint(
                    this.camera2D.ScreenToWorldX(e.clientX),
                    this.camera2D.ScreenToWorldY(e.clientY)
                );
            },

            /**
             * Combo-adding points (drag method)
             *
             * Status: Done *
             */
            addComboPointsDrag: function (e) {
                if (!this.points.combo) {
                    return;
                }
                if (this.points.x[this.points.x.length-1] + this.points.minH > this.camera2D.ScreenToWorldX(e.clientX) ) {
                    return;
                }

                this.points.addPoint(
                    this.camera2D.ScreenToWorldX(e.clientX),
                    this.camera2D.ScreenToWorldY(e.clientY)
                );
            },

            /**
             * Combo-adding points (stop method)
             *
             * Status: Done *
             */
            addComboPointsStop: function () {
                this.points.combo = false;

                if ((this.spline.isActive)&&(this.show.spline)) {
                    this.setSpline();
                }

                if ((this.polynom.isActive)&&(this.show.polynom)) {
                    this.setPNewton();
                }
            },

            /**
             * Add point for nav
             *
             * Status: Optional
             */
            addPoint: function (e) {
                if (this.points.x[this.points.x.length-1] + this.points.minH > this.camera2D.ScreenToWorldX(e.clientX) ) {
                    return;
                }

                this.points.addPoint(
                    this.camera2D.ScreenToWorldX(e.clientX),
                    this.camera2D.ScreenToWorldY(e.clientY)
                );

                if ((this.spline.isActive)&&(this.show.spline)) {
                    this.setSpline();
                }

                if ((this.polynom.isActive)&&(this.show.polynom)) {
                    this.setPNewton();
                }
            },










            clearPointsRoot: function () {
                this.$root.points = [];
            },






            /**
             * Add points to root from this.points (adding scene)
             */
            addPointsToRoot: function () {
                var points = new Points();
                points.copy(this.points);
                this.$root.points.push(points);
            },



            /**
             * Add points to root from this.points (adding scene)
             */
            setPointsToRootFromSpline: function () {
                var pointsToRoot = new Points();

                var stepSpline = (this.points.x[this.points.x.length-1] - this.points.x[0])/this.points.x.length;

                for (var i = this.points.x[0]; i < this.points.x[this.points.x.length-1]; i += 0.33) {
                    pointsToRoot.addPoint(i, this.spline.spline.pointSpline(i));
                }

                this.$root.points.push(pointsToRoot);
            },




            /**
             * Plot function on scene
             */
            plotFun: function () {
                if (this.show.fun) {
                    var ctx = this.canvas.getContext("2d");
                    ctx.beginPath();
                    ctx.strokeStyle = '#2600ff';

                    ctx.setLineDash([]);
                    ctx.lineWidth = 2;

                    var start = 0;
                    var finish = 30;

                    if (this.camera2D.ScreenToWorldX(0) > start) {
                        start = this.camera2D.ScreenToWorldX(0);
                    }
                    if (this.camera2D.ScreenToWorldX(this.canvasWidth) < finish) {
                        finish = this.camera2D.ScreenToWorldX(this.canvasWidth);
                    }

                    this.camera2D.moveTo(start,this.mainFunction(start));
                    for (var i = start; i < finish; i += 0.01)
                    {

                        this.camera2D.lineTo(i, this.mainFunction(i));
                    }

                    ctx.stroke();
                }
            },

            /**
             * Function
             * @param x
             * @returns {number}
             */
            mainFunction: function (x) {
                return Math.sin(x);
            },


            setSpline: function () {
                if (this.points.x.length < 3) {
                    return;
                }

                this.spline.spline = new Spline();

                this.spline.spline.setXFX({
                    x: this.points.x,
                    fx: this.points.y,
                    h: this.points.h
                });

                this.spline.spline.setCoeffC();

                var matr = new tMatrix();
                matr.setABCF(this.spline.spline.getCoeffC());
                matr.solveX();


                this.spline.spline.setCoeffSpline(matr.getX());
                this.spline.isActive = true;

            },
            plotSpline: function (x) {
                if (!this.spline.isActive) {
                    return;
                }
                if (this.show.spline) {
                    var ctx = this.canvas.getContext("2d");
                    ctx.beginPath();
                    ctx.strokeStyle = '#ff0012';

                    ctx.setLineDash([]);
                    ctx.lineWidth = 2;

                    var start = this.spline.spline.getStart();
                    var finish = this.spline.spline.getFinish();

                    if (this.camera2D.ScreenToWorldX(0) > start) {
                        start = this.camera2D.ScreenToWorldX(0);
                    }
                    if (this.camera2D.ScreenToWorldX(this.canvasWidth) < finish) {
                        finish = this.camera2D.ScreenToWorldX(this.canvasWidth);
                    }

                    this.camera2D.moveTo(start,this.mainSpline(start));
                    for (var i = start; i < finish; i += 0.01)
                    {
                        this.camera2D.lineTo(i, this.mainSpline(i));
                    }

                    ctx.stroke();
                }
            },
            mainSpline: function (x) {
                return this.spline.spline.pointSpline(x);
            },


            clearPoints: function () {
                this.show.spline = false;
                this.spline.isActive = false;
                this.spline.spline = null;

                this.points.clear();

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


                var s = Math.abs(
                    this.camera2D.ScreenToWorldY(0) -
                    this.camera2D.ScreenToWorldY(this.camera2D.grid.serifsSize)
                );

                for (var i = 0; i < this.points.x.length; i++) {

                    this.camera2D.moveTo(this.points.x[i]+(s/2), this.points.y[i]-(s/2));
                    this.camera2D.lineTo(this.points.x[i]-(s/2), this.points.y[i]+(s/2));


                    this.camera2D.moveTo(this.points.x[i]+(s/2), this.points.y[i]+(s/2));
                    this.camera2D.lineTo(this.points.x[i]-(s/2), this.points.y[i]-(s/2));

                }

                ctx.stroke();
            },





            setPNewton: function () {
                if (this.points.x.length < 3) {
                    return;
                }

                this.polynom.polynom = new pNewton([this.points.x, this.points.y]);
                this.polynom.isActive = true;

            },

            plotPNewton: function () {
                if (!this.polynom.isActive) {
                    return;
                }

                if (!this.show.polynom) {
                    return
                }
                var ctx = this.canvas.getContext("2d");
                ctx.beginPath();
                ctx.strokeStyle = '#aa7000';

                ctx.setLineDash([]);
                ctx.lineWidth = 2;

                var start = this.points.x[0];
                var finish = this.points.x[this.points.x.length-1];

                if (this.camera2D.ScreenToWorldX(0) > start) {
                    start = this.camera2D.ScreenToWorldX(0);
                }
                if (this.camera2D.ScreenToWorldX(this.canvasWidth) < finish) {
                    finish = this.camera2D.ScreenToWorldX(this.canvasWidth);
                }

                this.camera2D.moveTo(start,this.polynom.polynom.pointPolynom(start));
                for (var i = start; i < finish; i += 0.01)
                {
                    this.camera2D.lineTo(i, this.polynom.polynom.pointPolynom(i));
                }

                ctx.stroke();

            },






        },
        watch: {
            camera2D: {
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
        }
    }
</script>

<style scoped lang="less">
    .component-scene-2d {
        & .scena-2d {
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

        & .openScene3D {
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


</style>
