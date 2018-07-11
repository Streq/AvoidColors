"use strict";
var Mocho = require("./../../Dependencies/Mocho");
var loadImagesPromise = require("./../Resources/loadImages");
//Game.Managers = (function(mod){
	class PortalManager{
		constructor(){
			this.instances = [];
		}
		
		create(x, y, type){
			type = type || 0;
			var ret = new Portal(x,y);
			this.instances.push(ret);
			return ret;
		}
		
		step(dt){
			animation.update(dt);
			this.instances.forEach(
				function(each){
					each.STEP(dt);
				}
			);
		}
	}
	var sheet,
		tileset,
		animationfs,
		animation;
	loadImagesPromise.then((images)=>{
		sheet = images.tiles;
		
		tileset = 
			new Mocho.animation.TileSheet
				( sheet
				, sheet.width
				, sheet.height
				, 16
				, 16
				);
		animationfs = new Mocho.animation.AnimationFrameSet
				( tileset
				, 0 + 2*10
				, 8
				, "repeat"
				);
		animation = new Mocho.animation.Animation(animationfs,100);
	});
	function canvas2dContextDraw(ctx){
		let sprite = animation.getCurrentFrame();
		this.instances.forEach(
			function(each){
				sprite.draw(ctx,each.x,each.y);
			}
		)
			
		
	}
	
	PortalManager.prototype.render = canvas2dContextDraw;
	class Portal{
		constructor (x,y) {
			this.x = x;
			this.y = y;
			this.w = 16;
			this.h = 16;
		}
		STEP(dt){}
		onCollision(other){}
	}
	//mod.PortalManager = PortalManager;
module.exports = PortalManager;
//	return mod;
//})(Game.Managers||{});