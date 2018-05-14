var Game = (function(mod){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
    mod.canvas = canvas;
    mod.ctx = ctx;
	var world = new Game.World();
	world.DudeManager = new Game.Managers.DudeManager();
	world.managers.push(world.DudeManager);
	
	world.WallManager=new Game.Managers.WallManager();
	world.managers.push(world.WallManager);
	
	world.LavaManager=new Game.Managers.LavaManager();
	world.managers.push(world.LavaManager);
	
    var su = 16;//space unit
	
    let type_wall = Game.Managers.WallManager.TYPE.BLOCK;
	let type_tile = Game.Managers.WallManager.TYPE.TILE;
	let type_lilblock = Game.Managers.WallManager.TYPE.LITTLE_BLOCK;
	var walls = 
        [ [0 ,12, type_wall]
        , [1 ,12, type_wall]
        , [2 ,12, type_wall]
        , [3 ,12, type_wall]
        , [4 ,12, type_wall]
        , [5 ,12, type_wall]
        , [6 ,12, type_tile]
        , [7 ,12, type_tile]
        , [11,11, type_lilblock]
        , [15,11, type_lilblock]
        , [19,10, type_lilblock]
        , [9 ,5 , type_lilblock]
        , [14,5 , type_lilblock]
        ];
	
	let type_sur = Game.Managers.LavaManager.TYPE.SURFACE;
	let type_in = Game.Managers.LavaManager.TYPE.INNER;
	var lavas = 
		[ [0 ,19]
        , [1 ,19]
        , [2 ,19]
        , [3 ,19]
        , [4 ,19]
        , [5 ,19]
        , [6 ,19]
        , [7 ,19] 
        , [8 ,19]
        , [9 ,19], [9 ,8 ,type_in],[9 ,7] 
        , [10,19], [10,8 ,type_in],[10,7]
        , [11,19], [11,8 ,type_in],[11,7]
		, [12,19], [12,8 ,type_in],[12,7]
        , [13,19], [13,8 ,type_in],[13,7]
        , [14,19], [14,8 ,type_in],[14,7]
        , [15,19]
        , [16,19]
        , [17,19]
        , [18,19]
        , [19,19]
        , [20,19]
        , [21,19]
        , [22,19]
        , [23,19]
        , [24,19]
        , [25,19]
        , [26,19]
        , [27,19]
        , [28,19]
        , [29,19]
        ];
    var player = [2,11];
	Game.reset = function(){
		pj.x = player[0]*su;
		pj.y = player[1]*su;
		pj.vx = 0;
		pj.vy = 0;
	}
	var pj;
    var loop = new Mocho.Loop(
		function(onload){
			pj = world.DudeManager.create(player[0]*su,player[1]*su);
			walls.forEach(
                function(e){
                    world.WallManager.create(e[0]*su,e[1]*su,e[2]);
                }
            )
			lavas.forEach(
                function(e){
                    world.LavaManager.create(e[0]*su,e[1]*su,e[2]);
                }
            )
            onload();
		},
		function(dt){
			Game.Input.update();
            //InputController.update();
            let s = Game.Input.state.s;
            let dir = s[Game.Input.BUTTONS.RIGHT][0] - s[Game.Input.BUTTONS.LEFT][0];
            switch(dir){
                case -1:    
                    pj.moveLeft();
                    break;
                case 1:
                    pj.moveRight();
                    break;
            }
			jumpKey=s[Game.Input.BUTTONS.JUMP];
			if(jumpKey[0] && jumpKey[1]){
				pj.jump();
			}
			if(s[Game.Input.BUTTONS.RESET][0]){
				Game.reset();
			}
			world.update(dt);
		},
		function(){
			ctx.fillStyle="#000000";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			world.render(ctx);
		}
	);

	mod.run = function(){
		loop.run();
	};

	return mod;
})(Game||{})