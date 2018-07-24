"use strict";
var Mocho = require("../../Dependencies/Mocho");
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
        loadResources.call(this);
        //set initial state
        loadState.call(this);
        //start loop
        startLoop.call(this);
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

}

function loadImages(){
    return Mocho.load.loadImages(//load the stuff
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