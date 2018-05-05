(function(){


	//load dependencies
	(function(){
		var script = document.createElement("script");
		var prefix = "/MochoUtils/mocho.";
		var suffix = ".js";
		function mochoPath(e){return prefix + e + suffix;}
		script.src = mochoPath("load");
		script.onload = function(){
			Mocho.loadScripts(
				[
					"math",
					"loop"
				]
				.map(mochoPath)
				.concat([
					""
				]),
				
			);
		};
	})();

	var Game = (function(){

	})(Game||{})


})()
