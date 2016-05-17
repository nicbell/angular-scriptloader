/**
 * Script loader
 * @author Nic Bell
 */

angular.module('nb.scriptloader', [])
	.service('$scriptLoader', ScriptLoader);

ScriptLoader.$inject = ['$q', '$log'];

function ScriptLoader($q, $log) {

	var createScript = function (url) {
		var head = document.querySelector('head')
		var script = document.createElement('script');

		script.setAttribute('src', url);
		script.setAttribute('type', 'text/javascript');
		head.appendChild(script);

		return script;
	};

	var attachPromiseToScript = function (script, deferred) {
		script.addEventListener('load', function () {
			script.setAttribute('loaded', '');
			$log.info(script.src, 'loaded.');
			deferred.resolve();
		});

		script.addEventListener('error', function () {
			$log.warn(script.src, 'could not be loaded.');
			deferred.reject();
		});
	};

	this.load = function (url) {
		var deferred = $q.defer();
		var existingScript = document.querySelector('script[src*="' + url + '"]');

		if (!existingScript) {
			var script = createScript(url);
			attachPromiseToScript(script, deferred);
		}
		else if (!existingScript.hasAttribute('loaded')) {
			attachPromiseToScript(existingScript, deferred);
		}
		else {
			$log.info(existingScript.src, 'already loaded.');
			deferred.resolve();
		}

		return deferred.promise;
	}
};