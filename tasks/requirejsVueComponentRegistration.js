/*
 * grunt-requirejs-vue-component-registration
 * https://github.com/Daniel/grunt-requirejs-vue-component-registration
 *
 * Copyright (c) 2018 Daniel Sattler
 * Licensed under the MIT license.
 */

'use strict';

const path = require('path');

module.exports = function (grunt) {
    
    grunt.registerTask('requirejsVueComponentRegistration', 'Create vue component config for async loading with requirejs', function () {
        let options = this.options({
            requirejsPlugin: 'vue!'
        });

        let files = grunt.file.expand(options.files);
        let componentRegistration = [];

        files.forEach(function (filename) {
            let
                dest = path.dirname(filename),
                ext = path.extname(filename),
                baseName = path.basename(filename, ext),
                dashFileName = baseName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
                relPath = dest.replace(options.basePath, ''),
                requirejsLoadingPath = options.requirejsPlugin + relPath + '/' + baseName;

            componentRegistration.push(`
            Vue.component('${dashFileName}', function (resolve, reject) {
                require(["${requirejsLoadingPath}"], function(component) {
                    resolve(component);
                });
            });
            `);
        });

        let content = `define([
    "Vue"
], function(Vue) {

    /**
     * register vue components for async loading
     */

    return (function() {

        function registerComponents() {
            ${componentRegistration.join('')}
        }

        return registerComponents();
	});
});`;

        grunt.file.write(options.targetFile, content);
    });
};