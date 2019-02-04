function AT3D_Identity() {
    return new Matrix([
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]);
}

function AT3D_Translation(x, y, z) {
    return new Matrix([
        [1, 0, 0, x],
        [0, 1, 0, y],
        [0, 0, 1, z],
        [0, 0, 0, 1]
    ]);
}

function AT3D_RotationXDeg(phi) {
    return new Matrix([
        [1, 0, 0, 0],
        [0, Math.cos(phi), -Math.sin(phi), 0],
        [0, Math.sin(phi), Math.cos(phi), 0],
        [0, 0, 0, 1]
    ]);
}

function AT3D_RotationYDeg(phi) {
    return new Matrix([
        [Math.cos(phi), 0, Math.sin(phi), 0],
        [0, 1, 0, 0],
        [-Math.sin(phi), 0, Math.cos(phi), 0],
        [0, 0, 0, 1]
    ]);
}

function AT3D_RotationZDeg(phi) {
    return new Matrix([
        [Math.cos(phi), -Math.sin(phi), 0, 0],
        [Math.sin(phi), Math.cos(phi), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]);
}


function AT3D_Scaling(kx, ky, kz) {
    return new Matrix([
        [kx, 0, 0, 0],
        [0, ky, 0, 0],
        [0, 0, kz, 0],
        [0, 0, 0, 1]
    ]);
}

function AT3D_Mapping(x = 1, y = 1, z = 1) {
    return new Matrix([
        [x, 0, 0, 0],
        [0, y, 0, 0],
        [0, 0, z, 0],
        [0, 0, 0, 1]
    ]);
}
