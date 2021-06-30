import {
  scaling as ScalingAT3D,
  translation as TranslationAT3D,
  rotationYDeg as RotationYDegAT3D
} from "@/scene/AffineTransform3D";

export const Animations = [
  {
    name: 'pulse',
    frames:[
      new ScalingAT3D(1,1,1),
      new ScalingAT3D(1.2,1.2,1.2),
      new ScalingAT3D(1.4,1.4,1.4),
      new ScalingAT3D(1.6,1.6,1.6),
      new ScalingAT3D(1.8,1.8,1.8),
      new ScalingAT3D(2,2,2),
      new ScalingAT3D(1.8,1.8,1.8),
      new ScalingAT3D(1.6,1.6,1.6),
      new ScalingAT3D(1.4,1.4,1.4),
      new ScalingAT3D(1.2,1.2,1.2),
      new ScalingAT3D(1,1,1),
    ],
  },
  {
    name: 'circle1',
    frames:[
      new RotationYDegAT3D(0),
      new RotationYDegAT3D(Math.PI*(1/6)),
      new RotationYDegAT3D(Math.PI*(2/6)),
      new RotationYDegAT3D(Math.PI*(3/6)),
      new RotationYDegAT3D(Math.PI*(4/6)),
      new RotationYDegAT3D(Math.PI*(5/6)),
      new RotationYDegAT3D(Math.PI),
      new RotationYDegAT3D(Math.PI*(7/6)),
      new RotationYDegAT3D(Math.PI*(8/6)),
      new RotationYDegAT3D(Math.PI*(9/6)),
      new RotationYDegAT3D(Math.PI*(10/6)),
      new RotationYDegAT3D(Math.PI*(11/6)),
      new RotationYDegAT3D(Math.PI*2),
    ]
  },
  {
    name: 'circleM',
    buildFrames: (n, phi) => {
      let arr = []

      for (let i = 0; i < n; i++) {
        arr.push(new RotationYDegAT3D(i*phi))
      }

      return arr;
    }
  }
]
