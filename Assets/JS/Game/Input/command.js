var Game = Game||{};
Game.Input = (function(mod){
    var Commander = function(){};
    Commander.prototype.handleInput = function(input){
        let dir = input.right - input.left;
        switch(dir){
            case -1:    
                this.moveLeft();
                break;
            case 1:
                this.moveRight();
                break;
        }
        
    };
})(Game.Input||{});
