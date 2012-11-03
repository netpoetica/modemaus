/*
 * @name main.js
 * @author Keith Rosenberg, kthrose@netpoetica.com
 * @version 1.0
 * @description Main program logic and init
 */
console.log("Loading Main.js...");
$(document).ready(function(){
    console.log("Initailizing Main.js...")
    // Initially build a selected scale
    Fretboard.update();

    // Binds events
    $('#selectorForm').submit(function(e){
        Fretboard.update();
        return false;
    });
    $('#fmSearch').submit(function(e){
        Search();
        return false;
    });
    
});