# angular-scriptloader
Script loader for Angular. Inject scripts and returns a promise. Won't inject the same script twice.
## NPM
```bash
npm i angular-scriptloader
```
## Setup
```js
angular.module('yourApp', [
    'nb.scriptloader'
]);
```
## Service
Loading a script.
```js
$scriptLoader.load('/example.js')
    .then(function() {
        //..
    });
```
Loading scripts concurrently.
```js
$q.all([$scriptLoader.load('/example.js'), $scriptLoader.load('/example2.js')])
    .then(function() {
        //..
    });
```