
import {BuildVector, fKernel, LengthFPTP, VectorCombine} from "@/scene/fKernel";
import {getMatrixToTransformPoint2D} from "@/math/AnalitycGeometry";
import Vector from "@/math/Vector";

const vOv = new Vector([0,0,0]);
const vT = new Vector([0,1,0]);
const vN = new Vector([0,0,1]);
const d = 30;

const center = {
    x: 400/2,
    y: 400/2
};

const scale = {
    px: 50,
    py: 50
};


const matrixTransform = getMatrixToTransformPoint2D(
    {
        vOv: new Vector([0,0,0]),
        vT: new Vector([0,1,0]),
        vN: new Vector([0,0,1]),
        d: 30
    },
    {
        vOv,
        vT,
        vN,
        d: 30
    }
).cells;

const kkk = {
    thread: {
        x: 400,
        y: 0,
    },
    color: function () {
        console.log(arguments)
    }
}

kkk.constants = {
    matrixTransform00: matrixTransform[0][0],
    matrixTransform10: matrixTransform[1][0],
    matrixTransform20: matrixTransform[2][0],

    matrixTransform01: matrixTransform[0][1],
    matrixTransform11: matrixTransform[1][1],
    matrixTransform21: matrixTransform[2][1],

    positionOfCamera0: (vN.cells[0]*d - vOv.cells[0]),
    positionOfCamera1: (vN.cells[1]*d - vOv.cells[1]),
    positionOfCamera2: (vN.cells[2]*d - vOv.cells[2]),

    centerX: center.x,
    centerY: center.y,
    scalePx: scale.px,
    scalePy: scale.py,
};


const polygons = [
    [
        [
            [-5,5,0],
            [5,0,0],
            [-5,-5,0],
        ],
        [
            [5,5,0],
            [5,-5,0],
            [-5,0,0],
        ],
    ]
];

xdescribe('All Test in this describe will be run', () => {
    test('fKernel with one polygon', () => {

        console.log(polygons, polygons[0].length)

        polygons[1] = [
            [
                [10, 0, 0],
                [1, 1, 1],
                [10]
            ]
        ]

        // expect(
        //     fKernel.bind(kkk)(polygons, polygons[0].length)
        // ).toBeCloseTo(0.8);
    });
})
