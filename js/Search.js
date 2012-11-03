/* @name Search.js
 * @author Keith Rosenberg, kthrose@netpoetica.com
 * @description The object which handles serching, search history for Modemaus.net
 * @version 1.0
 */
console.log("Loading Search.js...");
var Search = (function(){
    console.log("Initializing Search.js...");
    var history = [];
    
    // Returns the public API search function
    return function(sSearchParam, bPreventAddToHistory){
        //////
        // This basic Search functions splits user input into an array. It looks for a 1 char value to represent the
        // root note, and any other value gets compared against a regular expression that checks for a case insensitive
        // match to the user input of a string over 1 char.
        //////
        if(!sSearchParam){
                sSearchParam = $("#txtSearch").val();
        }


        //search for a standalone letter as the root note, and a word to compare to scale names
        var arrInput = sSearchParam.split(" ");
        var root, scale;

        for(var i = 0; i < arrInput.length; i++){
                if(arrInput[i].length === 1){
                        //console.log(arrInput[i]);
                        //probably the root note
                        for(var j = 0; j < ChromaticScaleVO.length; j++){
                                if(arrInput[i].toUpperCase() === ChromaticScaleVO[j] || arrInput[i].toLowerCase() === ChromaticScaleVO[j]){
                                        root = j;
                                        //console.log(root);
                                }
                        }
                }
                else if(arrInput[i].length > 1){
                        //probably the scale name
                        //console.log(arrInput[i]);
                        var regex = new RegExp(arrInput[i], "i");
                        //console.log(regex);
                        for(var k = 0; k < ModesVO.length; k++){
                                //console.log(ModesVO[k].name);
                                //console.log("Match: " + ModesVO[k].name.match(regex));
                                if(ModesVO[k].name.match(regex)){
                                        //alert("Found a match!");
                                        scale = k;
                                        //console.log(scale);
                                }
                        }
                }
        }

        //show the search history div, and add a new search to it
        if(ChromaticScaleVO[root]){
                root = ChromaticScaleVO[root];
        }
        if(ModesVO[scale].name){
                scale = ModesVO[scale].name;
        }
        if(!bPreventAddToHistory){
                var history = $("#searchHistory");
                history.slideDown('slow');
                $("<span class = '.prevSearch'><input type='button' value='" + root + " " + scale + "' /></span>")
                .appendTo(history)
                .bind("click", function(){
                                searchScales($(this).find('input').val(), true);
                });
        }
        Fretboard.update(root, scale);
    }
}());
