var Game = (function(smod){
	smod.Input = (function(mod){
		mod.BUTTONS = {
			LEFT : 0,
			UP : 1,
			RIGHT : 2,
			DOWN : 3,
			JUMP : 4,
            
		};
		
		mod.state = {
			left : false,
			up : false,
			right : false,
			down : false,
		};
		
		mod.mappings = [];
		mod.mappings[37] = mod.BUTTONS.LEFT;
		mod.mappings[38] = mod.BUTTONS.UP;
		mod.mappings[39] = mod.BUTTONS.RIGHT;
		mod.mappings[40] = mod.BUTTONS.DOWN;
		mod.mappings[90] = mod.BUTTONS.JUMP;
		
		var filter=function(event){
			var pressed = (event.type=="keydown");
			//si es una tecla configurada retornar esa tecla mapeada
			let code = mod.mappings[event.keyCode];
            if(code != null){
                return {
                    code : code,
                    pressed : pressed,
                };
            }
			//si no retornar null
			return null;
		};
		mod.eventQueue = Mocho.makeEventQueue(canvas,["keydown","keyup"],filter); 
		
		function update(){
			var queue = this.eventQueue;
			queue.swapBuffer();
			while(!queue.isEmpty()){
				var key = queue.dequeue();
				
				switch(key.code){
					case mod.BUTTONS.LEFT:
						this.state.left = key.pressed;
						break;
					case mod.BUTTONS.UP:
						this.state.up = key.pressed;
						break;
					case mod.BUTTONS.DOWN:
						this.state.down = key.pressed;
						break;
					case mod.BUTTONS.RIGHT:
						this.state.right = key.pressed;
						break;
				}
			}	
		}
		
		mod.update = update;
		
		return mod;
		
	})(smod.Input||{});
	return smod;
})(Game||{})