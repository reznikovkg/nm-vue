
export default class Spline {

    constructor() {
        this.show = false;

        this.name = "Spline";
        this.code = "spline";

        this.x = [];
        this.fx = [];
        this.h = [];

        this.n = 0;

        this.coeffC = [];

        this.a = [];
        this.b = [];
        this.c = [];
        this.d = [];


        this.degStart = 0;
        this.degFinish = 0;
    }



    setXFX(params)
    {
        this.x = params.x;
        this.fx = params.fx;
        this.h = params.h;
        this.n = params.x.length-1;
    }

    addCoeffC(params)
    {
        this.coeffC[0].push(params.a);
        this.coeffC[1].push(params.b);
        this.coeffC[2].push(params.c);
        this.coeffC[3].push(params.d);
    }

    setCoeffC()
    {
        this.coeffC = {
            a: [],
            b: [],
            c: [],
            f: []
        };

        for (let i = 1; i < this.n; i++)
        {
            // addCoeffC(state, {
            //     a: state.h[i - 1],
            //     b: 2 * (state.h[i] + state.h[i - 1]),
            //     c: state.h[i],
            //     d: 3 * ((state.fx[i + 1] - state.fx[i]) / state.h[i] - (state.fx[i] - state.fx[i - 1]) / state.h[i - 1])
            // });
            this.coeffC.a.push(this.h[i - 1]);
            this.coeffC.b.push(2 * (this.h[i] + this.h[i - 1]));
            this.coeffC.c.push(this.h[i]);
            this.coeffC.f.push(3 * ((this.fx[i + 1] - this.fx[i]) / this.h[i] - (this.fx[i] - this.fx[i - 1]) / this.h[i - 1]));
        }
    }

    setCoeffSpline(X)
    {
        let CC = X;

        this.a = [];
        this.b = [];
        this.c = [];
        this.d = [];

        this.c.push(CC[0] - 0 / 3);

        for (let i = 0; i < this.n - 1; i++)
        {
            this.c.push(CC[i]);
        }

        this.a = this.fx;

        this.d.push(this.degStart / 6);
        this.c.push(this.degFinish / 2);
        //this.D.Add((this.C[1] - this.C[0]) / (3 * this.H[0]));

        this.b.push((this.fx[1] - this.fx[0]) / this.h[0] - this.h[0] * (2 * this.c[0] + this.c[1]) / 3);

        for (let i = 1; i < this.n; i++)
        {
            this.b.push((this.fx[i + 1] - this.fx[i]) / this.h[i] - this.h[i] * (2 * this.c[i] + this.c[i + 1]) / 3);
            this.d.push((this.c[i + 1] - this.c[i]) / (3 * this.h[i]));
        }
    }
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


    getCoeffC() {
        return this.coeffC
    }

    pointSpline(x)
    {
        let i = 0;
        let ost = true;

        while ((ost)&&(i>=0)&& (i < this.x.length - 1))
        {
            if ( ( this.x[i] <= x ) && ( this.x[i+1] > x ) )
            {
                ost = false;
            } else {
                i++;
            }
        }

        let xt = x - this.x[i];
        if (i < this.b.length)
        {
            return this.a[i] + this.b[i] * xt + this.c[i] * xt * xt + this.d[i] * xt * xt * xt;
        } else
        {
            return 0;
        }
    }

    getStart() {
        return this.x[0];
    }

    getFinish(){
        return this.x[this.x.length-1];
    }


    render(camera) {
        if (!this.show) {
            return;
        }

        let ctx = camera.canvas.getContext("2d");
        ctx.beginPath();
        ctx.strokeStyle = '#ff0012';
        ctx.setLineDash([]);
        ctx.lineWidth = 2;
        let start = this.getStart();
        let finish = this.getFinish();
        if (camera.ScreenToWorldX(0) > start) {
            start = camera.ScreenToWorldX(0);
        }
        if (camera.ScreenToWorldX(camera.canvas.width) < finish) {
            finish = camera.ScreenToWorldX(camera.canvas.width);
        }
        camera.moveTo(start);
        for (let i = start; i < finish; i += 0.01)
        {
            camera.lineTo(i, this.pointSpline(i));
        }
        // if (this.spline.splineSecond) {
        //     let start = this.spline.splineSecond.getStart();
        //     let finish = this.spline.splineSecond.getFinish();
        //     if (camera.ScreenToWorldX(0) > start) {
        //         start = camera.ScreenToWorldX(0);
        //     }
        //     if (camera.ScreenToWorldX(camera.canvas.width) < finish) {
        //         finish = camera.ScreenToWorldX(camera.canvas.width);
        //     }
        //     camera.moveTo(start,this.secSpline(start));
        //     for (let i = start; i < finish; i += 0.01)
        //     {
        //         camera.lineTo(i, this.secSpline(i));
        //     }
        // }
        ctx.stroke();
    }
}
