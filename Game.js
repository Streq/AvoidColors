var Game = (function(mod){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	var world = new Game.World();
	world.DudeManager = new Game.Managers.DudeManager();
	world.managers.push(world.DudeManager);
	
	world.WallManager=new Game.Managers.WallManager();
	world.managers.push(world.WallManager);
	
    var su = 16;//space unit
    
    var walls =
        [ [0 ,12]
        , [1 ,12]
        , [2 ,12]
        , [3 ,12]
        , [4 ,12]
        , [5 ,12]
        , [6 ,12]
        , [7 ,12]
        , [19,10]
        , [20,10]
        , [21,10]
        , [22,10]
        , [23,10]
        , [24,10]
        , [25,10]
        , [26,10]
        , [27,10]
        , [28,10]
        , [29,10]
        ];
    var player = [2,8];
	var pj;
    var loop = new Mocho.Loop(
		function(onload){
			pj = world.DudeManager.create(player[0]*su,player[1]*su);
			walls.forEach(
                function(e){
                    world.WallManager.create(e[0]*su,e[1]*su);
                }
            )
            onload();
		},
		function(dt){
			Game.Input.update();
            //InputController.update();
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