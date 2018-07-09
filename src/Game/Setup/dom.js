"use strict";
var Game = require("./../Global/global");
var Mocho = require("./../../Dependencies/Mocho");
var Game = ((mod)=>{
    let canvas = document.createElement("canvas");
    canvas.width = 480;
    canvas.height = 320;
    canvas.tabIndex = 1;
    canvas.addEventListener("focus",(event)=>Mocho.input.avoidArrowKeyScroll(canvas));
    canvas.addEventListener("blur",(event)=>Mocho.input.allowArrowKeyScroll(canvas));
    document.body.appendChild(canvas);

    mod.canvas = canvas;
    mod.ctx = canvas.getContext("2d");
    return mod;
})(Game||{});