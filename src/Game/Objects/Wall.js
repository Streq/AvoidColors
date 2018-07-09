"use strict";
var Game = require("./../Global/global");
var Mocho = require("./../../Dependencies/Mocho");
Game.Managers = (function(mod){
	class WallManager{
		constructor(){
			this.instances = [];
		}
		
		create(x, y, type){
			type = type || 0;
			let inst = this.instances[type] = this.instances[type] || [];
			var ret = WallManager.factory[type](x,y);
			inst.push(ret);
			return ret;
		}
		
		step(dt){
			this.instances.forEach(
				function(eachContainer){
					eachContainer.forEach(
						function(each){
							each.STEP(dt);
						}
					)
				}
			);
		}
	}
	WallManager.TYPE=
	{
		BLOCK : 0,
		TILE : 1,
		LITTLE_BLOCK : 2,
	};
	WallManager.factory = []
	WallManager.factory[WallManager.TYPE.BLOCK] = function(x,y){
		return new Wall(x,y);
	}
	WallManager.factory[WallManager.TYPE.TILE] = function(x,y){
		var ret = new Wall(x,y);
		ret.h = 4;
		return ret;
	}
	WallManager.factory[WallManager.TYPE.LITTLE_BLOCK] = function(x,y){
		var ret = new Wall(x,y);
		ret.h = 8;
		ret.w = 8;
		return ret;
	}
	var sprites = []
	sprites[WallManager.TYPE.BLOCK] = new Mocho.animation.Sprite( Game.images.tiles
		 , 0, 0, 16, 16
		 , 0, 0, 16, 16);
	sprites[WallManager.TYPE.TILE] = new Mocho.animation.Sprite( Game.images.tiles
		 , 16, 0, 16, 16
		 , 0, 0, 16, 16);
	sprites[WallManager.TYPE.LITTLE_BLOCK] = new Mocho.animation.Sprite( Game.images.tiles
		 , 16*8, 0, 16, 16
		 , 0, 0, 16, 16);
	
	function canvas2dContextDraw(ctx){
		this.instances.forEach(
			function(eachContainer,type){
				eachContainer.forEach(
					function(each){
						sprites[type].draw(ctx,each.x,each.y);
					}
				)
			}
		)
	}
	
	WallManager.prototype.render = canvas2dContextDraw;
	
	class Wall {
		constructor(x,y){
			this.x=x;
			this.y=y;
			this.w = 16;
			this.h = 16;
		}
		STEP(dt){}
		onCollision(other){}
	}
	//global events
	mod.WallManager = WallManager;
	
	/*	
	this.x += this.vx*dt + 0.5*this.ax*dt*dt;
	this.y += this.vy*dt + 0.5*this.ay*dt*dt;

	this.vx += this.ax*dt;
	this.vy += this.ay*dt;  
	*/
	return mod;
})(Game.Managers||{});