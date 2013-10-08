(function(exports){

  'use strict';

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
      console.log("-> Utils.getRootByNote", "--> note: " + note);
      var len = chromaticScale.length;

      console.log("--> len: " + len);
      while(len--){
          console.log("---> chromaticScale: ", chromaticScale[len]);
          if(chromaticScale[len] === note.toLowerCase()){
              console.log("---> Found note at index " + len);
              return len;
          }
      }

      return null;
  };
})((typeof process === 'undefined' || !process.versions)
   ? window.common = window.common || {}
   : exports);