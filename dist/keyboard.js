var Keyboard = /** @class */ (function () {
    function Keyboard() {
        this.KEYMAP = {
            '1': 0x1,
            '2': 0x2,
            '3': 0x3,
            '4': 0xc,
            q: 0x4,
            w: 0x5,
            e: 0x6,
            r: 0xd,
            a: 0x7,
            s: 0x8,
            d: 0x9,
            f: 0xe,
            z: 0xa,
            x: 0x0,
            c: 0xb,
            v: 0xf
        };
        this.keysPressed = [];
        this.onNextKeyPress = null;
        window.addEventListener('keydown', this.onKeyDown.bind(this), false);
        window.addEventListener('keyup', this.onKeyUp.bind(this), false);
    }
    Keyboard.prototype.isKeyPressed = function (key) {
        return this.keysPressed[key];
    };
    Keyboard.prototype.onKeyDown = function (event) {
        var key = this.KEYMAP[event.key];
        this.keysPressed[key] = true;
        if (this.onNextKeyPress && key) {
            this.onNextKeyPress(key);
            this.onNextKeyPress = null;
        }
    };
    Keyboard.prototype.onKeyUp = function (event) {
        var key = this.KEYMAP[event.key];
        this.keysPressed[key] = false;
    };
    return Keyboard;
}());
export default Keyboard;
