const gulp = require("gulp");
const minify = require("gulp-minify");
const concat = require("gulp-concat");

gulp.task("build", function () {
    return gulp
        .src("./src/**/*.js")
        .pipe(
            minify({
                ext: {
                    src: ".js",
                    min: ".min.js",
                },
            })
        )

        .pipe(gulp.dest("./dist"));
});