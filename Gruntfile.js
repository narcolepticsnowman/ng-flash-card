module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean:{
            preClean:{
                src:['dist/','dist/<%= pkg.name %>-dist.zip']
            }
        },
        concat: {
            dist: {
                src: ['js/module.js','js/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        jshint:{
            beforeconcat: ['js/module.js','js/*.js'],
            afterconcat: ['dist/<%= pkg.name %>.js']
        },
        cssmin:{
            add_banner:{
                options: {
                    banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                files:{
                    'dist/<%= pkg.name %>.min.css':['css/*.css']
                }
            }
        },

        compress:{
            main:{
                options:{
                    archive:'dist/<%= pkg.name %>-<%= pkg.version %>-dist.zip'
                },
                files:[
                    {expand: true, cwd:'dist/',src:['**']}
                ]
            }
        },
        watch:{
            scripts:{
                files: ['**/*.js','!**/dist/**'],
                tasks: ['concat','uglify']
            },
            styles:{
                files: ['styles/**/*.css'],
                tasks: ['cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['clean:preClean','concat','jshint','uglify','cssmin','compress']);

};