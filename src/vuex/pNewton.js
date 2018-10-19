
export default {
    namespaced: true,
    state: {
        points: [],
        n: 0,
        diff: []
    },
    mutations: {
        setXFX: function (state, params)
        {
            state.points = params.points;
            state.n = state.points[0].length;
        },


        setDiff: function (state)
        {
            state.diff.push([]);

            for (var i = 1; i < state.n; i++)
            {
                state.diff[0].push(this.getters['pNewton/getDiffSum']({ ii: 0,jj: i}));
            }
        },



        pointPolynom: function (state, params)
        {
            var x = params.x;

            return state.points[1][0] + pRec(x, 1, n);
        },

        pRec: function(state, params)
        {
            var x = params.x;
            var k = params.k;
            var ipn_n = params.ipn_n;

            var result = 0;
            if (k < ipn_n)
            {
                result = diff[0][k-1];
                result *= pRecProd(x, k);
                result += pRec(x, k + 1, ipn_n);
            }
            return result;
        },

        pRecProd: function(state, params)
        {
            var x = params.x;
            var k = params.k;
            var result = 1;
            for (var i = 0; i < k; i++)
            {
                result *= (x - getPointX(i));
            }
            return result;
        }

    },
    getters: {
        getDiffSum: (state) => params =>
        {
            var ii = params.ii;
            var jj = params.jj;
            var sum = 0;
            for (var i = ii; i <= jj; i++)
            {
                sum += (
                    state.points[1][i] /
                    this.getDiffProd({ ii: i,iii:ii, jjj: jj})
                );
            }
            return sum;
        },

        getDiffProd: (state) => params =>
        {
            var ii = params.ii;
            var iii = params.iii;
            var jjj = params.jjj;

            var prod = 1;
            for (var jj = iii; jj <= jjj; jj++)
            {
                if (jj !== ii)
                {
                    prod *= (state.points[0][ii] - state.points[0][jj]);
                }
            }
            return prod;
        },

        // getCoeffC: (state) => state.coeffC,
        //
        // pointSpline: state => x =>
        // {
        //     var i = 0;
        //     var ost = true;
        //
        //     while ((ost)&&(i>=0)&& (i < state.x.length - 1))
        //     {
        //         if ( ( state.x[i] <= x ) && ( state.x[i+1] > x ) )
        //         {
        //             ost = false;
        //         } else {
        //             i++;
        //         }
        //     }
        //
        //     var xt = x - state.x[i];
        //     if (i < state.b.length)
        //     {
        //         return state.a[i] + state.b[i] * xt + state.c[i] * xt * xt + state.d[i] * xt * xt * xt;
        //     } else
        //     {
        //         return 0;
        //     }
        // },
        // getStart: (state) => state.x[0],
        // getFinish: (state) => state.x[state.x.length-1],
    }
};
