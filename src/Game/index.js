"use strict";

module.exports = require("./Resources/loadImages").then(()=>{
    return {
        run: require("./run").run
    };
})

