import { GPU } from "gpu.js";

function cosDegVectors3(a, b) {
    const ab = a[0]*b[0]+a[1]*b[1]+a[2]*b[2];

    const sqrtA = Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);
    const sqrtB = Math.sqrt(b[0]*b[0]+b[1]*b[1]+b[2]*b[2]);

    return ab / (sqrtA*sqrtB);
}

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

/**
 * Получить длину высоты треугольника ABC из т. A  на BC
 * @param a
 * @param b
 * @param c
 * @returns {number}
 */
function heightToSegment(a, b, c) {
    const pD2 = (a + b + c) / 2;
    return 2 * Math.sqrt(pD2 * (pD2 - a) * (pD2 - b) * (pD2 - c)) / a;
}

export const fKernel = `function(_polygons, _op) {
    const matrixTransform00 = this.constants.matrixTransform00;
    const matrixTransform10 = this.constants.matrixTransform10;
    const matrixTransform20 = this.constants.matrixTransform20;

    const matrixTransform01 = this.constants.matrixTransform01;
    const matrixTransform11 = this.constants.matrixTransform11;
    const matrixTransform21 = this.constants.matrixTransform21;

    const matrixTransform02 = this.constants.matrixTransform02;
    const matrixTransform12 = this.constants.matrixTransform12;
    const matrixTransform22 = this.constants.matrixTransform22;

    const positionOfCamera0 = this.constants.positionOfCamera0;
    const positionOfCamera1 = this.constants.positionOfCamera1;
    const positionOfCamera2 = this.constants.positionOfCamera2;

    const centerX = this.constants.centerX;
    const centerY = this.constants.centerY;
    const scalePx = this.constants.scalePx;
    const scalePy = this.constants.scalePy;

    const coordsX = (this.thread.x - centerX + 0.5) / scalePx;
    const coordsY = -(this.thread.y - centerY + 0.5) / scalePy;
    const coordsZ = 0; //TODO //IT IS A BIG PROBLEM

    const countOfPolygons = this.constants.countOfPolygons;
    const sizeOfPixel = this.constants.sizeOfPixel;









    /**
     * вектор направления луча от камеры в пиксель экрана
     * @type {number[]}
     */
    const pRay1 = [
        matrixTransform00 * coordsX + matrixTransform01 * coordsY + matrixTransform02 * coordsZ,
        matrixTransform10 * coordsX + matrixTransform11 * coordsY + matrixTransform12 * coordsZ,
        matrixTransform20 * coordsX + matrixTransform21 * coordsY + matrixTransform22 * coordsZ,
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

    let pointFound = [
      0,0,0
    ];
    let pointFoundX = 0;
    let pointFoundY = 0;
    let pointFoundZ = 0;

    let colorNowX = 1;
    let colorNowY = 1;
    let colorNowZ = 1;


    let distance = 99999;
    let isBorder = false;


    //цикл по полигонам
    for (let k = 0; k < countOfPolygons; k++) {
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
        const color = [
            _polygons[0][k][3][0],
            _polygons[0][k][3][1],
            _polygons[0][k][3][2],
        ];



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


        const crossPoint = pT;


        // console.log(pRay2, pRay1,crossPoint)

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

        // console.log('point')

        const cos12 = cosDegVectors3(n1, n2);

        // const cos12 = ( n1[0]*n2[0]+n1[1]*n2[1]+n1[2]*n2[2]) / (
        //         Math.sqrt(n1[0]*n1[0]+n1[1]*n1[1]+n1[2]*n1[2]) *
        //         Math.sqrt(n2[0]*n2[0]+n2[1]*n2[1]+n2[2]*n2[2])
        //     );

        // console.log(cos12)
        if (cos12 < 0 ) {
            continue;
        }

        const cos13 = cosDegVectors3(n1, n3);
        // const cos13 = (n1[0]*n3[0]+n1[1]*n3[1]+n1[2]*n3[2])/(Math.sqrt(n1[0]*n1[0]+n1[1]*n1[1]+n1[2]*n1[2])*Math.sqrt(n3[0]*n3[0]+n3[1]*n3[1]+n3[2]*n3[2]));

        // console.log(cos13)
        if (cos13 < 0 ) {
            continue;
        }

        /**
         * Расстояние от камеры до точки пересечения
         * @type {number}
         */
        const d = Math.sqrt(
            (pT[0]-pRay2[0])*(pT[0]-pRay2[0]) +
            (pT[1]-pRay2[1])*(pT[1]-pRay2[1]) +
            (pT[2]-pRay2[2])*(pT[2]-pRay2[2])
        )
        if (d < distance) {
            distance = d;
            colorNowX = color[0];
            colorNowY = color[1];
            colorNowZ = color[2];

            pointFoundX = crossPoint[0];
            pointFoundY = crossPoint[1];
            pointFoundZ = crossPoint[1];

            pointFoundX = crossPoint[0];
            pointFoundY = crossPoint[1];
            pointFoundZ = crossPoint[2];
            pointFound = crossPoint;

            isBorder = false;

            /**
             * Вычисление границ
             * @type {number[]}
             */
            const dA = LengthFPTP(point0,point1);
            const dCross0 = LengthFPTP(crossPoint, point0);
            const dCross1 = LengthFPTP(crossPoint, point1);

            const hA = heightToSegment(dA, dCross0, dCross1);

            if (hA < sizeOfPixel) { isBorder = true; }
            else {
                const dB = LengthFPTP(point1, point2);
                const dCross2 = LengthFPTP(crossPoint, point2);

                const hB = heightToSegment(dB, dCross1, dCross2);

                if (hB < sizeOfPixel) { isBorder = true; }
                else {
                    const dC = LengthFPTP(point2, point0);

                    const hC = heightToSegment(dC, dCross0, dCross2);
                    if (hC < sizeOfPixel) { isBorder = true; }
                }
            }
        }

    }

    if (distance > 9999) {
        this.color(
          0.5,
          0.5,
          0.5,
        )
    } else {
        if (isBorder) {

            this.color(
              0.1,
              0.1,
              0.1,
            );
        } else {

            const lightPos = [
                _op[0][0][0][0],
                _op[0][0][0][1],
                _op[0][0][0][2],
            ];

            /**
             * Цвет точки света
             * @type {*[]}
             */
            const lightColor = [
                _op[0][0][1][0],
                _op[0][0][1][1],
                _op[0][0][1][2],
            ];

            /**
             * Цвет точки тьмы
             * @type {*[]}
             */
            const lightColor2 = [
                _op[0][0][2][0],
                _op[0][0][2][1],
                _op[0][0][2][2],
            ];

            const lightPower = _op[0][0][3][0];

            const _d = LengthFPTP(pointFound, lightPos)


            if (_d > lightPower) {
                this.color(
                  lightColor2[0],
                  lightColor2[1],
                  lightColor2[2]
                )
            } else {
                const koef = (lightPower / 2 - _d ) / (lightPower / 2);

                colorNowX += koef * (
                  (_d < (lightPower / 2) ? lightColor[0] - colorNowX : colorNowX - lightColor2[0])
                );

                colorNowY += koef * (
                  (_d < (lightPower / 2) ? lightColor[1] - colorNowY : colorNowY - lightColor2[1])
                );

                colorNowZ += koef * (
                  (_d < (lightPower / 2) ? lightColor[2] - colorNowZ : colorNowZ - lightColor2[0])
                );

                this.color(
                  colorNowX > 1 ? 1 : colorNowX,
                  colorNowY > 1 ? 1 : colorNowY,
                  colorNowZ > 1 ? 1 : colorNowZ
                );
            }
        }
    }


}`


export function initGPU() {
    const gpu = new GPU();

    gpu.addFunction(cosDegVectors3);
    gpu.addFunction(VectorCombine, { argumentTypes: { a: 'Array(3)', b: 'Array(3)'}, returnType: 'Array(3)' });
    gpu.addFunction(getTByPlateAndLine);
    gpu.addFunction(heightToSegment);
    gpu.addFunction(LengthFPTP);
    gpu.addFunction(BuildVector);
    gpu.addFunction(getPlaneByMatrixOfPoints);

    return gpu;
}
