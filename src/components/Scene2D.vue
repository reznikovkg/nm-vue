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
                <div v-if="tabs.plot.status" class="nav-tab"><hr>
                    <h3>Points</h3>
                    <div class="btn-group">
                        <at-button v-if="!points.points" type="primary" size="small" @click="createPoints">Create</at-button>
                        <at-button v-if="points.points" type="success" size="small" @click="createCirclePoints">Circle points</at-button>
                        <at-button v-if="points.points" type="error" size="small" @click="removePoints">Remove object</at-button>
                    </div>
                    <div v-if="points.points">
                        <at-checkbox v-model="show.points" label="Shenzhen">Show</at-checkbox>
                        <at-checkbox v-model="points.minHConsider" label="Shenzhen">Min h</at-checkbox>
                        <p>Step points: {{ points.points.minStep }}</p>
                        <input-float-type v-model="points.points.minStep"></input-float-type>
                        <div class="btn-group">
                            <at-button type="primary" size="small" @click="addPointsToRoot">Add points to root</at-button>
                            <at-button type="error" size="small" @click="clearPoints">Clear points</at-button>
                        </div>
                        <div class="rowFlex">
                            <div class="row-fix-width">
                                <p>x</p>
                                <p v-for="item in points.points.x">{{ item.toFixed(2) }}</p>
                            </div>
                            <div class="row-fix-width">
                                <p>y</p>
                                <p v-for="item in points.points.y">{{ item.toFixed(2) }}</p>
                            </div>
                            <div class="row-fix-width">
                                <p>h</p>
                                <p v-for="item in points.points.h">{{ item.toFixed(2) }}</p>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <h3>Function</h3>
                    <at-checkbox v-model="show.fun" label="Shenzhen">Show</at-checkbox>
                    <hr>
                    <h3>Spline</h3>
                    <at-checkbox v-model="show.spline" v-if="spline.spline" label="Shenzhen" :disabled="!spline.isActive">Show</at-checkbox>

                    <div v-if="spline.spline" class="btn-group">
                        <at-button type="primary" size="small" @click="setSplineCircle">Update spline</at-button>
                        <at-button type="primary" size="small" @click="setPointsToRootFromSpline" :disabled="!spline.isActive">Add points to root from spline</at-button>
                        <at-button type="primary" size="small" @click="addSplineToRoot" :disabled="!spline.isActive">Add spline to root</at-button>
                        <at-button type="error" size="small" @click="removeSpline">Remove spline</at-button>
                    </div>
                    <div v-if="!spline.spline" class="btn-group">
                        <at-button type="primary" size="small" @click="createSpline">Create spline</at-button>
                    </div>
                    <hr>
                    <h3>Newton</h3>
                    <at-checkbox v-model="show.polynom" label="Shenzhen" :disabled="!polynom.isActive">Show</at-checkbox>
                    <div class="btn-group">
                        <at-button type="primary" size="small" @click="setPNewton">Update polynom</at-button>
                    </div>
                    <h3>Default</h3>
                    <p>h:
                        <i @click="hToRoot--" class="icon icon-minus"></i>
                        {{ hToRoot }}
                        <i @click="hToRoot++" class="icon icon-plus"></i>
                    </p>
                    <input-float-type v-model="hToRoot"></input-float-type>

                    <p>n:
                        <i @click="nToRoot--" class="icon icon-minus"></i>
                        {{ nToRoot }}
                        <i @click="nToRoot++" class="icon icon-plus"></i>
                    </p>
                    <input-float-type v-model="nToRoot"></input-float-type>
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
    import RootPoints from "./RootData";

    import * as AT2D from './../consts/view/AffineTransform2D';

    import tMatrix from './../classes/nm/tMatrix';

    import Points from './../classes/view/Points';
    import Spline from './../classes/nm/Spline';
    import pNewton from './../classes/nm/pNewton';


    import Camera2D from './../classes/view/Camera2D';

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
                    points: false,
                    polynom: false
                },

                hToRoot: 0.1,
                nToRoot: 30,
                points: {
                    isActive: false,
                    points: null,

                    minHConsider: false,
                },
                spline: {
                    isActive: false,
                    spline: null,
                    splineSecond: null,

                    xLeft: null,
                    xRight: null
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
             * Open/Close nav by click
             *
             * Status: Done
             */
            clickOpenNav: function () {
                this.openNav = !this.openNav;
            },

            /**
             * Route to scene 3D
             *
             * Status: Done
             */
            clickScene3D: function () {
                this.$router.push({ name: 'scene3d' });
            },

            /**
             * Choise navigation canvas
             *
             * Status: Done
             */
            choiseNav: function(title){
                let nav = this.nav;
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
                let tabs = this.tabs;
                for (let item in tabs) {
                    if (this.tabs[`${item}`].title === title) {
                        this.tabs[`${item}`].status = true;
                    } else {
                        this.tabs[`${item}`].status = false;
                    }
                }
            },

            /**
             * Load
             *
             * Status: Done
             */
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
                        this.points.points.applyAT2D( AT2D.rotationDeg(Math.PI / 18) ); break;
                    }
                    case 87: {
                        this.points.points.applyAT2D( AT2D.scaling(1.1, 1.1) ); break;
                    }
                    case 81: {
                        this.points.points.applyAT2D( AT2D.scaling(0.9, 0.9) ); break;
                    }
                    case 37: {
                        this.points.points.applyAT2D( AT2D.translation(-0.5,0) ); break;
                    }
                    case 38: {
                        this.points.points.applyAT2D( AT2D.translation(0,0.5) ); break;
                    }
                    case 39: {
                        this.points.points.applyAT2D( AT2D.translation(0.5, 0) ); break;
                    }
                    case 40: {
                        this.points.points.applyAT2D( AT2D.translation(0, -0.5) ); break;
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
                this.plotPoints();
                this.plotSpline();
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
                this.points.points.clear();

                this.points.points.combo = true;

                this.spline.isActive = false;
                this.polynom.isActive = false;
                this.show.spline = false;
                this.show.polynom = false;

                this.points.points.addPoint(
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
                if (!this.points.points.combo) {
                    return;
                }
                if (this.points.minHConsider) {
                    if (this.points.points.x[this.points.points.x.length-1] + this.points.points.minH > this.camera2D.ScreenToWorldX(e.clientX) ) {
                        return;
                    }
                }

                this.points.points.addPoint(
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
                this.points.points.combo = false;

                // if ((this.spline.isActive)&&(this.show.spline)) {
                //     this.setSpline();
                // }

                // if ((this.polynom.isActive)&&(this.show.polynom)) {
                //     this.setPNewton();
                // }
            },

            /**
             * Add point for nav
             *
             * Status: Optional
             */
            addPoint: function (e) {
                if (this.points.minHConsider) {
                    if (this.points.points.x[this.points.points.x.length-1] + this.points.points.minH > this.camera2D.ScreenToWorldX(e.clientX) ) {
                        return;
                    }
                }

                this.points.points.addPoint(
                    this.camera2D.ScreenToWorldX(e.clientX),
                    this.camera2D.ScreenToWorldY(e.clientY)
                );

                // if ((this.spline.isActive)&&(this.show.spline)) {
                //     this.setSpline();
                // }

                // if ((this.polynom.isActive)&&(this.show.polynom)) {
                //     this.setPNewton();
                // }
            },





            createPoints: function () {
                this.points.points = new Points(
                    [1,2,3,4],
                    [1,0,1,0],
                    [0,0,0,0]
                );
                this.show.points = true;
            },

            createCirclePoints: function () {
                let p = new Points(
                    [this.hToRoot],
                    [0],
                    [0]
                );

                this.points.points = new Points(
                    [this.hToRoot],
                    [0],
                    [0]
                );

                for (let i = 0; i < this.nToRoot; i++) {
                    setTimeout(()=>{
                        p.applyAT2D( AT2D.rotationDeg(- Math.PI * 2 / this.nToRoot) );
                        this.points.points.addPoint(p.x[0], p.y[0]);
                    }, 2000*i/this.nToRoot);

                }
            },

            removePoints: function () {
                this.show.points = false;
                this.points.isActive = false;
                this.points.points = null;
            },


            clearPoints: function () {
                this.points.points.clear();
            },



            plotPoints: function () {
                if (!this.show.points) {
                    return;
                }

                let ctx = this.canvas.getContext("2d");
                ctx.beginPath();
                ctx.strokeStyle = '#107e00';

                ctx.setLineDash([]);
                ctx.lineWidth = 3;


                var s = Math.abs(
                    this.camera2D.ScreenToWorldY(0) -
                    this.camera2D.ScreenToWorldY(this.camera2D.grid.serifsSize)
                );

                for (var i = 0; i < this.points.points.x.length; i++) {

                    this.camera2D.moveTo(this.points.points.x[i]+(s/2), this.points.points.y[i]-(s/2));
                    this.camera2D.lineTo(this.points.points.x[i]-(s/2), this.points.points.y[i]+(s/2));


                    this.camera2D.moveTo(this.points.points.x[i]+(s/2), this.points.points.y[i]+(s/2));
                    this.camera2D.lineTo(this.points.points.x[i]-(s/2), this.points.points.y[i]-(s/2));

                }

                ctx.stroke();
            },





            /**
             * Add points to root from this.points (adding scene)
             */
            addPointsToRoot: function () {
                let points = new Points();
                points.copy(this.points.points);
                this.$root.points.push(points);
            },

            addSplineToRoot: function () {

                this.$root.spline.push(this.spline.spline);

                this.show.spline = false;

                this.spline = {
                    isActive: false,
                    spline: null,
                    splineSecond: null,

                    xLeft: null,
                    xRight: null
                };
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













            /**
             * SPLINE
             */
            createSpline: function () {
                this.spline.spline = new Spline();
            },

            removeSpline: function () {
                this.spline.spline = null;
                this.show.spline = false;
                this.spline.isActive = false;
            },

            setSpline: function () {
                if (this.points.points.x.length < 3) {
                    return;
                }

                this.spline.spline = new Spline();

                this.spline.spline.setXFX({
                    x: this.points.points.x,
                    fx: this.points.points.y,
                    h: this.points.points.h
                });

                this.spline.spline.setCoeffC();

                var matr = new tMatrix();
                matr.setABCF(this.spline.spline.getCoeffC());
                matr.solveX();


                this.spline.spline.setCoeffSpline(matr.getX());
                this.spline.isActive = true;

            },

            /**
             * Add points to root from this.points (adding scene)
             */
            setPointsToRootFromSpline: function (step = false) {
                let pointsToRoot = new Points();

                let splineRight = this.spline.spline.x[this.spline.spline.x.length-1];

                let stepS = this.hToRoot;

                if (step) {
                    stepS = (splineRight - this.spline.xLeft)/this.nToRoot;

                    if (this.spline.splineSecond) {
                        stepS *= 2;
                    }
                }

                for (let i = this.spline.xLeft; i < splineRight; i += stepS) {
                    pointsToRoot.addPoint(i, this.spline.spline.pointSpline(i));
                }

                if (this.spline.splineSecond) {
                    for (let i = this.spline.xRight; i >= this.spline.xLeft; i -= stepS) {
                        pointsToRoot.addPoint(i, this.spline.splineSecond.pointSpline(i));
                    }
                }

                this.$root.points.push(pointsToRoot);
            },

            setSplineCircle: function () {
                if (this.points.points.x.length < 3) {
                    return;
                }

                let points1 = new Points();
                let points2 = new Points();

                let tBack = false;

                points1.addPoint(
                    this.points.points.x[0],
                    this.points.points.y[0]
                );

                this.spline.xLeft = this.points.points.x[0];

                for (let i = 1; i < this.points.points.x.length; i++) {

                    if (this.points.points.x[i] < this.spline.xLeft) {
                        break;
                    }

                    if (!tBack) {
                        points1.addPoint(
                            this.points.points.x[i],
                            this.points.points.y[i]
                        );
                    } else {
                        points2.unshiftPoint(
                            this.points.points.x[i],
                            this.points.points.y[i]
                        );
                    }

                    if (this.points.points.x[i+1] && !tBack) {
                        if (this.points.points.x[i+1] < this.points.points.x[i]) {
                            tBack = true;
                            this.spline.xRight = this.points.points.x[i];
                            points2.unshiftPoint(
                                this.points.points.x[i],
                                this.points.points.y[i]
                            );
                        }
                    }
                }


                console.log(points1, points2);


                this.spline.spline = new Spline();

                if (tBack) {
                    this.spline.spline.degStart = 0;
                    this.spline.spline.degFinish = - Math.PI/2;
                }

                this.spline.spline.setXFX({
                    x: points1.x,
                    fx: points1.y,
                    h: points1.h
                });

                this.spline.spline.setCoeffC();

                let matr = new tMatrix();
                matr.setABCF(this.spline.spline.getCoeffC());
                matr.solveX();

                this.spline.spline.setCoeffSpline(matr.getX());


                /**
                 * second spline
                 */

                if (tBack) {
                    points2.unshiftPoint(
                        this.points.points.x[0],
                        this.points.points.y[0]
                    );

                    this.spline.splineSecond = new Spline();
                    this.spline.splineSecond.degStart = 0;
                    this.spline.splineSecond.degFinish = Math.PI/2;

                    this.spline.splineSecond.setXFX({
                        x: points2.x,
                        fx: points2.y,
                        h: points2.h
                    });

                    this.spline.splineSecond.setCoeffC();

                    matr = new tMatrix();
                    matr.setABCF(this.spline.splineSecond.getCoeffC());
                    matr.solveX();


                    this.spline.splineSecond.setCoeffSpline(matr.getX());
                }

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

                    if (this.spline.splineSecond) {
                        let start = this.spline.splineSecond.getStart();
                        let finish = this.spline.splineSecond.getFinish();

                        if (this.camera2D.ScreenToWorldX(0) > start) {
                            start = this.camera2D.ScreenToWorldX(0);
                        }
                        if (this.camera2D.ScreenToWorldX(this.canvasWidth) < finish) {
                            finish = this.camera2D.ScreenToWorldX(this.canvasWidth);
                        }

                        this.camera2D.moveTo(start,this.secSpline(start));
                        for (var i = start; i < finish; i += 0.01)
                        {
                            this.camera2D.lineTo(i, this.secSpline(i));
                        }
                    }



                    ctx.stroke();
                }
            },

            mainSpline: function (x) {
                return this.spline.spline.pointSpline(x);
            },
            secSpline: function (x) {
                return this.spline.splineSecond.pointSpline(x);
            },

















            /**
             * POLYNOM NEWTON
             */
            setPNewton: function () {
                if (this.points.points.x.length < 3) {
                    return;
                }

                this.polynom.polynom = new pNewton([this.points.points.x, this.points.points.y]);
                this.polynom.isActive = true;

            },

            plotPNewton: function () {
                if (!this.polynom.isActive) {
                    return;
                }

                if (!this.show.polynom) {
                    return
                }
                let ctx = this.canvas.getContext("2d");
                ctx.beginPath();
                ctx.strokeStyle = '#aa7000';

                ctx.setLineDash([]);
                ctx.lineWidth = 2;

                let start = this.points.points.x[0];
                let finish = this.points.points.x[this.points.points.x.length-1];

                if (this.camera2D.ScreenToWorldX(0) > start) {
                    start = this.camera2D.ScreenToWorldX(0);
                }
                if (this.camera2D.ScreenToWorldX(this.canvasWidth) < finish) {
                    finish = this.camera2D.ScreenToWorldX(this.canvasWidth);
                }

                this.camera2D.moveTo(start,this.polynom.polynom.pointPolynom(start));
                for (let i = start; i < finish; i += 0.01)
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
