module.exports = function(grunt) {
    grunt.initConfig({
        svgzr: {
            svg: {
                options: {
                    files: {
                        cwdSvg: 'app/svg',
                    },
                    prefix: 'svg-',
                    svg: {
                        destFile: '.tmp/svg.scss'
                    }
                }
            }
        },
        concat: {
            common_sass: {
                src: [".tmp/svg.scss", "app/**/*.scss"],
                dest: ".tmp/all.scss"
            },
            chrome_js: {
                src: [
                    "vendor/**/*.js",
                    "app/**/*.js"
                ],
                dest: "chrome/app.js"
            },
            chrome_css: {
                src: ["legacy/content.css", ".tmp/all.css"],
                dest: "chrome/app.css"
            }
        },
        sass: {
            common: {
                files: {
                    '.tmp/all.css': '.tmp/all.scss'
                }
            }
        },
        copy: {
            chrome: {
                files: [{
                    expand: true,
                    cwd: "app/chrome",
                    src: ["**"],
                    dest: "chrome/"
                },
                {
                    expand: true,
                    cwd: "app/controllers/main",
                    src: ["**.html"],
                    dest: "chrome/"
                }]
            }
        },
        watch: {
            chrome: {
                files: [
                  "app/**",
                  "vendor/**"
                ],
                tasks: ["build:chrome"]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-svgzr');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask("common", [
        "svgzr:svg",
        "concat:common_sass",
        "sass:common"
    ]);

    grunt.registerTask("build:common", []);

    grunt.registerTask("build:chrome", [
        "common",
        "copy:chrome",
        "concat:chrome_js",
        "concat:chrome_css"
    ]);

    grunt.registerTask("default", [
        "build:chrome",
        "watch:chrome"
    ]);
}