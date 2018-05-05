var Game = Game||{};

Game.Managers = (function(mod){
	function WallManager(){
		this.instances=[];
	}
	WallManager.prototype.create = function(x,y){
		this.instances.push(new Wall(x,y));
	}
	WallManager.prototype.step = function(dt){
		this.instances.forEach(
			function(each){
				each.STEP(dt);
			}
		)
	}
	
	var sprite = new Mocho.Sprite(Game.images.tiles
								  ,0,0,16,16
								  ,0,0,16,16);
	
	function canvas2dContextDraw(ctx){
		this.instances.forEach(
			function(each){
				sprite.draw(ctx,each.x,each.y);
			}
		)
	}
	
	WallManager.prototype.render = canvas2dContextDraw;
	
	function Wall (x,y){
		this.x=x;
		this.y=y;
		this.w = 16;
		this.h = 16;
	}
	//global events
	Wall.prototype.STEP = function(dt){};
	Wall.prototype.onCollision = function(other){}
	
	mod.WallManager = WallManager;
	
	/*	
	this.x += this.vx*dt + 0.5*this.ax*dt*dt;
	this.y += this.vy*dt + 0.5*this.ay*dt*dt;

	this.vx += this.ax*dt;
	this.vy += this.ay*dt;  
	*/
	return mod;
})(Game.Managers||{});