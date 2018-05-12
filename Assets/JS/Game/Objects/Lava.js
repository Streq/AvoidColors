var Game = Game||{};

Game.Managers = (function(mod){
	class LavaManager{
		constructor(){
			this.instances=[];
		}
		
		create(x,y){
			var ret = new Lava(x,y);
			this.instances.push(ret);
			return ret;
		}
		
		 step(dt){
			this.instances.forEach(
				function(each){
					each.STEP(dt);
				}
			)
		}
	}
	
	var sprite = new Mocho.Sprite( Game.images.tiles
								 , 16, 16, 16, 16
								 , 0, 0, 16, 16);
	
	function canvas2dContextDraw(ctx){
		this.instances.forEach(
			function(each){
				sprite.draw(ctx,each.x,each.y);
			}
		)
	}
	
	LavaManager.prototype.render = canvas2dContextDraw;
	
	function Lava (x,y){
		this.x=x;
		this.y=y;
		this.w = 16;
		this.h = 16;
	}
	//global events
	Lava.prototype.STEP = function(dt){};
	Lava.prototype.onCollision = function(other){}
	
	mod.LavaManager = LavaManager;

	return mod;
})(Game.Managers||{});