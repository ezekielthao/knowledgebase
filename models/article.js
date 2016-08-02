var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
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

//Add article
module.exports.createArticle = function(newArticle, callback) {
	console.log('saving article through model' + newArticle);
	newArticle.save(callback);
}

//update article
module.exports.updateArticle = function(id, data, callback) {
	var title = data.title;
	var body = data.body;
	var category = data.categroy;
	console.log('updating article in model');
	var query = {_id : id};
	Article.findById(id, function(err, article){
		if(!article) {
			return next(new Error('Could not load article'));
		} else {
			//update
			console.log('comitting changes');
			article.title = title;
			article.body = body;
			article.category = category;
			article.save(callback);
		}
	});
}

//remove article
module.exports.removeArticle = function(id, callback) {
	Article.find({_id : id}).remove(callback);
}