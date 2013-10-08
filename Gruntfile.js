module.exports = function(grunt) {
    grunt.initConfig({
        pkg: '<json:package.json>',
        clean: ['dist'],
        copy: {
            fonts: {
                files: [{
                    expand: true,
                    cwd: 'fonts',
                    src: ['*'],
                    dest: 'dist/fonts',
                    filter: 'isFile'
                }]
            },
            images: {
                files: [{
                    expand: true,
                    cwd: 'images',
                    src: ['*'],
                    dest: 'dist/images',
                    filter: 'isFile'
                }]
            }
        },
        less: {
            options: {
                paths: ['css'],
                strictImports: true,
                yuicompress: true
            },
            dist: {
                files: {
                    'dist/css/paris.py.css': ['less/theme.less']
                }
            }
        },
        shell: {
            rst2shower: {
                command: "python rst2shower.py",
                options: {
                    stdout: true
                }
            }
        },
        uglify: {
            options: {
                banner: [
                    '/*! <%= pkg.name %> v<%= grunt.template.today("yyyy-mm-dd HH:MM") %>',
                    ' * Copyright (c) <%= grunt.template.today("yyyy") %> Axel Haustant',
                    ' */',
                    ''
                ].join('\n')
            },
            build: {
                files: {
                    'dist/js/paris.py.js': [
                        'js/shower.js',
                        'js/custom.js',
                    ]
                }
            }
        },
        imagemin: {
            all: {
                files: [{
                    expand: true,
                    cwd: 'dist/images',
                    src: ['*.{png,jpg,gif}'],
                    dest: 'dist/images'
                }]
            }
        },
        open : {
            dev : {
                path: 'dist/index.html'
            }
        },
        watch: {
            options: {
                spawn: false,
                livereload: true
            },
            less: {
                files: ['less/*.less'],
                tasks: ['less']
            },
            js: {
                files: ['js/*.js'],
                tasks: ['uglify']
            },
            images: {
                files: ['images/*'],
                tasks: ['copy:images']
            },
            fonts: {
                files: ['fonts/*'],
                tasks: ['copy:fonts']
            },
            rst: {
                files: 'slides.rst',
                tasks: ['shell:rst2shower']
            }
        },
        'gh-pages': {
            options: {
                base: 'dist',
                message: 'Automatically deploy github pages',
            },
            src: '**/*'
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-gh-pages');

    // Register the default tasks
    grunt.registerTask('default', ['clean', 'copy', 'less', 'uglify', 'shell']);
    grunt.registerTask('dev', ['default', 'open', 'watch']);
    grunt.registerTask('deploy', ['default', 'imagemin', 'gh-pages']);
};
