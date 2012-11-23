// In App Memory Vars
var ChromaticScale = [ 
        "C",
        "C#/Db",
        "D",
        "D#/Eb",
        "E",
        "F",
        "F#/Gb",
        "G",
        "G#/Ab",
        "A",
        "A#/Bb",
        "B"
],
Modes = [
        {	name: "Ionian/Major", 
                steps: [2,2,1,2,2,2,1],
                chorder: [0,1,2,3,4,5,6]
        },

        {	name: "Dorian",
                steps: [2,1,2,2,2,1,2],	
                chorder: [1,2,3,4,5,6,0]
        },

        {	name: "Phrygian",
                steps: [1,2,2,2,1,2,2],	
                chorder: [2,3,4,5,6,0,1]	
        },

        {	name: "Lydian", 
                steps: [2,2,2,1,2,2,1],	
                chorder: [3,4,5,6,0,1,2]		
        },

        {	name: "Mixolydian",
                steps: [2,2,1,2,2,1,2],
                chorder: [4,5,6,0,1,2,3]	
        },

        {	name: "Aeolian/Minor", 
                steps: [2,1,2,2,1,2,2],	
                chorder: [5,6,0,1,2,3,4]	
        },

        {	name: "Locrian", 
                steps: [1,2,2,1,2,2,2],	
                chorder: [6,0,1,2,3,4,5]	
        }
];

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
        data: Build(req.params.root, req.params.scale)
    });
};