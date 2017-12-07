var gulp = require("gulp");          // Load gulp
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
var concat = require('gulp-concat');

gulp.task('minifyalljs', function () {
    gulp.src([      
        'public_html/apiservices/chatapiservices.js',
        'public_html/components/myaccount/wallet/controllers/wallet_dashboard_controller.js',
        'public_html/components/myaccount/animations/myaccount_animation.js'
    ])
            .pipe(concat('allCompressed_myaccount.js'))
            .pipe(minify()
                    .on('error', function (e) {
                        console.log(e);
                    })
                    )
            .pipe(gulp.dest('public_html/minified/'));
});


gulp.task('minifyallcss_myaccount', function () {
    gulp.src([ 
        'public_html/bower_components/angular-backtop/dist/angular-backtop.css'    
    ])
            .pipe(concat('allCompressed_myaccount.css'))
            .pipe(minify()
                    .on('error', function (e) {
                        console.log(e);
                    })
                    )
            .pipe(gulp.dest('public_html/assets/css/'));
});