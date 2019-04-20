/**
 * Class tridiagonal matrix
 * For pay X - vector
 * A * X = F
 * A = (a,b,c)
 */
export default class tMatrix {

    constructor() {
        this.a = [];
        this.b = [];
        this.c = [];

        this.x = [];
        this.f = [];
    }

    setABCF(params)
    {
        this.a = params.a;
        this.b = params.b;
        this.c = params.c;
        this.f = params.f;
    }

    solveX() {
        this.x = [];

        var n = this.f.length;

        var L = [];
        var M = [];

        for (var i = 0; i < n; i++)
        {
            L.push(0);
            M.push(0);
            this.x.push(0);
        }

        if (this.b[0] !== 0)
        {
            L[0] = this.c[0] / this.b[0];
            M[0] = this.f[0] / this.b[0];
        }

        var temp;
        for (var i = 1; i < n; i++)
        {
            temp = this.b[i] - this.a[i] * L[i - 1];
            if (temp !== 0)
            {
                L[i] = this.c[i] / temp;
                M[i] = (this.f[i] - this.a[i] * M[i - 1]) / temp;
            }
        }
        this.x[n - 1] = M[n - 1];
        for (var i = n - 1; i > 0; i--)
        {
            this.x[i - 1] = M[i - 1] - L[i - 1] * this.x[i];
        }
    }

    getX() {
        return this.x;
    }

}
