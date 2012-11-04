// Validates fully with JSHint - http://www.jshint.com/ - using jQuery.
console.log("Loading Modemaus.js...");
"use strict";
//////////
// This function builds the 7 notes of any mode/scale/key based on the pattern of the mode/scale
// and the root note of the mode/scale. It returns an object with a root note, name of the mode,
// and the final makeup (array) of the scale being searched for.
///////////
var Build = function(root, mode){

        // root  MUST be a number, cannot be a string. Form elements, even if numbers
        // will be passed in as strings. Be sure to convert
        root = Number(root);

        var currentDegree = root;		//represents the addition of each modes whole or half step
        var finalScale = [];

        for(var i=0,j=mode.steps.length; i<j; i++){
                finalScale.push(ChromaticScaleVO[currentDegree]);			//get root first

                //if adding degrees causes the program to go to the 13th or higher note,
                //keep it in the 12-note chromatic scale range. Remembers, it's 11
                //because it's 0-11 (12 values)
                if(currentDegree + mode.steps[i] > 11){
                        currentDegree -= 12;
                }
                currentDegree += mode.steps[i];				//move up whole or half step of scale
        }

        return {
                root: ChromaticScaleVO[root],
                name: mode.name,
                scale: finalScale,
                chorder: mode.chorder
        };

}

// Display results of Modemaus submit
var showOutput = function(rootNote, scaleName, scale, chorder){

        //update contentHeader to display name of scale
        // add later : +'<p>Get the <a href="#">relative minor!</a></p>'
        $("#contentHeader").html('<h2>' + rootNote + ' ' + scaleName + '</h2>');

        //reference to the output Panel
        var output = $("#outputPanel"); 

        var html = "<table><tr><th>Note</th><th>Related Chords</th></tr>";
        for(var i=0,j = scale.length; i < j; i++){
                html += '<tr';
                if(i === 0){	
                        //root note
                        html += ' class="rootOnFretboard"';
                }
                else if(i === 3){
                        //perfect fourth
                        html += ' class="fourthOnFretboard"';
                }
                else if(i === 4){
                        //perfect 5th
                        html += ' class="fifthOnFretboard"';			
                }
                else {
                        html += ' class="noteOnFretboard"';
                }
                html+='><td class="scaleDegree">'+ scale[i] + '</td><td class="relatedChords">';

                for(var k = 0, l = ChordsVO[chorder[i]].length; k < l; k++){
                        html += "" + scale[i] + " " + ChordsVO[chorder[i]][k];	
                        //prevent the comma from showing up on the end of the last chord :)
                        if(k + 1 < l){ 
                                html += ", ";
                        }
                }
                html += '</td></tr>';
        }
        html+= "</table>";

        output.html(html);

};