import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg"; //изображения в формате webp
import versionNumber from "gulp-version-number"; // (ключи) не позволяет кешироваться файлам



export const html = () => {
   return app.gulp.src(app.path.src.html)
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "HTML",
            message: "Error: <%= error.message %>"
         })
      ))
      .pipe(fileInclude())
      .pipe(app.plugins.replace(/@img\//g, 'img/')) // заменяем @img на правильный путь к папке
      .pipe(
         app.plugins.if(
            app.isBuild,
            webpHtmlNosvg()
         )
      )//формат webp
      .pipe(
         app.plugins.if(
            app.isBuild,
         versionNumber({
            'value': '%DT%',
            'append': {
               'key': '_v',
               'cover': 0,
               'to': ['css', 'js'],
            },
            'output': {
               'file': 'gulp/version.json'
            }
         })
      ))
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browserSync.stream());
}