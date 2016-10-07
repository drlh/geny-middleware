var t_consumer_key = "fd305e7cfa9ce4a82581", 
	t_consumer_secret = "071018184da8093ecadaec78ac251963c9a39b9c";
 	p_consumer_key = "5afdc9a86b9c654f7bcf", 
	p_consumer_secret = "eacd23020f6abb6ab4dc2b422680db3e3c67b5c7";
 	
module.exports = {
	test : {
		consumer_key : t_consumer_key,
		consumer_secret : t_consumer_secret
	},
	prod : {
		consumer_key : p_consumer_key,
		consumer_secret : p_consumer_secret
	}
	
};