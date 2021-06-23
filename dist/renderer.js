"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Renderer = /** @class */ (function () {
    function Renderer(scale) {
        this.scale = scale;
        this.columns = 64;
        this.rows = 32;
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.columns * this.scale;
        this.canvas.height = this.rows * this.scale;
        this.display = new Array(this.columns * this.rows);
    }
    Renderer.prototype.setPixel = function (x, y) {
        // If the pixel is out of screen bounds, wrap it around the opposite side
        if (x > this.columns)
            x -= this.columns;
        if (x < 0)
            x += this.columns;
        if (y > this.rows)
            x -= this.rows;
        if (y < 0)
            x += this.rows;
        var pixelLocation = x + y * this.columns;
        this.display[pixelLocation] ^= 1; // Toggle pixel
        return !this.display[pixelLocation]; //	Return true if a pixel was erased
    };
    Renderer.prototype.clear = function () {
        this.display = new Array(this.columns * this.rows);
    };
    Renderer.prototype.render = function () {
        // Clear canvas every render cycle
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < this.columns * this.rows; i++) {
            // Calculate the x and y positions
            var x = (i % this.columns) * this.scale;
            var y = Math.floor(i / this.columns) * this.scale;
            if (this.display[i]) {
                this.ctx.fillStyle = '#000';
                this.ctx.fillRect(x, y, this.scale, this.scale);
            }
        }
    };
    return Renderer;
}());
exports.default = Renderer;
