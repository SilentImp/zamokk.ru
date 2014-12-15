gulp        = require 'gulp'
order       = require 'gulp-order'
imagemin    = require 'gulp-imagemin'
prefix      = require 'gulp-autoprefixer'
minifyCSS   = require 'gulp-minify-css'
concat      = require 'gulp-concat'
uglify      = require 'gulp-uglify'
ghpages     = require 'gh-pages'
path        = require 'path'

jade        = require 'gulp-jade'
find        = require 'find'
path        = require 'path'

paths =
  images: 'developer/img/**'
  js:     'developer/js/**'
  css:    'developer/css/*'
  jade:   'developer/jade/index.jade'
  html:   'production/*.html'


log = (error)->
    console.log([
        '',
        "----------ERROR MESSAGE START----------",
        ("[" + error.name + " in " + error.plugin + "]"),
        error.message,
        "----------ERROR MESSAGE END----------",
        ''
    ].join('\n'));
    this.end();

gulp.task('list', ->

  find.file(/\.html$/, 'production/', (files)->
    names = []
    for file in files
      names.push path.basename(file)

    gulp.src(paths.jade)
      .pipe(jade({
        locals: {'pages': names}
        })).on('error', log)
      .pipe(gulp.dest('production/'))
  )
)

gulp.task('css', ->
  return gulp.src(paths.css)
    .pipe(prefix()).on('error', log)
    .pipe(minifyCSS({removeEmpty:true})).on('error', log)
    .pipe(order([
      'reset.css'
      ])).on('error', log)
    .pipe(concat('styles.css')).on('error', log)
    .pipe(gulp.dest('production/css'))
    .on('error', log)
)

gulp.task('js', ->
  return gulp.src(paths.js)
    # .pipe(uglify({outSourceMap: true}))
    .pipe(gulp.dest('production/js'))
    .on('error', log)
)


gulp.task('images', ->
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('production/img'))
    .on('error', log)
)

gulp.task('watch', ->
  gulp.watch paths.images, ['images']
  gulp.watch paths.css, ['css']
  gulp.watch paths.js, ['js']
)


gulp.task('deploy', ->
  ghpages.publish(path.join(__dirname, 'production'), {
      repo: 'git@github.com:SilentImp/zamokk.ru.git',
      branch: 'gh-pages'
    }, (err)->
      if err
        console.log 'Error: ', err
      else
        console.log 'Published!'
  )
)

gulp.task 'default', ['js', 'css', 'images', 'watch']