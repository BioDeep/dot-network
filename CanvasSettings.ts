/**
 * 画布的参数设置
*/
class CanvasSettings {

    /**
     * 所创建的画布对象的id
    */
    public canvasId: string;
    public zIndex: number;
    public opacity: number;
    public color: string;

    /**
     * 点的数量
    */
    public n: number;
}

/**
 * 画布上面的一个移动的点的模型
*/
class dot {

    /**
     * 当前的位置``x``
    */
    public x: number;
    /**
     * 当前的位置``y``
    */
    public y: number;
    public xa: number;
    public ya: number;
    public max: number;
}