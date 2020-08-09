import React, { useRef, useEffect } from 'react';

var Node = /** @class */ (function () {
    function Node() {
        /** Position x in canvas */
        this.x = 0;
        /** Position y in canvas */
        this.y = 0;
        /** Velocity of x */
        this.vx = 0;
        /** Velocity of y */
        this.vy = 0;
    }
    return Node;
}());

var Tendril = /** @class */ (function () {
    function Tendril(options) {
        this.spring = 0;
        this.friction = 0.5;
        this.dampening = 0.25;
        this.tension = 0.98;
        this.nodes = [];
        this.targetRef = { current: { x: 0, y: 0 } };
        this.nodes = [];
        this.spring = (options.spring || 0) + Math.random() * 0.1 - 0.05;
        this.friction = (options.friction || 0) + Math.random() * 0.01 - 0.005;
        this.dampening = options.dampening || 0;
        this.tension = options.tension || 0;
        this.canvasRef = options.canvasRef;
        this.targetRef = options.targetRef || this.targetRef;
        for (var i = 0, node = void 0; i < (options.size || 0); i++) {
            node = new Node();
            node.x = this.targetRef.current.x || 0;
            node.y = this.targetRef.current.y || 0;
            this.nodes.push(node);
        }
    }
    Tendril.prototype.update = function () {
        var _a;
        var spring = this.spring;
        var node = this.nodes[0];
        var target = ((_a = this.targetRef) === null || _a === void 0 ? void 0 : _a.current) || { x: 0, y: 0 };
        node.vx += (target.x - node.x) * spring;
        node.vy += (target.y - node.y) * spring;
        for (var prev = void 0, i = 0, n = this.nodes.length; i < n; i++) {
            node = this.nodes[i];
            if (i > 0) {
                prev = this.nodes[i - 1];
                node.vx += (prev.x - node.x) * spring;
                node.vy += (prev.y - node.y) * spring;
                node.vx += prev.vx * this.dampening;
                node.vy += prev.vy * this.dampening;
            }
            node.vx *= this.friction;
            node.vy *= this.friction;
            node.x += node.vx;
            node.y += node.vy;
            spring *= this.tension;
        }
    };
    Tendril.prototype.draw = function () {
        if (!this.canvasRef.current) {
            return;
        }
        var ctx = this.canvasRef.current.getContext('2d');
        var x = this.nodes[0].x;
        var y = this.nodes[0].y;
        var a;
        var b;
        ctx.beginPath();
        ctx.moveTo(x, y);
        for (var i = 1, n = this.nodes.length - 2; i < n; i++) {
            a = this.nodes[i];
            b = this.nodes[i + 1];
            x = (a.x + b.x) * 0.5;
            y = (a.y + b.y) * 0.5;
            ctx.quadraticCurveTo(a.x, a.y, x, y);
        }
        a = this.nodes[i];
        b = this.nodes[i + 1];
        ctx.quadraticCurveTo(a.x, a.y, b.x, b.y);
        ctx.stroke();
        ctx.closePath();
    };
    return Tendril;
}());

var HueOscillator = /** @class */ (function () {
    function HueOscillator(options) {
        this.value = 0;
        this.phase = options.phase || 0;
        this.offset = options.offset || 0;
        this.frequency = options.frequency || 0.001;
        this.amplitude = options.amplitude || 1;
    }
    HueOscillator.prototype.update = function () {
        this.phase += this.frequency;
        this.value = this.offset + Math.sin(this.phase) * this.amplitude;
        return this.value;
    };
    return HueOscillator;
}());

