module.exports = function(grunt) {

    grunt.initConfig({

      uglify: {
        jsfiles: {
          files: {
            'dist/adgallery.min.js': ['dist/adgallery.js']
          }
        }
      },
      copy: {
        jsfiles: {
          src: 'js/ADGalleryJs.js',
          dest: 'dist/adgallery.js'
        },
        cssfiles: {
          src: 'css/ADGalleryJs.css',
          dest: 'dist/adgallery.css'
        }
      },
        sass: {
          dist: {
            files: {
              'css/ADGalleryJs.css': 'css/ADGalleryJs.scss'
            }
          }
        },
        cssmin: {
          target: {
            files: {
              'dist/adgallery.min.css': ['dist/adgallery.css']
            }
          }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('build', ['sass', 'copy', 'uglify', 'cssmin']);

};