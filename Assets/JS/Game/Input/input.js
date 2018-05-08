var Game = (function(smod){
	smod.Input = (function(mod){
		mod.BUTTONS = {
			LEFT : 0,
			UP : 1,
			RIGHT : 2,
			DOWN : 3,
			JUMP : 4,
            SIZE : 5
            
		};
		
		mod.mappings = [];
        mod.mappings[0] = [];
        let map0 = mod.mappings[0]
		map0[37] = mod.BUTTONS.LEFT;
		map0[38] = mod.BUTTONS.UP;
		map0[39] = mod.BUTTONS.RIGHT;
        map0[40] = mod.BUTTONS.DOWN;
		map0[90] = mod.BUTTONS.JUMP;
		
        
		mod.eventQueue = Mocho.makeEventQueue(); 
        mod.mappings.forEach(
            function(map,i){
                var filterPress=function(event){
                    //si es una tecla configurada retornar esa tecla mapeada
                    let code = map[event.keyCode];
                    if(code != null){
                        return {
                            player : i,
                            code : code,
                            pressed : true,
                        };
                    }
                    //si no retornar null
                    return null;
                };
                var filterRelease=function(event){
                    //si es una tecla configurada retornar esa tecla mapeada
                    let code = map[event.keyCode];
                    if(code != null){
                        return {
                            player : i,
                            code : code,
                            pressed : false,
                        };
                    }
                    //si no retornar null
                    return null;
                };
                
                Mocho.addListener(mod.eventQueue, canvas,"keydown",filterPress);
                Mocho.addListener(mod.eventQueue, canvas,"keyup",filterRelease);
            }
        );
		
        mod.state = new mod.State();
		
        function update(){
            var queue = this.eventQueue;
			queue.swapBuffer();
			
            this.state.stale();
			this.state.carryFromLastFrame();
            while(!queue.isEmpty()){
				var key = queue.dequeue();
                this.state.update(key.code,key.pressed);
			}	
		}
		
		mod.update = update;
		
		return mod;
		
	})(smod.Input||{});
	return smod;
})(Game||{})