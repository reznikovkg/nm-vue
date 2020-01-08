import Matrix from './../math/Matrix';

export default class Model3D {

    constructor() {
        this.vertices = new Matrix();
        this.initialVertices = new Matrix();
        this.projectedVertices = new Matrix();

        this._Verges = null;

        this.verges = new Matrix();

        this._Edges = null;

        this.edges = new Matrix();
    }

    setVertices(matr) {
        this.vertices = matr;
        this.initialVertices.AllocateCells(this.vertices.getStrNum());
        this.initialVertices.setMaxrix(this.vertices);
    }

    apply(at) {
        this.vertices = at.compWith(this.vertices, true);
    }

    project(pr) {
        this.projectedVertices = pr.compWith(this.vertices, true);
    }

    applyProject (at,pr) {
        this.apply(at);
        this.project(pr);
    }

    getVerticesLength () {
        return this.vertices.getColNum();
    }

    getProjectX(t) {
        return this.projectedVertices.cells[0][t] / this.projectedVertices.cells[2][t];
    }

    getProjectY(t) {
        return this.projectedVertices.cells[1][t] / this.projectedVertices.cells[2][t];
    }
}
