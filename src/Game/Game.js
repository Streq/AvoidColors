"use strict";
var Mocho = require("../Mocho");
class Game{
	constructor(){
		this.context = 
			{ canvas: null
			, ctx: null
			, resources: 
				{ images: null
				, texts: null
				, data:
					{ levels: []
					}
				}
			};
		this.stack = null;
	}
	run(){
		var game = this;
		Promise.resolve()
			.then(()=>loadResources.call(game))
			.then(()=>loadState.call(game))
			.then(()=>startLoop.call(game));
	}
}


//privates
function loadResources(){
	return Promise.all(
		loadImages().then(imgs=>this.context.resources.images = imgs),
		loadTexts().then(texts=>this.context.resources.texts = texts),
		loadDom().then(dom=>{
			this.context.canvas = dom.canvas;
			this.context.ctx = dom.ctx;
		})
	);
}

function loadState(){
	/*TODO*/
}

function startLoop(){
	this.context.loop = new Mocho.loop.Loop
		( () => {}
		, (dt) => {this.stack.update(dt);}
		, () => {this.stack.render();}
		, 60
		);
}
function loadImages(){
	/*TODO mover el objeto sourcemap a un json*/
	var sourcemap = {
		"player": "Assets/Images/player.png",
		"tiles": "Assets/Images/tiles.png",
		"font": "Assets/Images/font8x8.png"
	};
	//creamos un array con las rutas de las imagenes
	var srcs = [];
	for(name in sourcemap){
		srcs.push(sourcemap[name]);
	}
	//cargamos las imagenes
	return Mocho.load.loadImages(srcs).then(
		(imgs)=>{
			var ret = {};
			//asignamos las imagenes a las propiedades especificadas en el sourcemap
			for(name in sourcemap){
				ret[name] = imgs[sourcemap[name]];
			}
			return ret;
		}
	);
}

function loadTexts(){
	return Mocho.load.loadJSON("Assets/JSON/Text/text.json");
}

function loadDom(){
	return new Promise(
		(resolve)=>{
			var canvas = document.createElement("canvas");
			canvas.width = 480;
			canvas.height = 320;
			canvas.tabIndex = 1;
			canvas.addEventListener("focus",(event)=>Mocho.input.avoidArrowKeyScroll(canvas));
			canvas.addEventListener("blur",(event)=>Mocho.input.allowArrowKeyScroll(canvas));
			document.body.appendChild(canvas);

			var ctx = canvas.getContext("2d");
			resolve({canvas: canvas, ctx: ctx});
		}
	)
}

module.exports = Game;