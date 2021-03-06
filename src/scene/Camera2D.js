import typesOfScene from "./typesOfScene";
import { GPU } from 'gpu.js';

class Camera2D {

    constructor(canvas = null) {
        this.canvas = canvas;
        this.setSizeCanvas({
            width: 720,
            height: 360,
        });

        this.polygons = [];

        if (canvas) {
            this.ctx = this.canvas.getContext("2d");
        }

        this.center = {
            x: this.field.width/2,
            y: this.field.height/2
        };

        this.scale = {
            px: 10,
            py: 10
        };

        this.drag = {
            status: false,
            x: null,
            y: null
        };

        this.grid = {
            axiss: true,
            grid: true,
            serifs: true,
            serifsStep: 10.0,
            serifsSize: 30
        };
    }

    setCTX(ctx) {
        this.ctx = ctx;
    }

    setCanvas(canvas) {
        this.canvas = canvas;
    }

    /**
     * Clear scene
     * Status: done
     */
    clear() {
        this.canvas.getContext("2d").clearRect(0,0,this.field.width,this.field.height);
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.rect(0,0,this.field.width,this.field.height);
        this.ctx.fill();
    }

    /**
     * World x coord to screen
     * Status: done
     */
    WorldToScreenX(x) {
        return Math.round((this.center.x + this.scale.px*x));
    }

    /**
     * World y coord to screen
     * Status: done
     */
    WorldToScreenY(y) {
        return Math.round((this.center.y - this.scale.py*y));
    }

    /**
     * Screen x coord to world
     * Status: done
     */
    ScreenToWorldX(x) {
        return (x - this.center.x + 0.5) / this.scale.px;
    }

    /**
     * Screen y coord to world
     * Status: done
     */
    ScreenToWorldY(y) {
        return -( y - this.center.y + 0.5) / this.scale.py;
    }

    /**
     * MoveTo for world coords
     * Status: done
     */
    moveTo(x, y) {
        this.ctx.moveTo(this.WorldToScreenX(x), this.WorldToScreenY(y));
    }

    /**
     * LineTo for world coords
     * Status: done
     */
    lineTo(x, y) {
        this.ctx.lineTo(this.WorldToScreenX(x), this.WorldToScreenY(y));
    }

    /**
     * Start grag
     * Status: done
     * @param e
     */
    dragToStart(e) {
        this.drag.status = true;
        this.drag.x = e.clientX - this.center.x;
        this.drag.y = e.clientY - this.center.y;
    }

    /**
     * Drag
     * Status: done
     * @param e
     */
    dragTo(e) {
        if (this.drag.status) {
            this.center.x = e.clientX - this.drag.x;
            this.center.y = e.clientY - this.drag.y;
        }
    }

    /**
     * Stop grad
     * Status: done
     */
    dragToStop() {
        this.drag.status = false;
    }

    /**
     * Wheel window scene
     * Status: done
     */
    wheelSize(e) {
        let k = 1;
        if (e.deltaY < 0) { k = 1.1; } else { k = 0.9; }


        if ((this.scale.px * k > 0) && (this.scale.py * k > 0)) {
            this.scale.px *= k;
            this.scale.py *= k;

            this.center.x -= (k-1)*this.scale.px*this.ScreenToWorldX(e.clientX);
            this.center.y += (k-1)*this.scale.py*this.ScreenToWorldY(e.clientY);
        }
    }


    /**
     * Plot axis on scene
     * Status: process
     */
    axisPlot() {
        this.ctx = this.canvas.getContext("2d");

        /**
         * Grid grid
         */
        if (this.grid.grid) {
            this.ctx.beginPath();
            this.ctx.font = 'italic 18pt Calibri';
            this.ctx.strokeStyle = '#979797';
            this.ctx.lineWidth = 1;
            this.ctx.setLineDash([10, 15]);
            for (let i = 30; i < this.field.width; i+= 100) {
                this.ctx.fillText(Math.ceil(this.ScreenToWorldY(i)*1000)/1000, 0, i);
                this.ctx.moveTo(0, i);
                this.ctx.lineTo(this.field.width, i);
            }
            for (let i = 100; i < this.field.width; i+= 100) {
                this.ctx.fillText(Math.ceil(this.ScreenToWorldX(i)*1000)/1000, i, this.field.height);
                this.ctx.moveTo(i, 0);
                this.ctx.lineTo(i, this.field.height);
            }
            this.ctx.stroke();
            this.ctx.closePath();
        }


        /**
         * Grid axiss
         */
        if (this.grid.axiss) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = '#b10009';
            this.ctx.lineWidth = 2;
            this.ctx.setLineDash([]);

            this.ctx.moveTo(this.center.x, 0);
            this.ctx.lineTo(this.center.x, this.field.height);

            this.ctx.moveTo(0, this.center.y);
            this.ctx.lineTo(this.field.width, this.center.y);

            this.ctx.stroke();
            this.ctx.closePath();
        }


