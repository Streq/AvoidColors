var Mocho = (function(mod){
	
	/**
	 * Load some dang script;
	 * @param {String} src - the script path,
	 * @param {function()} [onload] - function to execute once the script is loaded.
	 */
    function loadScript(src, onload){
		onload = onload || ((x) => x);
        return new Promise((resolve) => {
			var script = document.createElement("script");
			script.onload = () => resolve(onload());
			script.src = src;
			document.head.appendChild(script);
		});
    }

	/**
	 * Load some dang scripts in the specified order;
	 * @param {String[]} srcs - the scripts paths,
	 * @param {function()} [onload] - function to execute once every script is loaded.
	 */
	function loadScripts(srcs, onload){
        onload = onload || ((x) => x);
        return new Promise((resolve) => {
			srcs.reduce((p, src) => p.then(() => loadScript(src)), Promise.resolve())
				.then(() => resolve(onload()));
        });
    }
	
	/**
	 * Load some dang image, then pass it to a callback;
	 * @param {String} src - the image path,
	 * @param {function(Image img)} [onload] - function to execute once the image is loaded.
	 */
	function loadImage(src, onload){
		onload = onload || ((x) => x);
		return new Promise((resolve) => {
			var img = document.createElement("img");
			img.onload = () => resolve(onload(img));
			img.src = src;
		});
	}
	
	/**
	 * Load some dang images;
	 * @function
	 * @param {String[]} srcs - the images paths,
	 * @param {function(loadImages~ImageMap imgs)}[onload] - function to execute once all images are loaded.
	 */
	function loadImages(srcs, onload){
		onload = onload || ((x) => x);
		var imgs = {};
		function loadAndAdd(src){
			return loadImage(src).then((img) => {imgs[src] = img;});
		}
		return Promise.all(srcs.map(loadAndAdd)).then(() => onload(imgs));
	}
	
	
	
	/**
	 * A map of images with their src paths as property accessors.
	 * @typedef {Object} loadImages~ImageMap
	 */
	
	
	
	/**
	 * Load some dang json, then pass it to a callback;
	 * @param {String} src - the json path,
	 * @param {function(Object json)} onload - function to execute once the json is loaded.
	 */
	function loadJSON(src, onload){
		fetch(src).then(
			function(response) {
				return response.json();
			}
		).then(
			function(myJson){
				onload(myJson);
			}
		);
	}
	
	mod.loadScripts = loadScripts;
	mod.loadScript = loadScript;
	mod.loadImage = loadImage;
	mod.loadImages = loadImages;
	mod.loadJSON = loadJSON;
	return mod;
	
})(Mocho||{});