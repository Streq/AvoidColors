var Game = (function(mod){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	var world = new Game.World();
	world.DudeManager = new Game.Managers.DudeManager();
	world.managers.push(world.DudeManager);
	
	world.WallManager=new Game.Managers.WallManager();
	world.managers.push(world.WallManager);
	
	var loop = new Mocho.Loop(
		function(onload){
			world.DudeManager.create(32,32);
			world.WallManager.create(0,80);
			world.WallManager.create(16,80);
			world.WallManager.create(32,80);
			world.WallManager.create(80,128);
			onload();
		},
		function(dt){
			Game.Input.update();
			world.update(dt);
		},
		function(){
			ctx.fillStyle="black";
			ctx.fillRect(0,0,canvas.width,canvas.height);
			world.render(ctx);
		}
	);

	mod.run = function(){
		loop.run();
	};

	return mod;
})(Game||{})