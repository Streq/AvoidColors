"use strict";
var Mocho = require("./../../Dependencies/Mocho");
var loadImagesPromise = require("./../Resources/loadImages");
var Input = require("../Input/input").BUTTONS;

var Dude = (function(){
	var DIRECTION = {
		LEFT : -1,
		RIGHT : 1,
	}
	var frameTime = 150;
	
	var sheet,
		tileset,
		ANIMATION;
	loadImagesPromise.then((images)=>{//initialize these mfs after loading is done
		sheet = images.sheet2;
		tileset = 
			new Mocho.animation.TileSheet
				( sheet
				, sheet.width
				, sheet.height
				, 16
				, 16
				);
		
		ANIMATION = 
			{ IDLE : 
				new Mocho.animation.AnimationFrameSet
					( tileset
					, 0 + 4*0
					, 1
					, "repeat"
					)
			, RUNNING :
				new Mocho.animation.AnimationFrameSet
					( tileset
					, 0 + 8*7//, 0 + 4*1
					, 6//, 4
					, "repeat"
					)
			, AIRBORN : 
				new Mocho.animation.AnimationFrameSet
					( tileset
					, 1 + 8*2//, 1 + 4*2
					, 1
					, "repeat"
					)
			};
	});
	var State = class {
		constructor(){}
		
		update(instance,dt){}
		render(instance,ctx){
			let dir = instance.direction;
			ctx.scale(dir,1);
			let pos = (instance.x-instance.ox) * dir + 8*(dir-1);
			this.animation
				.getCurrentFrame()
				.draw(ctx,Math.floor(pos),Math.floor(instance.y-instance.oy));
			ctx.setTransform(1, 0, 0, 1, 0, 0);
		}
		
		moveLeft(instance){}
		moveRight(instance){}
		moveUp(instance){}
		moveDown(instance){}
		jump(instance){}

	}
	var STATE = {
		IDLE : (function(){
			var m = 
				class extends State{
					constructor(){
						super();
						this.animation = new Mocho.animation.Animation(ANIMATION.IDLE,frameTime);
					}
					update(instance, dt){
						this.animation.update(dt);
						instance.vx = (Math.abs(instance.vx) > 0.0001)*(instance.vx * 0.75);
						if(!instance.floored){
							instance.state=new STATE.AIRBORN();
						}
					}
					moveLeft(instance){
						instance.direction = DIRECTION.LEFT;
						instance.state = new STATE.RUNNING();
					}
					moveRight(instance){
						instance.direction = DIRECTION.RIGHT;
						instance.state = new STATE.RUNNING();
					}
					jump(instance){
						let st=new STATE.AIRBORN();
						st.keepRunning = this.keepRunning;
						instance.state = st;
						instance.vy = -instance.jumpSpeed;
					}
				}
			
			return m;
		})(),

		RUNNING : (function(){
			var m =
				class extends State{
					constructor(){
						super();
						this.animation = new Mocho.animation.Animation(ANIMATION.RUNNING,frameTime);
						this.keepRunning = true;
					}
					update(instance, dt){
						this.animation.update(dt);
						if(!this.keepRunning){
							instance.state = new STATE.IDLE();
						} else {
							instance.vx = instance.speed * instance.direction;
						}
						if(!instance.floored){
							instance.state=new STATE.AIRBORN();
						}
						this.keepRunning = false;
					}
					moveLeft(instance){
						instance.direction = DIRECTION.LEFT;
						this.keepRunning = true;
					}
					moveRight(instance){
						instance.direction = DIRECTION.RIGHT;
						this.keepRunning = true;
					}
					jump(instance){
						let st=new STATE.AIRBORN();
						st.keepRunning = this.keepRunning;
						instance.state = st;
						instance.vy = -instance.jumpSpeed;
					}
				}
			return m;
		})(),
		
		JUMPING : undefined,
		AIRBORN : (function(){
			var m =
				class extends State{
					constructor(){
						super();
						this.animation = new Mocho.animation.Animation(ANIMATION.AIRBORN,frameTime);
						this.jumps = 1;	
					}
					update(instance, dt){
						this.animation.update(dt);
						if(instance.floored){
							if(this.keepRunning){
								instance.state = new STATE.RUNNING();
							}else{
								instance.state = new STATE.IDLE();
							}
						}
						if(this.keepRunning){
							instance.vx = instance.speed * instance.direction;
						}else{
							instance.vx = (Math.abs(instance.vx) > 0.0001)*(instance.vx * 0.9);
						}
						this.keepRunning = false;
					}
					moveLeft(instance){
						instance.direction = DIRECTION.LEFT;
						this.keepRunning = true;
					}
					moveRight(instance){
						instance.direction = DIRECTION.RIGHT;
						this.keepRunning = true;
					}
					jump(instance){
						if(this.jumps > 0){
							instance.vy = -instance.jumpSpeed;
							--this.jumps;
						}
					}
				}
			return m;
		})()

	};

	class Dude{
		constructor(x,y){
			this.x = x;
			this.y = y;
			this.vx = 0;
			this.vy = 0;

			this.state = new STATE.IDLE(this);
			this.direction = DIRECTION.RIGHT;

			this.floored = false;
		}
		
		step(dt){
			this.state.update(this,dt);
			this.vy += this.fallAcceleration * dt;
			
			this.x += this.vx * dt;
			this.y += this.vy * dt;
			//if(this.vy <= 0 && this.vy > -this.fallAcceleration){console.log(this.y);}
		}
		
		render(ctx){
			this.state.render(this,ctx);
		}
		
		moveLeft(){this.state.moveLeft(this);}
		moveRight(){this.state.moveRight(this);}
		moveUp(instance){this.state.moveUp(this);}
		moveDown(instance){this.state.moveDown(this);}
		jump(instance){this.state.jump(this);}
	}
	Dude.prototype.speed = 100/1000;
	Dude.prototype.jumpSpeed = 300/1000;
	Dude.prototype.fallAcceleration = 1/1000;
	Dude.prototype.ox = 3;
	Dude.prototype.oy = 3;
	Dude.prototype.w = 10;
	Dude.prototype.h = 10;
	return Dude;
})();
function DudeManager(){
	this.instances=[];
}
DudeManager.prototype.create = function(x,y){
	var ret = new Dude(x,y);
	this.instances.push(ret);
	return ret;
}
DudeManager.prototype.step = function(dt){
	this.instances.forEach(
		function(each){
			each.step(dt);
		}
	)
}


function canvas2dContextDraw(ctx){
	this.instances.forEach(
		function(each){
			each.render(ctx);
		}
	)
}

DudeManager.prototype.render = canvas2dContextDraw;


module.exports = DudeManager;
