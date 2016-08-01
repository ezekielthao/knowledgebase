var mongoose = require('mongoose');

var ArticleSchema = mongoose.Schema({
	title : {
		type: String,
		index: true,
		required: true
	},
	body : {
		type : String,
		required : true
	},
	category : {
		type : String,
		index : true,
		required : true
	},
	date : {
		type : Date,
		default : Date.now
	}
});

var Article = module.export = mongoose.model('Article', ArticleSchema);

//Get all articles
module.exports.getArticles = function(callback) {
	Article.find(callback);
}

//Get article by Id
module.exports.getArticleById = function(id, callback) {
	Article.findById(id, callback);
}

//Get category articles
module.exports.getArticlesByCategory = function(category, callback) {
	var query = {category : category};
	Article.find(query, callback);
}