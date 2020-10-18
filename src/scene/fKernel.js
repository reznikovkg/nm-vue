import { GPU } from "gpu.js";

/**
 * Растояние между двумя точками
 *
 * @param a
 * @param b
 * @returns {number[]}
 */
function LengthFPTP(a, b) {
    return Math.sqrt(
        (a[0] - b[0]) * (a[0] - b[0]) +
        (a[1] - b[1]) * (a[1] - b[1]) +
        (a[2] - b[2]) * (a[2] - b[2])
    )
}

function BuildVector(a, b) {
    return [
        b[0] - a[0],
        b[1] - a[1],
        b[2] - a[2]
    ]
}

/**
 * Векторное произведение
 *
 * @param a
 * @param b
 * @returns {number[]}
 */
function VectorCombine(a, b) {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ]
}


/**
 * Получение коорднат плоскости по 3-м точкам
 *
 * Возвращает x, y, z, f
 *
 * Xi + Yj + Zk + f = 0
 *
 * @param point0
 * @param point1
 * @param point2
 * @returns {number[]}
 */
function getPlaneByMatrixOfPoints(point0, point1, point2) {
    const tMatrix0 = BuildVector(point0, [0,0,0]);
    const tMatrix1 = BuildVector(point0, point1);
    const tMatrix2 = BuildVector(point0, point2);

    const t1 = VectorCombine(tMatrix1, tMatrix2);

    const plane = [
        t1[0],
        t1[1],
        t1[2],
        tMatrix0[0]*t1[0] + tMatrix0[1]*t1[1] + tMatrix0[2]*t1[2]
    ];

    return plane;
}


function getTByPlateAndLine(plane, point, vector) {
    let sumR = - plane[3]
        - plane[0] * point[0]
        - plane[1] * point[1]
        - plane[2] * point[2];

    let sumL =
        plane[0] * vector[0]
        + plane[1] * vector[1]
        + plane[2] * vector[2];

    return sumR / sumL;
}


/**
 *
 * Плоскость (x, y, z, f)  = getPlaneByMatrixOfPoints(plane)
 *
 * @param plane
 * @param point
 * @returns {*[]}
 */
