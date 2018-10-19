
export default {
    namespaced: true,
    state: {
        x: [],
        fx: [],
        h: [],

        n: 0,

        coeffC: [],

        a: [],
        b: [],
        c: [],
        d: []
    },
    mutations: {
        setXFX: function (state, params)
        {
            state.x = params.x;
            state.fx = params.fx;
            state.h = params.h;
            state.n = params.x.length-1;
        },
        addCoeffC: function (state, params)
        {
            state.coeffC[0].push(params.a);
            state.coeffC[1].push(params.b);
            state.coeffC[2].push(params.c);
            state.coeffC[3].push(params.d);
        },
        setCoeffC: function (state)
        {
            state.coeffC = {
                a: [],
                b: [],
                c: [],
                f: []
            };

            for (var i = 1; i < state.n; i++)
            {
                // addCoeffC(state, {
                //     a: state.h[i - 1],
                //     b: 2 * (state.h[i] + state.h[i - 1]),
                //     c: state.h[i],
                //     d: 3 * ((state.fx[i + 1] - state.fx[i]) / state.h[i] - (state.fx[i] - state.fx[i - 1]) / state.h[i - 1])
                // });
                state.coeffC.a.push(state.h[i - 1]);
                state.coeffC.b.push(2 * (state.h[i] + state.h[i - 1]));
                state.coeffC.c.push(state.h[i]);
                state.coeffC.f.push(3 * ((state.fx[i + 1] - state.fx[i]) / state.h[i] - (state.fx[i] - state.fx[i - 1]) / state.h[i - 1]));
            }
        },
        setCoeffSpline: function(state, params)
        {
            var CC = params.x;

            state.a = [];
            state.b = [];
            state.c = [];
            state.d = [];

            state.c.push(CC[0] - 0 / 3);

            for (var i = 0; i < state.n - 1; i++)
            {
                state.c.push(CC[i]);
            }

            state.a = state.fx;

            state.d.push(0 / 6);
            state.c.push(0 / 2);
            //this.D.Add((this.C[1] - this.C[0]) / (3 * this.H[0]));

            state.b.push((state.fx[1] - state.fx[0]) / state.h[0] - state.h[0] * (2 * state.c[0] + state.c[1]) / 3);

            for (var i = 1; i < state.n; i++)
            {
                state.b.push((state.fx[i + 1] - state.fx[i]) / state.h[i] - state.h[i] * (2 * state.c[i] + state.c[i + 1]) / 3);
                state.d.push((state.c[i + 1] - state.c[i]) / (3 * state.h[i]));
            }
        },
        // pointSpline: function (state, params)
        // {
        //     var i = 0;
        //     var ost = true;
        //
        //     var x = params.x;
        //
        //     while (ost)
        //     {
        //         if ((i<state.x.length-1)&&(state.x[i] <= x) && (state.x[i+1] >x))
        //         {
        //             ost = false;
        //         } else {
        //             i++;
        //         }
        //     }
        //
        //     var xt = x - state.x[i];
        //     return state.a[i] + state.b[i] * xt + state.c[i] * xt * xt + state.d[i] * xt * xt * xt;
        // },

},
    getters: {
        getCoeffC: (state) => state.coeffC,

        pointSpline: state => x =>
        {
            var i = 0;
            var ost = true;

            while ((ost)&&(i>=0)&& (i < state.x.length - 1))
            {
                if ( ( state.x[i] <= x ) && ( state.x[i+1] > x ) )
                {
                    ost = false;
                } else {
                    i++;
                }
            }

            var xt = x - state.x[i];
            if (i < state.b.length)
            {
                return state.a[i] + state.b[i] * xt + state.c[i] * xt * xt + state.d[i] * xt * xt * xt;
            } else
            {
                return 0;
            }
        },
        getStart: (state) => state.x[0],
        getFinish: (state) => state.x[state.x.length-1],
    }
};
