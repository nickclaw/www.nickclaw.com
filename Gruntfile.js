module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('build', ['concurrent:build']);
    grunt.registerTask('develop', ['imagemin:develop', 'browserify:develop', 'concurrent:develop']);
    grunt.registerTask('default', ['develop']);


    grunt.initConfig({

        // restart server when necessary
        nodemon: {
            develop: {
                script: 'index.js',
                option: {
                    watch: ['config', 'src', 'public/src/**/*.js', 'index.js'],
                    env: { NODE_ENV: 'development' }
                }
            }
        },

        // watch resources and rebuild them
        watch: {
            style: {
                files: ['public/src/**/*.scss'],
                tasks: ['sass:develop']
            },

            image: {
                files: ['public/src/**/*.png', 'public/src/**/*.jpg'],
                tasks: ['imagemin:develop']
            },

            script: {
                files: ['public/src/**/*.js'],
                tasks: ['browserify:develop']
            }
        },

        // Build(and/or watch) many resources at once
        concurrent: {
            options: {
                logConcurrentOutput: true,
                limit: 6
            },

            build: ['sass:build', 'imagemin:build', 'browserify:build'],
            develop: ['watch:style', 'watch:image', 'watch:script', 'nodemon:develop']
        },

        // compile sass files
        sass: {
            develop: {
                options: { style: 'nested' },
                files: {
                    "public/build/style/index.css": "public/src/**/*.scss",
                }
            },

            build: {
                options: {  style: 'compressed' },
                files: {
                    "public/build/style/index.css": "public/src/**/*.scss",
                }
            }
        },

        // minify images
        imagemin: {
            develop: {
                options: {
                    optimizationLevel: 0,
                    progressive: false,
                    interlaced: false
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['public/src/**/*.png'],
                    dest: 'public/build/image'
                }]
            },

            build: {
                options: {
                    optimizationLevel: 3,
                    progressive: true,
                    interlaced: true
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['public/src/**/*.png'],
                    dest: 'public/build/image'
                }]
            }
        },

        // compile react
        browserify: {
            develop: {
                files: {
                    'public/build/app.js': 'public/src/client.js'
                },
                options: {
                    transform: ['babelify']
                }
            },

            build: {

            }
        }
    });
}
