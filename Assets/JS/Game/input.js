var Game = (function(smod){
	smod.Input = (function(mod){
		mod.BUTTONS = {
			LEFT : 0,
			UP : 1,
			RIGHT : 2,
			DOWN : 3,
		};
		
		mod.state = {
			left : false,
			up : false,
			right : false,
			down : false,
		};
		
		mod.mappings = [];
		mod.mappings[mod.BUTTONS.LEFT] = 37;
		mod.mappings[mod.BUTTONS.UP] = 38;
		mod.mappings[mod.BUTTONS.RIGHT] = 39;
		mod.mappings[mod.BUTTONS.DOWN] = 40;
		
		var filter=function(event){
			var pressed = (event.type=="keydown"),
				i = 0,
				len = mod.mappings.length;
			//si es una tecla configurada retornar esa tecla mapeada
			for(; i<len; ++i){
				if(event.keyCode == mod.mappings[i]){
					return {
						code : i,
						pressed : pressed,
					};
				}
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