function DancingLines(props) {
    var _a = props.debug, debug = _a === void 0 ? false : _a, _b = props.friction, friction = _b === void 0 ? 0.5 : _b, _c = props.trails, trails = _c === void 0 ? 20 : _c, _d = props.size, size = _d === void 0 ? 50 : _d, _e = props.dampening, dampening = _e === void 0 ? 0.25 : _e, _f = props.tension, tension = _f === void 0 ? 0.98 : _f;
    var canvasRef = useRef(null);
    var targetRef = useRef({ x: 0, y: 0 });
    var tendrilsRef = useRef([]);
    var runningRef = useRef(false);
    var frameRef = useRef(0);
    var hue = new HueOscillator({
        phase: Math.random() * Math.PI * 2,
        amplitude: 85,
        frequency: 0.0015,
        offset: 285,
    });
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (fn) {
            window.setTimeout(fn, 1000 / 60);
        };
    var init = function (event) {
        debug && console.log('init');
        document.removeEventListener('mousemove', init);
        document.removeEventListener('touchstart', init);
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('touchmove', mousemove);
        document.addEventListener('touchstart', touchstart);
        mousemove(event);
        reset();
        loop();
    };
    /**
     * Reset all the tendrils
     */
    var reset = function () {
        debug && console.log('reset');
        var tendrils = [];
        for (var i = 0; i < trails; i++) {
            tendrils.push(new Tendril({
                spring: 0.45 + 0.025 * (i / trails),
                size: size,
                tension: tension,
                dampening: dampening,
                friction: friction,
                targetRef: targetRef,
                canvasRef: canvasRef,
            }));
        }
        tendrilsRef.current = tendrils;
    };
    /**
     * Loop the colors of tendrils
     */
    var loop = function () {
        debug && console.log('loop');
        if (!runningRef.current || !canvasRef.current)
            return;
        var ctx = canvasRef.current.getContext('2d');
        var tendrils = tendrilsRef.current;
        var frame = frameRef.current;
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(8,5,16,0.4)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalCompositeOperation = 'lighter';
        ctx.strokeStyle = 'hsla(' + Math.round(hue.update()) + ',90%,50%,0.25)';
        ctx.lineWidth = 1;
        if (frame % 60 == 0) {
            debug && console.log(hue.update(), Math.round(hue.update()), hue.phase, hue.offset, hue.frequency, hue.amplitude);
        }
        for (var i = 0, tendril = void 0; i < trails; i++) {
            tendril = tendrils[i];
            tendril.update();
            tendril.draw();
        }
        frameRef.current = frame + 1;
        requestAnimationFrame(loop);
    };
    /**
     * Adjust canvas size when the window gets resized
     */
    var resize = function () {
        debug && console.log('resize');
        if (!canvasRef.current) {
            return;
        }
        var ctx = canvasRef.current.getContext('2d');
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    };
    /**
     * Start to loop the animation
     */
    var start = function () {
        debug && console.log('start');
        if (!runningRef.current) {
            runningRef.current = true;
            loop();
        }
    };
    /**
     * Stop the running state
     */
    var stop = function () {
        debug && console.log('stop');
        runningRef.current = false;
    };
    var mousemove = function (event) {
        debug && console.log('mousemove');
        if (event instanceof TouchEvent) {
            targetRef.current.x = event.touches[0].pageX;
            targetRef.current.y = event.touches[0].pageY;
        }
        else {
            targetRef.current.x = event.clientX;
            targetRef.current.y = event.clientY;
        }
        event.preventDefault();
    };
    var touchstart = function (event) {
        debug && console.log('touchstart');
        if (event.touches.length == 1) {
            targetRef.current.x = event.touches[0].pageX;
            targetRef.current.y = event.touches[0].pageY;
        }
    };
    /**
     * Attach all events to window object
     */
    useEffect(function () {
        debug && console.log('useEffect');
        if (!canvasRef.current) {
            return;
        }
        runningRef.current = true;
        frameRef.current = 1;
        document.addEventListener('mousemove', init);
        document.addEventListener('touchstart', init);
        document.body.addEventListener('orientationchange', resize);
        window.addEventListener('resize', function () { return resize; });
        window.addEventListener('focus', function () { return start; });
        window.addEventListener('blur', stop);
        resize();
        return function () {
            document.removeEventListener('mousemove', init);
            document.removeEventListener('touchstart', init);
            document.body.removeEventListener('orientationchange', resize);
            window.removeEventListener('resize', function () { return resize; });
            window.removeEventListener('focus', function () { return start; });
            window.removeEventListener('blur', stop);
        };
    }, [canvasRef.current]);
    var styles = {
        position: 'fixed',
        zIndex: -100,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        cursor: 'none',
    };
    return React.createElement("canvas", { ref: canvasRef, style: styles });
}

export default DancingLines;
//# sourceMappingURL=index.es.js.map
