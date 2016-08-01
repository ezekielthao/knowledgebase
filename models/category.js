var mongoose = require('mongoose');

var CategorySchema = mongoose.Schema({
	name : {
		type: String,
		index: true,
		required: true
	},
	description : {
		type: String
	}
});

var Category = module.export = mongoose.model('Category', CategorySchema);

//Get all articles
module.exports.getCategories = function(callback) {
	Category.find(callback);
}

//Get article by Id
module.exports.getCategoryById = function(id, callback) {
	Category.findById(id, callback);
}

module.exports.createCategory = function(newCategory, callback) {
	newCategory.save(callback);
}