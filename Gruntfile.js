module.exports = function(grunt) {

  grunt.initConfig({

      // SASS COMPILER
      sass: {
        dist: {
          options: {
            style: 'compressed'
          },
          files: {
            'assets/css/styles.min.css': 'assets/scss/styles.scss'
          }
        } 
      },
      // CONCAT JS
      concat: {
        dist: {
          src: [
            'assets/js/plugins/*.js', // All JS in the libs folder
            'assets/js/main.js'  // This specific file
          ],
          dest: 'assets/js/main.min.js',
        }
      },
      // UGLIFY JS
      uglify: {
        build: {
          src: 'assets/js/main.min.js',
          dest: 'assets/js/main.min.js'
        }
      },
      // IMAGE-MINIFY
      imagemin: {
        dynamic: {
          files: [{
            expand: true,
            cwd: 'assets/img/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'assets/img/build'
          }]
        }
      },

      // WATCH TASKS & LIVE RELOADING
      watch: {
        scripts: {
          files: ['assets/js/*.js', 'assets/js/plugins/*.js'],
          tasks: ['concat', 'uglify'],
          options: {
            spawn: false,
            livereload: true,
          }
        },
        css: {
          files: ['assets/scss/*.scss'],
          tasks: ['sass'],
          options: {
            spawn: false,
            livereload: true,
          }
        },
        html: {
          files: ['*.html'],
          options: {
            spawn: false,
            livereload: true,
          }
        }
      }

  });

  // LOADING ALL TASKS

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('build', ['concat', 'uglify', 'sass', 'imagemin']);
  grunt.registerTask('dev', ['watch']);

}
