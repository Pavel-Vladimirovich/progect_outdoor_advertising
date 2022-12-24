export const server = (done) => {
    app.plugins.browserSync.init({
        server: {
            baseDir: `${app.path.build.html}`
        },
        notify: false, // оповещения браузера, "false" выкл.
        port: 3000,
    });
}