        if (this.grid.serifs) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = '#058600';
            this.ctx.fillStyle = '#888888'
            this.ctx.lineWidth = 2;
            this.ctx.setLineDash([]);

            let start = 0;
            if (!this.grid.serifsStep){
                return;
            }

            let s = Math.abs(
                this.ScreenToWorldY(0) -
                this.ScreenToWorldY(this.grid.serifsSize)
            );

            /**
             * To right & to left
             */
            if ((this.center.y > 0) && (this.center.y < this.field.height)) {

                let finish = this.ScreenToWorldX(this.field.width);

                for (let i = start; i < finish; i+=this.grid.serifsStep) {
                    this.moveTo(i+this.grid.serifsStep/2,(s/2));
                    this.lineTo(i+this.grid.serifsStep/2,-(s/2));
                    this.ctx.fillText(i+this.grid.serifsStep/2, this.WorldToScreenX(i+this.grid.serifsStep/2), this.WorldToScreenY(s/2));

                    this.moveTo(i+this.grid.serifsStep,s);
                    this.lineTo(i+this.grid.serifsStep,-s);
                    this.ctx.fillText(i+this.grid.serifsStep, this.WorldToScreenX(i+this.grid.serifsStep), this.WorldToScreenY(s));
                }

                finish = this.ScreenToWorldX(0);

                for (let i = start; i > finish; i-=this.grid.serifsStep) {
                    this.moveTo(i-this.grid.serifsStep/2,(s/2));
                    this.lineTo(i-this.grid.serifsStep/2,-(s/2));
                    this.ctx.fillText(i-this.grid.serifsStep/2, this.WorldToScreenX(i-this.grid.serifsStep/2), this.WorldToScreenY(s/2));

                    this.moveTo(i-this.grid.serifsStep,s);
                    this.lineTo(i-this.grid.serifsStep,-s);
                    this.ctx.fillText(i-this.grid.serifsStep, this.WorldToScreenX(i-this.grid.serifsStep), this.WorldToScreenY(s));
                }
            }

            /**
             * To top & to bot
             */
            if ((this.center.x > 0) && (this.center.x < this.field.width)) {

                start = 0;
                let finish = this.ScreenToWorldY(0);

                for (let i = start; i < finish; i+=this.grid.serifsStep) {
                    this.moveTo((s/2),i+this.grid.serifsStep/2);
                    this.lineTo(-(s/2),i+this.grid.serifsStep/2);
                    this.ctx.fillText(i+this.grid.serifsStep/2, this.WorldToScreenX(s/2), this.WorldToScreenY(i+this.grid.serifsStep/2));

                    this.moveTo(s, i+this.grid.serifsStep);
                    this.lineTo(-s, i+this.grid.serifsStep);
                    this.ctx.fillText(i+this.grid.serifsStep, this.WorldToScreenX(s), this.WorldToScreenY(i+this.grid.serifsStep));
                }

                finish = this.ScreenToWorldY(this.field.width);

                for (let i = start; i > finish-this.grid.serifsStep; i-=this.grid.serifsStep) {
                    this.moveTo((s/2),i+this.grid.serifsStep/2);
                    this.lineTo(-(s/2),i+this.grid.serifsStep/2);
                    this.ctx.fillText(i+this.grid.serifsStep/2, this.WorldToScreenX(s/2), this.WorldToScreenY(i+this.grid.serifsStep/2));

                    this.moveTo(s, i+this.grid.serifsStep);
                    this.lineTo( -s, i+this.grid.serifsStep);
                    this.ctx.fillText(i+this.grid.serifsStep, this.WorldToScreenX(s), this.WorldToScreenY(i+this.grid.serifsStep));
                }
            }
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }

    render(models = [], type = typesOfScene.SCENE_2D, lights = null) {
        this.polygons = [1];
        lights = models.find((item) => (item.code === "light" && item.show));
        for (let i = 0; i < models.length; i++) {
            if (models[i].type === type) models[i].render(this, lights);
        }
    }

    forceStopPath() {
        this.ctx.beginPath();
        this.ctx.moveTo(0,0)
        this.ctx.lineTo(1,0)
        this.ctx.lineTo(0,1)
        this.ctx.stroke();
        this.ctx.closePath();
    }

    reRender(models = []) {
        this.clear();
        this.axisPlot();
        this.render(models);
        this.forceStopPath();
    }

    setSizeCanvas(size = null) {
        if (size) {
            this.canvas.width = size.width;
            this.canvas.height = size.height;

            this.field = {
                width: size.width,
                height: size.height,
            };
        } else {
            this.canvas.width = document.body.clientWidth;
            this.canvas.height = document.body.clientHeight;

            this.field = {
                width: document.body.clientWidth,
                height: document.body.clientHeight,
            };
        }
    }

    getCoord(x,y) {
        return [this.WorldToScreenX(x), this.WorldToScreenY(y)];
    }
}


export default Camera2D;
