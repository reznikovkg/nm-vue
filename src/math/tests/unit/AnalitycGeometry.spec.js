
import { cosDegVectors, getMatrixToTransformPoint2D, getWorldPoint } from '@/math/AnalitycGeometry';
import Vector from "@/math/Vector";
import Camera3D from "@/scene/Camera3D";


describe('All Test in this describe will be run', () => {
  test('test-matrix', () => {
    expect(
      getMatrixToTransformPoint2D({
        vOv: new Vector([0, 0, 0]),
        vT: new Vector([0, 1, 0]),
        vN: new Vector([0, 0, 1]),
        d: 100
      }, {
        vOv: new Vector([0, 0, 0]),
        vT: new Vector([-1, 1, -1]),
        vN: new Vector([1, 1, 1]),
        d: 100
      })
    ).toBeCloseTo(0.8);

    // expect(
    //     getMatrixToTransformPoint2D({
    //         vOv: new Vector([0,0,0]),
    //         vT: new Vector([0,1,0]),
    //         vN: new Vector([-1,1,1]),
    //     },{
    //         vOv: new Vector([0,0,0]),
    //         vT: new Vector([1,0,0]),
    //         vN: new Vector([-1,1,1]),
    //     })
    // ).toBe(1)

    // expect(
    //     getWorldPoint(0,0)
    // ).toBeCloseTo(0.8);


  });

})
