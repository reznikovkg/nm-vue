// import {normalToPlane} from "@/math/AnalitycGeometry";
function normalToPlane(ar, point) {
    const tMatrix0 = [-ar[0][0], -ar[0][1], -ar[0][2]];
    const tMatrix1 = [ar[1][0] - ar[0][0], ar[1][1] - ar[0][1], ar[1][2] - ar[0][2]];
    const tMatrix2 = [ar[2][0] - ar[0][0], ar[2][1] - ar[0][1], ar[2][2] - ar[0][2]];

    const t1 = [
        tMatrix1[1] * tMatrix2[2] - tMatrix1[2] * tMatrix2[1],
        tMatrix1[2] * tMatrix2[0] - tMatrix1[0] * tMatrix2[2],
        tMatrix1[0] * tMatrix2[1] - tMatrix1[1] * tMatrix2[0]
    ];

    const x = t1[0];
    const y = t1[1];
    const z = t1[2];

    const f = tMatrix0[0] * t1[0] + tMatrix0[1] * t1[1] + tMatrix0[2] * t1[2];
    // console.log(`${x}x+${y}y+${z}z+${f}=0`);

    const s = x * point[0] + y * point[1] + z * point[2] + f;

    const al = x * x + y * y + z * z;

    let j = -s / al;
    if (al === 0) {
        j = 999;
    }

    return [
        point[0] + x * j,
        point[1] + y * j,
        point[2] + z * j,
    ];


    // return poi;
}


/**
 * Векторное произведение
 *
 * @param a
 * @param b
 * @returns {number[]}
 */
export function VectorCombine(a, b) {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ]
}

/**
 * Растояние между двумя точками
 *
 * @param a
 * @param b
 * @returns {number[]}
 */
export function LengthFPTP(a, b) {
    return Math.sqrt(
        (a[0] - b[0]) * (a[0] - b[0]) +
        (a[1] - b[1]) * (a[1] - b[1]) +
        (a[2] - b[2]) * (a[2] - b[2])
    )
}

export function BuildVector(a, b) {
    return [
        b[0] - a[0],
        b[1] - a[1],
        b[2] - a[2]
    ]
}

