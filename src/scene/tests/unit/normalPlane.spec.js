import {
    getProjectionToPlane,
    getPlaneByMatrixOfPoints
} from "@/math/AnalitycGeometry";

xdescribe('normal plane', () => {
    test('normal plane', () => {
        expect(
            getProjectionToPlane(
                getPlaneByMatrixOfPoints([
                    [0,0,2],
                    [2,-1,0],
                    [4,1,1]
                ]),
                [-1,-2,5]
            )
        ).toBeCloseTo([-2, 0, 3]);
    });
});
