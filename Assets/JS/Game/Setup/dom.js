"use strict";
var Game = ((mod)=>{
    let canvas = document.createElement("canvas");
    canvas.width = 480;
    canvas.height = 320;
    canvas.tabIndex = 1;
    canvas.addEventListener("focus",(event)=>Mocho.avoidArrowKeyScroll(canvas));
    canvas.addEventListener("blur",(event)=>Mocho.allowArrowKeyScroll(canvas));
    document.body.appendChild(canvas);

    mod.canvas = canvas;
    mod.ctx = canvas.getContext("2d");
    return mod;
})(Game||{});