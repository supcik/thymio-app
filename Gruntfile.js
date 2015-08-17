module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [
          {
            src: ['src/window.jade'],
            dest: 'build/window.html'
          }
        ]
      }
    },
    less: {
      compile: {
        files: [
          {
            src: ['src/css/main.less'],
            expand: true, flatten: true, dest: 'build/css/'
          }
        ]
      }
    },
    typescript: {
      compile: {
        files: [
          {src: ['src/background.ts'], dest: 'build/'},
          {src: ['src/js/*.ts'], dest: 'build/js/'}
        ]
        
      }
    },
    copy: {
      bootstrap: {
        files: [
          {
            src: ['bower_components/bootstrap/dist/js/bootstrap.min.js'],
            expand: true, flatten: true, dest: 'build/js/'
          },
          {
            src: ['bower_components/bootstrap/dist/fonts/*'],
            expand: true, flatten: true, dest: 'build/fonts/'
          },
          {
            src: ['bower_components/bootstrap/dist/css/bootstrap*min.css'],
            expand: true, flatten: true, dest: 'build/css/'
          }
        ]
      },
      jquery: {
        files: [
          {
            src: ['bower_components/jquery/dist/jquery.min.js'],
            expand: true, flatten: true, dest: 'build/js/'
          },
        ]
      },
      angular_js: {
        files: [
          {
            src: ['bower_components/angularjs/angular.min.js'],
            expand: true, flatten: true, dest: 'build/js/'
          },
        ]
      },
      code: {
        files: [
          {
            src: ['assets/img/thymio-*.png'], 
            expand: true, flatten: true, dest: 'build/assets/'
          },
          {
            src: ['src/manifest.json'],
            expand: true, flatten: true, dest: 'build/'
          }
        ]
      }
    },
    jshint: {
      main: {
        src: ['build/manifest.json', 'build/js/app.js']
      }
    },
    zip: {
      main: {
        cwd: 'build/',
        src: ['build/**'],
        dest: '<%= pkg.name %>-<%= pkg.version %>.zip'
      }
    },
    watch: {
      typescript: {
        files: ['src/**/*.ts'],
        tasks: ['typescript']
      },
      jade: {
        files: ['src/**/*.jade'],
        tasks: ['jade']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-zip');

  // Default task(s).
  grunt.registerTask('default', ['copy', 'jade', 'less', 'typescript', 'jshint']);

};