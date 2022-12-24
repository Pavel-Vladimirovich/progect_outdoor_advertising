// импорт основного модуля
import gulp from "gulp";

//импорт путей
import {path} from "./gulp/config/path.js";
// импорт общих плагинов
import {plugins} from "./gulp/config/plugins.js"

//передаем значения в глобальную переменную
global.app = {
    isBuild: process.argv.includes('--build'), //режим продакшена
    isDev: !process.argv.includes('--build'), //режим разработчика 
    path: path,
    gulp: gulp,
    plugins: plugins
}

// импорт задач
import {copy} from "./gulp/tasks/copy.js";
import {reset} from "./gulp/tasks/reset.js/"; 
import {html} from "./gulp/tasks/html.js/"; 
import {images} from "./gulp/tasks/images.js/"; 
import {server} from "./gulp/tasks/server.js";
import {scss} from "./gulp/tasks/scss.js";
import {js} from "./gulp/tasks/js.js";
import {otfToTtf, ttfToWoff, fontsStyle} from "./gulp/tasks/fonts.js";
import {svgSprive} from "./gulp/tasks/svgSprive.js";
import {zip} from "./gulp/tasks/zip.js";


 
// наблюдатель за изменениями в файлах
function watcher(){
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.images, images);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
}


// последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)

// основные задачи 
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, images, scss, js));

// построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server)); // режим разработчика
const build = gulp.series(reset, mainTasks)// режим продакшена
const deployZip = gulp.series(reset, mainTasks, zip)// упаковываем проект в архив

// экспорт сценариев 
export {dev}
export {build}
export {deployZip}

export {svgSprive} // добавления иконок в один файл (отдельный запуск командой "npm run svgSprive")


 gulp.task('default', dev);