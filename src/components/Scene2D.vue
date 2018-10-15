<template>
    <div class="component-scene-2d">
        <div class="scena-2d">
            <canvas id="canvas-scene" :width="canvasWidth" :height="canvasHeight"
                @wheel="wheelSize"
                @mousedown="cameraDragStart"
                @mousemove="cameraDrag"
                @mouseup="cameraDragStop"
            ></canvas>
        </div>

        <div class="openNav">
            <at-button :type="openNavType" size="large" icon="icon-settings" circle @click="clickOpenNav"></at-button>
        </div>

        <nav-scene2-d :open="openNav"
            @navGridAxiss="navGridAxiss"
            @navGridGrid="navGridGrid"
        ></nav-scene2-d>


    </div>
</template>

<script>
    import NavScene2D from '../components/Elements/NavScene2D'

    export default {
        name: "Scena2D",
        data () {
            return {
                canvasWidth: document.body.clientWidth,
                canvasHeight: document.body.clientHeight,

                openNav: false,
                openNavType: 'primary',

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
                    value: true,
                }
            }
        },
        computed: {
            canvas: function () {
                return document.getElementById("canvas-scene");
            }
        },
        components: {
            NavScene2D
        },
        mounted: function () {
            this.clear();
            this.axisPlot();
            this.plotFunc();
        },
        methods: {
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
                if (this.camera.drag.status) {
                    this.camera.center.x = e.clientX - this.camera.drag.x;
                    this.camera.center.y = e.clientY - this.camera.drag.y;
                    this.plotFunc();
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
                console.log(1);
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



                if (this.grid.axiss) {
                    ctx.beginPath();
                    ctx.strokeStyle = '#000000';
                    ctx.lineWidth = 2;
                    ctx.setLineDash([]);

                    ctx.moveTo(this.camera.center.x, 0);
                    ctx.lineTo(this.camera.center.x, this.canvasHeight);
                    // for (var i = 30; i < this.canvasHeight; i+= 100) {
                    //     ctx.moveTo(0, i);
                    //     ctx.lineTo(this.canvasWidth, i);
                    // }

                    ctx.moveTo(0, this.camera.center.y);
                    ctx.lineTo(this.canvasWidth, this.camera.center.y);

                    ctx.stroke();
                }

            },

            /**
             * Plot function on scene
             */
            plotFunc: function () {
                var ctx = this.canvas.getContext("2d");
                ctx.beginPath();
                ctx.strokeStyle = '#2600ff';

                this.moveTo(ctx, 0,0);
                ctx.setLineDash([]);
                ctx.lineWidth = 2;

                var start = 0;
                var finish = 100;

                // if (this.ScreenToWorldX(0) < this.ScreenToWorldX(start)) {
                //     start = this.ScreenToWorldX(start);
                // }
                // if (this.ScreenToWorldX(this.canvasWidth) < this.ScreenToWorldX(finish)) {
                //     finish = this.ScreenToWorldX(finish);
                // }

                for (var i = start; i < finish; i += 0.01)
                {
                    this.lineTo(ctx, i, this.mainFunction(i));
                }

                ctx.stroke();
            },
            /**
             * Function
             * @param x
             * @returns {number}
             */
            mainFunction: function (x) {
                return Math.sin(x);
            },


            clickOpenNav: function () {
                this.openNav = !this.openNav;
            },





            navGridAxiss: function (e) {
                this.grid.axiss = e;
            },
            navGridGrid: function (e) {
                this.grid.grid = e;
            }

        },
        watch: {
            camera: {
                handler: function () {
                    this.clear();
                    this.axisPlot();
                    this.plotFunc();
                },
                deep: true
            },
            grid: {
                handler: function () {
                    this.clear();
                    this.axisPlot();
                    this.plotFunc();
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
</style>
