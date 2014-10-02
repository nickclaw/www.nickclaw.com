module.exports = function(grunt) {

    grunt.initConfig({

        //
        // JAVASCRIPT
        //

        uglify: {

            options: {
                sourceMap: true,
                report: 'min'
            },

            dist: {
                options: {
                    preserveComments: 'some',
                    mangle: {
                        except: ['angular', '_']
                    }
                },

                files: {
                    'build/script/main.js':  'src/script/**/*.js'
                }
            },

            dev: {
                options: {
                    preserveComments: 'all',
                    mangle: false
                },

                files: {
                    'build/script/main.js': 'src/script/**/*.js'
                }
            }
        },

        // move minified files to build folder
        bowercopy: {
            options: {
                destPrefix: 'build/lib',
            },

            // minified
            dist: {
                files: {
                    'lodash.js' : 'lodash/dist/lodash.min.js',
                    'angular.js': 'angular/angular.min.js'
                }
            },

            // unminified
            dev: {
                files: {
                    'angular.js': 'angular/angular.js'
                }
            }
        },


        //
        // Custom lodash build
        //

        lodash: {
            dist: {
                dest: 'build/lib/lodash.js',
                options: {
                    shortFlags: ['m', 'p'],
                    exports: ['global']
                }
            }
        },

        lodashAutobuild: {
            options: {
                lodashConfigPath: 'lodash.dist.options.include',
                lodashObjects: ['_']
            },

            dist: {
                options: {
                    lodashTargets: ['dist']
                },
                src: ['src/script/**/*.js']
            }
        },



        //
        // STYLE
        //

        // .scss -> .css
        sass: {

            // compressed
            dist: {
                options: {
                    style: 'compressed',
                    precision: 5,
                    update: false
                },

                files: {
                    'build/style/main.css': 'src/style/main.scss'
                }
            },

            // beautified
            dev: {
                options: {
                    style: 'expanded',
                    precision: 5,
                    update: true
                },

                files: {
                    'build/style/main.css': 'src/style/main.scss'
                }
            }
        },

        // add vendor prefixes as needed
        autoprefixer: {
            dist: {

                options: {
                    browsers: ['last 3 versions']
                },

                files: {
                    'build/style/main.css': 'build/style/main.css'
                }
            }
        },



        //
        // HTML
        //

        // compress dist html
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true
                },

                files: {
                    'build/index.html': 'src/index.html'
                }
            }
        },

        // just move dev html
        copy: {
            dev: {
                files: {
                    'build/index.html': 'src/index.html'
                }
            }
        },



        //
        // DEV
        //

        // run tasks concurrently
        concurrent: {

            // watch multiple files at once
            watch: {
                options: {
                    logConcurrentOutput: true
                },
                tasks: ['watch:style', 'watch:script', 'watch:html']
            }
        },

        // respond to specific types of files, dev mode only
        watch: {
            style: {
                files: 'src/**/*.scss',
                tasks: ['sass:dev']
            },
            script: {
                files: 'src/**/*.js',
                tasks: ['uglify:dev', 'lodashAutobuild:dist']
            },
            image: {

            },
            html: {
                files: 'src/index.html',
                tasks: ['copy:dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-lodash');
    grunt.loadNpmTasks('grunt-lodash-autobuild');

    grunt.registerTask('default', [
        'bowercopy:dist',
        'lodashAutobuild:dist',
        'uglify:dist',
        'sass:dist',
        'autoprefixer:dist',
        'htmlmin:dist'
    ]);

    grunt.registerTask('develop', [
        'bowercopy:dev',
        'lodashAutobuild:dist',
        'uglify:dev',
        'sass:dev',
        'copy:dev',
        'concurrent:watch'
    ]);
}
