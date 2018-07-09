"use strict";
var Game = require("../Global/global");
var Mocho = require("../../Dependencies/Mocho")
var Game = (function(mod){
	function updateManagers(dt){
		this.managers.forEach(
			function(each){
				each.step(dt);
			}
		);
	}
	
	function checkDudeWall(dude,wall,dt){
		if(Mocho.collision.boxBoxMoving
			( dude.x, dude.y, dude.w, dude.h
			, wall.x, wall.y, wall.w, wall.h
			, -dude.vx * dt, -dude.vy * dt
			)
		)
		{
			let dx = dude.vx * dt;
			let dy = dude.vy * dt;
			
			var side = mocho.collision.boxBoxSideOfCollision
				( dude.x - dx, dude.y - dy, dude.w, dude.h
				, wall.x, wall.y, wall.w, wall.h
				, dx , dy
				);

			const skin = 0.00;
			//right
			if(side.x>0){
				dude.x = wall.x-dude.w -skin; dude.vx=0;
			}
			//left
			if(side.x<0){
				dude.x = wall.x+wall.w +skin; dude.vx=0;
			}
			//top
			if(side.y>0){
				dude.y = wall.y-dude.h -skin; dude.vy=0; dude.floored = true;
			}
			//bot
			if(side.y<0){
				dude.y = wall.y+wall.h +skin; dude.vy=0;
			}
			
		}
	}
	
	function checkDudeWallH(dude,wall,dt){
		const skin = 0.00;
		const freedom = 0.00;
		if(Mocho.collision.boxBoxMoving
			( dude.x, dude.y, dude.w, dude.h
			, wall.x+freedom, wall.y, wall.w-freedom*2, wall.h
			, -dude.vx * dt, -dude.vy * dt
			)
		)
		{
			let dx = dude.vx * dt;
			let dy = dude.vy * dt;
			
			var side = Mocho.collision.boxBoxSideOfCollision
				( dude.x - dx, dude.y - dy, dude.w, dude.h
				, wall.x, wall.y, wall.w, wall.h
				, dx , dy
				);

			//right
			if(side.x>0){
				dude.x = wall.x-dude.w -skin; dude.vx=0;
			}
			//left
			if(side.x<0){
				dude.x = wall.x+wall.w +skin; dude.vx=0;
			}
			
		}
	}
	function checkDudeWallV(dude,wall,dt){
		const skin = 0.00;
		const freedom = 0.00;
		if(Mocho.collision.boxBoxMoving
			( dude.x, dude.y, dude.w, dude.h
			, wall.x, wall.y+freedom, wall.w, wall.h-freedom*2
			, -dude.vx * dt, -dude.vy * dt
			)
		)
		{
			let dx = dude.vx * dt;
			let dy = dude.vy * dt;
			
			var side = Mocho.collision.boxBoxSideOfCollision
				( dude.x - dx, dude.y - dy, dude.w, dude.h
				, wall.x, wall.y, wall.w, wall.h
				, dx , dy
				);

			//top
			if(side.y>0){
				dude.y = wall.y-dude.h -skin; dude.vy=0; dude.floored = true;
			}
			//bot
			if(side.y<0){
				dude.y = wall.y+wall.h +skin; dude.vy=0;
			}
			
		}
	}
	
	function checkDudeLava(dude,lava,dt){
		if(Mocho.collision.boxBoxMoving
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
			dudes.forEach(
				(dude)=>{
					dude.floored = false;
					let vy,dy,vx,dx;
					
					//move vertically
					vx = dude.vx;
					dx = dude.vx*dt;
					dude.x -= dx;
					dude.vx = 0;
					walls.forEach((ctner)=>ctner.forEach((wall)=>checkDudeWallV(dude,wall,dt)));
					dude.x += dx;
					dude.vx = vx;
					
					//move horizontally
					vy = dude.vy;
					dy = dude.vy*dt;
					dude.y -= dy;
					dude.vy = 0;
					walls.forEach((ctner)=>ctner.forEach((wall)=>checkDudeWallH(dude,wall,dt)));
					dude.y += dy;
					dude.vy = vy;
					
					//check lava
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