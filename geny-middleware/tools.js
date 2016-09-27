module.exports = function() {
	this.getAppkeys = function() {
		var fs = require("fs");
		fs.readFile('config.json', function(err, data) {
			if (err) {
				console.log(err);
				process.exit(1);
			}
			return data;
		});
	}
}