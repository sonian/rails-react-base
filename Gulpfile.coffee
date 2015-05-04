gulp           = require('gulp')
browserify     = require('browserify')
watchify       = require('watchify')
coffeeReactify = require('coffee-reactify')
source         = require('vinyl-source-stream')
spawn          = require('child_process').spawn

runRails = null
runRails = ->
  runRails.child?.kill('SIGINT')

  runRails.child = spawn 'bundle', ['exec', 'rails', 's']
  runRails.child.stdout.pipe(process.stdout)
  runRails.child.stderr.pipe(process.stderr)

process.on 'exit', -> runRails.child?.kill('SIGINT')

makeBrowserify = ->
  b = watchify(browserify(
    entries: ['./app/assets/javascripts/app.cjsx']
    extensions: ['js', 'coffee', 'cjsx']
    debug: true
    cache: {}
    packageCache: {}
  ).transform(coffeeReactify))

  bundle = b.bundle

  b.bundle = ->
    console.log "Browerifying..."

    bundle
      .call(this)
      .on 'error', (e) ->
        console.log e.message

        @emit('end')
      .pipe(source('app.js'))
      .pipe(gulp.dest('./public/javascripts'))

  b

gulp.task 'rails', runRails

gulp.task 'scripts', ->
  makeBrowserify().bundle()

gulp.task 'watch', ->
  b = makeBrowserify()
  b.on 'update', b.bundle
  b.bundle()

  gulp.watch ['./config/**/*'], runRails

gulp.task 'default', ['watch', 'rails']

