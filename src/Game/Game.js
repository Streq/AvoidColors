"use strict";
var Mocho = require("../Dependencies/Mocho");
class Game{
    constructor(){
        this.resources = 
            { images: null
            , canvas: null
            , ctx: null
            , texts: null
            };
        this.data = 
            { levels: []
            };
    }
    loadResources(){
        return Promise.all(
            loadImages().then(imgs=>this.resources.images = imgs),
            loadTexts().then(texts=>this.resources.texts = texts),
            loadDom().then(dom=>{
                this.resources.canvas = dom.canvas;
                this.resources.ctx = dom.ctx;
            })
        );
    }
    run(){
        //
    }
}
//privates
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