
class Matrix {

    constructor() {
        this.cells = [];


    }

    AllocateCells(strNum, colNum) {
        for (var i = 0; i < strNum; i++) {
            this.cells.push([]);

            for (var j = 0; j < colNum; j++ ) {
                this.cells[i].push(0);
            }
        }
    }

}
