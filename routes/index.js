// Models/data used acrossall routes
var Modes = require('../models/Modes').modes;
var ChromaticScale = require('../models/ChromaticScale').chromaticScale;
var Chords = require('../models/Chords').chords;
var Tunings = require('../models/Tunings').tunings;

// Controllers
var Utils = require('../controllers/Utils');
var Fretboard = require('../controllers/Fretboard');

/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', { title: 'Modemaus.net by Keith Rosenberg', modes: Modes, chromaticScale: ChromaticScale , debug: true});
};


/*
 * GET root page.
 */
exports.root = function(req, res){
  res.render('root/root', { title: 'Modemaus.net - ' + req.params.root + ' Scales'});
};


/*
 * GET scale page.
 */
exports.scale = function(req, res){
    res.render('root/scale/scale', {   
        title: 'Modemaus.net - ' + req.params.root + ' ' + req.params.scale,
        modes: Modes, 
        chromaticScale: ChromaticScale,
        tuning: Utils.getTuningByName(Tunings, 'standard'),
        data: Fretboard.buildScale(Utils.getRootByNote(ChromaticScale, req.params.root), Utils.getModeByName(Modes, req.params.scale), ChromaticScale)
    });
};