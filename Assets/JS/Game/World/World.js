var Game = (function(mod){
	function updateManagers(dt){
		this.managers.forEach(
			function(each){
				each.step(dt);
			}
		);
	}
	
	function checkDudeWall(dude,wall,dt){
		if(Mocho.Collision.boxBoxMoving
			( dude.x, dude.y, dude.w, dude.h
			, wall.x, wall.y, wall.w, wall.h
			, -dude.vx * dt, -dude.vy * dt
			)
		)
		{
			if(dude.y<wall.y && dude.vy>0){//TODO: fix this dumbass logic
				dude.y = wall.y-dude.h;
				dude.vy = 0;
				dude.floored = true;
			}
			/*
			var side = Mocho.Collision.boxBoxSideOfCollision
				( d.x-d.vx * dt, d.y-d.vy * dt, d.w,d.h
				, w.x, w.y, w.w, w.h
				, d.vx * dt, d.vy * dt
				);

			if(side.x>0){d.x = w.x-d.w; d.vx=0;}
			if(side.x<0){d.x = w.x+w.w; d.vx=0;}
			if(side.y>0){d.y = w.y-d.h; d.vy=0; d.floored = true;}
			if(side.y<0){d.y = w.y+w.h; d.vy=0;}
			*/
		}
	}
	function checkDudeLava(dude,lava,dt){
		if(Mocho.Collision.boxBoxMoving
			( dude.x, dude.y, dude.w, dude.h
			, lava.x, lava.y, lava.w, lava.h
			, -dude.vx * dt, -dude.vy * dt)
		  )
		{
			Game.reset();
		}
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
			dudes.forEach((dude)=>{
					dude.floored = false;
					walls.forEach((ctner)=>ctner.forEach((wall)=>checkDudeWall(dude,wall,dt)));
					lavas.forEach((ctner)=>ctner.forEach((lava)=>checkDudeLava(dude,lava,dt)));
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