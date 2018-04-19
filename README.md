# grunt-requirejs-vue-component-registration

> Create vue component config for async loading with requirejs

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-requirejs-vue-component-registration --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-requirejs-vue-component-registration');
```

## The "requirejsVueComponentRegistration" task

### Overview
Create vue component config for async loading with requirejs.

```js
grunt.initConfig({
    requirejsVueComponentRegistration: {
        options: {
            files: ['pathToVueFiles/**/*.vue'],
            basePath: 'basePathToVueFiles',
            targetFile: 'basePathToVueFiles/registerComponents.js'
        }
    }
});
```


targetFile output:

```js
define([
    "Vue"
], function(Vue) {

    /**
     * register vue components for async loading
     */

    return (function() {

        function registerComponents() {

            Vue.component('nice-component', function (resolve, reject) {
                require(["vue!/Components/niceComponent"], function(component) {
                    resolve(component);
                });
            });

        }

        return registerComponents();
	});
});
```

## Release History
* Big bang