export function fKernel(_polygons, _polygonsLength) {
    const matrixTransform00 = this.constants.matrixTransform00;
    const matrixTransform10 = this.constants.matrixTransform10;
    const matrixTransform20 = this.constants.matrixTransform20;

    const matrixTransform01 = this.constants.matrixTransform01;
    const matrixTransform11 = this.constants.matrixTransform11;
    const matrixTransform21 = this.constants.matrixTransform21;


    const positionOfCamera0 = this.constants.positionOfCamera0;
    const positionOfCamera1 = this.constants.positionOfCamera1;
    const positionOfCamera2 = this.constants.positionOfCamera2;

    const centerX = this.constants.centerX;
    const centerY = this.constants.centerY;
    const scalePx = this.constants.scalePx;
    const scalePy = this.constants.scalePy;

    const coordsX = (this.thread.x - centerX + 0.5) / scalePx;
    const coordsY = -(this.thread.y - centerY + 0.5) / scalePy;
    const coordsZ = 0;









    /**
     * вектор направления луча от камеры в пиксель экрана
     * @type {number[]}
     */
    const pRay1 = [
        matrixTransform00 * coordsX + matrixTransform01 * coordsY,
        matrixTransform10 * coordsX + matrixTransform11 * coordsY,
        matrixTransform20 * coordsX + matrixTransform21 * coordsY,
        1
    ];
    const pRay2 = [
        positionOfCamera0,
        positionOfCamera1,
        positionOfCamera2,
        1
    ];


    let colorNowX = 1;
    let colorNowY = 1;
    let colorNowZ = 1;


    let distance = 99999;



    //цикл по полигонам
    for (let k = 0; k < _polygonsLength; k++) {

        const point0 = _polygons[0][k][0];
        const point1 = _polygons[0][k][1];
        const point2 = _polygons[0][k][2];


        // const tMatrix00 = - _polygons[0][k][0][0];
        // const tMatrix01 = - _polygons[0][k][0][1];
        // const tMatrix02 = - _polygons[0][k][0][2];

        const tMatrix0 = [
            - _polygons[0][k][0][0],
            - _polygons[0][k][0][1],
            - _polygons[0][k][0][2]
        ];
        const tMatrix1 = [
            _polygons[0][k][1][0] - _polygons[0][k][0][0],
            _polygons[0][k][1][1] - _polygons[0][k][0][1],
            _polygons[0][k][1][2] - _polygons[0][k][0][2]
        ];
        const tMatrix2 = [
            _polygons[0][k][2][0] - _polygons[0][k][0][0],
            _polygons[0][k][2][1] - _polygons[0][k][0][1],
            _polygons[0][k][2][2] - _polygons[0][k][0][2]
        ];

        const t1 =  VectorCombine(tMatrix1, tMatrix2);

        const x = t1[0];
        const y = t1[1];
        const z = t1[2];
        const al = x*x + y*y + z*z;
        const f = tMatrix0[0]*t1[0] + tMatrix0[1]*t1[1] + tMatrix0[2]*t1[2];


        // console.log(`${x}x+${y}y+${z}z+${f}=0`);


        const s1 = x*pRay1[0] + y*pRay1[1] + z*pRay1[2] + f;

        let j1 = -s1/al;
        if (al === 0) {
            j1 = 999;
        }
        const poi1 = [
            pRay1[0] + x*j1,
            pRay1[1] + y*j1,
            pRay1[2] + z*j1,
        ];




        const s2 = x*pRay2[0] + y*pRay2[1] + z*pRay2[2] + f;

        let j2 = -s2/al;
        if (al === 0) {
            j2 = 999;
        }
        const poi2 = [
            pRay2[0] + x*j2,
            pRay2[1] + y*j2,
            pRay2[2] + z*j2,
        ];


        const d1 = LengthFPTP(poi1, pRay1);

        // const d1 = Math.sqrt(
        //     (poi1[0] - pRay1[0]) * (poi1[0] - pRay1[0]) +
        //     (poi1[1] - pRay1[1]) * (poi1[1] - pRay1[1]) +
        //     (poi1[2] - pRay1[2]) * (poi1[2] - pRay1[2])
        // )

        const d2 = LengthFPTP(poi2, pRay2);
        // const d2 = Math.sqrt(
        //     (poi2[0] - pRay2[0]) * (poi2[0] - pRay2[0]) +
        //     (poi2[1] - pRay2[1]) * (poi2[1] - pRay2[1]) +
        //     (poi2[2] - pRay2[2]) * (poi2[2] - pRay2[2])
        // )

        const ly = d1/d2;

        const crossPoint = [
            (poi1[0]+ly*poi2[0])/(1+ly),
            (poi1[1]+ly*poi2[1])/(1+ly),
            (poi1[2]+ly*poi2[2])/(1+ly),
        ];


        const v11 = [
            _polygons[0][k][1][0]-_polygons[0][k][0][0],
            _polygons[0][k][1][1]-_polygons[0][k][0][1],
            _polygons[0][k][1][2]-_polygons[0][k][0][2],
        ];
        const v12 = [
            crossPoint[0]-_polygons[0][k][0][0],
            crossPoint[1]-_polygons[0][k][0][1],
            crossPoint[2]-_polygons[0][k][0][2],
        ];

        const n1 = VectorCombine(
            v11,
            v12
        );


        const v21 = [
            _polygons[0][k][2][0]-_polygons[0][k][1][0],
            _polygons[0][k][2][1]-_polygons[0][k][1][1],
            _polygons[0][k][2][2]-_polygons[0][k][1][2],
        ];
        const v22 = [
            crossPoint[0]-_polygons[0][k][1][0],
            crossPoint[1]-_polygons[0][k][1][1],
            crossPoint[2]-_polygons[0][k][1][2],
        ];

        const n2 = VectorCombine(
            v21,
            v22
        );

        const v31 = [
            _polygons[0][k][0][0]-_polygons[0][k][2][0],
            _polygons[0][k][0][1]-_polygons[0][k][2][1],
            _polygons[0][k][0][2]-_polygons[0][k][2][2],
        ];
        const v32 = [
            crossPoint[0]-_polygons[0][k][2][0],
            crossPoint[1]-_polygons[0][k][2][1],
            crossPoint[2]-_polygons[0][k][2][2],
        ];
        const n3 = VectorCombine(
            v31,
            v32
        );



        const cos12 = (n1[0]*n2[0]+n1[1]*n2[1]+n1[2]*n2[2])/(Math.sqrt(n1[0]*n1[0]+n1[1]*n1[1]+n1[2]*n1[2])*Math.sqrt(n2[0]*n2[0]+n2[1]*n2[1]+n2[2]*n2[2]));

        if (cos12 < 0 ) {
            continue;
        }

        const cos13 = (n1[0]*n3[0]+n1[1]*n3[1]+n1[2]*n3[2])/(Math.sqrt(n1[0]*n1[0]+n1[1]*n1[1]+n1[2]*n1[2])*Math.sqrt(n3[0]*n3[0]+n3[1]*n3[1]+n3[2]*n3[2]));

        if (cos13 < 0 ) {
            continue;
        }


        // console.log(v11,  _polygons[0][k][1], _polygons[0][k][0])
        colorNowX = 0;


        //     Math.abs(crossPoint[0]) > 255 ? 255: Math.abs(crossPoint[0]);
        //
        // colorNowY =
        //     Math.abs(crossPoint[1]) > 255 ? 255: Math.abs(crossPoint[1]);
        // colorNowZ =
        //     Math.abs(crossPoint[2]) > 255 ? 255: Math.abs(crossPoint[2]);


        //
        // const n2 = VectorCombine(
        //     BuildVector(_polygons[0][k][1], _polygons[0][k][2]),
        //     BuildVector(_polygons[0][k][0], _polygons[0][k][1]),
        //     // BuildVector(_polygons[0][k][1], crossPoint)
        // );
        //
        // const n3 = VectorCombine(
        //     BuildVector(_polygons[0][k][2], _polygons[0][k][0]),
        //     BuildVector(_polygons[0][k][1], _polygons[0][k][2]),
        //     // BuildVector(_polygons[0][k][2], crossPoint)
        // );


        //найти плоскость по точкам полигона

        //найти точку пересечения ray и плоскости

        //проверить точку на принадлежность полигону

        //если принадлежит
        // if (true) {

        //вычислить расстояние от точки до камеры
        //если меньше чем distance то заменить на цвет полигона и новое расстояние
        // }
    }

    this.color(
        colorNowX,
        colorNowY,
        colorNowZ
    );
};