function getProjectionToPlane(plane, point) {
    const x = plane[0];
    const y = plane[1];
    const z = plane[2];
    const f = plane[3];

    const s = x*point[0] + y*point[1] + z*point[2] + f;

    const al = x*x + y*y + z*z;

    let j = 9999;
    if (al >= 0.001) {
        j = -s/al;
    }

    const poi = [
        point[0] + x*j,
        point[1] + y*j,
        point[2] + z*j,
    ];

    return poi;
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

    const pRayN = [
        pRay1[0] - pRay2[0],
        pRay1[1] - pRay2[1],
        pRay1[2] - pRay2[2],
    ]
    /**
     * x(t) = x + j0 * t = pRay2[0] + pRayN[0] * t
     * y(t) = y + j1 * t = pRay2[1] + pRayN[1] * t
     * x(t) = x + j2 * t = pRay2[2] + pRayN[2] * t
     */

    let colorNowX = 1;
    let colorNowY = 1;
    let colorNowZ = 1;


    let distance = 99999;



    //цикл по полигонам
    for (let k = 0; k < _polygonsLength; k++) {
        const point0 = [
            _polygons[0][k][0][0],
            _polygons[0][k][0][1],
            _polygons[0][k][0][2],
        ];
        const point1 = [
            _polygons[0][k][1][0],
            _polygons[0][k][1][1],
            _polygons[0][k][1][2],
        ];
        const point2 = [
            _polygons[0][k][2][0],
            _polygons[0][k][2][1],
            _polygons[0][k][2][2],
        ];


        // const tMatrix0 = [
        //     - point0[0],
        //     - point0[1],
        //     - point0[2],
        // ];

        // const tMatrix1 = BuildVector(point0, point1);

        // const tMatrix1 = [
        //     _polygons[0][k][1][0] - _polygons[0][k][0][0],
        //     _polygons[0][k][1][1] - _polygons[0][k][0][1],
        //     _polygons[0][k][1][2] - _polygons[0][k][0][2]
        // ];
        // const tMatrix2 = BuildVector(point0, point2);

        // const tMatrix2 = [
        //     _polygons[0][k][2][0] - _polygons[0][k][0][0],
        //     _polygons[0][k][2][1] - _polygons[0][k][0][1],
        //     _polygons[0][k][2][2] - _polygons[0][k][0][2]
        // ];

        // const t1 = VectorCombine(tMatrix1, tMatrix2);

        // Place
        // const x = t1[0];
        // const y = t1[1];
        // const z = t1[2];
        // const f = tMatrix0[0]*t1[0] + tMatrix0[1]*t1[1] + tMatrix0[2]*t1[2];



        // console.log([x, y, z, f])
        const plane = getPlaneByMatrixOfPoints(point0, point1, point2); // [x, y, z, f]
        // console.log(plane)
        //
        const x = plane[0];
        const y = plane[1];
        const z = plane[2];
        const f = plane[3];



        const tByPlaneAndLine = getTByPlateAndLine(plane, pRay2, pRayN);

        const pT = [
            pRay2[0] + tByPlaneAndLine * pRayN[0],
            pRay2[1] + tByPlaneAndLine * pRayN[1],
            pRay2[2] + tByPlaneAndLine * pRayN[2],
        ]

        // console.log(pT)

        // const al = x*x + y*y + z*z;


        // console.log(`${x}x+${y}y+${z}z+${f}=0`);


        // const s1 = x*pRay1[0] + y*pRay1[1] + z*pRay1[2] + f;

        // console.log(s1,al)
        // let j1 = 9999;
        // if (al !== 0) {
        //     j1 = -s1/al;
        // }
        // const poi1 = [
        //     pRay1[0] + x*j1,
        //     pRay1[1] + y*j1,
        //     pRay1[2] + z*j1,
        // ];
        // console.log(poi1)




        // const s2 = x*pRay2[0] + y*pRay2[1] + z*pRay2[2] + f;

        // let j2 = 9999;
        // if (al !== 0) {
        //     j2 = -s2/al;
        // }
        // const poi2 = [
        //     pRay2[0] + x*j2,
        //     pRay2[1] + y*j2,
        //     pRay2[2] + z*j2,
        // ];


        // const d1 = LengthFPTP(poi1, pRay1);

        // const d1 = Math.sqrt(
        //     (poi1[0] - pRay1[0]) * (poi1[0] - pRay1[0]) +
        //     (poi1[1] - pRay1[1]) * (poi1[1] - pRay1[1]) +
        //     (poi1[2] - pRay1[2]) * (poi1[2] - pRay1[2])
        // )

        // const d2 = LengthFPTP(poi2, pRay2);
        // const d2 = Math.sqrt(
        //     (poi2[0] - pRay2[0]) * (poi2[0] - pRay2[0]) +
        //     (poi2[1] - pRay2[1]) * (poi2[1] - pRay2[1]) +
        //     (poi2[2] - pRay2[2]) * (poi2[2] - pRay2[2])
        // )

        // const ly = d1/d2;

        // const crossPoint = [
        //     (poi1[0]+ly*poi2[0])/(1+ly),
        //     (poi1[1]+ly*poi2[1])/(1+ly),
        //     (poi1[2]+ly*poi2[2])/(1+ly),
        // ];


        const crossPoint = pT;


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



        const cos12 = ( n1[0]*n2[0]+n1[1]*n2[1]+n1[2]*n2[2]) / (
                Math.sqrt(n1[0]*n1[0]+n1[1]*n1[1]+n1[2]*n1[2]) *
                Math.sqrt(n2[0]*n2[0]+n2[1]*n2[1]+n2[2]*n2[2])
            );

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
}


export function initGPU() {
    const gpu = new GPU();

    gpu.addFunction(VectorCombine, { argumentTypes: { a: 'Array(3)', b: 'Array(3)'}, returnType: 'Array(3)' });
    gpu.addFunction(getTByPlateAndLine);
    gpu.addFunction(LengthFPTP);
    gpu.addFunction(BuildVector);
    gpu.addFunction(getPlaneByMatrixOfPoints)

    return gpu;
}
