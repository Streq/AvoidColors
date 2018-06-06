"use strict";
var Game = {};
(function(){
	function loadTheFrickinGame(){
		let imgSrcs = 
			[ "Assets/Images/tiles.png"
            , "Assets/Images/simple_sheet.png"
            , "Assets/Images/sheet2.png"];
		let scriptSrcs =
				[ 'math.js'
				, 'dom.js'
				, 'loop.js'
				, 'structs.js'
				, 'animation.js'
				, 'input.js'
				, 'collision.js'
				].map(function(e){return "Assets/JS/Dependencies/mocho."+e;})
			.concat("Assets/JS/Game/Setup/dom.js")
			.concat(
				[ 'state.js'
				, 'input.js'
				].map(function(e){return "Assets/JS/Game/Input/"+e;})
			)
			.concat(["Assets/JS/Game/Resources/ImageHolder.js"])
			.concat(
				[ 'Wall.js'
				, 'Lava.js'
				, 'Dude.js'
				, 'Portal.js'
				].map(function(e){return "Assets/JS/Game/Objects/"+e;})
			)
			.concat(
				[ 'World.js'
				].map(function(e){return "Assets/JS/Game/World/"+e;})
			)
			.concat(
				[ 'Game.js'
				].map(function(e){return ""+e;})
			);
		
        
		Mocho.loadImages(imgSrcs)
			.then(
				(imgs)=>{
					Game.images=Game.images||{};
					Game.images.sheet = imgs["Assets/Images/simple_sheet.png"];
					Game.images.sheet2 = imgs["Assets/Images/sheet2.png"];
					Game.images.tiles = imgs["Assets/Images/tiles.png"];
				}
			)
			.then(() => Mocho.loadScripts(scriptSrcs))
			.then(() => Game.run());
		
	}
	var script = document.createElement("script");
	script.onload = loadTheFrickinGame;
	script.src = "Assets/JS/Dependencies/mocho.load.js";
	document.head.appendChild(script);
})();