"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resta = exports.Suma = void 0;
var Suma = /** @class */ (function () {
    function Suma(firstDigit, secondDigit) {
        this.firstDigit = firstDigit;
        this.secondDigit = secondDigit;
    }
    Suma.prototype.resultado = function () {
        return this.firstDigit + this.secondDigit;
    };
    return Suma;
}());
exports.Suma = Suma;
var Resta = /** @class */ (function () {
    function Resta(firstDigit, secondDigit) {
        this.firstDigit = firstDigit;
        this.secondDigit = secondDigit;
    }
    Resta.prototype.resultado = function () {
        return this.firstDigit - this.secondDigit;
    };
    return Resta;
}());
exports.Resta = Resta;
