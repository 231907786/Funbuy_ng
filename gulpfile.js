const gulp = require('gulp');
const url = require('url');
const mockApi = require('./mockApi');
const connect = require('gulp-connect');
const root = './Funbuy AngularJS/';
const serverConfig = {
	root: './',
	port: 80,
	livereload: true,
	middleware: function (connect, opt) {
		 return [function(req, res, next){
		 	const urlObj = url.parse(req.url, true),
                method = req.method,
                paramObj = urlObj.query;
            // mock数据
            mockApi(res, urlObj.pathname, paramObj, next);
		 }]; 
	}
};
gulp.task('connect', function () {
	connect.server(serverConfig);
});

gulp.task('html', function () {
	 gulp
	 	.src('**/*.html')
	 	.pipe(connect.reload());
});



gulp.task('watch', function () {
	gulp.watch(['**/*.html'], ['html']);
})


gulp.task('default', ['connect', 'watch']);
