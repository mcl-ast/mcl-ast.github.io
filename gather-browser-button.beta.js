javascript:(function() {
	var url = 'http://mcl-ast.github.io/gather.beta.js',
		noCache = '?nc=' + (parseInt(Math.random() * 100000000000)).toString(),
		head = document.getElementsByTagName('head')[0],
		createAndAppendScriptTag = function createAndAppendScriptTag(attrs) {
			var script = document.createElement('script'),
				i;
			for (i in attrs) {
				if (attrs.hasOwnProperty(i)) script[i] = attrs[i];
			}
			head.appendChild(script);
			return script;
		},
		deleteGlobal = function deleteGlobal() {
			delete window.GLOBAL_RETRIEVAL_BOOKMARKLET_SCRIPT;
		},
		i = 1;	

	function useLocalCopyOfScript() {
		if (window.localStorage && window.localStorage.retrievalSelectionScript) {
			var codeText = JSON.parse(window.localStorage.retrievalSelectionScript).scriptString;
			createAndAppendScriptTag({'type':'text\/javascript','text':codeText, 'onerror':loadError});
			return true;			
		}
		return false;
	}

	function loadError (oError) {
  		console.log('Remote Script could not be loaded.');
		if (oError === true) {
			console.log('Remote copy of script was unavailable.  Local copy may be out of date.');
		} else {
			alert('This function is not available at this time.  Please ensure you are on a Catalog page, and try again.');
			console.log('window.localStorage: ' +
						 !!window.localStorage +
						 '\nwindow.localStorage.retrievalSelectionScript: ' +
						 !!window.localStorage.retrievalSelectionScript);
			deleteGlobal();
			throw new URIError("The script " + oError.target.src + " is not accessible.");
		}
		return true;
	}

	function checkLocalCopy() {
		if (window.localStorage) {
			if (window.localStorage.retrievalSelectionScript) {
				var cachedVersion = JSON.parse(window.localStorage.retrievalSelectionScript).version;
				if (cachedVersion === window.GLOBAL_RETRIEVAL_BOOKMARKLET_SCRIPT.version) {
					deleteGlobal();
					return;
				}
			}
			window.localStorage.retrievalSelectionScript = JSON.stringify(window.GLOBAL_RETRIEVAL_BOOKMARKLET_SCRIPT);
		}
		deleteGlobal();
	}

	function requireExternalScript(localCopyOfScriptHasRun) {
		if (i > 60) {
			loadError(localCopyOfScriptHasRun);
			return;
		}
		if (window.GLOBAL_RETRIEVAL_BOOKMARKLET_SCRIPT === undefined) {
			console.log('Timeout was called ' + (i++) + ' times.');
		    setTimeout(requireExternalScript, 4, localCopyOfScriptHasRun);
		    return;
		} else {
			console.log('success');
			if (!localCopyOfScriptHasRun) {
				createAndAppendScriptTag({'text':window.GLOBAL_RETRIEVAL_BOOKMARKLET_SCRIPT.scriptString,'type':'text\/javascript', 'onerror':loadError});
			}
			checkLocalCopy();
		}
	}
	
	deleteGlobal();
	createAndAppendScriptTag({'src':(url + noCache),'type':'text\/javascript', 'onerror':loadError});
	requireExternalScript(useLocalCopyOfScript());
})()

=============

javascript:(function(){function o(){if(window.localStorage&&window.localStorage.retrievalSelectionScript){var e=JSON.parse(window.localStorage.retrievalSelectionScript).scriptString;r({type:"text/javascript",text:e,onerror:u});return true}return false}function u(e){console.log("Remote Script could not be loaded.");if(e===true){console.log("Remote copy of script was unavailable.  Local copy may be out of date.")}else{alert("This function is not available at this time.  Please ensure you are on a Catalog page, and try again.");console.log("window.localStorage: "+!!window.localStorage+"\nwindow.localStorage.retrievalSelectionScript: "+!!window.localStorage.retrievalSelectionScript);i();throw new URIError("The script "+e.target.src+" is not accessible.")}return true}function a(){if(window.localStorage){if(window.localStorage.retrievalSelectionScript){var e=JSON.parse(window.localStorage.retrievalSelectionScript).version;if(e===window.GLOBAL_RETRIEVAL_BOOKMARKLET_SCRIPT.version){i();return}}window.localStorage.retrievalSelectionScript=JSON.stringify(window.GLOBAL_RETRIEVAL_BOOKMARKLET_SCRIPT)}i()}function f(e){if(s>60){u(e);return}if(window.GLOBAL_RETRIEVAL_BOOKMARKLET_SCRIPT===undefined){console.log("Timeout was called "+s++ +" times.");setTimeout(f,4,e);return}else{console.log("success");if(!e){r({text:window.GLOBAL_RETRIEVAL_BOOKMARKLET_SCRIPT.scriptString,type:"text/javascript",onerror:u})}a()}}var e="http://mcl-ast.github.io/gather.beta.js",t="?nc="+parseInt(Math.random()*1e11).toString(),n=document.getElementsByTagName("head")[0],r=function(t){var r=document.createElement("script"),i;for(i in t){if(t.hasOwnProperty(i))r[i]=t[i]}n.appendChild(r);return r},i=function(){delete window.GLOBAL_RETRIEVAL_BOOKMARKLET_SCRIPT},s=1;i();r({src:e+t,type:"text/javascript",onerror:u});f(o())})()