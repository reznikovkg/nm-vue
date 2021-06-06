import { rotationXDeg, rotationYDeg } from "@/scene/AffineTransform3D";

export default [
  {
    name: 'RotateX',
    mapping: (n) => {
      const deg = Math.PI * 2 / n;

      const array = [];

      for (let i = 0; i <= n; i++) {
        array.push(
          rotationXDeg(deg * i)
        )
      }

      return array;
    }
  },
  {
    name: 'RotateY',
    mapping: (n) => {
      const deg = Math.PI * 2 / n;

      const array = [];

      for (let i = 0; i <= n; i++) {
        array.push(
          rotationYDeg(deg * i)
        )
      }

      return array;
    }
  },
]
