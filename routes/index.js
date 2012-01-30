
/*
 * GET home page.
 */

exports.index = function(req, res){
  if(req.session.firstAccess == null || req.session.firstAccess == "") {
    req.session.firstAccess = new Date()
  }
  res.render('index', { title: 'Hello World', date: new Date(), user: 'anonymous', firstAccess: req.session.firstAccess });
};

/*
 * GET blog homepage
 */
exports.blog = function(req, res) {
  var walk = require('walk'), fs = require('fs'), options, walker;
  var walker = walk.walk('blog');
  var fs = new Array();
  walker.on("file", function(root,file,next){
    var f = "/" + root + "/" + file['name'].substring(0, file['name'].lastIndexOf('.'));
    fs.push(f);
    next();
  });
  walker.on("end", function() {
    res.render('blog', { title: 'Entries for ' + req.params.year + "-" + req.params.month + "-" + req.params.day, files: fs })
  });
};

/*
 * GET blog listing
 */
exports.list = function(req, res){
  var walk = require('walk'), fs = require('fs'), options, walker;
  var walker = walk.walk('blog/' + req.params.year + "/" + req.params.month + "/" + req.params.day);
  var fs = new Array();
  walker.on("file", function(root,file,next){
    var f = "/" + root + "/" + file['name'].substring(0, file['name'].lastIndexOf('.'));
    fs.push(f);
    next();
  });
  walker.on("end", function() {
    res.render('blog', { title: 'Entries for ' + req.params.year + "-" + req.params.month + "-" + req.params.day, files: fs })
  });
};

/*
 * GET blog entry
 */
exports.entry = function(req, res){
  var md = require('node-markdown').Markdown;
  res.render('entry', { body: md('' + require('fs').readFileSync('blog/' + req.params.year + "/" + req.params.month + "/" + req.params.day + "/" + req.params.title + ".markdown")), title: req.params.title });
};

