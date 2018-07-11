"use strict";
var Buttons = require("./buttons");

var BUTTON_ENUM_SIZE = Buttons.BUTTONS.SIZE;

var State = function(){
    var SIZE = BUTTON_ENUM_SIZE, i = 0;
    this.s = [];
    for(; i < SIZE; ++i){
        this.s[i] = [false, false, false];//framePressed, updated, actuallyPressed
    }
};
State.prototype.update = function(code, pressed){
    let key = this.s[code];
    if(key != null){
        key[2] = pressed;
        if(!key[1]){
            key[1] = key[0]!=pressed;
            key[0] = pressed;
        }
    }
};
State.prototype.stale = function(){
    var SIZE = BUTTON_ENUM_SIZE, i = 0;
    for(; i < SIZE; ++i){
        this.s[i][1] = false;
    }
}
State.prototype.carryFromLastFrame = function(){
    var SIZE = BUTTON_ENUM_SIZE, i = 0;
    for(; i < SIZE; ++i){
        this.update(i, this.s[i][2]);
    }
}

module.exports = State;
