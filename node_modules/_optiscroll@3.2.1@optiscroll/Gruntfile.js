/*global exports:true, require:true */
module.exports = exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
              options: {
                port: 8181,
                hostname: '*'
              }
            }
        },

        concat: {
            options: {
                banner: "/*!\n"+
                    "* Optiscroll.js v<%= pkg.version %>\n"+
                    "* https://github.com/albertogasparin/Optiscroll/\n"+
                    "* \n"+
                    "* @copyright <%= grunt.template.today('yyyy') %> Alberto Gasparin\n"+
                    "* @license Released under MIT LICENSE\n"+
                    "*/\n\n",
                separator: "\n\n",
            },
            nojquery: {
                src: [
                    'src/intro.js',
                    'src/optiscroll.js',
                    'src/events.js',
                    'src/scrollbar.js',
                    'src/utils.js',
                    'src/globals.js',
                    'src/outro.js',
                ],
                dest: 'dist/optiscroll.js'
            },
            jquery: {
                options: { banner: "" },
                src: [
                    'dist/optiscroll.js',
                    'src/jquery.plugin.js'
                ],
                dest: 'dist/jquery.optiscroll.js'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            // source: ['src/*.js', 'src/**/*.js']
            source: ['dist/optiscroll.js']
        },
        uglify: {
            dist: {
                options: {
                    preserveComments: 'some',
                    compress: {
                        sequences: true,
                        dead_code: true,
                        conditionals: true,
                        booleans: true,
                        unused: true,
                        if_return: true,
                        join_vars: true,
                        drop_console: true
                    }
                },
                files: {
                    'dist/optiscroll.min.js': ['dist/optiscroll.js'],
                    'dist/jquery.optiscroll.min.js': ['dist/jquery.optiscroll.js']
                }
            }
        },

        sass: {
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'dist/optiscroll.css': ['scss/optiscroll.scss']
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 3 versions', 'IE 11']
            },
            dist: {
                files: {
                    'dist/optiscroll.css': ['dist/optiscroll.css']
                }
            }
        },

        watch: {
            build: {
                files: ['src/*.js', 'src/**/*.js'],
                tasks: ['build']
            },
            css: {
                files: ['scss/*.scss'],
                tasks: ['sass', 'autoprefixer']
            },
            grunt: {
                files: [
                    'Gruntfile.js'
                ]
            }
        },

        bump: {
            options: {
                files: ['package.json','bower.json'],
                updateConfigs: ['pkg'],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json','bower.json','dist/optiscroll.min.js','dist/optiscroll.js','dist/jquery.optiscroll.min.js','dist/jquery.optiscroll.js','dist/optiscroll.css'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                // pushTo: 'upstream',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
            }
          },
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['connect', 'build', 'watch']);
    grunt.registerTask('build', ['concat', 'uglify', 'sass', 'autoprefixer']);

    grunt.registerTask('test', ['build', 'connect']);

    // For version bumps you need to run the following three commands
    // - grunt bump-only:minor
    // - grunt buold
    // - grunt bump-commit
    // Or one of these tasks

    // Version bumb v1.0.0 => v1.0.1
    grunt.registerTask('bump-patch', ['bump-only:patch', 'build', 'bump-commit']);
    // Version bumb v1.0.0 => v1.1.0
    grunt.registerTask('bump-minor', ['bump-only:minor', 'build', 'bump-commit']);
    // Version bumb v1.0.0 => v2.0.0
    grunt.registerTask('bump-major', ['bump-only:major', 'build', 'bump-commit']);
};
