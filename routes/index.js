/*
 * GET blog listing
 */
exports.list = function(req, res){
  var walk = require('walk'), fs = require('fs'), options, walker;
  var walker = walk.walk('blog');
  var fs = new Array();
  walker.on("file", function(root,file,next){
    var f = root + "/" + file['name'].substring(0, file['name'].lastIndexOf('.'));
    // push without /blog prefix
    fs.push(f.substring(f.indexOf('/')));
    next();
  });
  walker.on("end", function() {
    res.render('blog', { title: 'Entries', files: fs })
  });
};

/*
 * GET blog entry
 */
exports.entry = function(req, res){
  var md = require('node-markdown').Markdown;
  res.render('entry', { content: md('' + require('fs').readFileSync('blog/' + req.params.year + "/" + req.params.month + "/" + req.params.day + "/" + req.params.title + ".markdown")), title: req.params.title });
};

