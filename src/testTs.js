"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
function log(constructor) {
    console.log(' ------------ start  -------------');
    console.log(' ------------ call constructor  -------------' + constructor.prototype.constructor.name);
    console.log(' ------------ end  -------------');
}
function writable(value) {
    return function (target, propertyKey, descriptor) {
        console.log('www ------------start');
        console.log('www ------------', propertyKey); //greet
        console.log('www', target); //原型
        descriptor.writable = value;
        console.log('www----------------end');
    };
}
//log为类装饰器
var Hello = /** @class */ (function () {
    function Hello(message) {
        this.greeting = message;
    }
    Hello.prototype.greet = function () {
        return 'Hello ' + this.greeting;
    };
    __decorate([
        writable(false)
    ], Hello.prototype, "greet", null);
    Hello = __decorate([
        log
    ], Hello);
    return Hello;
}());
var hello = new Hello('你好啊');
hello.greet();
