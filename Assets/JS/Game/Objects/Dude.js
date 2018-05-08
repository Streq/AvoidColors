var Game = Game||{};

Game.Managers = (function(mod){

	var Dude = (function(){
		var DIRECTION = {
			LEFT : -1,
			RIGHT : 1,
		}

		var ANIMATION = {
			IDLE : undefined,
			RUNNING : undefined,
		}

		var Input = Game.Input.BUTTONS;

		var STATE = {
			IDLE : (function(){
				function m(instance){
				}
				function handleInput(instance, input){
					let dir = input.right - input.left;
                    switch(dir){
                        case -1:    
                            this.moveLeft(instance);
                            break;
                        case 1:
                            this.moveRight(instance);
                            break;
                    }
				}
				function update(instance, dt){}
                m.prototype.moveLeft = function(instance){
                    instance.direction = DIRECTION.LEFT;
                    instance.state = new STATE.RUNNING();
                };
				m.prototype.moveRight = function(instance){
                    instance.direction = DIRECTION.RIGHT;
                    instance.state = new STATE.RUNNING();
                };
				m.prototype.moveUp = function(){};
				m.prototype.moveDown = function(){};
                m.prototype.jump = function(){};
				
				m.prototype.handleInput = handleInput;
				m.prototype.update = update;
                return m;
			})(),

			RUNNING : (function(){
				function m(){
					this.keepRunning = true;
				}
				function handleInput(instance, input){
					let dir = input.right - input.left;
                    switch(dir){
                        case -1:    
                            this.moveLeft(instance);
                            break;
                        case 1:
                            this.moveRight(instance);
                            break;
                    }
                    
				}
				function update(instance, dt){
					if(!this.keepRunning){
						instance.state = new STATE.IDLE();
					} else {
						instance.x += instance.speed * instance.direction * dt; 
						this.keepRunning = false;
					}
				}
                m.prototype.moveLeft = function(instance){
                    instance.direction = DIRECTION.LEFT;
                    this.keepRunning = true;
                };
				m.prototype.moveRight = function(instance){
                    instance.direction = DIRECTION.RIGHT;
                    this.keepRunning = true;
                };
				m.prototype.moveUp = function(){};
				m.prototype.moveDown = function(){};
                m.prototype.jump = function(){};
				
				m.prototype.handleInput = handleInput;
				m.prototype.update = update;
				return m;
			})(),

			JUMPING : undefined,
			AIRBORN : undefined,

		};


		function Dude(x,y){
			this.x = x;
			this.y = y;

			this.state = new STATE.IDLE(this);
			this.direction = DIRECTION.RIGHT;
		}
		Dude.prototype.step = function(dt){
			//this.animation.update(dt);
			this.state.update(this,dt);
		}
		Dude.prototype.handleInput = function (input){
			this.state.handleInput(this,input);
		};

		Dude.prototype.speed = 100/1000;
		Dude.prototype.jumpSpeed = 300/1000;
		Dude.prototype.fallSpeed = 200/1000;

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
	
	var sprite = new Mocho.Sprite(Game.images.sheet
								  ,0,0,16,16
								  ,0,0,16,16);
	
	function canvas2dContextDraw(ctx){
		this.instances.forEach(
			function(each){
				sprite.draw(ctx,each.x,each.y);
			}
		)
	}
	
	DudeManager.prototype.render = canvas2dContextDraw;
	
	
	mod.DudeManager = DudeManager;
	return mod;
})(Game.Managers||{});