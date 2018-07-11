"use strict";
var mod = module.exports = {};
mod.BUTTONS = {
    LEFT : 0,
    UP : 1,
    RIGHT : 2,
    DOWN : 3,
    JUMP : 4,
    RESET : 5,
    SIZE : 6
    
};

mod.mappings = [];
mod.mappings[0] = [];
let map0 = mod.mappings[0]
map0[37] = mod.BUTTONS.LEFT;
map0[38] = mod.BUTTONS.UP;
map0[39] = mod.BUTTONS.RIGHT;
map0[40] = mod.BUTTONS.DOWN;
map0[90] = mod.BUTTONS.JUMP;
map0[82] = mod.BUTTONS.RESET;
