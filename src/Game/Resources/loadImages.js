"use strict";
var Mocho = require("../../Dependencies/Mocho");

module.exports = Mocho.load.loadImages(//load the stuff
	[ "Assets/Images/tiles.png"
	, "Assets/Images/simple_sheet.png"
	, "Assets/Images/sheet2.png"
	]
).then(
	(imgs)=>{
		return {
			sheet : imgs["Assets/Images/simple_sheet.png"],
			sheet2 : imgs["Assets/Images/sheet2.png"],
			tiles : imgs["Assets/Images/tiles.png"]
		}
	}
);
