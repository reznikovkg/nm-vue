function AT2D_Identity() {
    return new Matrix([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ]);
}

function AT2D_Translation(x, y) {
    return new Matrix([
        [1, 0, x],
        [0, 1, y],
        [0, 0, 1]
    ]);
}

function AT2D_RotationDeg(phi) {
    return new Matrix([
        [Math.cos(phi), Math.sin(phi), 0],
        [-Math.sin(phi), Math.cos(phi), 0],
        [0, 0, 1]
    ]);
}

function AT2D_Rotation(c,s) {
    return new Matrix([
        [c, s, 0],
        [-s, c, 0],
        [0, 0, 1]
    ]);
}

function AT2D_Scaling(kx, ky) {
    return new Matrix([
        [kx, 0, 0],
        [0, ky, 0],
        [0, 0, 1]
    ]);
}

function AT2D_Mapping(x = 1, y = 1) {
    return new Matrix([
        [x, 0, 0],
        [0, y, 0],
        [0, 0, 1]
    ]);
}
