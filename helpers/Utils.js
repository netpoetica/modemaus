exports.getModeByName = function(modes, name){
    var len = modes.length;
    while(len--){
        if(modes[len].name.toLowerCase().indexOf(name.toLowerCase()) !== -1){
            return modes[len];
        }
    }

    return null;
};
exports.getTuningByName = function(tunings, name){
    var len = tunings.length;
    while(len){
        len--;
        if(tunings[len].name === name){
            return tunings[len];
        }
    }
    
    return null;
};
exports.getRootByNote = function(chromaticScale, note){
    var len = chromaticScale.length;
    
    while(len--){
        if(chromaticScale[len] === note.toLowerCase()){
            return len;
        }
    }
    
    return null;
};