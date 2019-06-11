/**
 * Class Matrix
 * Algebra
 */
export default class Matrix {

    /**
     * Constructor
     */
    constructor(cells = []) {
        this.cells = cells;
    }

    /**
     * @returns {number}
     *
     * Status: Done
     */
    getStrNum() {
        return this.cells.length;
    }

    /**
     * @returns {number}
     *
     * Status: Done
     */
    getColNum() {
        return this.cells[0].length;
    }

    /**
     * Init matrix NxM (0..0)
     *
     * @param strNum
     * @param colNum
     * @constructor
     *
     * Status: Done
     */
    AllocateCells(strNum, colNum = 0) {
        this.cells = [];

        if (colNum === 0) {
            colNum = strNum;
        }

        for (var i = 0; i < strNum; i++) {
            this.cells.push([]);
            for (var j = 0; j < colNum; j++ ) {
                this.cells[i].push(0);
            }
        }
    }

    IdentityCells(strNum, colNum = 0) {
        this.cells = [];

        if (colNum === 0) {
            colNum = strNum;
        }

        for (var i = 0; i < strNum; i++) {
            this.cells.push([]);
            for (var j = 0; j < colNum; j++ ) {
                this.cells[i].push(1);
            }
        }
    }

    /**
     * @param matrix
     * @returns {boolean}
     *
     * Status: Done
     */
    setMaxrix(matrix){
        if (this.getStrNum() === matrix.getStrNum() && this.getColNum() === matrix.getColNum()) {
            for (var i = 0; i < this.getStrNum(); i++) {
                for (var j = 0; j < this.getColNum(); j++ ) {
                    this.cells[i][j] = matrix.cells[i][j];
                }
            }
            return true;
        } else {
            return false;
        }
    }

    /**
     * Set cells from array
     *
     * @param cells
     *
     * Status: Done
     */
    setArray(cells) {
        this.cells = cells;
    }

    /**
     * Sum this matrix with matrix from parametr
     *
     * @param matrix
     * @param isReturn
     *
     * Status: done *
     */
    sumWith(matrix, isReturn = false) {
        if (this.getStrNum() === matrix.getStrNum() && this.getColNum() === matrix.getColNum()) {
            var m = new Matrix();
            m.AllocateCells(this.getStrNum(), this.getColNum());

            for (var i = 0; i < this.getStrNum(); i++) {
                for (var j = 0; j < this.getColNum(); j++ ) {
                    m.cells[i][j] = this.cells[i][j] + matrix.cells[i][j];
                }
            }

            if (isReturn) {
                return m;
            } else {
                this.setMaxrix(m);
            }
        } else {
            return false;
        }
    }

    /**
     * Difference this matrix with matrix from parametr
     *
     * @param matrix
     * @param isReturn
     *
     * Status: done *
     */
    diffWith(matrix, isReturn = false) {
        if (this.getStrNum() === matrix.getStrNum() && this.getColNum() === matrix.getColNum()) {
            var m = new Matrix();
            m.AllocateCells(this.getStrNum(), this.getColNum());

            for (var i = 0; i < this.getStrNum(); i++) {
                for (var j = 0; j < this.getColNum(); j++ ) {
                    m.cells[i][j] = this.cells[i][j] - matrix.cells[i][j];
                }
            }

            if (isReturn) {
                return m;
            } else {
                this.setMaxrix(m);
            }
        } else {
            return false;
        }
    }

    /**
     * Composition this matrix with matrix from parametr
     *
     * @param matrix
     * @param isReturn
     *
     * Status: Done
     */
    compWith(matrix, isReturn = false) {
        if (this.getColNum() !== matrix.getStrNum()) {
            return false;
        }

        var m = new Matrix();
        m.AllocateCells(this.getStrNum(), matrix.getColNum());

        for (var i = 0; i < this.getStrNum(); i++) {
            for (var j = 0; j < matrix.getColNum(); j++)
            {
                var cell = 0;

                for (var k = 0; k < this.getColNum(); k++) {
                    cell += this.cells[i][k]*matrix.cells[k][j];
                }

                m.cells[i][j] = cell;
            }
        }

        if (isReturn) {
            return m;
        } else {
            this.setMaxrix(m);
        }
    }


    getProjectX(t) {
        return this.cells[0][t] / this.cells[2][t];
    }

    getProjectY(t) {
        return this.cells[1][t] / this.cells[2][t];
    }

    getStrFirst() {
        return this.cells[0];
    }

    getStrSecond(){
        return this.cells[1];
    }

    getStrThird(){
        return this.cells[2];
    }


    getColFirst() {
        return [
            this.cells[0][0],
            this.cells[1][0],
            this.cells[2][0],
        ];
    }

    getColSecond() {
        return [
            this.cells[0][1],
            this.cells[1][1],
            this.cells[2][1],
        ];
    }


}
