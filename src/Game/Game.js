"use strict";
var Mocho = require("../Mocho");
var StateStack = Mocho.state.StateStack;
var State = Mocho.state.State;
var EventQueue = Mocho.input.EventQueue;

/**@typedef {Object} Context
 * @property {HTMLCanvasElement} canvas
 * @property {CanvasRenderingContext2D} ctx
 * @property {EventQueue} eventQueue
 * @property {Object} resources
 */

class Game{
	constructor(){
		/**@type {Context} */
		this.context = 
			{ canvas: null
			, ctx: null
			, eventQueue: null
			, resources: 
				{ images: null
				, texts: null
				, data:
					{ levels: []
					}
				}
			};
		/**@type {StateStack} */
		this.stack = new StateStack();
		this.stack.context=this.context;
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
function loadState(){
	/**@type Game*/
	var game = this;
	game.context.eventQueue = Mocho.input.makeEventQueue(game.context.canvas,["keydown","keyup"]);
	//Some mock gameState
	class GameState extends State{
		constructor(stack, appContext){
			super(stack,appContext);
			this.x = 0;
			this.y = 0;
			this.counter = 0;
			this.reset = false;
		}
		/**@param {KeyboardEvent} event*/
		handleEvent(event){
			if(event.type == "keydown" && event.code == "KeyR"){
				this.reset = true;
			}
		}
		render(){
			/**@type Context */
			var context = this.context,
				ctx = context.ctx,
				canvas = context.canvas,
				width = canvas.width,
				height = canvas.height;
				
				ctx.drawImage(context.resources.images.player,0,0,16,16,Math.floor(this.x),Math.floor(this.y),16,16);
				
				if(this.reset){
					ctx.fillStyle = canvas.style.backgroundColor;
					ctx.fillRect(0,0,width,height);
					this.reset = false;
				}
		}
		update(dt){
			/**@type Context */
			var context = this.context,
				ctx = context.ctx,
				width = context.canvas.width,
				height = context.canvas.height;
			
			this.counter+=dt;
			while(this.counter>1000/60){
				this.counter-=1000/60;
				this.x = Math.random() * (width-16);
				this.y = Math.random() * (height-16);
			}
			return true;
		}
	}

	game.stack.states.push(new GameState(game.stack,game.context));

}

function loadResources(){
	return Promise.all([
		loadImages().then(imgs=>this.context.resources.images = imgs),
		loadTexts().then(texts=>this.context.resources.texts = texts),
		loadDom().then(dom=>{
			this.context.canvas = dom.canvas;
			this.context.ctx = dom.ctx;
		})
	]);
}


function startLoop(){
	/**@type Game */
	let game = this;
	let loop = new Mocho.loop.Loop
		( () => {}
		, (dt) => {
			game.context.eventQueue.processEvents((event)=>{
				game.stack.handleEvent(event);
			});
			game.stack.update(dt);
		}
		, () => {this.stack.render();}
		, 60
		);
	this.context.loop = loop;
	loop.run();
	
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
			canvas.style.backgroundColor="black";
			canvas.addEventListener("focus",(event)=>Mocho.input.avoidArrowKeyScroll(canvas));
			canvas.addEventListener("blur",(event)=>Mocho.input.allowArrowKeyScroll(canvas));
			document.body.appendChild(canvas);

			var ctx = canvas.getContext("2d");
			resolve({canvas: canvas, ctx: ctx});
		}
	)
}

module.exports = Game;