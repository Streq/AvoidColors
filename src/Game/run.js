"use strict";
var Mocho = require("../Dependencies/Mocho");
var Game = require("./Global/global");
var Game = (function(mod){
	var canvas = mod.canvas;
	var ctx = mod.ctx;
	
    var world = new Game.World();
	
	world.PortalManager=new Game.Managers.PortalManager();
	world.managers.push(world.PortalManager);
	
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
        , [1 ,11, type_wall]
        , [2 ,12, type_wall], [2 , 9, type_wall]
        , [3 ,12, type_wall]
        , [4 ,12, type_wall]
        , [9 ,12, type_wall]
        , [21,3 , type_wall]
        , [21,4 , type_wall]
        , [21,5 , type_wall]
        , [21,6 , type_wall]
        , [20,7 , type_wall]
        , [13,11, type_lilblock]
        , [17,11, type_lilblock]
        , [21,10, type_lilblock]
        , [11,5 , type_lilblock]
        , [16,5 , type_lilblock]
        ];
	
	let type_sur = Game.Managers.LavaManager.TYPE.SURFACE;
	let type_in = Game.Managers.LavaManager.TYPE.INNER;
	var lavas = 
		[ [0 ,19]
        , [1 ,19]
        , [2 ,19]
        , [3 ,19], [ 8, 8,type_in], [ 8,7]
        , [4 ,19], [ 9, 8,type_in], [ 9,7]
        , [8 ,19], [10, 8,type_in], [10,7]
        , [9 ,19], [11, 8,type_in], [11,7] 
        , [10,19], [12, 8,type_in], [12,7]
        , [11,19], [13, 8,type_in], [13,7]
		, [12,19], [14, 8,type_in], [14,7]
        , [13,19], [15, 8,type_in], [15,7]
        , [14,19], [16, 8,type_in], [16,7]
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
        , [5 ,19, type_in]
        , [5 ,18, type_in]
        , [5 ,17, type_in]
        , [5 ,16, type_in]
        , [5 ,15, type_in]
        , [5 ,14, type_in]
        , [5 ,13, type_in]
        , [5 ,12, type_in]
        , [5 ,11, type_in]
        , [5 ,10, type_in]
        , [5 , 9, type_in]
        , [5 , 8, type_in]
        , [5 , 7]
        , [7 ,19, type_in]
        , [7 ,18, type_in]
        , [7 ,17, type_in]
        , [7 ,16, type_in]
        , [7 ,15, type_in]
        , [7 ,14, type_in]
        , [7 ,13, type_in]
        , [7 ,12, type_in]
        , [7 ,11, type_in]
        , [7 ,10, type_in]
        , [7 , 9, type_in]
        , [7 , 8, type_in]
        , [7 , 7]
        
        ];
	var portal = [2,8];
    var player = [9,11];
	Game.reset = function(){
		pj.x = player[0]*su;
		pj.y = player[1]*su;
		pj.vx = 0;
		pj.vy = 0;
	}
	var pj;
	var prt;
    var loop = new Mocho.loop.Loop(
		function(){
			pj = world.DudeManager.create(player[0]*su,player[1]*su);
			prt = world.PortalManager.create(portal[0]*su,portal[1]*su);
			walls.forEach(
                function(e){
                    world.WallManager.create(e[0]*su,e[1]*su,e[2]);
                }
            );
			lavas.forEach(
                function(e){
                    world.LavaManager.create(e[0]*su,e[1]*su,e[2]);
                }
            );
		},
		function(dt){
			let jumpKey, s, dir;
			Game.Input.update();
            //InputController.update();
            s = Game.Input.state.s;
            dir = s[Game.Input.BUTTONS.RIGHT][0] - s[Game.Input.BUTTONS.LEFT][0];
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
		},60
	);
	//loop.timeFactor = 0.1;
	mod.run = function(){
		loop.run();
	};
	mod.loop=loop;

	return mod;
})(Game||{})