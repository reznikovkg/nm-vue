class pNewton {
    constructor(points = null) {
        this.points = points;
        this.n = this.points[0].length;
        this.diff = [];

        /**
         * Run set
         */
        this.setDiff();
    }


    /**
     * Set diff matrix
     *
     * Status: done
     *
     * @returns {number}
     */
    setDiff() {
        this.diff.push([]);

        for (var i = 1; i < this.n; i++) {
            this.diff[0].push(this.getDiffSum({ii: 0, jj: i}));
        }
    }

    /**
     * Set diff matrix
     *
     * Status: done
     *
     * @param params
     * @returns {number}
     */
    getDiffSum(params) {
        var ii = params.ii;
        var jj = params.jj;
        var sum = 0;

        for (var i = ii; i <= jj; i++)
        {
            sum += (
                this.points[1][i] /
            this.getDiffProd({ ii: i, iii:ii, jjj: jj })
            );
        }

        return sum;
    }

    /**
     * Set diff matrix
     *
     * Status: done
     *
     * @param params
     * @returns {number}
     */
    getDiffProd (params)
    {
        var ii = params.ii;
        var iii = params.iii;
        var jjj = params.jjj;

        var prod = 1;
        for (var jj = iii; jj <= jjj; jj++)
        {
            if (jj !== ii)
            {
                prod *= (this.points[0][ii] - this.points[0][jj]);
            }
        }

        return prod;
    }


    /**
     * Get point of polynom y = P(x)
     *
     * Status: done
     *
     * @param x
     * @returns {*}
     */
    pointPolynom(x)
    {
        return this.points[1][0] + this.pRec({x:x, k:1, ipnN:this.n});
    }

    /**
     * Get for pointPolynom
     * Path of sum
     *
     * Status: done
     *
     * @param params
     * @returns {number}
     */
    pRec(params)
    {
        var x = params.x;
        var k = params.k;
        var ipnN = params.ipnN;

        var result = 0;
        if (k < ipnN)
        {
            result = this.diff[0][k-1];
            result *= this.pRecProd({x:x, k:k});
            result += this.pRec({x:x, k: k + 1, ipnN: ipnN});
        }
        return result;
    }

    /**
     * Get for pointPolynom
     * Path comb of path sum
     *
     * Status: done
     *
     * @param params
     * @returns {number}
     */
    pRecProd(params)
    {
        var x = params.x;
        var k = params.k;
        var result = 1;
        for (var i = 0; i < k; i++)
        {
            result *= (x - this.points[0][i]);
        }
        return result;
    }
}
