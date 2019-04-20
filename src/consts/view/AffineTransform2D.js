import Matrix from './../../classes/math/Matrix';

function identity() {
    return new Matrix([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ]);
}

function translation(x, y) {
    return new Matrix([
        [1, 0, x],
        [0, 1, y],
        [0, 0, 1]
    ]);
}

function rotationDeg(phi) {
    return new Matrix([
        [Math.cos(phi), Math.sin(phi), 0],
        [-Math.sin(phi), Math.cos(phi), 0],
        [0, 0, 1]
    ]);
}

function rotation(c,s) {
    return new Matrix([
        [c, s, 0],
        [-s, c, 0],
        [0, 0, 1]
    ]);
}

function scaling(kx, ky) {
    return new Matrix([
        [kx, 0, 0],
        [0, ky, 0],
        [0, 0, 1]
    ]);
}

function mapping(x = 1, y = 1) {
    return new Matrix([
        [x, 0, 0],
        [0, y, 0],
        [0, 0, 1]
    ]);
}

export {
    identity,
    translation,
    rotationDeg,
    rotation,
    scaling,
    mapping
};