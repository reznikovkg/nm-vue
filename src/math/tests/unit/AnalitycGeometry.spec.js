
import { cosDegVectors } from '@/math/AnalitycGeometry';

test('cosDegVectors [7,1] with [5,5] to equal 0.8', () => {
    expect(
        cosDegVectors([7,1], [5,5])
    ).toBeCloseTo(0.8);
});
