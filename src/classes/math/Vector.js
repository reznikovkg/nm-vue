export default class Vector {

    constructor(cells = []) {
        this.cells = cells;
    }


    /**
     * @returns {number}
     *
     * Status: Done
     */
    getNum() {
        return this.cells.length;
    }

    /**
     * Init vector N (0..0)
     *
     * @param strNum
     * @constructor
     *
     * Status: Done
     */
    AllocateCells(strNum) {
        this.cells = [];

        for (var i = 0; i < strNum; i++) {
            this.cells.push(0);
        }
    }

    /**
     * Init vector N (0..0)
     *
     * @param strNum
     * @constructor
     *
     * Status: Done
     */
    IdentityCells(strNum) {
        this.cells = [];

        for (var i = 0; i < strNum; i++) {
            this.cells.push(1);
        }
    }

    getArray() {
        return this.cells;
    }

    setArray(cells) {
        this.cells = cells;
    }

    norma() {
        var b = 0;

        for (var i = 0; i < this.cells.length; i++){
            b += this.cells[i] * this.cells[i];
        }
        return Math.sqrt(b);
    }

    /**
     * Composition this vector with vector from parametr
     *
     * @param vector
     *
     * Status: Done
     */
    compWith(vector) {
        if (this.getNum() === vector.getNum()) {
            let b = 0;
            for (let i = 0; i < this.getNum(); i++) {
                b += this.cells[i]*vector.cells[i];
            }

            return b;
        } else {
            return false;
        }
    }

    /**
     * Division this vector on number from parametr
     *
     * @param value
     * @param isReturn
     *
     * Status: Done *
     */
    divWith(value, isReturn = false) {
        var vec = new Vector();
        vec.AllocateCells(this.getNum());

        for (var i = 0; i < this.getNum(); i++) {
            vec.cells[i] = this.cells[i] / value;
        }

        if (isReturn) {
            return vec;
        } else {
            this.cells = vec.cells;
        }
    }

    /**
     * Scalar* this vector on number from parametr
     *
     * @param vector
     * @param isReturn
     *
     * Status: Done *
     */
    scalarWith(vector, isReturn = false) {
        var vec = new Vector();
        vec.AllocateCells(this.getNum());

        if (this.getNum() === vector.getNum())
        {
            vec.cells[0] = this.cells[1] * vector.cells[2] - this.cells[2] * vector.cells[1];
            vec.cells[1] = this.cells[2] * vector.cells[0] - this.cells[0] * vector.cells[2];
            vec.cells[2] = this.cells[0] * vector.cells[1] - this.cells[1] * vector.cells[0];
        }
        return vec;
    }


}
