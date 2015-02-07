module.exports  =   function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /*sass: {
            dist: {
                files: {
                    'css/grid.css': 'sass/grid.scss',
                }
            },
            options: {
                sourcemap: false,
                style: 'compressed',
                trace: true,
                banner: '--> ! <%= pkg.name %> <%= pkg.version %> | <%= pkg.license %> | <%= pkg.homepage %> <--'
            }
        },*/
        compass: {
            dist: {
                options: {
                    cssDir: 'css',
                    sassDir: 'sass'
                }
            }
        },
        watch: {
            css: {
                files: 'sass/*.scss',
                //tasks: ['sass'],
                tasks: ['compass']
            }
        },
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                commit: true,
                commitMessage: 'Release %VERSION%',
                commitFiles: ['package.json', 'bower.json', 'sass/*', 'css/*'],
                createTag: true,
                tagName: '%VERSION%',
                tagMessage: 'Release %VERSION%',
                push: true,
                pushTo: 'origin'
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css',
                    ext: '.min.css'
                }],
                options: {
                    shorthandCompacting: false,
                    roundingPrecision: -1
                }
            }
        }
    });
    //grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-bump');
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['sass']);
    grunt.registerTask('rev:patch', ['bump-only:patch', 'sass', 'bump-commit']);
    grunt.registerTask('rev:minor', ['bump-only:minor', 'sass', 'bump-commit']);
    grunt.registerTask('rev:major', ['bump-only:major', 'sass', 'bump-commit']);
    grunt.registerTask('rev',       ['rev:patch']);
};
