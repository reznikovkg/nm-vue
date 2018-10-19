<template>
    <div class="component-scene-2d">
        <div class="scena-2d">
            <canvas id="canvas-scene" :width="canvasWidth" :height="canvasHeight"
                @wheel="wheelSize"
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
                            <at-checkbox v-model="grid.axiss" label="Shenzhen">Axis</at-checkbox>
                        </div>
                        <div class="row no-gutter">
                            <at-checkbox v-model="grid.grid" label="Shenzhen">Grid</at-checkbox>
                        </div>
                        <div class="row no-gutter">
                            <at-checkbox v-model="grid.serifs" label="Shenzhen">Serifs</at-checkbox>
                        </div>
                        <p>Step serifs: <i @click="grid.serifsStep--" class="icon icon-minus"></i> {{ grid.serifsStep }} <i @click="grid.serifsStep++" class="icon icon-plus"></i></p>
                        <at-slider v-model="grid.serifsStep" :step="1" :min="1" :max="1000"></at-slider>
                        <p>Size serifs: <i @click="grid.serifsSize--" class="icon icon-minus"></i> {{ grid.serifsSize }} <i @click="grid.serifsSize++" class="icon icon-plus"></i></p>
                        <at-slider v-model="grid.serifsSize" :step="1" :min="2" :max="100"></at-slider>
                    </div>
                </at-tab-pane>
                <at-tab-pane label="Plot" name="plot">
                    <div class="tab-pad">
                        <h3>Function</h3>
                        <div class="row no-gutter">
                            <at-checkbox v-model="plot.fun" label="Shenzhen">Show</at-checkbox>
                        </div>
                        <h3>Spline</h3>
                        <div class="row no-gutter">
                            <at-checkbox v-model="plot.spline" label="Shenzhen" :disabled="!spline.isActive">Show</at-checkbox>
                        </div>
                        <div class="row no-gutter">
                            <at-button type="primary" @click="setSpline">Update spline</at-button>
                        </div>
                        <h3>Newton</h3>
                        <div class="row no-gutter">
                            <at-checkbox v-model="plot.polynom" label="Shenzhen" :disabled="!polynom.isActive">Show</at-checkbox>
                        </div>
                        <div class="row no-gutter">
                            <at-button type="primary" @click="setPNewton">Update polynom</at-button>
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
                                <p>fx</p>
                                <p v-for="item in points.fx">{{ item }}</p>
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
        name: "Scena2D",
        data () {
            return {
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
                canvasWidth: document.body.clientWidth,
                canvasHeight: document.body.clientHeight,

                openNav: false,
                camera: {
                    drag: {
                        status: false,
                        x: null,
                        y: null
                    },
                    center: {
                        x: document.body.clientWidth/2,
                        y: document.body.clientHeight/2
                    },
                    mas: {
                        px: 50,
                        py: 50
                    }
                },
                grid: {
                    axiss: true,
                    grid: true,
                    serifs: true,
                    serifsStep: 10.0,
                    serifsSize: 30

                },
                plot: {
                    fun: false,
                    spline: false,
                    points: true,
                    polynom: false
                },
                spline: {
                    isActive: false
                },
                points: {
                    combo: false,
                    minStep: 1,
                    x: [1,2,3,4],
                    fx: [1,0,1,0],
                    h: [1,1,1]
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

            this.reBuild();

        },
        methods: {
            choiseNav: function(title){
                var nav = this.nav;
                for (var item in nav) {
                    if (this.nav[`${item}`].title === title) {
                        this.nav[`${item}`].status = true;
                    } else {
                        this.nav[`${item}`].status = false
                    }
                }

            },
            canvasMouseDown: function (e) {
                if (this.nav.moveCenter.status) {
                    this.cameraDragStart(e);
                }

                if (this.nav.addPoint.status) {
                    this.addPoint(e);
                }

                if (this.nav.addComboPoints.status) {
                    this.addComboPointsStart(e);
                }
            },
            canvasMouseDrag: function (e) {
                if (this.nav.moveCenter.status) {
                    this.cameraDrag(e);
                }

                if (this.nav.addComboPoints.status) {
                    this.addComboPointsDrag(e);
                }
            },
            canvasMouseUp: function (e) {
                if (this.nav.moveCenter.status) {
                    this.cameraDragStop();
                }

                if (this.nav.addComboPoints.status) {
                    this.addComboPointsStop();
                }
            },
            addComboPointsStart: function (e) {
                this.points.x = [];
                this.points.fx = [];
                this.points.h = [];

                this.points.combo = true;

                this.spline.isActive = false;
                this.polynom.isActive = false;
                this.plot.spline = false;
                this.plot.polynom = false;


                this.points.x.push(this.ScreenToWorldX(e.clientX));
                this.points.fx.push(this.ScreenToWorldY(e.clientY));
            },
            addComboPointsDrag: function (e) {
                if (!this.points.combo) {
                    return;
                }
                if (this.points.x[this.points.x.length-1] + this.points.minStep > this.ScreenToWorldX(e.clientX) ) {
                    return;
                }

                this.points.x.push(this.ScreenToWorldX(e.clientX));
                this.points.fx.push(this.ScreenToWorldY(e.clientY));
                this.points.h.push(this.points.x[this.points.x.length-1]-this.points.x[this.points.x.length-2]);

            },
            addComboPointsStop: function () {
                this.points.combo = false;

                if ((this.spline.isActive)&&(this.plot.spline)) {
                    this.setSpline();
                }

                if ((this.polynom.isActive)&&(this.plot.polynom)) {
                    this.setPNewton();
                }
            },

            reBuild: function () {
                this.clear();
                this.axisPlot();
                this.plotFun();
                this.plotSpline();
                this.plotPoints();
                this.plotPNewton();
            },
            /**
             * Start grag
             * Status: done
             * @param e
             */
            cameraDragStart: function (e) {
                this.camera.drag.status = true;
                this.camera.drag.x = e.clientX - this.camera.center.x;
                this.camera.drag.y = e.clientY - this.camera.center.y;
            },
            /**
             * Drag
             * Status: done
             * @param e
             */
            cameraDrag: function (e) {
                if (this.nav.moveCenter.status) {
                    if (this.camera.drag.status) {
                        this.camera.center.x = e.clientX - this.camera.drag.x;
                        this.camera.center.y = e.clientY - this.camera.drag.y;
                    }
                }
            },
            /**
             * Stop grad
             * Status: done
             */
            cameraDragStop: function () {
                this.camera.drag.status = false;
            },
            /**
             * Wheel window scene
             * Status: done
             */
            wheelSize: function (e) {
                var k = 1;
                if (e.deltaY < 0) { k = 1.1; } else { k = 0.9; }


                if ((this.camera.mas.px * k > 0) && (this.camera.mas.py * k > 0)) {
                    this.camera.mas.px *= k;
                    this.camera.mas.py *= k;

                    this.camera.center.x -= (k-1)*this.camera.mas.px*this.ScreenToWorldX(e.clientX);
                    this.camera.center.y += (k-1)*this.camera.mas.py*this.ScreenToWorldY(e.clientY);
                }

            },
            /**
             * Clear scene
             * Status: done
             */
            clear: function () {
                this.canvas.getContext("2d").clearRect(0,0,this.canvasWidth,this.canvasHeight);
            },
            /**
             * World x coord to screen
             * Status: done
             */
            WorldToScreenX: function (x) {
                return Math.round((this.camera.center.x + this.camera.mas.px*x));
            },
            /**
             * World y coord to screen
             * Status: done
             */
            WorldToScreenY: function (y) {
                return Math.round((this.camera.center.y - this.camera.mas.py*y));
            },
            /**
             * Screen x coord to world
             * Status: done
             */
            ScreenToWorldX: function (x) {
                return (x - this.camera.center.x + 0.5) / this.camera.mas.px;
            },
            /**
             * Screen y coord to world
             * Status: done
             */
            ScreenToWorldY: function (y) {
                return -( y - this.camera.center.y + 0.5) / this.camera.mas.py;
            },
            /**
             * MoveTo for world coords
             * Status: done
             */
            moveTo: function (t, x, y) {
                t.moveTo(this.WorldToScreenX(x), this.WorldToScreenY(y));
            },
            /**
             * LineTo for world coords
             * Status: done
             */
            lineTo: function (t, x, y) {
                t.lineTo(this.WorldToScreenX(x), this.WorldToScreenY(y));
            },












            /**
             * Plot axis on scene
             * Status: process
             */
            axisPlot: function () {
                var ctx = this.canvas.getContext("2d");

                /**
                 * Grid grid
                 */
                if (this.grid.grid) {
                    ctx.beginPath();
                    ctx.font = 'italic 18pt Calibri';
                    ctx.strokeStyle = '#979797';
                    ctx.lineWidth = 1;
                    ctx.setLineDash([10, 15]);
                    for (var i = 30; i < this.canvasHeight; i+= 100) {
                        ctx.fillText(Math.ceil(this.ScreenToWorldY(i)*1000)/1000, 0, i);
                        ctx.moveTo(0, i);
                        ctx.lineTo(this.canvasWidth, i);
                    }
                    for (var i = 100; i < this.canvasWidth; i+= 100) {
                        ctx.fillText(Math.ceil(this.ScreenToWorldX(i)*1000)/1000, i, this.canvasHeight);
                        ctx.moveTo(i, 0);
                        ctx.lineTo(i, this.canvasHeight);
                    }
                    ctx.stroke();
                }


                /**
                 * Grid axiss
                 */
                if (this.grid.axiss) {
                    ctx.beginPath();
                    ctx.strokeStyle = '#000000';
                    ctx.lineWidth = 2;
                    ctx.setLineDash([]);

                    ctx.moveTo(this.camera.center.x, 0);
                    ctx.lineTo(this.camera.center.x, this.canvasHeight);

                    ctx.moveTo(0, this.camera.center.y);
                    ctx.lineTo(this.canvasWidth, this.camera.center.y);

                    ctx.stroke();
                }


                if (this.grid.serifs) {
                    ctx.beginPath();
                    ctx.strokeStyle = '#000000';
                    ctx.lineWidth = 2;
                    ctx.setLineDash([]);

                    var start = 0;
                    if (!this.grid.serifsStep){
                        return;
                    }

                    var s = Math.abs(
                        this.ScreenToWorldY(0) -
                        this.ScreenToWorldY(this.grid.serifsSize)
                    );

                    /**
                     * To right & to left
                     */
                    if ((this.camera.center.y > 0) && (this.camera.center.y < this.canvasHeight)) {

                        var finish = this.ScreenToWorldX(this.canvasWidth);

                        for (var i = start; i < finish; i+=this.grid.serifsStep) {
                            this.moveTo(ctx, i+this.grid.serifsStep/2,(s/2));
                            this.lineTo(ctx, i+this.grid.serifsStep/2,-(s/2));
                            ctx.fillText(i+this.grid.serifsStep/2, this.WorldToScreenX(i+this.grid.serifsStep/2), this.WorldToScreenY(s/2));

                            this.moveTo(ctx, i+this.grid.serifsStep,s);
                            this.lineTo(ctx, i+this.grid.serifsStep,-s);
                            ctx.fillText(i+this.grid.serifsStep, this.WorldToScreenX(i+this.grid.serifsStep), this.WorldToScreenY(s));
                        }

                        finish = this.ScreenToWorldX(0);

                        for (var i = start; i > finish; i-=this.grid.serifsStep) {
                            this.moveTo(ctx, i-this.grid.serifsStep/2,(s/2));
                            this.lineTo(ctx, i-this.grid.serifsStep/2,-(s/2));
                            ctx.fillText(i-this.grid.serifsStep/2, this.WorldToScreenX(i-this.grid.serifsStep/2), this.WorldToScreenY(s/2));

                            this.moveTo(ctx, i-this.grid.serifsStep,s);
                            this.lineTo(ctx, i-this.grid.serifsStep,-s);
                            ctx.fillText(i-this.grid.serifsStep, this.WorldToScreenX(i-this.grid.serifsStep), this.WorldToScreenY(s));
                        }
                    }

                    /**
                     * To top & to bot
                     */
                    if ((this.camera.center.x > 0) && (this.camera.center.x < this.canvasWidth)) {

                        start = 0;
                        finish = this.ScreenToWorldY(0);

                        for (var i = start; i < finish; i+=this.grid.serifsStep) {
                            this.moveTo(ctx, (s/2),i+this.grid.serifsStep/2);
                            this.lineTo(ctx, -(s/2),i+this.grid.serifsStep/2);
                            ctx.fillText(i+this.grid.serifsStep/2, this.WorldToScreenX(s/2), this.WorldToScreenY(i+this.grid.serifsStep/2));

                            this.moveTo(ctx, s, i+this.grid.serifsStep);
                            this.lineTo(ctx, -s, i+this.grid.serifsStep);
                            ctx.fillText(i+this.grid.serifsStep, this.WorldToScreenX(s), this.WorldToScreenY(i+this.grid.serifsStep));
                        }

                        finish = this.ScreenToWorldY(this.canvasHeight);

                        for (var i = start; i > finish-this.grid.serifsStep; i-=this.grid.serifsStep) {
                            this.moveTo(ctx, (s/2),i+this.grid.serifsStep/2);
                            this.lineTo(ctx, -(s/2),i+this.grid.serifsStep/2);
                            ctx.fillText(i+this.grid.serifsStep/2, this.WorldToScreenX(s/2), this.WorldToScreenY(i+this.grid.serifsStep/2));

                            this.moveTo(ctx, s, i+this.grid.serifsStep);
                            this.lineTo(ctx, -s, i+this.grid.serifsStep);
                            ctx.fillText(i+this.grid.serifsStep, this.WorldToScreenX(s), this.WorldToScreenY(i+this.grid.serifsStep));
                        }
                    }
                    ctx.stroke();
                }

            },

            /**
             * Plot function on scene
             */
            plotFun: function () {
                if (this.plot.fun) {
                    var ctx = this.canvas.getContext("2d");
                    ctx.beginPath();
                    ctx.strokeStyle = '#2600ff';

                    ctx.setLineDash([]);
                    ctx.lineWidth = 2;

                    var start = 0;
                    var finish = 30;

                    if (this.ScreenToWorldX(0) > start) {
                        start = this.ScreenToWorldX(0);
                    }
                    if (this.ScreenToWorldX(this.canvasWidth) < finish) {
                        finish = this.ScreenToWorldX(this.canvasWidth);
                    }

                    this.moveTo(ctx, start,this.mainFunction(start));
                    for (var i = start; i < finish; i += 0.01)
                    {

                        this.lineTo(ctx, i, this.mainFunction(i));
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
                this.$store.commit('spline/setXFX', {
                    x: this.points.x,
                    fx: this.points.fx,
                    h: this.points.h
                });
                this.$store.commit('spline/setCoeffC');



                this.$store.commit('tMatrix/setABCF', this.$store.getters['spline/getCoeffC']);

                this.$store.commit('tMatrix/solveX');
                this.$store.commit('spline/setCoeffSpline', this.$store.getters['tMatrix/getX']);
                this.spline.isActive = true;

            },
            plotSpline: function (x) {
                if (!this.spline.isActive) {
                    return;
                }
                if (this.plot.spline) {
                    var ctx = this.canvas.getContext("2d");
                    ctx.beginPath();
                    ctx.strokeStyle = '#ff0012';

                    ctx.setLineDash([]);
                    ctx.lineWidth = 2;

                    var start = this.$store.getters['spline/getStart'];
                    var finish = this.$store.getters['spline/getFinish'];

                    if (this.ScreenToWorldX(0) > start) {
                        start = this.ScreenToWorldX(0);
                    }
                    if (this.ScreenToWorldX(this.canvasWidth) < finish) {
                        finish = this.ScreenToWorldX(this.canvasWidth);
                    }

                    this.moveTo(ctx, start,this.mainSpline(start));
                    for (var i = start; i < finish; i += 0.01)
                    {
                        this.lineTo(ctx, i, this.mainSpline(i));
                    }

                    ctx.stroke();
                }
            },
            mainSpline: function (x) {
                return this.$store.getters['spline/pointSpline'](x);
            },


            clearPoints: function () {
                this.plot.spline = false;
                this.spline.isActive = false;

                this.points.x = [];
                this.points.fx = [];
                this.points.h = [];

            },
            addPoint: function (e) {
                if (this.points.x[this.points.x.length-1] + this.points.minStep > this.ScreenToWorldX(e.clientX) ) {
                    return;
                }
                this.points.x.push(this.ScreenToWorldX(e.clientX));
                this.points.fx.push(this.ScreenToWorldY(e.clientY));

                if (this.points.x.length > 1) {
                    this.points.h.push(this.points.x[this.points.x.length-1]-this.points.x[this.points.x.length-2]);
                }

                if ((this.spline.isActive)&&(this.plot.spline)) {
                    this.setSpline();
                }

                if ((this.polynom.isActive)&&(this.plot.polynom)) {
                    this.setPNewton();
                }
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


                var s = Math.abs(
                    this.ScreenToWorldY(0) -
                    this.ScreenToWorldY(this.grid.serifsSize)
                );

                for (var i = 0; i < this.points.x.length; i++) {

                    this.moveTo(ctx,this.points.x[i]+(s/2), this.points.fx[i]-(s/2));
                    this.lineTo(ctx,this.points.x[i]-(s/2), this.points.fx[i]+(s/2));


                    this.moveTo(ctx,this.points.x[i]+(s/2), this.points.fx[i]+(s/2));
                    this.lineTo(ctx,this.points.x[i]-(s/2), this.points.fx[i]-(s/2));

                }

                ctx.stroke();
            },





            setPNewton: function () {
                if (this.points.x.length < 3) {
                    return;
                }

                this.polynom.polynom = new pNewton([this.points.x, this.points.fx]);
                this.polynom.isActive = true;

            },

            plotPNewton: function () {
                if (!this.polynom.isActive) {
                    return;
                }

                if (!this.plot.polynom) {
                    return
                }
                var ctx = this.canvas.getContext("2d");
                ctx.beginPath();
                ctx.strokeStyle = '#aa7000';

                ctx.setLineDash([]);
                ctx.lineWidth = 2;

                var start = this.points.x[0];
                var finish = this.points.x[this.points.x.length-1];

                if (this.ScreenToWorldX(0) > start) {
                    start = this.ScreenToWorldX(0);
                }
                if (this.ScreenToWorldX(this.canvasWidth) < finish) {
                    finish = this.ScreenToWorldX(this.canvasWidth);
                }

                this.moveTo(ctx, start,this.polynom.polynom.pointPolynom(start));
                for (var i = start; i < finish; i += 0.01)
                {
                    this.lineTo(ctx, i, this.polynom.polynom.pointPolynom(i));
                }

                ctx.stroke();

            },







            clickOpenNav: function () {
                this.openNav = !this.openNav;
            },
        },
        watch: {
            camera: {
                handler: function () {
                    this.reBuild();
                },
                deep: true
            },
            grid: {
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
                    this.reBuild();
                },
                deep: true
            }
        }
    }
</script>

<style lang="less">
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
