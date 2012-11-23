exports.buildScale = function(root, mode, notes){

        // root  MUST be a number, cannot be a string. Form elements, even if numbers
        // will be passed in as strings. Be sure to convert
        root = Number(root);

        var currentDegree = root;		//represents the addition of each modes whole or half step
        var finalScale = [];

        for(var i=0,j=mode.steps.length; i<j; i++){
                finalScale.push(notes[currentDegree]);			//get root first

                //if adding degrees causes the program to go to the 13th or higher note,
                //keep it in the 12-note chromatic scale range. Remembers, it's 11
                //because it's 0-11 (12 values)
                if(currentDegree + mode.steps[i] > 11){
                        currentDegree -= 12;
                }
                currentDegree += mode.steps[i];				//move up whole or half step of scale
        }

        return {
                root: notes[root],
                name: mode.name,
                scale: finalScale,
                chorder: mode.chorder
        };

}