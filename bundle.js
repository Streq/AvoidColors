(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){"use strict";var Mocho=require("./src/Dependencies/Mocho");var Game=require("./src/Game/Global/global");var Game=(function(mod){var canvas=mod.canvas;var ctx=mod.ctx;var world=new Game.World();world.PortalManager=new Game.Managers.PortalManager();world.managers.push(world.PortalManager);world.DudeManager=new Game.Managers.DudeManager();world.managers.push(world.DudeManager);world.WallManager=new Game.Managers.WallManager();world.managers.push(world.WallManager);world.LavaManager=new Game.Managers.LavaManager();world.managers.push(world.LavaManager);var su=16;let type_wall=Game.Managers.WallManager.TYPE.BLOCK;let type_tile=Game.Managers.WallManager.TYPE.TILE;let type_lilblock=Game.Managers.WallManager.TYPE.LITTLE_BLOCK;var walls=[[0,12,type_wall],[1,12,type_wall],[1,11,type_wall],[2,12,type_wall],[2,9,type_wall],[3,12,type_wall],[4,12,type_wall],[9,12,type_wall],[21,3,type_wall],[21,4,type_wall],[21,5,type_wall],[21,6,type_wall],[20,7,type_wall],[13,11,type_lilblock],[17,11,type_lilblock],[21,10,type_lilblock],[11,5,type_lilblock],[16,5,type_lilblock]];let type_sur=Game.Managers.LavaManager.TYPE.SURFACE;let type_in=Game.Managers.LavaManager.TYPE.INNER;var lavas=[[0,19],[1,19],[2,19],[3,19],[8,8,type_in],[8,7],[4,19],[9,8,type_in],[9,7],[8,19],[10,8,type_in],[10,7],[9,19],[11,8,type_in],[11,7],[10,19],[12,8,type_in],[12,7],[11,19],[13,8,type_in],[13,7],[12,19],[14,8,type_in],[14,7],[13,19],[15,8,type_in],[15,7],[14,19],[16,8,type_in],[16,7],[15,19],[16,19],[17,19],[18,19],[19,19],[20,19],[21,19],[22,19],[23,19],[24,19],[25,19],[26,19],[27,19],[28,19],[29,19],[5,19,type_in],[5,18,type_in],[5,17,type_in],[5,16,type_in],[5,15,type_in],[5,14,type_in],[5,13,type_in],[5,12,type_in],[5,11,type_in],[5,10,type_in],[5,9,type_in],[5,8,type_in],[5,7],[7,19,type_in],[7,18,type_in],[7,17,type_in],[7,16,type_in],[7,15,type_in],[7,14,type_in],[7,13,type_in],[7,12,type_in],[7,11,type_in],[7,10,type_in],[7,9,type_in],[7,8,type_in],[7,7]];var portal=[2,8];var player=[9,11];Game.reset=function(){pj.x=player[0]*su;pj.y=player[1]*su;pj.vx=0;pj.vy=0}
var pj;var prt;var loop=new Mocho.loop.Loop(function(){pj=world.DudeManager.create(player[0]*su,player[1]*su);prt=world.PortalManager.create(portal[0]*su,portal[1]*su);walls.forEach(function(e){world.WallManager.create(e[0]*su,e[1]*su,e[2])});lavas.forEach(function(e){world.LavaManager.create(e[0]*su,e[1]*su,e[2])})},function(dt){let jumpKey,s,dir;Game.Input.update();s=Game.Input.state.s;dir=s[Game.Input.BUTTONS.RIGHT][0]-s[Game.Input.BUTTONS.LEFT][0];switch(dir){case-1:pj.moveLeft();break;case 1:pj.moveRight();break}
jumpKey=s[Game.Input.BUTTONS.JUMP];if(jumpKey[0]&&jumpKey[1]){pj.jump()}
if(s[Game.Input.BUTTONS.RESET][0]){Game.reset()}
world.update(dt)},function(){ctx.fillStyle="#000000";ctx.fillRect(0,0,canvas.width,canvas.height);world.render(ctx)},60);mod.run=function(){loop.run()};mod.loop=loop;return mod})(Game||{})},{"./src/Dependencies/Mocho":3,"./src/Game/Global/global":13}],2:[function(require,module,exports){"use strict";var Game=require("./src/Game/Global/global");var Mocho=require("./src/Dependencies/Mocho");Mocho.load.loadImages(["Assets/Images/tiles.png","Assets/Images/simple_sheet.png","Assets/Images/sheet2.png"]).then((imgs)=>{Game.images=Game.images||{};Game.images.sheet=imgs["Assets/Images/simple_sheet.png"];Game.images.sheet2=imgs["Assets/Images/sheet2.png"];Game.images.tiles=imgs["Assets/Images/tiles.png"]}).then(()=>{require("./src/Game/Setup/dom");require("./src/Game/Input/state");require("./src/Game/Input/input");require("./src/Game/Resources/ImageHolder");require("./src/Game/Objects/Wall");require("./src/Game/Objects/Lava");require("./src/Game/Objects/Dude");require("./src/Game/Objects/Portal");require("./src/Game/World/World");require("./Game")}).then(()=>Game.run())},{"./Game":1,"./src/Dependencies/Mocho":3,"./src/Game/Global/global":13,"./src/Game/Input/input":14,"./src/Game/Input/state":15,"./src/Game/Objects/Dude":16,"./src/Game/Objects/Lava":17,"./src/Game/Objects/Portal":18,"./src/Game/Objects/Wall":19,"./src/Game/Resources/ImageHolder":20,"./src/Game/Setup/dom":21,"./src/Game/World/World":22}],3:[function(require,module,exports){"use strict";module.exports=require("./modules")},{"./modules":4}],4:[function(require,module,exports){"use strict";module.exports={animation:require("./mocho.animation"),collision:require("./mocho.collision"),dom:require("./mocho.dom"),input:require("./mocho.input"),load:require("./mocho.load"),loop:require("./mocho.loop"),math:require("./mocho.math"),structs:require("./mocho.structs")}},{"./mocho.animation":5,"./mocho.collision":6,"./mocho.dom":7,"./mocho.input":8,"./mocho.load":9,"./mocho.loop":10,"./mocho.math":11,"./mocho.structs":12}],5:[function(require,module,exports){"use strict";var mod=module.exports
var Mocho=require("./mocho.math");function Sprite(img,topSrc,leftSrc,widthSrc,heightSrc,topDest,leftDest,widthDest,heightDest)
{this.texture=img;this.s={x:topSrc||0,y:leftSrc||0,w:widthSrc||0,h:heightSrc||0};this.d={x:topDest||0,y:leftDest||0,w:widthDest||widthSrc||0,h:heightDest||heightSrc||0}}
mod.Sprite=Sprite;Sprite.prototype.draw=function(ctx,x,y){ctx.drawImage(this.texture,this.s.x,this.s.y,this.s.w,this.s.h,this.d.x+(x||0),this.d.y+(y||0),this.d.w,this.d.h)}
function ImgSheet(img,sizex,sizey){this.texture=img;this.textureSize={x:sizex||img.width,y:sizey||img.height}}
mod.ImgSheet=ImgSheet;function TileSheet(img,sizex,sizey,frameWidth,frameHeight){ImgSheet.call(this,img,sizex,sizey);this.frameSize={x:frameWidth||sizex,y:frameHeight||sizey}
this.rowLength=Math.floor(this.textureSize.x/this.frameSize.x);this.length=this.rowLength*(sizey/frameHeight)}
mod.TileSheet=TileSheet;TileSheet.prototype=Object.create(ImgSheet.prototype);TileSheet.prototype.constructor=TileSheet;TileSheet.prototype.getAt=function(index){var x=index%this.rowLength;var y=Math.floor(index/this.rowLength);return new Sprite(this.texture,x*this.frameSize.x,y*this.frameSize.y,this.frameSize.x,this.frameSize.y,0,0,this.frameSize.x,this.frameSize.y)}
function SpriteSheet(img,sizex,sizey,spriteArray){ImgSheet.call(this,img,sizex,sizey);this.sprites=spriteArray}
mod.SpriteSheet=SpriteSheet;SpriteSheet.prototype.getAt=function(index){return this.sprites[index]}
function AnimationFrameSet(spriteSheet,startIndex,frames,type){this.sheet=spriteSheet;this.startIndex=startIndex;this.frames=frames;switch(type){case "once":this.indexer=Mocho.offsetNoRepeat;break;case "repeat":this.indexer=Mocho.offsetRepeat;break;case "boomerang":this.indexer=Mocho.offsetBoomerang;break;default:this.indexer=Mocho.offsetOnce}}
mod.AnimationFrameSet=AnimationFrameSet;AnimationFrameSet.prototype.getAt=function(index){return this.sheet.getAt(this.startIndex+this.indexer(this.frames,this.startIndex+index))}
function Animation(frameSet,frameTime){this.index=0;this.frameTime=frameTime;this.frameSet=frameSet;this.timeSinceLastUpdate=0}
mod.Animation=Animation;Animation.prototype.update=function(dt){this.timeSinceLastUpdate+=dt;if(this.timeSinceLastUpdate>this.frameTime){var frames=Math.floor(this.timeSinceLastUpdate/this.frameTime);this.index+=frames;this.timeSinceLastUpdate-=this.frameTime*frames}}
Animation.prototype.getCurrentFrame=function(){return this.frameSet.getAt(this.index)}},{"./mocho.math":11}],6:[function(require,module,exports){"use strict";var mod=module.exports;function boxPoint(x,y,w,h,px,py){return((px>x)&&(py>y)&&(px<x+w)&&(py<y+h))}
function boxPointClosed(x,y,w,h,px,py){return((px>=x)&&(py>=y)&&(px<=x+w)&&(py<=y+h))}
function rangeRange(x0,w0,x1,w1){return((x0+w0>x1)&&(x1+w1>x0))}
function boxBox(x0,y0,w0,h0,x1,y1,w1,h1){return((x0+w0>x1)&&(x1+w1>x0)&&(y0+h0>y1)&&(y1+h1>y0))}
function boxBoxCoords(x0a,y0a,x1a,y1a,x0b,y0b,x1b,y1b){return((x1a>x0b)&&(x1b>x0a)&&(y1a>y0b)&&(y1b>y0a))}
function boxContainsBox(x0,y0,w0,h0,x1,y1,w1,h1){return((x0+w0<x1)&&(x1+w1>x0)&&(y0+h0<y1)&&(y1+h1>y0))}
function boxLine(x,y,w,h,a,b,c,d){if(boxPoint(x,y,w,h,a,b)||boxPoint(x,y,w,h,c,d))
{return!0}
return(lineLine(a,b,c,d,x,y,x+w,y)||lineLine(a,b,c,d,x+w,y,x+w,y+h)||lineLine(a,b,c,d,x,y+h,x+w,y+h)||lineLine(a,b,c,d,x,y,x,y+h))}
function boxLineClosed(x,y,w,h,a,b,c,d){if(boxPointClosed(x,y,w,h,a,b)||boxPointClosed(x,y,w,h,c,d))
{return!0}
return(lineLineClosed(a,b,c,d,x,y,x+w,y)||lineLineClosed(a,b,c,d,x+w,y,x+w,y+h)||lineLineClosed(a,b,c,d,x,y+h,x+w,y+h)||lineLineClosed(a,b,c,d,x,y,x,y+h))}
function boxLineLambda(x,y,w,h,a,b,c,d){return(Math.min(lineLineLambda(a,b,c,d,x,y,x+w,y),lineLineLambda(a,b,c,d,x+w,y,x+w,y+h),lineLineLambda(a,b,c,d,x,y+h,x+w,y+h),lineLineLambda(a,b,c,d,x,y,x,y+h)))}
function lineLine(a,b,c,d,p,q,r,s){var det,gamma,lambda;det=(c-a)*(s-q)-(r-p)*(d-b);if(det===0){return!1}else{lambda=((s-q)*(r-a)+(p-r)*(s-b))/det;gamma=((b-d)*(r-a)+(c-a)*(s-b))/det;return(0<lambda&&lambda<1)&&(0<gamma&&gamma<1)}}
function lineLineClosed(a,b,c,d,p,q,r,s){var det,gamma,lambda;det=(c-a)*(s-q)-(r-p)*(d-b);if(det===0){return!1}else{lambda=((s-q)*(r-a)+(p-r)*(s-b))/det;gamma=((b-d)*(r-a)+(c-a)*(s-b))/det;return(0<=lambda&&lambda<=1)&&(0<=gamma&&gamma<=1)}}
function lineLineLambda(a,b,c,d,p,q,r,s){var det,gamma,lambda;det=(c-a)*(s-q)-(r-p)*(d-b);if(det===0){return 1}else{lambda=((s-q)*(r-a)+(p-r)*(s-b))/det;gamma=((b-d)*(r-a)+(c-a)*(s-b))/det;return((0<=lambda&&lambda<1)&&(0<=gamma&&gamma<=1))?lambda:1}}
function boxBoxMovingBroad(x0,y0,w0,h0,x1,y1,w1,h1,dx,dy){return boxBoxCoords(x0+Math.min(0,dx),y0+Math.min(0,dy),x0+w0+Math.max(0,dx),y0+h0+Math.max(0,dy),x1,y1,x1+w1,y1+h1)}
function getBoundingBox(x,y,w,h,dx,dy){return{x:x+Math.min(0,dx),y:y+Math.min(0,dy),w:w+Math.abs(dx),h:h+Math.abs(dy)}}
function getBoundingRange(x,y,w,h,dx,dy){return{x0:x+Math.min(0,dx),y0:y+Math.min(0,dy),x1:x+w+Math.max(0,dx),y1:y+h+Math.max(0,dy)}}
function boxBoxMoving(x0,y0,w0,h0,x1,y1,w1,h1,dx,dy){return(boxBoxMovingBroad.apply(null,arguments)&&boxLineClosed(x0-x1-w1,y0-y1-h1,w0+w1,h0+h1,0,0,-dx,-dy))}
function boxBoxIntersection(x0,y0,w0,h0,x1,y1,w1,h1){var x=Math.max(x0,x1);var y=Math.max(y0,y1)
return!boxBox.apply(null,arguments)?null:{x:x,y:y,w:Math.min(x0+w0,x1+w1)-x,h:Math.min(y0+h0,y1+h1)-y}}
function segmentDistance(x0,w0,x1,w1){return(+(x1>x0+w0)*(x1-x0-w0)-(x0>x1+w1)*(x0-x1-w1))}
function boxBoxShortestWay(x0,y0,w0,h0,x1,y1,w1,h1){return{x:segmentDistance(x0,w0,x1,w1),y:segmentDistance(y0,h0,y1,h1)}}
function boxBoxSideOfCollision(x0,y0,w0,h0,x1,y1,w1,h1,dx,dy){let x,y;if(rangeRange(x0,w0,x1,w1)){y=dy}
else if(rangeRange(y0,h0,y1,h1)){x=dx}
else{let shortest=boxBoxShortestWay.apply(null,arguments);let horizontal_collision=shortest.x/dx>shortest.y/dy;x=horizontal_collision*dx;y=!horizontal_collision*dy}
return{x:x,y:y}}
function boxBoxMovingLambda(x0,y0,w0,h0,x1,y1,w1,h1,dx,dy){return boxLineLambda(x0-x1-w1,y0-y1-h1,w0+w1,h0+h1,0,0,-dx,-dy)}
mod.boxPoint=boxPoint;mod.boxBox=boxBox;mod.lineLine=lineLine;mod.lineLineLambda=lineLineLambda;mod.boxLine=boxLine;mod.boxLineLambda=boxLineLambda
mod.boxBoxMoving=boxBoxMoving;mod.boxBoxMovingLambda=boxBoxMovingLambda;mod.boxBoxSideOfCollision=boxBoxSideOfCollision;mod.boxContainsBox=boxContainsBox;mod.boxBoxIntersection=boxBoxIntersection;mod.getBoundingBox=getBoundingBox;mod.getBoundingRange=getBoundingRange;mod.rangeRange=rangeRange},{}],7:[function(require,module,exports){"use strict";var mod=module.exports;function getLastScript(){var script=document.getElementsByTagName("script");script=script[script.length-1];return script}
function getCurrentScript(){return document.currentScript||getLastScript()}
function getScriptPath(script){var path=script.getAttribute("src");return path.substring(0,path.lastIndexOf('/')+1)}
function insertBefore(el,referenceNode){referenceNode.parentNode.insertBefore(el,referenceNode)}
function insertAfter(el,referenceNode){referenceNode.parentNode.insertBefore(el,referenceNode.nextSibling)}
mod.getCurrentScript=getCurrentScript;mod.insertBefore=insertBefore;mod.insertAfter=insertAfter;mod.getScriptPath=getScriptPath},{}],8:[function(require,module,exports){"use strict";var structs=require("./mocho.structs");var mod=module.exports
class EventQueue extends structs.DBufferQueue{constructor(){super()}
processEvents(processor){this.swapBuffer();while(!this.isEmpty()){processor(this.dequeue())}}
listen(element,type,filter){let queue=this;element.addEventListener(type,function(ev){let transformed=filter?filter(ev):ev;if(transformed!=null){queue.enqueue(transformed)}})}}
function makeEventListenerQueue(element,types,filter){var queue=new EventQueue();if(types!=null){types.forEach(function(type){queue.listen(element,type,filter)})}
return queue}
var preventDefaultArrowKeys=(event)=>{switch(event.keyCode){case 37:case 38:case 39:case 40:event.view.event.preventDefault()}};function avoidArrowKeyScroll(element){element.addEventListener("keydown",preventDefaultArrowKeys)}
function allowArrowKeyScroll(element){element.removeEventListener("keydown",preventDefaultArrowKeys)}
mod.makeEventQueue=makeEventListenerQueue;mod.avoidArrowKeyScroll=avoidArrowKeyScroll;mod.allowArrowKeyScroll=allowArrowKeyScroll;mod.EventQueue=EventQueue},{"./mocho.structs":12}],9:[function(require,module,exports){"use strict";var mod=module.exports;function loadScript(src,onload){onload=onload||(x=>x);return new Promise((resolve)=>{var script=document.createElement("script");script.onload=()=>resolve(onload());script.src=src;document.head.appendChild(script)})}
function loadScriptSync(src,onload){onload=onload||(x=>x);return new Promise((resolve)=>{var script=document.createElement("script");script.async=!1;script.onload=()=>resolve(onload());script.src=src;document.head.appendChild(script)})}
function loadScriptsAsyncChained(srcs,onload){onload=onload||(x=>x);return new Promise((resolve)=>{srcs.reduce((p,src)=>p.then(()=>loadScript(src)),Promise.resolve()).then(()=>resolve(onload()))})}
function loadScriptsAsync(srcs,onload){onload=onload||(x=>x);return Promise.all(srcs.map(src=>loadScript(src))).then(onload)}
function loadScripts(srcs,onload){onload=onload||(x=>x);return Promise.all(srcs.map(src=>loadScriptSync(src))).then(()=>onload())}
function loadImage(src,onload){onload=onload||(x=>x);return new Promise((resolve)=>{var img=document.createElement("img");img.onload=()=>resolve(onload(img));img.src=src})}
function loadImages(srcs,onload){onload=onload||(x=>x);var imgs={};function loadAndAdd(src){return loadImage(src,img=>{imgs[src]=img})}
return Promise.all(srcs.map(loadAndAdd)).then(()=>onload(imgs))}
function loadJSON(src,onload){onload=onload||(x=>x);return fetch(src).then(response=>response.json()).then(json=>onload(json))}
mod.loadScripts=loadScripts;mod.loadScriptsAsyncChained=loadScriptsAsyncChained;mod.loadScriptsAsync=loadScriptsAsync;mod.loadScripts=loadScripts;mod.loadScript=loadScript;mod.loadImage=loadImage;mod.loadImages=loadImages;mod.loadJSON=loadJSON},{}],10:[function(require,module,exports){"use strict";var mod=module.exports;function Clock(){this.lastReset=Date.now();this.restart=function(){var now=Date.now();var ret=now-this.lastReset;this.lastReset=now;return ret}}
function Loop(init,update,render,FPS,renderFPS){this.setFPS(FPS||60);this.init=init;this.update=update;this.render=render;this.renderFPS=renderFPS;this.timeFactor=1;this.timeSinceLastUpdate=0}
Loop.prototype.setFPS=function(x){this.frameTime=1000/x;this.frameSecs=1/x;this.fps=x};Loop.prototype.run=function(){let onload=function(){this.clock=new Clock();this.clock.restart();requestAnimationFrame(this.tick.bind(this))};Promise.resolve().then(this.init.bind(this)).then(onload.bind(this))}
Loop.prototype.tick=function(){this.render(this.frameTime);var dt=this.clock.restart()*this.timeFactor;this.timeSinceLastUpdate+=dt;while(this.timeSinceLastUpdate>=this.frameTime){this.timeSinceLastUpdate-=this.frameTime;this.update(this.frameTime)}
requestAnimationFrame(this.tick.bind(this))};mod.Loop=Loop;mod.Clock=Clock},{}],11:[function(require,module,exports){"use strict";var mod=module.exports;mod.approach=function(val,target,amount){if(val==target)return;if(val<target)return Math.min(val+amount,target);return Math.max(val-amount,target)};mod.toRadians=function(degrees){return degrees*Math.PI/180};mod.toDegrees=function(radians){return radians*180/Math.PI};mod.modulo=function modulo(size,index){return(size+(index%size))%size}
mod.clamp=function clamp(min,max,val){return Math.min(max,Math.max(min,val))}
mod.offsetNoRepeat=function offsetNoRepeat(size,index){return mod.clamp(0,size-1,index)}
mod.offsetRepeat=function offsetRepeat(size,index){return mod.modulo(size,index)}
mod.offsetBoomerang=function offsetBoomerang(size,index){var size2=size*2-2;var index2=mod.modulo(size2,index);return(index2>size-1)?size2-index2:index2}},{}],12:[function(require,module,exports){"use strict";var mod=module.exports;class Queue{constructor(){this.array=[]}
enqueue(el){this.array.push(el)}
dequeue(){return this.array.shift()}
isEmpty(){return this.array.length==0}
length(){return this.array.length}}
class DBufferQueue{constructor(){this.first=new Queue();this.second=new Queue();this.inqueue=this.first;this.outqueue=this.second}
enqueue(el){this.inqueue.enqueue(el)}
dequeue(){return this.outqueue.dequeue()}
swapBuffer(){let aux=this.inqueue;this.inqueue=this.outqueue;this.outqueue=aux}
isEmpty(){return this.outqueue.isEmpty()}}
mod.Queue=Queue;mod.DBufferQueue=DBufferQueue},{}],13:[function(require,module,exports){"use strict";module.exports={}},{}],14:[function(require,module,exports){"use strict";var Game=require("./../Global/global");var Mocho=require("../../Dependencies/Mocho")
var Game=(function(smod){smod.Input=(function(mod){mod.BUTTONS={LEFT:0,UP:1,RIGHT:2,DOWN:3,JUMP:4,RESET:5,SIZE:6};mod.mappings=[];mod.mappings[0]=[];let map0=mod.mappings[0]
map0[37]=mod.BUTTONS.LEFT;map0[38]=mod.BUTTONS.UP;map0[39]=mod.BUTTONS.RIGHT;map0[40]=mod.BUTTONS.DOWN;map0[90]=mod.BUTTONS.JUMP;map0[82]=mod.BUTTONS.RESET;mod.eventQueue=Mocho.input.makeEventQueue();let filterFactory=function(pressed,player){return function(event){let code=map0[event.keyCode];if(code!=null){return{player:player,code:code,pressed:pressed,}}
return null}};mod.eventQueue.listen(Game.canvas,"keydown",filterFactory(!0,0));mod.eventQueue.listen(Game.canvas,"keyup",filterFactory(!1,0));mod.state=new mod.State();function update(){var queue=this.eventQueue;queue.swapBuffer();this.state.stale();this.state.carryFromLastFrame();while(!queue.isEmpty()){var key=queue.dequeue();this.state.update(key.code,key.pressed)}}
mod.update=update;return mod})(smod.Input||{});return smod})(Game||{})},{"../../Dependencies/Mocho":3,"./../Global/global":13}],15:[function(require,module,exports){"use strict";var Game=require("./../Global/global");Game.Input=(function(mod){var State=function(){var SIZE=mod.BUTTONS.SIZE,i=0;this.s=[];for(;i<SIZE;++i){this.s[i]=[!1,!1,!1]}};State.prototype.update=function(code,pressed){let key=this.s[code];if(key!=null){key[2]=pressed;if(!key[1]){key[1]=key[0]!=pressed;key[0]=pressed}}};State.prototype.stale=function(){var SIZE=mod.BUTTONS.SIZE,i=0;for(;i<SIZE;++i){this.s[i][1]=!1}}
State.prototype.carryFromLastFrame=function(){var SIZE=mod.BUTTONS.SIZE,i=0;for(;i<SIZE;++i){this.update(i,this.s[i][2])}}
mod.State=State;return mod})(Game.Input||{})},{"./../Global/global":13}],16:[function(require,module,exports){"use strict";var Game=require("./../Global/global");var Mocho=require("./../../Dependencies/Mocho");Game.Managers=(function(mod){var Dude=(function(){var DIRECTION={LEFT:-1,RIGHT:1,}
var sheet=Game.images.sheet2;var tileset=new Mocho.animation.TileSheet(sheet,sheet.width,sheet.height,16,16);var frameTime=150;var ANIMATION={IDLE:new Mocho.animation.AnimationFrameSet(tileset,0+4*0,1,"repeat"),RUNNING:new Mocho.animation.AnimationFrameSet(tileset,0+8*7,6,"repeat"),AIRBORN:new Mocho.animation.AnimationFrameSet(tileset,1+8*2,1,"repeat")};var Input=Game.Input.BUTTONS;var State=class{constructor(){}
update(instance,dt){}
render(instance,ctx){let dir=instance.direction;ctx.scale(dir,1);let pos=(instance.x-instance.ox)*dir+8*(dir-1);this.animation.getCurrentFrame().draw(ctx,Math.floor(pos),Math.floor(instance.y-instance.oy));ctx.setTransform(1,0,0,1,0,0)}
moveLeft(instance){}
moveRight(instance){}
moveUp(instance){}
moveDown(instance){}
jump(instance){}}
var STATE={IDLE:(function(){var m=class extends State{constructor(){super();this.animation=new Mocho.animation.Animation(ANIMATION.IDLE,frameTime)}
update(instance,dt){this.animation.update(dt);instance.vx=(Math.abs(instance.vx)>0.0001)*(instance.vx*0.75);if(!instance.floored){instance.state=new STATE.AIRBORN()}}
moveLeft(instance){instance.direction=DIRECTION.LEFT;instance.state=new STATE.RUNNING()}
moveRight(instance){instance.direction=DIRECTION.RIGHT;instance.state=new STATE.RUNNING()}
jump(instance){let st=new STATE.AIRBORN();st.keepRunning=this.keepRunning;instance.state=st;instance.vy=-instance.jumpSpeed}}
return m})(),RUNNING:(function(){var m=class extends State{constructor(){super();this.animation=new Mocho.animation.Animation(ANIMATION.RUNNING,frameTime);this.keepRunning=!0}
update(instance,dt){this.animation.update(dt);if(!this.keepRunning){instance.state=new STATE.IDLE()}else{instance.vx=instance.speed*instance.direction}
if(!instance.floored){instance.state=new STATE.AIRBORN()}
this.keepRunning=!1}
moveLeft(instance){instance.direction=DIRECTION.LEFT;this.keepRunning=!0}
moveRight(instance){instance.direction=DIRECTION.RIGHT;this.keepRunning=!0}
jump(instance){let st=new STATE.AIRBORN();st.keepRunning=this.keepRunning;instance.state=st;instance.vy=-instance.jumpSpeed}}
return m})(),JUMPING:undefined,AIRBORN:(function(){var m=class extends State{constructor(){super();this.animation=new Mocho.animation.Animation(ANIMATION.AIRBORN,frameTime);this.jumps=1}
update(instance,dt){this.animation.update(dt);if(instance.floored){if(this.keepRunning){instance.state=new STATE.RUNNING()}else{instance.state=new STATE.IDLE()}}
if(this.keepRunning){instance.vx=instance.speed*instance.direction}else{instance.vx=(Math.abs(instance.vx)>0.0001)*(instance.vx*0.9)}
this.keepRunning=!1}
moveLeft(instance){instance.direction=DIRECTION.LEFT;this.keepRunning=!0}
moveRight(instance){instance.direction=DIRECTION.RIGHT;this.keepRunning=!0}
jump(instance){if(this.jumps>0){instance.vy=-instance.jumpSpeed;--this.jumps}}}
return m})()};class Dude{constructor(x,y){this.x=x;this.y=y;this.vx=0;this.vy=0;this.state=new STATE.IDLE(this);this.direction=DIRECTION.RIGHT;this.floored=!1}
step(dt){this.state.update(this,dt);this.vy+=this.fallAcceleration*dt;this.x+=this.vx*dt;this.y+=this.vy*dt}
render(ctx){this.state.render(this,ctx)}
moveLeft(){this.state.moveLeft(this)}
moveRight(){this.state.moveRight(this)}
moveUp(instance){this.state.moveUp(this)}
moveDown(instance){this.state.moveDown(this)}
jump(instance){this.state.jump(this)}}
Dude.prototype.speed=100/1000;Dude.prototype.jumpSpeed=300/1000;Dude.prototype.fallAcceleration=1/1000;Dude.prototype.ox=3;Dude.prototype.oy=3;Dude.prototype.w=10;Dude.prototype.h=10;return Dude})();function DudeManager(){this.instances=[]}
DudeManager.prototype.create=function(x,y){var ret=new Dude(x,y);this.instances.push(ret);return ret}
DudeManager.prototype.step=function(dt){this.instances.forEach(function(each){each.step(dt)})}
function canvas2dContextDraw(ctx){this.instances.forEach(function(each){each.render(ctx)})}
DudeManager.prototype.render=canvas2dContextDraw;mod.DudeManager=DudeManager;return mod})(Game.Managers||{})},{"./../../Dependencies/Mocho":3,"./../Global/global":13}],17:[function(require,module,exports){"use strict";var Game=require("./../Global/global");var Mocho=require("./../../Dependencies/Mocho");Game.Managers=(function(mod){class LavaManager{constructor(){this.instances=[]}
create(x,y,type){type=type||0;let inst=this.instances[type]=this.instances[type]||[];var ret=LavaManager.factory[type](x,y);inst.push(ret);return ret}
step(dt){this.instances.forEach(function(eachContainer){eachContainer.forEach(function(each){each.STEP(dt)})})}}
LavaManager.TYPE={SURFACE:0,INNER:1,}
LavaManager.factory=[]
LavaManager.factory[LavaManager.TYPE.SURFACE]=function(x,y){var ret=new Lava(x,y);ret.h-=3;ret.y+=3;return ret}
LavaManager.factory[LavaManager.TYPE.INNER]=function(x,y){return new Lava(x,y)}
var sprites=[];sprites[LavaManager.TYPE.INNER]=new Mocho.animation.Sprite(Game.images.tiles,16,16,16,16,0,0,16,16);sprites[LavaManager.TYPE.SURFACE]=new Mocho.animation.Sprite(Game.images.tiles,0,16,16,16,0,-3,16,16);function canvas2dContextDraw(ctx){this.instances.forEach(function(eachContainer,type){eachContainer.forEach(function(each){sprites[type].draw(ctx,each.x,each.y)})})}
LavaManager.prototype.render=canvas2dContextDraw;class Lava{constructor(x,y){this.x=x;this.y=y;this.w=16;this.h=16}
STEP(dt){}
onCollision(other){}}
mod.LavaManager=LavaManager;return mod})(Game.Managers||{})},{"./../../Dependencies/Mocho":3,"./../Global/global":13}],18:[function(require,module,exports){"use strict";var Game=require("./../Global/global");var Mocho=require("./../../Dependencies/Mocho");Game.Managers=(function(mod){class PortalManager{constructor(){this.instances=[]}
create(x,y,type){type=type||0;var ret=new Portal(x,y);this.instances.push(ret);return ret}
step(dt){animation.update(dt);this.instances.forEach(function(each){each.STEP(dt)})}}
var sheet=Game.images.tiles;var tileset=new Mocho.animation.TileSheet(sheet,sheet.width,sheet.height,16,16);var animationfs=new Mocho.animation.AnimationFrameSet(tileset,0+2*10,8,"repeat");var animation=new Mocho.animation.Animation(animationfs,100);function canvas2dContextDraw(ctx){let sprite=animation.getCurrentFrame();this.instances.forEach(function(each){sprite.draw(ctx,each.x,each.y)})}
PortalManager.prototype.render=canvas2dContextDraw;class Portal{constructor(x,y){this.x=x;this.y=y;this.w=16;this.h=16}
STEP(dt){}
onCollision(other){}}
mod.PortalManager=PortalManager;return mod})(Game.Managers||{})},{"./../../Dependencies/Mocho":3,"./../Global/global":13}],19:[function(require,module,exports){"use strict";var Game=require("./../Global/global");var Mocho=require("./../../Dependencies/Mocho");Game.Managers=(function(mod){class WallManager{constructor(){this.instances=[]}
create(x,y,type){type=type||0;let inst=this.instances[type]=this.instances[type]||[];var ret=WallManager.factory[type](x,y);inst.push(ret);return ret}
step(dt){this.instances.forEach(function(eachContainer){eachContainer.forEach(function(each){each.STEP(dt)})})}}
WallManager.TYPE={BLOCK:0,TILE:1,LITTLE_BLOCK:2,};WallManager.factory=[]
WallManager.factory[WallManager.TYPE.BLOCK]=function(x,y){return new Wall(x,y)}
WallManager.factory[WallManager.TYPE.TILE]=function(x,y){var ret=new Wall(x,y);ret.h=4;return ret}
WallManager.factory[WallManager.TYPE.LITTLE_BLOCK]=function(x,y){var ret=new Wall(x,y);ret.h=8;ret.w=8;return ret}
var sprites=[]
sprites[WallManager.TYPE.BLOCK]=new Mocho.animation.Sprite(Game.images.tiles,0,0,16,16,0,0,16,16);sprites[WallManager.TYPE.TILE]=new Mocho.animation.Sprite(Game.images.tiles,16,0,16,16,0,0,16,16);sprites[WallManager.TYPE.LITTLE_BLOCK]=new Mocho.animation.Sprite(Game.images.tiles,16*8,0,16,16,0,0,16,16);function canvas2dContextDraw(ctx){this.instances.forEach(function(eachContainer,type){eachContainer.forEach(function(each){sprites[type].draw(ctx,each.x,each.y)})})}
WallManager.prototype.render=canvas2dContextDraw;class Wall{constructor(x,y){this.x=x;this.y=y;this.w=16;this.h=16}
STEP(dt){}
onCollision(other){}}
mod.WallManager=WallManager;return mod})(Game.Managers||{})},{"./../../Dependencies/Mocho":3,"./../Global/global":13}],20:[function(require,module,exports){"use strict";var Game=require("./../Global/global");Game.images=(function(mod){return mod})(Game.images||{})},{"./../Global/global":13}],21:[function(require,module,exports){"use strict";var Game=require("./../Global/global");var Mocho=require("./../../Dependencies/Mocho");var Game=((mod)=>{let canvas=document.createElement("canvas");canvas.width=480;canvas.height=320;canvas.tabIndex=1;canvas.addEventListener("focus",(event)=>Mocho.input.avoidArrowKeyScroll(canvas));canvas.addEventListener("blur",(event)=>Mocho.input.allowArrowKeyScroll(canvas));document.body.appendChild(canvas);mod.canvas=canvas;mod.ctx=canvas.getContext("2d");return mod})(Game||{})},{"./../../Dependencies/Mocho":3,"./../Global/global":13}],22:[function(require,module,exports){"use strict";var Game=require("../Global/global");var Mocho=require("../../Dependencies/Mocho")
var Game=(function(mod){function updateManagers(dt){this.managers.forEach(function(each){each.step(dt)})}
function checkDudeWall(dude,wall,dt){if(Mocho.collision.boxBoxMoving(dude.x,dude.y,dude.w,dude.h,wall.x,wall.y,wall.w,wall.h,-dude.vx*dt,-dude.vy*dt))
{let dx=dude.vx*dt;let dy=dude.vy*dt;var side=mocho.collision.boxBoxSideOfCollision(dude.x-dx,dude.y-dy,dude.w,dude.h,wall.x,wall.y,wall.w,wall.h,dx,dy);const skin=0.00;if(side.x>0){dude.x=wall.x-dude.w-skin;dude.vx=0}
if(side.x<0){dude.x=wall.x+wall.w+skin;dude.vx=0}
if(side.y>0){dude.y=wall.y-dude.h-skin;dude.vy=0;dude.floored=!0}
if(side.y<0){dude.y=wall.y+wall.h+skin;dude.vy=0}}}
function checkDudeWallH(dude,wall,dt){const skin=0.00;const freedom=0.00;if(Mocho.collision.boxBoxMoving(dude.x,dude.y,dude.w,dude.h,wall.x+freedom,wall.y,wall.w-freedom*2,wall.h,-dude.vx*dt,-dude.vy*dt))
{let dx=dude.vx*dt;let dy=dude.vy*dt;var side=Mocho.collision.boxBoxSideOfCollision(dude.x-dx,dude.y-dy,dude.w,dude.h,wall.x,wall.y,wall.w,wall.h,dx,dy);if(side.x>0){dude.x=wall.x-dude.w-skin;dude.vx=0}
if(side.x<0){dude.x=wall.x+wall.w+skin;dude.vx=0}}}
function checkDudeWallV(dude,wall,dt){const skin=0.00;const freedom=0.00;if(Mocho.collision.boxBoxMoving(dude.x,dude.y,dude.w,dude.h,wall.x,wall.y+freedom,wall.w,wall.h-freedom*2,-dude.vx*dt,-dude.vy*dt))
{let dx=dude.vx*dt;let dy=dude.vy*dt;var side=Mocho.collision.boxBoxSideOfCollision(dude.x-dx,dude.y-dy,dude.w,dude.h,wall.x,wall.y,wall.w,wall.h,dx,dy);if(side.y>0){dude.y=wall.y-dude.h-skin;dude.vy=0;dude.floored=!0}
if(side.y<0){dude.y=wall.y+wall.h+skin;dude.vy=0}}}
function checkDudeLava(dude,lava,dt){if(Mocho.collision.boxBoxMoving(dude.x,dude.y,dude.w,dude.h,lava.x,lava.y,lava.w,lava.h,-dude.vx*dt,-dude.vy*dt))
{Game.reset()}}
class World{constructor(){this.managers=[]}
update(dt){updateManagers.call(this,dt);var dudes=this.DudeManager.instances;var walls=this.WallManager.instances;var lavas=this.LavaManager.instances;dudes.forEach((dude)=>{dude.floored=!1;let vy,dy,vx,dx;vx=dude.vx;dx=dude.vx*dt;dude.x-=dx;dude.vx=0;walls.forEach((ctner)=>ctner.forEach((wall)=>checkDudeWallV(dude,wall,dt)));dude.x+=dx;dude.vx=vx;vy=dude.vy;dy=dude.vy*dt;dude.y-=dy;dude.vy=0;walls.forEach((ctner)=>ctner.forEach((wall)=>checkDudeWallH(dude,wall,dt)));dude.y+=dy;dude.vy=vy;lavas.forEach((ctner)=>ctner.forEach((lava)=>checkDudeLava(dude,lava,dt)))})}
render(ctx){this.managers.forEach(function(each){each.render(ctx)})}}
mod.World=World;return mod})(Game||{})},{"../../Dependencies/Mocho":3,"../Global/global":13}]},{},[2])