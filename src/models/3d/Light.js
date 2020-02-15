import Matrix from './../../math/Matrix';
import typesOfScene from "../../scene/typesOfScene";

export default class Light {

    constructor() {
        this.show = false;

        this.name = "Light";
        this.code = "light";
        this.type = typesOfScene.SCENE3D;

        this.position = new Matrix([[3],[3],[3],[1]]);

    }


    apply(at) {
        this.position.compWithLeft(at);
    }

    render(camera) {
        if (!this.show) {
            return;
        }

        let ctx = camera.canvas.getContext("2d");

        ctx.beginPath();
        ctx.strokeStyle = 'rgb(227,164,16)';

        ctx.setLineDash([]);
        ctx.lineWidth = 3;

        camera.moveTo(
            this.position.cells[0][0]-1,
            this.position.cells[1][0],
            this.position.cells[2][0]
        );
        camera.lineTo(
            this.position.cells[0][0]+1,
            this.position.cells[1][0],
            this.position.cells[2][0]
        );

        camera.moveTo(
            this.position.cells[0][0],
            this.position.cells[1][0]-1,
            this.position.cells[2][0]
        );
        camera.lineTo(
            this.position.cells[0][0],
            this.position.cells[1][0]+1,
            this.position.cells[2][0]
        );

        camera.moveTo(
            this.position.cells[0][0],
            this.position.cells[1][0],
            this.position.cells[2][0]-1
        );
        camera.lineTo(
            this.position.cells[0][0],
            this.position.cells[1][0],
            this.position.cells[2][0]+1
        );

        ctx.stroke();
    }

}
