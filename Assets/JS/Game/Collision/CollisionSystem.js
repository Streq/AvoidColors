"use strict";
(function(){

	function CollisionSystem(){
		this.terrainBoxes = [];
		this.dynamicBoxes = [];
		//this.hurtBoxes = [];
		//this.hitBoxes = [];
	}
	CollisionSystem.prototype.handleCollisions(){
		this.terrainBoxes.forEach(
			function(s){
				this.dynamicBoxes.forEach(
					function(d){
						if(Mocho.Collision.boxBoxMoving(
							s.x,s.y,s.w,s.h,
							d.x,d.y,d.w,d.h,
							-s.dx + d.dx, -s.dy + d.dy
						)){
							s.controller.onCollision(d.controller);
							d.controller.onCollision(s.controller);
						}
					}
				);
			}
		);
	}

	function Box(controller, x, y, w, h, dx, dy){
		this.controller = controller;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.dx = dx;
		this.dy = dy;
	};

	var TerrainBox = Box;
	var DynamicBox = Box;
	
})();