import replace from "gulp-replace"; // поиск и замена
import plumber from "gulp-plumber"; // обработка ошибок
import notify from "gulp-notify"; // сообщения (подсказки) об ошибках
import browserSync from "browser-sync"; // локальный сервер
import newer from "gulp-newer" // проверка обновления (обрабатывает те изображения которых еще нет в папке)
import ifPlugin from "gulp-if"

//экспортируем объект
export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browserSync: browserSync,
    newer: newer,
    if: ifPlugin
} 