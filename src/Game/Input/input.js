"use strict";
var Mocho = require("../../Dependencies/Mocho");
var State = require("./state");
var Buttons = require("./buttons");

var mod = module.exports = {};

mod.BUTTONS = Buttons.BUTTONS;
mod.mappings = Buttons.mappings;
let map0 = mod.mappings[0];

mod.eventQueue = Mocho.input.makeEventQueue(); 

let filterFactory = function(pressed,player){
    return function(event){
        //si es una tecla configurada retornar esa tecla mapeada
        let code = map0[event.keyCode];
        if(code != null){
            return {
                player : player,
                code : code,
                pressed : pressed,
            };
        }
        //si no retornar null
        return null;
    };
};
var dom = require("../Setup/dom");
mod.eventQueue.listen(dom.canvas, "keydown", filterFactory(true, 0));
mod.eventQueue.listen(dom.canvas, "keyup", filterFactory(false, 0));


mod.state = new State();

function update(){
    var queue = this.eventQueue;
    queue.swapBuffer();
    
    this.state.stale();
    this.state.carryFromLastFrame();
    while(!queue.isEmpty()){
        var key = queue.dequeue();
        this.state.update(key.code, key.pressed);
    }	
}

mod.update = update;