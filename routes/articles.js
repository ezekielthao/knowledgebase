var express = require('express');
var router = express.Router();
var Article = require('../models/article')

/* GET users listing. */
router.get('/', function(req, res, next) {
  Article.getArticles(function(err, articles){
  	if (err) {
  		console.log(error);
  	}
  	res.json(articles);
  });
});

router.get('/:id', function(req, res, next) {
  Article.getArticleById(req.params.id, function(err, article){
  	if (err) {
  		console.log(error);
  	}
  	res.json(article);
  });
});

router.get('/category/:category', function(req, res, next) {
  Article.getArticlesByCategory(req.params.category, function(err, articles){
  	if (err) {
  		console.log(error);
  	}
  	res.json(articles);
  });
});

//create new Article
router.post('/', function(req, res, next){
  //get form values
  var title = req.body.title;
  var category = req.body.category;
  var body = req.body.body;

  console.log('title ' + title);
  console.log('category ' + category);
  console.log('body ' + body);

  var newArticle = new Article({
    title: req.body.title,
    category: req.body.category,
    body: req.body.body
  });

  // var newArticle = {
  //   title: req.body.title,
  //   category: req.body.category,
  //   body: req.body.body
  // };
  console.log('created new article');

  Article.createArticle(newArticle, function(error, article){
    console.log('success in creating article');
    if (error) {
      console.log(error);
    }
    res.location('/articles');
    res.redirect('/articles');
  });
});

//update article
router.put('/', function(req, res, next){
  var id = req.body.id;
  var data = {
    tite : req.body.title,
    category : req.body.category,
    body : req.body.body
  }

  console.log('updating article');
  Article.updateArticle(id, data, function(error, article){
    if (error) {
      console.log(error);
    }
    res.location('/articles');
    res.redirect('/articles');
  });


});

router.delete('/:id', function(req, res, next){
  var id = req.params.id;

  Article.removeArticle(id, function(error, article){
    if (error) {
      console.log(error);
    }
    res.location('/articles');
    res.redirect('/articles');
  });

});

module.exports = router;
