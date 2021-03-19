import {fKernel, initGPU} from "@/scene/fKernel";
import {getMatrixToTransformPoint2D} from "@/math/AnalitycGeometry";

import {defaultParamsCamera} from './../Camera3D'

function rayTracing() {
  this.isRender = true;

  setTimeout(() => {

    const gpu = initGPU();

    const matrixTransform = getMatrixToTransformPoint2D(
      defaultParamsCamera,
      this
    ).cells;

    const kernel = gpu.createKernel(fKernel)
      .setConstants({
        matrixTransform00: matrixTransform[0][0],
        matrixTransform10: matrixTransform[1][0],
        matrixTransform20: matrixTransform[2][0],

        matrixTransform01: matrixTransform[0][1],
        matrixTransform11: matrixTransform[1][1],
        matrixTransform21: matrixTransform[2][1],

        positionOfCamera0: (this.vN.cells[0]*this.d - this.vOv.cells[0]),
        positionOfCamera1: (this.vN.cells[1]*this.d - this.vOv.cells[1]),
        positionOfCamera2: (this.vN.cells[2]*this.d - this.vOv.cells[2]),

        centerX: this.center.x,
        centerY: this.center.y,
        scalePx: this.scale.px,
        scalePy: this.scale.py,

        countOfPolygons: this.polygons[0].length,

        sizeOfPixel: this.sizeOfPixel
      })
      .setGraphical(true)
      .setOutput([this.canvas.width, this.canvas.height]);

    if (this.polygons[0].length) kernel(this.polygons, this.lights);
    this.ctx.drawImage(kernel.canvas, 0, 0);
    this.isRender = false;

  }, 0);
}

export default rayTracing;
