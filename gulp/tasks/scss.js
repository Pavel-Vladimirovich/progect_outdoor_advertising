import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // сжатие CSS файла
import webpcss from 'gulp-webpcss'; // вывод WEBP изображений
import autoprefixer from 'gulp-autoprefixer' // добавление вендорных префиксов для кроссбраузерности
import groupCssMediaQueries from 'gulp-group-css-media-queries' // групировка медиа запросов

const sass = gulpSass(dartSass);


export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev }) // позволяет видеть ошибки
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>",
            }))
        )
        .pipe(sass({
            outputStyle: 'expanded'
            })
        )
        .pipe(app.plugins.replace(/@img\//g, '../img/')) // заменяем @img на правильный путь к папке
        .pipe(app.plugins.if(
            app.isBuild, groupCssMediaQueries())
        )
        .pipe(app.plugins.if(
            app.isBuild, webpcss({
                webpClass: ".webp",
                noWebpClass: ".no-webp"
            }))
        )
        .pipe(app.plugins.if(
            app.isBuild, autoprefixer({
                grid: true,
                overrideBrowserslist: ["last 3 versions"], // указываем количество последних версий браузера
                cascade: true
            }))
        )
        // позваляет получить не сжатый файл CSS, если не нужен то можно закоментировать
        .pipe(app.gulp.dest(app.path.build.css))
        // сжатие файла CSS
        .pipe(app.plugins.if(
            app.isBuild, cleanCss())
        ) 
        .pipe(rename({
            extname: ".min.css"
            })
        )
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browserSync.stream())
}