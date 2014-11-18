'use strict';

module.exports = function(grunt)
{
  require('load-grunt-tasks')(grunt);

  grunt.initConfig(
  {
  	pkg: grunt.file.readJSON('package.json'),

    // Clean directories for target
    clean:
    {
      dev:
      {
        src: ['src/css', '.sass-cache']
      },
      build:
      {
        src: ['build', '.tmp']
      }
    },

    // JS: Uglify (usemin makes the task, this is just config options)
    uglify:
    {
      options:
      {
        mangle: false,
        sourceMap: true
      }
    },

    // JS: Hint syntax
    jshint:
    {
      files: ['gruntfile.js', 'src/js/*.js'],
      options: { jshintrc: true }
    },

    // JS: Wire dependencies
    wiredep:
    {
      dev:
      {
        options: {},
        src: ['src/**/*.html']
      }
    },

    // CSS: Process Sass
    sass:
    {
      dev:
      {
        options:
        {
          style: 'expanded',
          compass: true
        },
        files:
        {
          'src/css/styles.css': 'src/sass/styles.scss',
          'src/css/other.css': 'src/sass/other.scss'
        }
      }
    },

    // CSS: Remove redundant style rules
    cssc:
    {
      dev:
      {
        options:
        {
          consolidateViaDeclarations: true,
          consolidateViaSelectors: true,
          consolidateMediaQueries: true
        },
        files:
        {
          'src/css/styles.css': 'src/css/styles.css',
          'src/css/other.css': 'src/css/other.css'
        }
      }
    },

    // CSS: Minify files
    cssmin:
    {
      dev:
      {
        files:
        {
          'src/css/styles.min.css': 'src/css/styles.css',
          'src/css/other.min.css': 'src/css/other.css',
        }
      }
    },

    // HTML: Hint syntax
    htmlhint:
    {
      dev:
      {
        options:
        {
          'tag-pair': true,
          'tagname-lowercase': true,
          'attr-lowercase': true,
          'attr-value-double-quotes': true,
          'doctype-first': true,
          'spec-char-escape': true,
          'id-unique': true,
          'head-script-disabled': true,
          'style-disabled': true
        },
        src: ['src/*.html']
      }
    },

    // Images: Optimize filesize
    imagemin:
    {
      dynamic:
      {
        files:
        [{
          expand: true,
          cwd: 'src',
          src: ['images/*.{png,jpg,gif}'],
          dest: 'build/i/'
        }]
      }
    },

    // Start a server
    connect:
    {
      dev:
      {
        options:
        {
          port: 9001,
          base: 'src'
        }
      },
      build:
      {
        options:
        {
          port: 9009,
          base: 'build'
        }
      }
    },

    // Watch for changes
    watch:
    {
      options: { livereload: true },
      css:
      {
        files: 'src/sass/{,*/}*.scss',
        tasks: ['sass', 'cssc', 'cssmin']
      },
      js:
      {
        files: ['src/js/*.js'],
        tasks: ['jshint']
      },
      html:
      {
        files: ['src/*.html'],
        tasks: ['htmlhint']
      }
    },

    // Usemin: Create generated tasks for usemin
    useminPrepare:
    {
      html: 'src/{,*/}*.html',
      options:
      {
        dest: 'build',
        flow:
        {
          html:
          {
            steps:
            {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Usemin: Rewrite comment blocks with their built equivalents
    usemin:
    {
      html: ['build/{,*/}*.html']
    },

    // Files: Copy to build dir
    copy:
    {
      build:
      {
        cwd: 'src',
        src: ['**', '!js/**', '!css/**', '!sass/**', '!bower_components/**'],
        dest: 'build',
        expand: true
      }
    },

    // Browser: Open browser to page
    open:
    {
      dev:
      {
        path: 'http://0.0.0.0:9001/',
      },
      build:
      {
        path: 'http://0.0.0.0:9009/',
      }
    }

  });

  // Dev tasks
  grunt.registerTask('dev:pre', ['clean:dev']);
  grunt.registerTask('dev:html', ['wiredep', 'htmlhint']);
  grunt.registerTask('dev:css', ['sass', 'cssc', 'cssmin']);
  grunt.registerTask('dev:js', ['jshint']);
  grunt.registerTask('dev:images', []);
  grunt.registerTask('dev:post', []);
  grunt.registerTask('dev', ['dev:pre', 'dev:css', 'dev:js', 'dev:html', 'dev:images', 'dev:post']);
  grunt.registerTask('serve:dev', ['dev', 'connect:dev', 'open:dev', 'watch']);

  // Build tasks
  grunt.registerTask('build:pre', ['dev', 'clean:build', 'useminPrepare', 'concat:generated']);
  grunt.registerTask('build:html', []);
  grunt.registerTask('build:css', ['cssmin:generated']);
  grunt.registerTask('build:js', ['uglify:generated']);
  grunt.registerTask('build:images', ['imagemin']);
  grunt.registerTask('build:post', ['copy:build', 'usemin']);
  grunt.registerTask('build', ['build:pre', 'build:css', 'build:js', 'build:html', 'build:images', 'build:post']);
  grunt.registerTask('serve:build', ['build', 'open:build', 'connect:build:keepalive']);

  // Alias serve to serve:dev
  grunt.registerTask('serve', ['serve:dev']);

  // Default to serve
  grunt.registerTask('default', ['serve']);

  require('time-grunt')(grunt);
};
