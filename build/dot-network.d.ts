/**
 * 画布的参数设置
*/
declare class CanvasSettings {
    /**
     * 所创建的画布对象的id
    */
    canvasId: string;
    zIndex: number;
    opacity: number;
    color: string;
    /**
     * 点的数量
    */
    n: number;
}
/**
 * 画布上面的一个移动的点的模型
*/
declare class dot {
    /**
     * 当前的位置``x``
    */
    x: number;
    /**
     * 当前的位置``y``
    */
    y: number;
    xa: number;
    ya: number;
    max: number;
}
declare module network {
    /**
     * 运行这个网络画布
     *
     * @param containerId Canvas所进行显示的目标div的id编号，如果这个编号为空值，则默认显示在整个body上面
     * @param settings 配置参数
    */
    function run(containerId?: string, settings?: CanvasSettings): void;
}
