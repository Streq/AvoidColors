var Game = (function(smod){
	smod.Input = (function(mod){
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
		
		mod.eventQueue = Mocho.makeEventQueue(); 
        
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
        Mocho.addListener(mod.eventQueue, canvas,"keydown", filterFactory(true, 0));
        Mocho.addListener(mod.eventQueue, canvas,"keyup", filterFactory(false, 0));
        
		
        mod.state = new mod.State();
		
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
		
		return mod;
		
	})(smod.Input||{});
	return smod;
})(Game||{})