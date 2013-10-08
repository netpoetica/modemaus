// Models/data used acrossall routes
var Modes = require('../models/Modes').modes;
var ChromaticScale = require('../models/ChromaticScale').chromaticScale;
var Chords = require('../models/Chords').chords;
var Tunings = require('../models/Tunings').tunings;

// Controllers
var Utils = require('../helpers/Utils');
var Fretboard = require('../controllers/Fretboard');

const DEFAULT_ROOT = 'C';
const DEFAULT_MODE = 'Major';

/*
 * GET home page.
 */
exports.index = function(req, res){
  res.redirect(DEFAULT_ROOT + '/' + DEFAULT_MODE);
};

/*
 * GET scale page.
 */
exports.scale = function(req, res){
    //res.render('root/scale/scale', {
    res.render('index', {
        title: 'Modemaus.net - ' + req.params.root + ' ' + req.params.scale,
        modes: Modes, 
        chromaticScale: ChromaticScale,
        tuning: Utils.getTuningByName(Tunings, 'standard'),
        data: Fretboard.buildScale(
          Utils.getRootByNote(ChromaticScale, req.params.root),
          Utils.getModeByName(Modes, req.params.scale),
          ChromaticScale
        )
    });
};