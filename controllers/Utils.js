exports.getModeByName = function(modes, name){
    var len = modes.length;
    while(len){
        len--;
        if(modes[len].name === name){
            return modes[len];
        }
    }
    
    return null;
}
exports.getTuningByName = function(tunings, name){
    var len = tunings.length;
    while(len){
        len--;
        if(tunings[len].name === name){
            return tunings[len];
        }
    }
    
    return null;
}
exports.getRootByNote = function(chromaticScale, note){
    var len = chromaticScale.length;
    
    while(len--){
        if(chromaticScale[len] === note){
            return len;
        }
    }
    
    return null;
}