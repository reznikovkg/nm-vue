<template>
    <div class="component-scene-2d">
        <div class="scena-2d" @scroll="scrollSize">
            <canvas id="canvas-scene" :width="canvasWidth" :height="canvasHeight"
                @wheel="scrollSize"
                @mousedown="cameraDragStart"
                @mousemove="cameraDrag"
                @mouseup="cameraDragStop"
            ></canvas>
        </div>
        <nav-scene2-d></nav-scene2-d>
    </div>
</template>

<script>
    import NavScene2D from '../components/Elements/NavScene2D'

    export default {
        name: "Scena2D",
        data () {
            return {
                canvasWidth: 1920,
                canvasHeight: 1080,

                camera: {
                    drag: {
                        status: false,
                        x: null,
                        y: null
                    },
                    center: {
                        x: 200,
                        y: 200
                    },
                    mas: {
                        px: 50,
                        py: 50
                    }
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
            this.plotFunc();
        },
        methods: {
            cameraDragStart: function (e) {
                this.camera.drag.status = true;
                this.camera.drag.x = e.clientX - this.camera.center.x;
                this.camera.drag.y = e.clientY - this.camera.center.y;
            },
            cameraDrag: function (e) {
                if (this.camera.drag.status) {
                    this.camera.center.x = e.clientX - this.camera.drag.x;
                    this.camera.center.y = e.clientY - this.camera.drag.y;
                    this.plotFunc();
                }
            },
            cameraDragStop: function () {
                this.camera.drag.status = false;
            },
            clear: function () {
                this.canvas.getContext("2d").clearRect(0,0,this.canvasWidth,this.canvasHeight);
            },
            axis: function () {
                var ctx = this.canvas.getContext("2d");
                ctx.beginPath();
                ctx.moveTo(this.camera.center.x, 0);
                ctx.lineTo(this.camera.center.x, this.canvasHeight);
                ctx.moveTo(0, this.camera.center.y);
                ctx.lineTo(this.canvasWidth, this.camera.center.y);
                ctx.stroke();
            },
            WorldToScreenX: function (x) {
                return Math.round((this.camera.center.x + this.camera.mas.px*x));
            },
            WorldToScreenY: function (y) {
                return Math.round((this.camera.center.y - this.camera.mas.py*y));
            },
            ScreenToWorldX: function (x) {
                return (x - this.camera.center.x + 0.5) / this.camera.mas.px;
            },
            ScreenToWorldY: function (y) {
                return -( y - this.camera.center.y + 0.5) / this.camera.mas.py;
            },



            moveTo: function (t, x, y) {
                t.moveTo(this.WorldToScreenX(x), this.WorldToScreenY(y));
            },
            lineTo: function (t, x, y) {
                t.lineTo(this.WorldToScreenX(x), this.WorldToScreenY(y));
            },

            plotFunc: function () {
                this.clear();
                this.axis();

                var ctx = this.canvas.getContext("2d");
                ctx.beginPath();

                this.moveTo(ctx, 0,0);

                for (var i=0;i<100;i+=0.01)
                {
                    this.lineTo(ctx, i, this.mainFunction(i));
                }

                ctx.stroke();

            },
            mainFunction: function (x) {
                return Math.sin(x);
            },
            scrollSize: function (e) {
                var k = 1;
                if (e.deltaY < 0) { k = 1.1; } else { k = 0.9; }

                if ((this.camera.mas.px * k > 10) && (this.camera.mas.py * k > 10)) {
                    this.camera.mas.px *= k;
                    this.camera.mas.py *= k;

                    this.camera.center.x -= (k-1)*this.camera.mas.px*this.ScreenToWorldX(e.clientX);
                    this.camera.center.y += (k-1)*this.camera.mas.py*this.ScreenToWorldY(e.clientY);
                }

                this.plotFunc();
            }
        },
    }
</script>

<style lang="less">
    .component-scene-2d {
        & .scena-2d {
            position: absolute;
            top: 0;
            left: 0;
            right: 300px;
            & #canvas-scene {
                width: 100%;
            }

        }
    }
</style>
