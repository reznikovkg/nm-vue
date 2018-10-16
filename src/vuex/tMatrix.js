
export default {
    namespaced: true,
    state: {
        a: [],
        b: [],
        c: [],

        x: [],
        f: [],
    },
    mutations: {
        setABCF: function (state, params)
        {
            state.a = params.a;
            state.b = params.b;
            state.c = params.c;
            state.f = params.f;
        },
        solveX: function (state) {
            state.x = [];

            var n = state.f.length;

            var L = [];
            var M = [];

            for (var i = 0; i < n; i++)
            {
                L.push(0);
                M.push(0);
                state.x.push(0);
            }

            if (state.b[0] != 0)
            {
                L[0] = state.c[0] / state.b[0];
                M[0] = state.f[0] / state.b[0];
            }

            var temp;
            for (var i = 1; i < n; i++)
            {
                temp = state.b[i] - state.a[i] * L[i - 1];
                if (temp != 0)
                {
                    L[i] = state.c[i] / temp;
                    M[i] = (state.f[i] - state.a[i] * M[i - 1]) / temp;
                }
            }
            state.x[n - 1] = M[n - 1];
            for (var i = n - 1; i > 0; i--)
            {
                state.x[i - 1] = M[i - 1] - L[i - 1] * state.x[i];
            }
        }
    },
    getters: {
        getX: (state) => ({ x: state.x}),

    }
};
