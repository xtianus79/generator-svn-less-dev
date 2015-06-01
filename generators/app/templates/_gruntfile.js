// This file in the main entry point for defining grunt tasks and using grunt plugins.
// Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409

'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dev: 'svndotcom/wp-content/themes/SVN2015/assets',
        siteSVN: 'svndotcom',

        less: {
          sections: {
            options: {
              paths: ['<%= dev %>/css']
            },
            files: [
                    {
                      expand: true,     // Enable dynamic expansion.
                      cwd: '<%= dev %>/css/sections/',      // Src matches are relative to this path.
                      src: ['**/*.less', '!**/template-contact-us.less'], // Actual pattern(s) to match.
                      dest: '<%= dev %>/css/sections/',   // Destination path prefix.
                      ext: '.css',   // Dest filepaths will have this extension.
                      extDot: 'first'   // Extensions in filenames begin after the first dot
                    },
                  ],

                // [{src: '<%= dev %>/**/someFileNamed.scss', dest: '<%= dev %>/scss/someFileNamed.css'}]
                
                // files: {
                //     '<%= dev %>/css/someFileNamed.css': '<%= dev %>/scss/someFileNamed.scss'
                // }
          }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                jshintignore: '.jshintignore',
                //ignores: ['<%= dev %>/js/svn-gallery.js'], // example of a file to ignore *** overwrites jshintignore
                force: true,
            },
            all: [
                'gruntfile.js',
                '<%= dev %>/js/**/*.js'
            ]
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= dev %>/css/sections/',
                    src: ['*.css', '!template-dashboard.css'],
                    dest: '<%= dev %>/css/sections/',
                    ext: '.css'
                }]
            }
        },

        watch: {
            grunt: {
                files: ['gruntfile.js'],
                tasks: ['compile-less']
            },
            less: {
                    files: '<%= dev %>/css/**/*.less',
                    tasks: ['compile-less']
            },
            jshint: {
                files: '<%= dev %>/js/**/*.js',
                tasks: ['validate-js']
            },
            livereload: {
                files: ['<%= siteSVN %>/**/*.php', '!<%= dev %>/bower_components/**', '<%= dev %>/js/**/*.js', '<%= dev %>/css/**/*.css', '<%= dev %>/images/**/*.{jpg,gif,svg,jpeg,png}'],
                options: {
                    livereload: true
                }
            }
        }

    });


    grunt.registerTask('compile-less', ['less:sections', 'cssmin']);    
    grunt.registerTask('default', [ 'watch']);
    grunt.registerTask('validate-js', ['jshint']);

    // The following line loads the grunt plugins.
    // This line needs to be at the end of this this file.
    grunt.loadNpmTasks('grunt-bower-task');

};
