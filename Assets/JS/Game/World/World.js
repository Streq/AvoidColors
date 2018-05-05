var Game = (function(mod){
	function World (){
		this.managers = [];
	}
	function updateManagers(dt){
		this.managers.forEach(
			function(each){
				each.step(dt);
			}
		);
	};
	
	World.prototype.update=function(dt){
		updateManagers.call(this,dt);
	};
	World.prototype.render=function(ctx){
		this.managers.forEach(
			function(each){
				each.render(ctx);
			}
		)
	};
	
	mod.World = World;
	
	return mod;
	
})(Game||{});