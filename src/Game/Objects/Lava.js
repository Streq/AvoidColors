"use strict";
var Mocho = require("./../../Dependencies/Mocho");
var loadImagesPromise = require("./../Resources/loadImages");
class LavaManager{
	constructor(){
		this.instances = [];
	}
	
	create(x, y, type){
		type = type || 0;
		let inst = this.instances[type] = this.instances[type] || [];
		var ret = LavaManager.factory[type](x,y);
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

LavaManager.TYPE = 
{
	SURFACE : 0,
	INNER : 1,
}
LavaManager.factory = []
LavaManager.factory[LavaManager.TYPE.SURFACE] = function(x,y){
	var ret = new Lava(x,y);
	ret.h -= 3;
	ret.y += 3;
	return ret;
}
LavaManager.factory[LavaManager.TYPE.INNER] = function(x,y){
	return new Lava(x,y);
}

var sprites = [];
loadImagesPromise.then((images)=>{//initialize these mfs after loading
	sprites[LavaManager.TYPE.INNER] =
	new Mocho.animation.Sprite( images.tiles
						, 16, 16, 16, 16
						, 0, 0, 16, 16);
	sprites[LavaManager.TYPE.SURFACE] =
		new Mocho.animation.Sprite( images.tiles
							, 0, 16, 16, 16
							, 0, -3, 16, 16);

})

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

LavaManager.prototype.render = canvas2dContextDraw;
class Lava{
	constructor (x,y) {
		this.x = x;
		this.y = y;
		this.w = 16;
		this.h = 16;
	}
	STEP(dt){}
	onCollision(other){}
}
module.exports = LavaManager;
