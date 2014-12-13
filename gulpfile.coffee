gulp        = require 'gulp'
order       = require 'gulp-order'
imagemin    = require 'gulp-imagemin'
prefix      = require 'gulp-autoprefixer'
minifyCSS   = require 'gulp-minify-css'
concat      = require 'gulp-concat'
uglify      = require 'gulp-uglify'
ghpages     = require 'gh-pages'
path        = require 'path'

paths =
  images: 'developer/img/**'
  js: 'developer/js/**'
  css: 'developer/css/*'


gulp.task('css', ->
  return gulp.src(paths.css)
    .pipe(prefix())
    .pipe(minifyCSS({removeEmpty:true}))
    .pipe(order([
      'reset.css'
      ]))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('production/css'))
)

gulp.task('js', ->
  return gulp.src(paths.js)
    # .pipe(uglify({outSourceMap: true}))
    .pipe(gulp.dest('production/js'))
)


gulp.task('images', ->
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('production/img'))
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