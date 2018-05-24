"use strict";
(function(){

	class StaticMap(){
		constructor(tileSize, width){
			this.ts = tileSize;
			this.entities = [];
			this.width = width;
		}
		
		checkMovement(x,y,w,h,dx,dy){
			let x0, x1, y0, y1,
				xr, yr, wr, hr,
				xr0, yr0, xr1, yr1,
				lambda, e, closestCol;
			
			//get movement box
			xr = Math.min(x, x + dx);
			yr = Math.min(y, y + dy);
			wr = w + Math.abs(dx);
			hr = h + Math.abs(dy);
			
			//get movement tile-range
			xr0 = Math.floor(xr/ts)*ts;
			yr0 = Math.floor(xr/ts)*ts;
			xr1 = Math.floor((xr+wr)/ts)*ts+1;
			yr1 = Math.floor((yr+hr)/ts)*ts+1;
			
			
			//checkTiles in path
			lambda = 1;
			for(var j = yr0; j < yr1; ++j){
				for(var i = xr0; i < xr1; ++i){
					e = entities[j*width+i];
					if(!e)continue;
					newLambda = Mocho.Collision.boxBoxMovingLambda(x, y, w, h, i*this.ts + e.ox, j*this.ts + e.oy, e.w, e.h, dx, dy);
					if(newLambda<lambda){
						closestCol = e;
						lambda = newLambda;
					}
				}
			}
			return {
				wall: closestCol,
				lambda: lambda
			}
		}
		
		
		
		
		
	}
	
})();