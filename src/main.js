"use strict";
var Mocho = require("./Dependencies/Mocho");
var Game = require("./Game/Global/global");
Mocho.load.loadImages(
		[ "Assets/Images/tiles.png"
		, "Assets/Images/simple_sheet.png"
		, "Assets/Images/sheet2.png"
		]
	).then(
		(imgs)=>{
			Game.images=Game.images||{};
			Game.images.sheet = imgs["Assets/Images/simple_sheet.png"];
			Game.images.sheet2 = imgs["Assets/Images/sheet2.png"];
			Game.images.tiles = imgs["Assets/Images/tiles.png"];
			
			require("./Game");
			Game.run();
		}
	);
