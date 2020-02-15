import Matrix from './../math/Matrix';

function identity() {
    return new Matrix([
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]);
}

function translation(x, y, z) {
    return new Matrix([
        [1, 0, 0, x],
        [0, 1, 0, y],
        [0, 0, 1, z],
        [0, 0, 0, 1]
    ]);
}

function rotationXDeg(phi) {
    return new Matrix([
        [1, 0, 0, 0],
        [0, Math.cos(phi), -Math.sin(phi), 0],
        [0, Math.sin(phi), Math.cos(phi), 0],
        [0, 0, 0, 1]
    ]);
}

function rotationYDeg(phi) {
    return new Matrix([
        [Math.cos(phi), 0, Math.sin(phi), 0],
        [0, 1, 0, 0],
        [-Math.sin(phi), 0, Math.cos(phi), 0],
        [0, 0, 0, 1]
    ]);
}

function rotationZDeg(phi) {
    return new Matrix([
        [Math.cos(phi), -Math.sin(phi), 0, 0],
        [Math.sin(phi), Math.cos(phi), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]);
}


function scaling(kx, ky, kz) {
    return new Matrix([
        [kx, 0, 0, 0],
        [0, ky, 0, 0],
        [0, 0, kz, 0],
        [0, 0, 0, 1]
    ]);
}

function mapping(x = 1, y = 1, z = 1) {
    return new Matrix([
        [x, 0, 0, 0],
        [0, y, 0, 0],
        [0, 0, z, 0],
        [0, 0, 0, 1]
    ]);
}
export {
    identity,
    translation,
    rotationXDeg,
    rotationYDeg,
    rotationZDeg,
    scaling,
    mapping
};