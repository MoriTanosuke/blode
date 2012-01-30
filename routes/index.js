
/*
 * GET home page.
 */

exports.index = function(req, res){
  if(req.session.firstAccess == null || req.session.firstAccess == "") {
    req.session.firstAccess = new Date()
  }
  res.render('index', { title: 'Hello World', date: new Date(), user: 'anonymous', firstAccess: req.session.firstAccess, sd: JSON.stringify(req.session) })
};
