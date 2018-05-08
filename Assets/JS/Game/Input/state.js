var Game = Game||{};
Game.Input = (function(mod){
    var State = function(){
        var SIZE = mod.BUTTONS.SIZE, i = 0;
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
        var SIZE = mod.BUTTONS.SIZE, i = 0;
        for(; i < SIZE; ++i){
            this.s[i][1] = false;
        }
    }
    State.prototype.carryFromLastFrame = function(){
        var SIZE = mod.BUTTONS.SIZE, i = 0;
        for(; i < SIZE; ++i){
            this.update(i, this.s[i][2]);
        }
    }
    mod.State=State;
    return mod;
})(Game.Input||{});
