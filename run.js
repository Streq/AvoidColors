var Game = {};
(function(){
	function loadTheFrickinGame(){
		Mocho.loadImages(["Assets/Images/tiles.png","Assets/Images/simple_sheet.png"],
			function(imgs){
				Game.images=Game.images||{};
				Game.images.sheet = imgs["Assets/Images/simple_sheet.png"];
				Game.images.tiles = imgs["Assets/Images/tiles.png"];
				loadSrc();
			}
		);
		
		function loadSrc(){
			let srcs =
				[ 'math.js'
				, 'dom.js'
				, 'loop.js'
				, 'structs.js'
				, 'animation.js'
				, 'input.js'
				, 'collision.js'
				].map(function(e){return "Assets/JS/Dependencies/mocho."+e;})
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
			Mocho.loadScripts(srcs,function(){
				Game.run();
			});
		}
	}
	var script = document.createElement("script");
	script.onload = loadTheFrickinGame;
	script.src = "Assets/JS/Dependencies/mocho.load.js";
	document.head.appendChild(script);
	
})();