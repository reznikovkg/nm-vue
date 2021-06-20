import {rotationXDeg, rotationYDeg, rotationZDeg} from "@/scene/AffineTransform3D";

export default [
  {
    name: 'RotateX',
    mapping: (n) => {
      const deg = Math.PI * 2 / (n - 1);

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
      const deg = Math.PI * 2 / (n - 1);

      const array = [];

      for (let i = 0; i <= n; i++) {
        array.push(
          rotationYDeg(deg * i)
        )
      }

      return array;
    }
  },
  {
    name: 'RotateY_Star',
    mapping: (n) => {
      const deg = Math.PI * 4 / (n - 1);

      const array = [];

      for (let i = 0; i <= n; i++) {
        array.push(
          rotationYDeg(deg * i)
        )
      }

      return array;
    }
  },
  {
    name: 'RotateZ_Star',
    mapping: (n) => {
      const deg = Math.PI * 4 / (n - 1);

      const array = [];

      for (let i = 0; i <= n; i++) {
        array.push(
          rotationZDeg(deg * i)
        )
      }

      return array;
    }
  },
]
