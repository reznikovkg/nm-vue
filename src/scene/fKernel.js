export default function fKernel(_polygons, _polygonsLength) {
    const matrixTransform00 = this.constants.matrixTransform00;
    const matrixTransform10 = this.constants.matrixTransform10;
    const matrixTransform20 = this.constants.matrixTransform20;

    const matrixTransform01 = this.constants.matrixTransform01;
    const matrixTransform11 = this.constants.matrixTransform11;
    const matrixTransform21 = this.constants.matrixTransform21;


    const positionOfCamera0 = this.constants.positionOfCamera0;
    const positionOfCamera1 = this.constants.positionOfCamera1;
    const positionOfCamera2 = this.constants.positionOfCamera2;

    const centerX = this.constants.centerX;
    const centerY = this.constants.centerY;
    const scalePx = this.constants.scalePx;
    const scalePy = this.constants.scalePy;

    const coordsX =  (this.thread.x - centerX + 0.5) / scalePx;
    const coordsY =  -( this.thread.y - centerY + 0.5) / scalePy;
    const coordsZ = 0;

    /**
     * вектор направления луча от камеры в пиксель экрана
     * @type {number[]}
     */
    const ray = [
        matrixTransform00*coordsX + matrixTransform01*coordsY - positionOfCamera0,
        matrixTransform10*coordsX + matrixTransform11*coordsY - positionOfCamera1,
        matrixTransform20*coordsX + matrixTransform21*coordsY - positionOfCamera2,
        1
    ];


    let colorNow = [
        255,
        255,
        255,
    ];

    let distance = 99999;

    //цикл по полигонам
    for (let k = 0; k < _polygonsLength; k++) {

        const point1 = _polygons[k][0][0];
        const point2 = _polygons[k][0][1];

        console.log(point1,point2)

        //найти плоскость по точкам полигона

        //найти точку пересечения ray и плоскости

        //проверить точку на принадлежность полигону

        //если принадлежит
        if (true) {

            //вычислить расстояние от точки до камеры
            //если меньше чем distance то заменить на цвет полигона и новое расстояние
        }
    }


    this.color(
        (this.thread.x > 255) ? 1 : this.thread.x/255,
        (this.thread.y > 255) ? 1 : this.thread.y/255,
        0);
};
