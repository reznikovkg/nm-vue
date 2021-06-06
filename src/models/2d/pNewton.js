import {TypeModelsByScene} from "@/models/typesOfModels";
import pNewtonForm from './../../components/Elements/Forms/Models2D/pNewton';

export default class pNewton {
    name = 'pNewton'
    code = 'pnewton'
    form = pNewtonForm

    constructor(points = null) {
        this.points = null;
        this.n = null;
        this.diff = null;

        this.type = TypeModelsByScene.SCENE_2D
    }


    setPoints(points) {
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

        for (let i = 1; i < this.n; i++) {
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
        let ii = params.ii;
        let jj = params.jj;
        let sum = 0;

        for (let i = ii; i <= jj; i++)
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
        let ii = params.ii;
        let iii = params.iii;
        let jjj = params.jjj;

        let prod = 1;
        for (let jj = iii; jj <= jjj; jj++)
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
        let x = params.x;
        let k = params.k;
        let ipnN = params.ipnN;

        let result = 0;
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
        let x = params.x;
        let k = params.k;
        let result = 1;
        for (let i = 0; i < k; i++)
        {
            result *= (x - this.points[0][i]);
        }
        return result;
    }

    setStartFinish(start, finish) {
        this.start = start;
        this.finish = finish;
    }
}
