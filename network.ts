module network {

    var uCanvas: HTMLCanvasElement = document.createElement("canvas");
    var uContext: CanvasRenderingContext2D = uCanvas.getContext("2d");
    var f: dot = <dot>{
        x: null, y: null, max: 20000
    }

    /**
     * ``[width, height]``
    */
    var size: number[] = [0, 0];
    var dots: dot[] = [];
    var setting: CanvasSettings;
    var frameRender: (callback: FrameRequestCallback) => number

    function getTag(tagName: string): Element {
        return document.getElementsByTagName(tagName)[0];
    }

    function canvasResize() {
        uCanvas.width = window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        uCanvas.height = window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;

        size = [uCanvas.width, uCanvas.height];
    }

    function update() {
        var w = [f].concat(dots);
        var x, v, A, B, z, y;

        uContext.clearRect(0, 0, size[0], size[1]);
        dots.forEach(function (i: dot) {
            i.x += i.xa;
            i.y += i.ya;
            i.xa *= i.x > size[0] || i.x < 0 ? -1 : 1;
            i.ya *= i.y > size[1] || i.y < 0 ? -1 : 1;

            uContext.fillRect(i.x - 0.5, i.y - 0.5, 1, 1);

            for (v = 0; v < w.length; v++) {
                x = w[v];

                if (i !== x && null !== x.x && null !== x.y) {
                    B = i.x - x.x;
                    z = i.y - x.y;
                    y = B * B + z * z;

                    y < x.max && (
                        x === f && y >= x.max / 2 && (i.x -= 0.03 * B, i.y -= 0.03 * z),
                        A = (x.max - y) / x.max,
                        uContext.beginPath(),
                        uContext.lineWidth = A / 2,
                        uContext.strokeStyle = `rgba(${setting.color}, ${A + 0.2})`,
                        uContext.moveTo(i.x, i.y),
                        uContext.lineTo(x.x, x.y),
                        uContext.stroke()
                    )
                }
            };

            w.splice(w.indexOf(i), 1);
        })

        frameRender(update);
    }

    function defaultCallback(callback: FrameRequestCallback): number {
        window.setTimeout(callback, 1000 / 45);
        return 0;
    }

    function registerDevice() {
        frameRender = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            (<any>window).mozRequestAnimationFrame ||
            (<any>window).oRequestAnimationFrame ||
            (<any>window).msRequestAnimationFrame ||
            defaultCallback;

        window.onresize = canvasResize;
        window.onmousemove = function (i: MouseEvent) {
            i = i || <MouseEvent>window.event;
            f.x = i.clientX;
            f.y = i.clientY;
        };
        window.onmouseout = function () {
            f.x = null;
            f.y = null;
        };
    }

    export function run(settings: CanvasSettings = <CanvasSettings>{
        canvasId: "canvas-network-display",
        zIndex: -1,
        opacity: 1,
        color: "0,104,183",
        n: 299
    }) {

        setting = settings;
        uCanvas.id = `canvas_${settings.canvasId}`;
        uCanvas.style.cssText = `position:fixed; top:0; left:0; z-index: ${settings.zIndex}; opacity: ${settings.opacity}`;
        getTag("body").appendChild(uCanvas);

        canvasResize();
        registerDevice();

        for (var p: number = 0; settings.n > p; p++) {
            var w = Math.random() * size[0];
            var h = Math.random() * size[1];
            var q = 2 * Math.random() - 1;
            var d = 2 * Math.random() - 1;

            dots.push(<dot>{
                x: w,
                y: h,
                xa: q,
                ya: d,
                max: 10000
            });
        }

        setTimeout(update, 100);
    }
}