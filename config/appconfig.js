//APP CONNFIG
//==============================================================
module.exports = function(app) {
//	app.use(logger('dev'));

	// REQUIRED:
	app.use(session({
		secret : '071018184da8093ecadaec78ac251963c9a39b9c'
	}));
}