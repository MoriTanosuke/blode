
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Hello World', date: new Date(), user: 'anonymous' })
};
