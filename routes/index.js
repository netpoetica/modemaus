
/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', { title: 'Modemaus.net by Keith Rosenberg' , debug: true});
};


/*
 * GET root page.
 *
exports.root = function(req, res){
  res.render('root', { title: 'Modemaus.net - ' + req.params.root + ' Scales' });
};*/


/*
 * GET scale page.
 *
exports.scale = function(req, res){
  res.render('scale', { title: 'Modemaus.net - ' + req.params.root + ' ' + req.params.scale });
};*/