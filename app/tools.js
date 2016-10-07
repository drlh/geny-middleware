//exports.getAppkeys = function() {
//		var fs = require("fs");
//		var d = null;
//		fs.readFileSync('./config.json', 'utf-8' ,function(err, data) {
//			if (err) {
//				console.log(err);
//				process.exit(1);
//			}
//			
//			data = JSON.parse(data);
//			d = {
//					consumer_key : data.xing.key,
//					consumer_secret : data.xing.secret
//			};
//			console.log(d);
//			return d;
//		});
//};

exports.getNonce = function() {
	return Math.random().toString(36).substring(5);
};

exports.getTimestamp = function() {
	return Date.now();
};