import Matrix from './../../math/Matrix';
import typesOfScene from "../../scene/typesOfScene";
import BaseModel from "./../BaseModel";
import {TypeModelsByScene} from "@/models/typesOfModels";
import LightForm from './../../components/Elements/Forms/Models3D/Light';

export const CODE = 'light'
export const NAME = 'light'

export default class Light extends BaseModel {
    code = CODE
    name = NAME
    formEdit = LightForm

    constructor() {
        super();

        this.position = new Matrix([[3],[3],[3],[1]]);

        this.cLight = [2,2,2];
        this.cDark = [0.1,0.1,0.1];
        this.power = 10;

        this.commonFields = false
        this.type = TypeModelsByScene.SCENE_3D
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
        ctx.closePath();
    }


    setCDark(data) {
        this.cDark = data;
    }
    setCLight(data) {
        this.cLight = data;
    }
    setPower(data) {
        this.power = data;
    }

    getPosition() {
        return [
            this.position.cells[0][0],
            this.position.cells[1][0],
            this.position.cells[2][0],
        ]
    }

}
