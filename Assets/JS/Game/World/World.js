var Game = (function(mod){
	function updateManagers(dt){
		this.managers.forEach(
			function(each){
				each.step(dt);
			}
		);
	}
	
	class World {
		constructor(){
			this.managers = [];
		}
		
		update(dt){
			updateManagers.call(this,dt);
			var dudes = this.DudeManager.instances;
			var walls = this.WallManager.instances;
			var lavas = this.LavaManager.instances;
			dudes.forEach(
				function(d){
					d.floored = false;
					walls.forEach(
						function(each){
							each.forEach(
								function(w){
									if(Mocho.Collision.boxBoxMoving(d.x,d.y,d.w,d.h
																   ,w.x,w.y,w.w,w.h
																   ,-d.vx * dt, -d.vy * dt))
										{
											if(d.y<w.y&&d.vy>0){//TODO: fix this dumbass logic
												d.y = w.y-d.h;
												d.vy = 0;
												d.floored = true;
											}
										}
								}
							)
						}
					)
					lavas.forEach(
						function(each){
							each.forEach(
								function(w){
									if(Mocho.Collision.boxBoxMoving(d.x,d.y,d.w,d.h
																   ,w.x,w.y,w.w,w.h
																   ,-d.vx * dt, -d.vy * dt))
										{
											Game.reset();
										}
								}
							)
						}
					)
				}
			);
		}
		
		render(ctx){
			this.managers.forEach(
				function(each){
					each.render(ctx);
				}
			)
		}
	}
	
	mod.World = World;
	
	return mod;
	
})(Game||{});