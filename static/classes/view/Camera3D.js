
class Camera3D extends Camera2D {

    constructor(canvas) {
        super(canvas);

        this.vOv = new Vector([0,0,0]);
        this.vT = new Vector([0,1,0]);
        this.vN = new Vector([0,0,1]);

        this.d = 10;

        this.updateCamera();

        this.moveCamera = {
            move: false,
            x: this.drag.x,
            y: this.drag.y

        }
    }



    worldToViewF(isReturn = false) {
        if (isReturn) {
            return new Matrix([
                [this.vI.cells[0], this.vI.cells[1], this.vI.cells[2], (this.vI.compWith(this.vOv))*(-1)],
                [this.vJ.cells[0], this.vJ.cells[1], this.vJ.cells[2], (this.vJ.compWith(this.vOv))*(-1)],
                [this.vK.cells[0], this.vK.cells[1], this.vK.cells[2], (this.vK.compWith(this.vOv))*(-1)],
                [0, 0, 0, 1]
            ]);
        } else {
            this.worldToView = new Matrix([
                [this.vI.cells[0], this.vI.cells[1], this.vI.cells[2], (this.vI.compWith(this.vOv))*(-1)],
                [this.vJ.cells[0], this.vJ.cells[1], this.vJ.cells[2], (this.vJ.compWith(this.vOv))*(-1)],
                [this.vK.cells[0], this.vK.cells[1], this.vK.cells[2], (this.vK.compWith(this.vOv))*(-1)],
                [0, 0, 0, 1]
            ]);
        }
    }

    viewToProjectF(isReturn = false) {
        if (isReturn) {
            return new Matrix([
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, (-1.0)/this.d, 1]
            ]);
        } else {
            this.viewToProject = new Matrix([
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, (-1.0)/this.d, 1]
            ]);
        }
    }

    worldToProjectF(isReturn = false) {
        if (isReturn) {
            return this.viewToProject.compWith(this.worldToView, true);
        } else {
            this.worldToProject = this.viewToProject.compWith(this.worldToView, true);
        }
    }

    updateCamera() {
        this.worldToView = null;
        this.viewToProject = null;
        this.worldToProject = null;

        this.vK = this.vN.divWith(this.vN.norma(), true);
        this.vI = (this.vT.scalarWith(this.vN,true)).divWith((this.vT.scalarWith(this.vN,true)).norma(), true);
        this.vJ = this.vK.scalarWith(this.vI,true);

        this.worldToViewF();
        this.viewToProjectF();
        this.worldToProjectF();
    }

    moveCameraStart(e) {
        this.moveCamera.move = true;
    }

    moveCameraGo(e) {
        if (this.moveCamera.move) {
            let x = e.clientX;
            let y = e.clientY;

            let n = this.vN.cells;

            let t1 = (this.moveCamera.x - x)/100;
            n[2] += t1;

            let t2 = (this.moveCamera.y - y)/100;
            n[1] += t2;

            this.moveCamera.y = y;
            this.moveCamera.x = x;

            this.vN.cells = n;
        }
    }

    moveCameraStop() {
        this.moveCamera.move = false;
        this.updateCamera();
    }
}
