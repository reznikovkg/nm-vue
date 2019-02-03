
class Vector {

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
}
