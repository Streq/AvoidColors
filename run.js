"use strict";
var Game = require("./src/Game/Global/global");
var Mocho = require("./src/Dependencies/Mocho");
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
		}
	).then(
		()=>{
			require("./src/Game/Setup/dom");
			require("./src/Game/Input/state");
			require("./src/Game/Input/input");
			require("./src/Game/Resources/ImageHolder");
			require("./src/Game/Objects/Wall");
			require("./src/Game/Objects/Lava");
			require("./src/Game/Objects/Dude");
			require("./src/Game/Objects/Portal");
			require("./src/Game/World/World");
			require("./Game");
		}
	).then(
		()=>Game.run()
	);
